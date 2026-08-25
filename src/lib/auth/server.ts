/**
 * Self-hosted Better Auth for THIS app (server-only).
 *
 * The app runs its own Better Auth at `/api/auth/*`, so the session cookie
 * stays on this app's own origin. Google sign-in is handled directly by
 * Better Auth's native `socialProviders.google` using this app's own
 * `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — there is no third-party
 * auth broker involved.
 *
 * Modes:
 *   - Deployed (e.g. Vercel): the deployer injects `GOOGLE_CLIENT_ID`,
 *     `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, and
 *     `DATABASE_URL`, so real Google sign-in is persisted in Postgres.
 *   - Local dev with no `DATABASE_URL`: falls back to the embedded PGLite DB
 *     (same DB as app data) with a process-stable signing secret.
 *   - Explicitly off (`VITE_AUTH_ENABLED=false`): no providers; per-user
 *     server functions fall back to a dev user (see `verify.server.ts`).
 *
 * NEVER import this from client code — it pulls in `pg` + server-only Better
 * Auth internals. The client uses `@/lib/auth/client`; components read the
 * user via `@/lib/auth/use-current-user`; server functions get a verified id
 * via `@/lib/auth/middleware`.
 */
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { getCookie } from "@tanstack/react-start/server";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";
import { ensureDbReady, getPglite } from "../db";
import { emailAndPasswordEnabled } from "./email-password";
import { AUTH_PROVIDERS } from "./providers";
import { pgliteDialect } from "./pglite-dialect";

// Kick (and share) PGLite bootstrap as soon as the auth server module loads.
void ensureDbReady();

/**
 * Dev secret must outlive module reloads: PGLite (and its session rows) is
 * stored on `globalThis`, so an HMR re-eval of this file must NOT mint a new
 * signing secret or every existing session becomes invalid mid-dev. Process
 * restart clears both the secret and PGLite together.
 */
const globalAuthRef = globalThis as typeof globalThis & {
  __appAuthDevSecret__?: string;
};
function devAuthSecret(): string {
  globalAuthRef.__appAuthDevSecret__ ??= randomBytes(32).toString("hex");
  return globalAuthRef.__appAuthDevSecret__;
}

/** Read an env var, treating empty/whitespace as unset. */
const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

// Explicit off-switch. Set VITE_AUTH_ENABLED=false to force auth off
// everywhere (dev user).
const authDisabled = env("VITE_AUTH_ENABLED") === "false";

export const SESSION_TOKEN_COOKIE = "__Host-app-auth.session_token";

// Direct Google OAuth credentials. These are server-only.
const googleClientId = env("GOOGLE_CLIENT_ID");
const googleClientSecret = env("GOOGLE_CLIENT_SECRET");

export const authConfigured =
  !authDisabled && Boolean(googleClientId && googleClientSecret);

// This app's own Better Auth origin. When deployed, the deployer injects the
// public URL via BETTER_AUTH_URL. Locally we fall back to the dev origin.
const explicitBaseURL = env("BETTER_AUTH_URL");
// Local `npm run dev` (port 8080 contract). Browsers may send Origin as any of
// these for the same server — trusting only `localhost` rejects `127.0.0.1` and
// breaks email/password with "Invalid origin".
const LOCAL_DEV_ORIGINS: string[] = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://[::1]:8080",
];
const baseURL =
  explicitBaseURL ??
  {
    // Explicit `string[]` (not a readonly tuple) — Better Auth's
    // DynamicBaseURLConfig requires a mutable `allowedHosts: string[]`.
    allowedHosts: ["localhost", "127.0.0.1", "[::1]"] as string[],
    // `auto` → trust both http:// and https:// expansions of allowedHosts.
    protocol: "auto" as const,
    fallback: "http://localhost:8080",
  };

// Origins Better Auth accepts on credentialed POSTs (sign-up/sign-in, etc.).
// Missing entries here surface as FORBIDDEN "Invalid origin".
const trustedOrigins: string[] = explicitBaseURL
  ? [explicitBaseURL, ...LOCAL_DEV_ORIGINS]
  : [...LOCAL_DEV_ORIGINS];

const databaseUrl = env("DATABASE_URL");

// Use Neon/Postgres in production when DATABASE_URL is available; otherwise
// use the same embedded PGLite database used by the app in local dev.
const authDatabase = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

// Direct Google OAuth. No third-party auth broker is involved.
const googleProvider =
  authConfigured && googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
          scope: ["openid", "profile", "email"],
        },
      }
    : undefined;

export const auth = betterAuth({
  baseURL,
  ...(googleProvider ? { socialProviders: googleProvider } : {}),

  // Deployed apps inject BETTER_AUTH_SECRET. Dev: process-stable secret on
  // globalThis so HMR doesn't invalidate PGLite-backed sessions (see above).
  secret: env("BETTER_AUTH_SECRET") ?? devAuthSecret(),
  database: authDatabase,

  // CSRF / origin check for credentialed auth POSTs (email sign-up/sign-in, …).
  trustedOrigins,

  account: {
    encryptOAuthTokens: true,
    accountLinking: {
      enabled: true,
      trustedProviders: AUTH_PROVIDERS.map((p) => p.providerId),
    },
  },

  // Cache the session in the short-lived signed `session_data` cookie so reads
  // (incl. the client's `/get-session`) skip the DB — this shrinks the "loading"
  // window and reduces auth flicker.
  session: { cookieCache: { enabled: true, maxAge: 300 } },

  // Local email/password — toggled only via `./email-password` (not a plugin).
  ...(emailAndPasswordEnabled ? { emailAndPassword: { enabled: true } } : {}),

  // `__Host-` prefixed cookies require Secure + Path=/ + no Domain; Better
  // Auth otherwise uses `__Secure-` (which permits Domain), so we drop its
  // auto prefix (`useSecureCookies: false`) and set Secure + the names
  // ourselves. (Browsers allow Secure cookies on `http://localhost`, so local
  // dev still works.)
  advanced: {
    useSecureCookies: false,
    defaultCookieAttributes: { secure: true, sameSite: "lax", path: "/" },
    cookies: {
      session_token: { name: SESSION_TOKEN_COOKIE },
      session_data: { name: "__Host-app-auth.session_data" },
      account_data: { name: "__Host-app-auth.account_data" },
      dont_remember: { name: "__Host-app-auth.dont_remember" },
    },
  },

  plugins: [
    // Bridges Better Auth's Set-Cookie into TanStack Start responses. MUST be
    // last so it runs after every other plugin's hooks.
    tanstackStartCookies(),
  ],
});

export function readSessionToken(): string | null {
  return getCookie(SESSION_TOKEN_COOKIE) ?? null;
}

// Re-exported for convenience; the array lives in the dependency-free
// `providers.ts` so the client can import it too.
export { AUTH_PROVIDERS } from "./providers";
