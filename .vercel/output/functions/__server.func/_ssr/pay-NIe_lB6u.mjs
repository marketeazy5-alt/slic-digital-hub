import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { dt as Check, n as X, t as Zap, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { r as formatPKR } from "./format-9Uks8Fou.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PolicyStatusBadge } from "./policy-status-badge-DywwcWUe.mjs";
import { c as getSagaTrace, i as getDashboard } from "./customer-queries.functions-B5cT18LS.mjs";
import { r as payPremiumSaga } from "./intelligence.functions-Bu_xEd0P.mjs";
import { t as Checkbox } from "./checkbox-nEie9MAD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pay-NIe_lB6u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var METHODS = [
	{
		code: "jazzcash",
		label: "JazzCash",
		tag: "Mobile wallet"
	},
	{
		code: "easypaisa",
		label: "EasyPaisa",
		tag: "Mobile wallet"
	},
	{
		code: "raast",
		label: "Raast",
		tag: "Instant bank"
	},
	{
		code: "card",
		label: "Debit / Credit card",
		tag: "1LINK"
	},
	{
		code: "bank_transfer",
		label: "1LINK transfer",
		tag: "Bank"
	},
	{
		code: "auto_debit",
		label: "Auto-debit",
		tag: "Recurring"
	},
	{
		code: "branch_voucher",
		label: "Branch voucher",
		tag: "Cash"
	}
];
function PayPage() {
	const fetchDash = useServerFn(getDashboard);
	const pay = useServerFn(payPremiumSaga);
	const fetchTrace = useServerFn(getSagaTrace);
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => fetchDash({})
	});
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [method, setMethod] = (0, import_react.useState)("jazzcash");
	const [simulateFail, setSimulateFail] = (0, import_react.useState)(false);
	const [sagaId, setSagaId] = (0, import_react.useState)(null);
	const policies = data?.policies ?? [];
	const eligible = policies.filter((p) => [
		"active",
		"grace_period",
		"lapsed_revivable"
	].includes(p.status));
	const total = policies.filter((p) => selected.includes(p.id)).reduce((s, p) => s + Number(p.premium_amount), 0);
	const runPay = useMutation({
		mutationFn: () => pay({ data: {
			policyIds: selected,
			method,
			simulateFailAt: simulateFail ? "debit_gateway" : null
		} }),
		onSuccess: (r) => {
			setSagaId(r.sagaId);
			toast.success("Payment processed", { description: `Receipt(s): ${r.receipts.join(", ")}` });
			qc.invalidateQueries();
		},
		onError: (e) => {
			toast.error("Payment failed", { description: e.message });
			qc.invalidateQueries();
		}
	});
	const trace = useQuery({
		queryKey: ["saga", sagaId],
		queryFn: () => fetchTrace({ data: { sagaId } }),
		enabled: !!sagaId,
		refetchInterval: (q) => q.state.data?.events.some((e) => e.status === "pending") ? 1e3 : false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Pay Premium",
		subtitle: "Simulated Saga — every step is written to the transaction log below.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-elevated p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold font-display mb-4",
						children: "1 · Select policies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [eligible.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 p-3 rounded border border-border hover:bg-accent/40 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: selected.includes(p.id),
									onCheckedChange: (v) => setSelected(v ? [...selected, p.id] : selected.filter((x) => x !== p.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: p.policy_number
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyStatusBadge, { status: p.status })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium truncate",
										children: p.products?.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold font-display tabular-nums",
										children: formatPKR(Number(p.premium_amount))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "/month"
									})]
								})
							]
						}, p.id)), eligible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground text-center p-6",
							children: "All caught up — no premiums due right now."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display mb-4",
							children: "2 · Payment method"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 md:grid-cols-3 gap-2",
							children: METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMethod(m.code),
								className: `p-3 rounded border text-left ${method === m.code ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: m.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: m.tag
								})]
							}, m.code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 mt-4 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: simulateFail,
								onCheckedChange: (v) => setSimulateFail(!!v)
							}), "Simulate a gateway failure (to see the Saga compensation path)"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6 sticky top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold font-display mb-3",
							children: "Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Policies",
									value: String(selected.length)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Method",
									value: METHODS.find((m) => m.code === method)?.label ?? method
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3 mt-3 flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-bold font-display tabular-nums",
										children: formatPKR(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full mt-4",
							disabled: selected.length === 0 || runPay.isPending,
							onClick: () => runPay.mutate(),
							children: [
								runPay.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
								"Pay ",
								formatPKR(total)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-3 text-center",
							children: "Simulated payment · no real money moves"
						})
					]
				}), sagaId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-1 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-primary" }), " Transaction trace"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mb-3 font-mono",
							children: sagaId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: (trace.data?.events ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${e.status === "success" ? "bg-success/20 text-success" : e.status === "failed" ? "bg-destructive/20 text-destructive" : e.status === "compensated" ? "bg-warning/20 text-warning" : "bg-muted"}`,
									children: e.status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : e.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: e.step.replace(/_/g, " ")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: [
											e.duration_ms,
											"ms · ",
											e.status
										]
									})]
								})]
							}, e.id))
						})
					]
				})]
			})]
		})
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { PayPage as component };
