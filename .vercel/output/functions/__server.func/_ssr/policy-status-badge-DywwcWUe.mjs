import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn } from "./button-BpE9Czok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policy-status-badge-DywwcWUe.js
var import_jsx_runtime = require_jsx_runtime();
var map = {
	active: {
		label: "Active",
		cls: "bg-success/15 text-success border-success/30"
	},
	grace_period: {
		label: "Grace period",
		cls: "bg-warning/15 text-warning border-warning/30"
	},
	lapsed_revivable: {
		label: "Lapsed · Revivable",
		cls: "bg-destructive/10 text-destructive border-destructive/30"
	},
	lapsed_surrender_only: {
		label: "Lapsed",
		cls: "bg-destructive/15 text-destructive border-destructive/30"
	},
	surrendered: {
		label: "Surrendered",
		cls: "bg-muted text-muted-foreground border-border"
	},
	matured: {
		label: "Matured",
		cls: "bg-info/15 text-info border-info/30"
	},
	claimed: {
		label: "Claimed",
		cls: "bg-muted text-muted-foreground border-border"
	},
	draft: {
		label: "Draft",
		cls: "bg-muted text-muted-foreground border-border"
	},
	pending: {
		label: "Pending",
		cls: "bg-muted text-muted-foreground border-border"
	}
};
function PolicyStatusBadge({ status, className }) {
	const m = map[status] ?? {
		label: status,
		cls: "bg-muted text-muted-foreground border-border"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium", m.cls, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), m.label]
	});
}
//#endregion
export { PolicyStatusBadge as t };
