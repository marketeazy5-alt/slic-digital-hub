import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { J as FileText, it as CircleCheck, nt as Clock, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { a as relativeTime, t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
import { r as getClaims } from "./customer-queries.functions-B5cT18LS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/claims-CJ2qQQxy.js
var import_jsx_runtime = require_jsx_runtime();
var PIPELINE = [
	"submitted",
	"under_review",
	"verification",
	"underwriting",
	"approval",
	"payment",
	"disbursed"
];
function ClaimsPage() {
	const fetch = useServerFn(getClaims);
	const { data } = useQuery({
		queryKey: ["claims"],
		queryFn: () => fetch({})
	});
	const claims = data?.claims ?? [];
	const activeClaims = claims.filter((c) => c.status !== "disbursed" && c.status !== "rejected");
	const disbursed = claims.filter((c) => c.status === "disbursed").length;
	const flagged = claims.filter((c) => c.fraud_ring_id).length;
	activeClaims.length && Math.round(activeClaims.reduce((s, c) => s + PIPELINE.indexOf(c.status), 0) / activeClaims.length) + 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Claims Hub",
		subtitle: "Track every claim across our 7-stage pipeline.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "btn-magnetic",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 mr-1.5" }), " File new claim"]
		}),
		children: [claims.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total claims",
					value: claims.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "In progress",
					value: activeClaims.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
					accent: "info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Disbursed",
					value: disbursed,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
					accent: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Fraud flagged",
					value: flagged,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					accent: flagged > 0 ? "warning" : void 0
				})
			]
		}), claims.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-state",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-12 w-12 text-muted-foreground mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold font-display text-lg mb-1",
					children: "No claims yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground max-w-sm",
					children: "When you file a claim, it'll appear here with a full 7-stage pipeline visualization."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 btn-magnetic",
					children: "File your first claim"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: claims.map((c) => {
				const currentIdx = PIPELINE.indexOf(c.status);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `surface-elevated p-6 ${c.fraud_ring_id ? "border-warning/40" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-between items-start gap-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono text-muted-foreground",
									children: c.claim_number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold font-display text-lg capitalize mt-0.5",
									children: c.claim_type.replace(/_/g, " ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Policy ", c.policies?.policy_number] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", c.policies?.products?.name] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· Filed ", relativeTime(c.filed_at)] })
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [c.fraud_ring_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/trust-safety",
									className: "flex items-center gap-1.5 text-xs bg-warning/10 border border-warning/30 text-warning px-3 py-2 rounded-md hover:bg-warning/15 btn-magnetic",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Flagged" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									children: "View details"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center",
							children: PIPELINE.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center flex-1 last:flex-initial",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i < currentIdx ? "bg-success text-success-foreground" : i === currentIdx ? "bg-primary text-primary-foreground animate-[pulse-ring_2s_infinite]" : "bg-muted text-muted-foreground"}`,
										children: i < currentIdx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-[10px] mt-1.5 text-center capitalize max-w-[60px] leading-tight ${i === currentIdx ? "font-semibold text-foreground" : "text-muted-foreground"}`,
										children: s.replace(/_/g, " ")
									})]
								}), i < PIPELINE.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-0.5 flex-1 mx-1 -mt-4 ${i < currentIdx ? "bg-success" : "bg-muted"}` })]
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 pt-4 border-t border-border grid md:grid-cols-3 gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Claim amount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold mt-0.5",
									children: compactPKR(Number(c.claim_amount || 0))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Assigned agent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium mt-0.5",
									children: c.assigned_to || "Auto-assigned"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Fraud score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium mt-0.5",
									children: c.fraud_score ? `${Math.round(Number(c.fraud_score) * 100)}%` : "—"
								})] })
							]
						})
					]
				}, c.id);
			})
		})]
	});
}
//#endregion
export { ClaimsPage as component };
