import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as Vector2, n as useFrame, r as useThree, s as require_jsx_runtime, t as Canvas } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/silk-curtain-canvas-DQgsK3PN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var vertex = `
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vFold;

void main() {
  vUv = uv;
  vec3 p = position;
  float wind = uScroll * 1.8 + uTime * 0.22;
  float fold = sin(p.x * 2.15 + wind) * 0.09;
  fold += sin(p.y * 3.4 - uTime * 0.18) * 0.035;
  fold += sin((p.x + p.y) * 1.7 + uTime * 0.12) * 0.04;
  fold += sin(p.x * 6.0 + uMouse.x * 1.4) * 0.012;
  p.z += fold;
  p.x += sin(p.y * 1.6 + wind * 0.6) * 0.03;
  vFold = fold;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;
var fragment = `
uniform float uTime;
varying vec2 vUv;
varying float vFold;

void main() {
  vec3 ivory = vec3(0.97, 0.945, 0.91);
  vec3 blush = vec3(0.91, 0.77, 0.77);
  vec3 rose = vec3(0.79, 0.60, 0.60);
  vec3 gold = vec3(0.72, 0.58, 0.42);
  float folds = abs(sin(vUv.x * 11.5 + sin(vUv.y * 2.8 + uTime * 0.08)));
  vec3 col = mix(ivory, blush, smoothstep(0.15, 0.85, vUv.x));
  col = mix(col, rose, folds * 0.38);
  float hi = pow(folds, 10.0);
  col += vec3(1.0, 0.96, 0.9) * hi * 0.28;
  col += gold * max(vFold, 0.0) * 0.35;
  float vig = smoothstep(1.05, 0.28, length(vUv - vec2(0.5, 0.42)) * 1.35);
  col *= 0.72 + vig * 0.28;
  gl_FragColor = vec4(col, 0.94);
}
`;
function Cloth() {
	const mesh = (0, import_react.useRef)(null);
	const { viewport } = useThree();
	const mouse = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const scroll = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			mouse.current.x = e.clientX / window.innerWidth * 2 - 1;
			mouse.current.y = e.clientY / window.innerHeight * 2 - 1;
		};
		const onScroll = () => {
			scroll.current = window.scrollY / Math.max(1, window.innerHeight);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	useFrame(({ clock }) => {
		const mat = mesh.current?.material;
		if (!mat) return;
		mat.uniforms.uTime.value = clock.getElapsedTime();
		mat.uniforms.uScroll.value += (scroll.current - mat.uniforms.uScroll.value) * .06;
		mat.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
	});
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uMouse: { value: new Vector2() }
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: mesh,
		scale: [
			viewport.width * 1.15,
			viewport.height * 1.2,
			1
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			1,
			1,
			72,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms,
			transparent: true,
			depthWrite: false
		})]
	});
}
function SilkCurtainCanvas({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			dpr: [1, 1.5],
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			camera: {
				position: [
					0,
					0,
					1.15
				],
				fov: 50
			},
			style: {
				width: "100%",
				height: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloth, {})
		})
	});
}
//#endregion
export { SilkCurtainCanvas };
