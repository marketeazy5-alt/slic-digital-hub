import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn } from "./button-BpE9Czok.mjs";
import { r as formatPKR, t as compactPKR } from "./format-9Uks8Fou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-card-BhV2iEEs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, format = "number", hint, icon, accent, compact }) {
	const numeric = typeof value === "number";
	const [displayed, setDisplayed] = (0, import_react.useState)(numeric ? 0 : value);
	(0, import_react.useEffect)(() => {
		if (!numeric) {
			setDisplayed(value);
			return;
		}
		const target = value;
		let raf = 0;
		const start = performance.now();
		const duration = 700;
		const from = 0;
		const step = (t) => {
			const p = Math.min(1, (t - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setDisplayed(Math.round(from + (target - from) * eased));
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [value, numeric]);
	const rendered = numeric ? format === "pkr" ? compact ? compactPKR(displayed) : formatPKR(displayed) : displayed.toLocaleString() : displayed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("surface-elevated p-5 md:p-6 relative overflow-hidden group transition-all duration-300 card-spotlight", accent === "gold" && "premium-glow"),
		children: [accent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-x-0 top-0 h-0.5", accent === "primary" && "bg-primary", accent === "gold" && "gradient-gold-bg", accent === "info" && "bg-info", accent === "warning" && "bg-warning") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground font-medium",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-2xl md:text-3xl font-semibold font-display tabular-nums tracking-tight",
						children: rendered
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: hint
					})
				]
			}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-9 w-9 rounded-md bg-accent/60 text-accent-foreground flex items-center justify-center flex-shrink-0",
				children: icon
			})]
		})]
	});
}
//#endregion
export { StatCard as t };
