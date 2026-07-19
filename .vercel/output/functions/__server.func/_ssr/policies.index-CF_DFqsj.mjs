import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { y as Search } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-DrB0jrAs.mjs";
import { r as formatPKR, t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as PolicyStatusBadge } from "./policy-status-badge-DywwcWUe.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { i as getDashboard } from "./customer-queries.functions-cCJAxELZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies.index-CF_DFqsj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PoliciesList() {
	const fetchDash = useServerFn(getDashboard);
	const { data } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => fetchDash({})
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const policies = data?.policies ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		return policies.filter((p) => {
			if (status !== "all" && p.status !== status) return false;
			if (q && !JSON.stringify(p).toLowerCase().includes(q.toLowerCase())) return false;
			return true;
		});
	}, [
		policies,
		q,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Policy Center",
		subtitle: `${policies.length} polic${policies.length === 1 ? "y" : "ies"} on file`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mb-6 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 min-w-[220px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search policies…",
					value: q,
					onChange: (e) => setQ(e.target.value),
					className: "pl-9"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 p-1 rounded-md border border-border bg-card",
				children: [
					"all",
					"active",
					"grace_period",
					"lapsed_revivable"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setStatus(s),
					className: `px-3 py-1.5 rounded text-xs font-medium capitalize ${status === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: s === "all" ? "All" : s.replace(/_/g, " ")
				}, s))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/policies/$policyId",
				params: { policyId: p.id },
				className: "surface-elevated p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-mono text-muted-foreground",
						children: p.policy_number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-semibold font-display text-lg",
						children: p.products?.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyStatusBadge, { status: p.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Sum assured"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold font-display mt-0.5",
							children: compactPKR(Number(p.sum_assured))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Monthly premium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold font-display mt-0.5 tabular-nums",
							children: formatPKR(Number(p.premium_amount))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Cash value"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium tabular-nums mt-0.5",
							children: compactPKR(Number(p.cash_value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Matures"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium mt-0.5",
							children: new Date(p.maturity_date).getFullYear()
						})] })
					]
				})]
			}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full surface-elevated p-10 text-center text-sm text-muted-foreground",
				children: "No policies match your filters."
			})]
		})]
	});
}
//#endregion
export { PoliciesList as component };
