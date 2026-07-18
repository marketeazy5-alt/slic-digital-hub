import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-Cvuke6KH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeCtx = (0, import_react.createContext)(null);
function readInitial(key, fallback) {
	if (typeof window === "undefined") return fallback;
	return window.localStorage.getItem(key) ?? fallback;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("light");
	const [density, setDensityState] = (0, import_react.useState)("comfortable");
	const [resolved, setResolved] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		setThemeState(readInitial("slic-theme", "light") ?? "light");
		setDensityState(readInitial("slic-density", "comfortable") ?? "comfortable");
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const compute = () => theme === "system" ? media.matches ? "dark" : "light" : theme;
		const apply = () => {
			const r = compute();
			setResolved(r);
			root.classList.toggle("dark", r === "dark");
		};
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("density-compact", density === "compact");
	}, [density]);
	const setTheme = (t) => {
		localStorage.setItem("slic-theme", t);
		setThemeState(t);
	};
	const setDensity = (d) => {
		localStorage.setItem("slic-density", d);
		setDensityState(d);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			resolvedTheme: resolved,
			setTheme,
			density,
			setDensity
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeCtx);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
