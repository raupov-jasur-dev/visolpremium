import { r as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-DNtH5Uvn.js
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.n);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({});
		const doneRows = await pg.query("select name from _migrations");
		const done = new Set(doneRows.rows.map((r) => r.name));
		for (const [path, text] of Object.entries(migrations).sort(([a], [b]) => a.localeCompare(b))) {
			const name = path.split("/").pop();
			if (done.has(name)) continue;
			await pg.transaction(async (tx) => {
				await tx.exec(text);
				await tx.query("insert into _migrations (name) values ($1)", [name]);
			});
		}
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* The shared PGLite instance (preview only), with `migrations/*.sql` applied.
* Lets Better Auth persist to the SAME embedded DB as app data in preview (via a
* Kysely dialect). Throws when `DATABASE_URL` is set (that path uses Neon).
*/
async function getPglite() {
	if (dbSource !== "pglite") throw new Error("getPglite() is only available on the PGLite fallback (no DATABASE_URL)");
	await getSql();
	const pg = await globalRef.__pgliteInstance__;
	if (!pg) throw new Error("PGLite instance failed to initialize");
	return pg;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out (auth on — the default, including live preview) -> throws
* `UnauthorizedError` (see `verify.server.ts`). Only when auth is explicitly
* disabled (`VITE_AUTH_ENABLED=false`) does it resolve the shared dev user and
* never throw. Use it on every server function that touches per-user data, and
* scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-sGid3STf.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-I2RZhPQj.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var PRICE = 19999;
var CATEGORIES = [
	{
		id: "toy",
		slug: "toy",
		title: "To'y taklifnomasi",
		description: "Nikoh marosimi uchun cinematic va romantik taklifnomalar."
	},
	{
		id: "taklifnoma",
		slug: "taklifnoma",
		title: "Taklifnoma",
		description: "Rasmiy tadbir, oilaviy kecha va tantanalar uchun."
	},
	{
		id: "tabriknoma",
		slug: "tabriknoma",
		title: "Tabriknoma",
		description: "Yaqinlaringizga yuboriladigan nafis raqamli tabrik."
	},
	{
		id: "uchrashuv",
		slug: "uchrashuv",
		title: "Uchrashuv taklifnomasi",
		description: "Kecha, kechki ovqat yoki maxsus uchrashuv chaqiruvi."
	},
	{
		id: "video-tabrik",
		slug: "video-tabrik",
		title: "Videolik tabriknoma",
		description: "Musiqa va kadrlar bilan jonli tabrik syujeti."
	},
	{
		id: "video-taklif",
		slug: "video-taklif",
		title: "Videolik taklifnoma",
		description: "To'y yoki tadbir uchun kino uslubidagi taklif."
	},
	{
		id: "tugilgan-kun",
		slug: "tugilgan-kun",
		title: "Tug'ilgan kun",
		description: "Yosh to'yishi va tug'ilgan kun kechalari uchun."
	}
];
var WEDDING_FIELDS = [
	{
		key: "groom",
		label: "Kuyov ismi",
		type: "text",
		required: true,
		placeholder: "Sardor"
	},
	{
		key: "bride",
		label: "Kelin ismi",
		type: "text",
		required: true,
		placeholder: "Madina"
	},
	{
		key: "greeting",
		label: "Taklif matni",
		type: "textarea",
		required: true,
		placeholder: "Sizni nikoh to'yimizga marhamat qilamiz..."
	},
	{
		key: "date",
		label: "Sana",
		type: "date",
		required: true
	},
	{
		key: "time",
		label: "Vaqt",
		type: "time",
		required: true
	},
	{
		key: "venue",
		label: "Maskan",
		type: "text",
		required: true,
		placeholder: "Hilton Garden Inn"
	},
	{
		key: "address",
		label: "Manzil",
		type: "text",
		required: true,
		placeholder: "Toshkent, Amir Temur ko'chasi"
	},
	{
		key: "mapUrl",
		label: "Xarita havolasi",
		type: "map",
		placeholder: "https://maps.google.com/..."
	},
	{
		key: "phone",
		label: "Telefon",
		type: "phone",
		placeholder: "+998 90 123 45 67"
	},
	{
		key: "parentsGroom",
		label: "Kuyov ota-onasi",
		type: "text",
		placeholder: "Akmal va Dilbar aka-opalar"
	},
	{
		key: "parentsBride",
		label: "Kelin ota-onasi",
		type: "text",
		placeholder: "Jahongir va Nodira aka-opalar"
	},
	{
		key: "coverPhoto",
		label: "Asosiy foto",
		type: "image"
	},
	{
		key: "gallery",
		label: "Galereya",
		type: "images",
		max: 6
	},
	{
		key: "music",
		label: "Fon musiqasi",
		type: "music"
	},
	{
		key: "countdownEnabled",
		label: "Hisoblagich",
		type: "boolean"
	},
	{
		key: "rsvpEnabled",
		label: "RSVP formasi",
		type: "boolean"
	}
];
var GREETING_FIELDS = [
	{
		key: "sender",
		label: "Yuboruvchi",
		type: "text",
		required: true,
		placeholder: "Sardor"
	},
	{
		key: "recipient",
		label: "Qabul qiluvchi",
		type: "text",
		required: true,
		placeholder: "Madina"
	},
	{
		key: "message",
		label: "Tabrik matni",
		type: "textarea",
		required: true
	},
	{
		key: "date",
		label: "Sana",
		type: "date"
	},
	{
		key: "coverPhoto",
		label: "Foto",
		type: "image"
	},
	{
		key: "music",
		label: "Fon musiqasi",
		type: "music"
	}
];
var MEETING_FIELDS = [
	{
		key: "title",
		label: "Uchrashuv nomi",
		type: "text",
		required: true,
		placeholder: "Kechki suhbat"
	},
	{
		key: "host",
		label: "Mezbon",
		type: "text",
		required: true,
		placeholder: "Sardor"
	},
	{
		key: "greeting",
		label: "Taklif matni",
		type: "textarea",
		required: true
	},
	{
		key: "date",
		label: "Sana",
		type: "date",
		required: true
	},
	{
		key: "time",
		label: "Vaqt",
		type: "time",
		required: true
	},
	{
		key: "venue",
		label: "Joy",
		type: "text",
		required: true
	},
	{
		key: "address",
		label: "Manzil",
		type: "text"
	},
	{
		key: "mapUrl",
		label: "Xarita havolasi",
		type: "map"
	},
	{
		key: "phone",
		label: "Aloqa",
		type: "phone"
	},
	{
		key: "coverPhoto",
		label: "Foto",
		type: "image"
	},
	{
		key: "music",
		label: "Fon musiqasi",
		type: "music"
	}
];
var BIRTHDAY_FIELDS = [
	{
		key: "honoree",
		label: "Tug'ilgan kun egasi",
		type: "text",
		required: true,
		placeholder: "Madina"
	},
	{
		key: "age",
		label: "Yosh",
		type: "number",
		required: true,
		placeholder: "25"
	},
	{
		key: "host",
		label: "Mezbon",
		type: "text",
		placeholder: "Oilasi"
	},
	{
		key: "greeting",
		label: "Taklif matni",
		type: "textarea",
		required: true
	},
	{
		key: "date",
		label: "Sana",
		type: "date",
		required: true
	},
	{
		key: "time",
		label: "Vaqt",
		type: "time",
		required: true
	},
	{
		key: "venue",
		label: "Joy",
		type: "text",
		required: true
	},
	{
		key: "address",
		label: "Manzil",
		type: "text"
	},
	{
		key: "phone",
		label: "Telefon",
		type: "phone"
	},
	{
		key: "coverPhoto",
		label: "Asosiy foto",
		type: "image"
	},
	{
		key: "gallery",
		label: "Galereya",
		type: "images",
		max: 6
	},
	{
		key: "music",
		label: "Fon musiqasi",
		type: "music"
	},
	{
		key: "rsvpEnabled",
		label: "RSVP formasi",
		type: "boolean"
	}
];
var VIDEO_GREETING_FIELDS = [
	{
		key: "title",
		label: "Sarlavha",
		type: "text",
		required: true,
		placeholder: "Tabrik"
	},
	{
		key: "subtitle",
		label: "Qisqa matn",
		type: "text",
		placeholder: "Siz uchun"
	},
	{
		key: "sender",
		label: "Yuboruvchi",
		type: "text",
		required: true
	},
	{
		key: "recipient",
		label: "Qabul qiluvchi",
		type: "text",
		required: true
	},
	{
		key: "message",
		label: "Asosiy tabrik",
		type: "textarea",
		required: true
	},
	{
		key: "slides",
		label: "Kadrlar",
		type: "images",
		required: true,
		max: 8
	},
	{
		key: "captions",
		label: "Kadr matnlari",
		type: "textarea",
		help: "Har bir qator — alohida kadr matni."
	},
	{
		key: "music",
		label: "Musiqa",
		type: "music"
	}
];
var VIDEO_WEDDING_FIELDS = [
	{
		key: "groom",
		label: "Kuyov ismi",
		type: "text",
		required: true
	},
	{
		key: "bride",
		label: "Kelin ismi",
		type: "text",
		required: true
	},
	{
		key: "greeting",
		label: "Taklif matni",
		type: "textarea",
		required: true
	},
	{
		key: "date",
		label: "Sana",
		type: "date",
		required: true
	},
	{
		key: "time",
		label: "Vaqt",
		type: "time"
	},
	{
		key: "venue",
		label: "Maskan",
		type: "text",
		required: true
	},
	{
		key: "slides",
		label: "Video kadrlar",
		type: "images",
		required: true,
		max: 8
	},
	{
		key: "captions",
		label: "Kadr matnlari",
		type: "textarea",
		help: "Har bir qator — alohida kadr matni."
	},
	{
		key: "music",
		label: "Musiqa",
		type: "music"
	},
	{
		key: "phone",
		label: "Telefon",
		type: "phone"
	}
];
var DEMO_WEDDING = {
	groom: "Sardor",
	bride: "Madina",
	greeting: "Qadrli mehmonlar, sizni hayotimizning eng nurlı kuniga — nikoh to'yimizga taklif etamiz. Marhamat qiling, biz bilan shu lahzani baham ko'ring.",
	date: "2026-08-22",
	time: "18:00",
	venue: "Hilton Garden Inn",
	address: "Toshkent, Amir Temur shoh ko'chasi, 24",
	mapUrl: "https://maps.google.com/?q=Toshkent+Hilton+Garden+Inn",
	phone: "+998 90 123 45 67",
	parentsGroom: "Akmal va Dilbar aka-opalar",
	parentsBride: "Jahongir va Nodira aka-opalar",
	music: "ipak-tuni",
	countdownEnabled: true,
	rsvpEnabled: true
};
function theme(partial) {
	return partial;
}
var TEMPLATES = [
	{
		id: "guldasta",
		category: "toy",
		title: "Guldasta",
		tagline: "Gul va ipak nafasidagi nikoh taklifnomasi",
		price: PRICE,
		previewImage: "/images/templates/guldasta/cover.jpg",
		background: "/images/templates/guldasta/background.jpg",
		gallery: [
			"/images/templates/guldasta/gallery-1.jpg",
			"/images/templates/guldasta/gallery-2.jpg",
			"/images/hero/roses.jpg"
		],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: WEDDING_FIELDS,
		sections: [
			"cover",
			"names",
			"verse",
			"photo",
			"datetime",
			"event",
			"parents",
			"gallery",
			"location",
			"countdown",
			"rsvp",
			"footer"
		],
		theme: theme({
			style: "floral",
			paper: "#F7F1E8",
			ink: "#2C1F1A",
			muted: "#7A6A62",
			accent: "#C99A9A",
			gold: "#B8956A",
			overlay: "rgba(44,31,26,0.28)"
		}),
		animations: ["fade-up", "petal"],
		isVideo: false,
		demo: {
			...DEMO_WEDDING,
			coverPhoto: "/images/templates/guldasta/cover.jpg",
			gallery: ["/images/templates/guldasta/gallery-1.jpg", "/images/templates/guldasta/gallery-2.jpg"]
		}
	},
	{
		id: "shohona",
		category: "toy",
		title: "Shohona",
		tagline: "Kechki zal va oltin yorug'likdagi cinematic to'y",
		price: PRICE,
		previewImage: "/images/templates/shohona/cover.jpg",
		background: "/images/templates/shohona/background.jpg",
		gallery: [
			"/images/templates/shohona/gallery-1.jpg",
			"/images/templates/shohona/gallery-2.jpg",
			"/images/hero/venue.jpg"
		],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: WEDDING_FIELDS,
		sections: [
			"cover",
			"names",
			"verse",
			"datetime",
			"event",
			"photo",
			"parents",
			"gallery",
			"location",
			"countdown",
			"rsvp",
			"footer"
		],
		theme: theme({
			style: "cinematic",
			paper: "#1C1012",
			ink: "#F3E6D8",
			muted: "#C4B0A0",
			accent: "#B8956A",
			gold: "#D4C4A8",
			overlay: "rgba(12,6,8,0.45)"
		}),
		animations: ["mask-reveal", "gold-line"],
		isVideo: false,
		demo: {
			...DEMO_WEDDING,
			venue: "Navoiy teatri",
			coverPhoto: "/images/templates/shohona/cover.jpg",
			gallery: ["/images/templates/shohona/gallery-1.jpg", "/images/hero/venue.jpg"]
		}
	},
	{
		id: "ipak-xat",
		category: "taklifnoma",
		title: "Ipak xat",
		tagline: "Ipak to'qima va yumshoq yorug'likdagi rasmiy taklif",
		price: PRICE,
		previewImage: "/images/templates/ipak-xat/cover.jpg",
		background: "/images/templates/ipak-xat/background.jpg",
		gallery: ["/images/templates/ipak-xat/gallery-1.jpg", "/images/templates/ipak-xat/gallery-2.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: [
			{
				key: "title",
				label: "Tadbir nomi",
				type: "text",
				required: true,
				placeholder: "Oilaviy kecha"
			},
			{
				key: "host",
				label: "Mezbon",
				type: "text",
				required: true
			},
			{
				key: "greeting",
				label: "Taklif matni",
				type: "textarea",
				required: true
			},
			{
				key: "date",
				label: "Sana",
				type: "date",
				required: true
			},
			{
				key: "time",
				label: "Vaqt",
				type: "time",
				required: true
			},
			{
				key: "venue",
				label: "Maskan",
				type: "text",
				required: true
			},
			{
				key: "address",
				label: "Manzil",
				type: "text"
			},
			{
				key: "mapUrl",
				label: "Xarita",
				type: "map"
			},
			{
				key: "phone",
				label: "Telefon",
				type: "phone"
			},
			{
				key: "coverPhoto",
				label: "Foto",
				type: "image"
			},
			{
				key: "music",
				label: "Musiqa",
				type: "music"
			},
			{
				key: "rsvpEnabled",
				label: "RSVP",
				type: "boolean"
			}
		],
		sections: [
			"cover",
			"names",
			"message",
			"datetime",
			"event",
			"location",
			"rsvp",
			"footer"
		],
		theme: theme({
			style: "silk",
			paper: "#F3E6D8",
			ink: "#3A2A24",
			muted: "#8A7468",
			accent: "#C99A9A",
			gold: "#B8956A",
			overlay: "rgba(58,42,36,0.22)"
		}),
		animations: ["silk-fade"],
		isVideo: false,
		demo: {
			title: "Oilaviy kecha",
			host: "Sardor va Madina",
			greeting: "Qadrli yaqinlar, sizni ipak kechamizga marhamat qilamiz. Suhbat, musiqa va iliqlik kutadi.",
			date: "2026-09-12",
			time: "19:30",
			venue: "Private salon",
			address: "Toshkent, Yakkasaroy",
			phone: "+998 90 123 45 67",
			music: "guliston",
			rsvpEnabled: true,
			coverPhoto: "/images/templates/ipak-xat/cover.jpg"
		}
	},
	{
		id: "yulduz-tabrik",
		category: "tabriknoma",
		title: "Yulduz tabrik",
		tagline: "Suv bo'yoqli, yumshoq va shaxsiy tabriknoma",
		price: PRICE,
		previewImage: "/images/templates/yulduz-tabrik/cover.jpg",
		background: "/images/templates/yulduz-tabrik/background.jpg",
		gallery: ["/images/templates/yulduz-tabrik/gallery-1.jpg", "/images/templates/yulduz-tabrik/gallery-2.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: GREETING_FIELDS,
		sections: [
			"cover",
			"names",
			"message",
			"photo",
			"footer"
		],
		theme: theme({
			style: "watercolor",
			paper: "#F7F1E8",
			ink: "#4A3030",
			muted: "#8C6E6E",
			accent: "#C99A9A",
			gold: "#B8956A",
			overlay: "rgba(201,154,154,0.18)"
		}),
		animations: ["wash"],
		isVideo: false,
		demo: {
			sender: "Sardor",
			recipient: "Madina",
			message: "Yuragimdagi eng iliqlik — senga. Har tonging yulduzdek yorug', har kechang sokin va baxtli bo'lsin.",
			date: "2026-08-22",
			music: "yulduzlar",
			coverPhoto: "/images/templates/yulduz-tabrik/cover.jpg"
		}
	},
	{
		id: "kechki-uchrashuv",
		category: "uchrashuv",
		title: "Kechki bog'",
		tagline: "Romantik bog' manzarasidagi uchrashuv chaqiruvi",
		price: PRICE,
		previewImage: "/images/templates/kechki-uchrashuv/cover.jpg",
		background: "/images/templates/kechki-uchrashuv/background.jpg",
		gallery: ["/images/templates/kechki-uchrashuv/gallery-1.jpg", "/images/hero/garden.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: MEETING_FIELDS,
		sections: [
			"cover",
			"names",
			"message",
			"datetime",
			"event",
			"location",
			"footer"
		],
		theme: theme({
			style: "garden",
			paper: "#F4EDE3",
			ink: "#2F3A28",
			muted: "#6B705C",
			accent: "#A87878",
			gold: "#B8956A",
			overlay: "rgba(47,58,40,0.22)"
		}),
		animations: ["leaf"],
		isVideo: false,
		demo: {
			title: "Kechki suhbat",
			host: "Sardor",
			greeting: "Sizni kechki bog'da, sham chiroqlar ostida suhbatga taklif etaman. Iltimos, shu kechani bizga bag'ishlang.",
			date: "2026-08-29",
			time: "20:00",
			venue: "Botanika bog'i terrasi",
			address: "Toshkent, Yunusobod",
			phone: "+998 90 123 45 67",
			music: "sokin-yurak",
			coverPhoto: "/images/templates/kechki-uchrashuv/cover.jpg"
		}
	},
	{
		id: "video-yoruglik",
		category: "video-tabrik",
		title: "Yorug'lik",
		tagline: "Kadrlar, musiqa va matn bilan jonli tabrik",
		price: PRICE,
		previewImage: "/images/templates/video-yoruglik/cover.jpg",
		background: "/images/templates/video-yoruglik/background.jpg",
		gallery: [
			"/images/templates/video-yoruglik/cover.jpg",
			"/images/templates/video-yoruglik/gallery-1.jpg",
			"/images/templates/video-yoruglik/gallery-2.jpg",
			"/images/hero/venue.jpg"
		],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: VIDEO_GREETING_FIELDS,
		sections: [
			"video-sequence",
			"message",
			"footer"
		],
		theme: theme({
			style: "video",
			paper: "#140C0E",
			ink: "#F7F1E8",
			muted: "#D4C4A8",
			accent: "#C99A9A",
			gold: "#B8956A",
			overlay: "rgba(8,4,6,0.4)"
		}),
		animations: ["kenburns", "caption"],
		isVideo: true,
		demo: {
			title: "Senga",
			subtitle: "Yurakdan",
			sender: "Sardor",
			recipient: "Madina",
			message: "Har bir kadr — sening tabassuming. Bu kichik film faqat senga.",
			slides: [
				"/images/templates/video-yoruglik/cover.jpg",
				"/images/templates/video-yoruglik/gallery-1.jpg",
				"/images/hero/venue.jpg",
				"/images/templates/video-yoruglik/gallery-2.jpg"
			],
			captions: "Birinchi nazar\nBirga o'tgan kunlar\nYulduzli kechalar\nVa yangi ertalab",
			music: "yulduzlar"
		}
	},
	{
		id: "video-nikoh",
		category: "video-taklif",
		title: "Nikoh kinosi",
		tagline: "To'y taklifnomasi — kino treyler uslubida",
		price: PRICE,
		previewImage: "/images/templates/video-nikoh/cover.jpg",
		background: "/images/templates/video-nikoh/background.jpg",
		gallery: [
			"/images/templates/video-nikoh/cover.jpg",
			"/images/templates/guldasta/gallery-1.jpg",
			"/images/hero/roses.jpg",
			"/images/hero/venue.jpg"
		],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: VIDEO_WEDDING_FIELDS,
		sections: [
			"video-sequence",
			"names",
			"datetime",
			"event",
			"footer"
		],
		theme: theme({
			style: "video",
			paper: "#160E10",
			ink: "#F7F1E8",
			muted: "#D4C4A8",
			accent: "#C99A9A",
			gold: "#B8956A",
			overlay: "rgba(10,6,8,0.42)"
		}),
		animations: ["kenburns", "title-reveal"],
		isVideo: true,
		demo: {
			...DEMO_WEDDING,
			slides: [
				"/images/templates/video-nikoh/cover.jpg",
				"/images/hero/roses.jpg",
				"/images/templates/guldasta/gallery-1.jpg",
				"/images/hero/venue.jpg"
			],
			captions: "Sardor va Madina\n22 Avgust, 2026\nNikoh to'yi\nSizni kutamiz",
			coverPhoto: "/images/templates/video-nikoh/cover.jpg"
		}
	},
	{
		id: "qutlug-yosh",
		category: "tugilgan-kun",
		title: "Qutlug' yosh",
		tagline: "Milliy naqsh bilan tug'ilgan kun taklifnomasi",
		price: PRICE,
		previewImage: "/images/templates/qutlug-yosh/cover.jpg",
		background: "/images/templates/qutlug-yosh/background.jpg",
		gallery: ["/images/templates/qutlug-yosh/gallery-1.jpg", "/images/templates/qutlug-yosh/gallery-2.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: BIRTHDAY_FIELDS,
		sections: [
			"cover",
			"names",
			"age",
			"message",
			"datetime",
			"event",
			"gallery",
			"rsvp",
			"footer"
		],
		theme: theme({
			style: "ornament",
			paper: "#2A1418",
			ink: "#F7F1E8",
			muted: "#D4C4A8",
			accent: "#B8956A",
			gold: "#D4C4A8",
			overlay: "rgba(20,8,10,0.4)"
		}),
		animations: ["star-in"],
		isVideo: false,
		demo: {
			honoree: "Madina",
			age: "25",
			host: "Oilasi",
			greeting: "Qadrli do'stlar, Madinaning 25 yoshini birga nishonlashga marhamat qiling. Kecha iliqlik va kulguga to'la bo'ladi.",
			date: "2026-10-03",
			time: "18:30",
			venue: "Private hall",
			address: "Toshkent, Chilonzor",
			phone: "+998 90 123 45 67",
			music: "guliston",
			rsvpEnabled: true,
			coverPhoto: "/images/templates/qutlug-yosh/cover.jpg",
			gallery: ["/images/templates/qutlug-yosh/gallery-1.jpg", "/images/templates/qutlug-yosh/gallery-2.jpg"]
		}
	},
	{
		id: "naqsh",
		category: "taklifnoma",
		title: "Naqsh",
		tagline: "O'zbek girih naqshlari asosidagi tantanali taklif",
		price: PRICE,
		previewImage: "/images/templates/naqsh/cover.jpg",
		background: "/images/templates/naqsh/background.jpg",
		gallery: ["/images/templates/naqsh/gallery-1.jpg", "/images/textures/ornament.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: [
			{
				key: "title",
				label: "Tantanani nomi",
				type: "text",
				required: true,
				placeholder: "Sunnat to'yi"
			},
			{
				key: "host",
				label: "Mezbon oila",
				type: "text",
				required: true
			},
			{
				key: "greeting",
				label: "Taklif matni",
				type: "textarea",
				required: true
			},
			{
				key: "date",
				label: "Sana",
				type: "date",
				required: true
			},
			{
				key: "time",
				label: "Vaqt",
				type: "time",
				required: true
			},
			{
				key: "venue",
				label: "Maskan",
				type: "text",
				required: true
			},
			{
				key: "address",
				label: "Manzil",
				type: "text"
			},
			{
				key: "mapUrl",
				label: "Xarita",
				type: "map"
			},
			{
				key: "phone",
				label: "Telefon",
				type: "phone"
			},
			{
				key: "coverPhoto",
				label: "Foto",
				type: "image"
			},
			{
				key: "music",
				label: "Musiqa",
				type: "music"
			},
			{
				key: "rsvpEnabled",
				label: "RSVP",
				type: "boolean"
			}
		],
		sections: [
			"cover",
			"names",
			"message",
			"datetime",
			"event",
			"location",
			"rsvp",
			"footer"
		],
		theme: theme({
			style: "ornament",
			paper: "#241014",
			ink: "#F7F1E8",
			muted: "#D4C4A8",
			accent: "#B8956A",
			gold: "#E0D0B0",
			overlay: "rgba(16,8,10,0.45)"
		}),
		animations: ["medallion"],
		isVideo: false,
		demo: {
			title: "Sunnat to'yi",
			host: "Karimovlar oilasi",
			greeting: "Qadrli qarindosh va do'stlar, farzandimizning sunnat to'yiga marhamat qilamiz. Yuzingiz kulsun, dasturxonimiz baraka topsin.",
			date: "2026-09-20",
			time: "17:00",
			venue: "To'yxona Navro'z",
			address: "Samarqand, Registon yo'li",
			phone: "+998 91 234 56 78",
			music: "ipak-tuni",
			rsvpEnabled: true,
			coverPhoto: "/images/templates/naqsh/cover.jpg"
		}
	},
	{
		id: "marvarid",
		category: "tabriknoma",
		title: "Marvarid",
		tagline: "Damask naqsh va marvarid yorug'likdagi tabrik",
		price: PRICE,
		previewImage: "/images/templates/marvarid/cover.jpg",
		background: "/images/templates/marvarid/background.jpg",
		gallery: ["/images/templates/marvarid/gallery-1.jpg", "/images/textures/damask.jpg"],
		fonts: {
			display: "Cormorant Garamond",
			body: "Outfit",
			script: "Great Vibes"
		},
		fields: GREETING_FIELDS,
		sections: [
			"cover",
			"names",
			"message",
			"photo",
			"footer"
		],
		theme: theme({
			style: "damask",
			paper: "#F3E6D8",
			ink: "#3A2A22",
			muted: "#8A7360",
			accent: "#B8956A",
			gold: "#C4A574",
			overlay: "rgba(58,42,34,0.18)"
		}),
		animations: ["foil"],
		isVideo: false,
		demo: {
			sender: "Madina",
			recipient: "Onajon",
			message: "Sizning mehribonligingiz — uyimizning marvaridi. Shu kichik tabrik bilan qalbimdagi minnatdorchilikni aytaman.",
			date: "2026-03-08",
			music: "sokin-yurak",
			coverPhoto: "/images/templates/marvarid/cover.jpg"
		}
	}
];
function getTemplate(id) {
	return TEMPLATES.find((t) => t.id === id);
}
function templatesByCategory(category) {
	return TEMPLATES.filter((t) => t.category === category);
}
function getCategory(slug) {
	return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
function invitationTitle(template, data) {
	if (typeof data.groom === "string" && typeof data.bride === "string") return `${data.groom} va ${data.bride}`;
	if (typeof data.honoree === "string") return data.honoree;
	if (typeof data.title === "string") return data.title;
	if (typeof data.recipient === "string") return data.recipient;
	return template.title;
}
//#endregion
export { ensureDbReady as a, getSql as c, templatesByCategory as d, authMiddleware as i, getTemplate as l, PRICE as n, getCategory as o, TEMPLATES as r, getPglite as s, CATEGORIES as t, invitationTitle as u };
