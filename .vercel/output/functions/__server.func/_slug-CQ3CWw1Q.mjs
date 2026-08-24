import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { y as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$5 } from "./_ssr/router-BgGKuGxY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CQ3CWw1Q.js
var import_jsx_runtime = require_jsx_runtime();
function Alias() {
	const { slug } = Route$5.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/invitation/$id",
		params: { id: slug }
	});
}
//#endregion
export { Alias as component };
