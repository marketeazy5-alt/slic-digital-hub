import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as Download, H as Info, J as FileText, Ot as ArrowLeft, p as Sparkles, r as Wallet } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-DrB0jrAs.mjs";
import { a as relativeTime, r as formatPKR, t as compactPKR } from "./format-9Uks8Fou.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
import { t as PolicyStatusBadge } from "./policy-status-badge-DywwcWUe.mjs";
import { s as getPolicyDetail } from "./customer-queries.functions-cCJAxELZ.mjs";
import { t as Route } from "./policies._policyId-BcWaPgtZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies._policyId-B9Y87rSv.js
var import_jsx_runtime = require_jsx_runtime();
function PolicyDetail() {
	const { policyId } = Route.useParams();
	const fetch = useServerFn(getPolicyDetail);
	const { data, isLoading } = useQuery({
		queryKey: ["policy", policyId],
		queryFn: () => fetch({ data: { policyId } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: data ? data.policy.products?.name : "Policy",
		subtitle: data?.policy.policy_number,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "btn-magnetic",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 mr-1.5" }), " Download PDF"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/policies",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5 mr-1.5" }), " Back"]
				})
			})]
		}),
		children: isLoading || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 shimmer-bg rounded-lg" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `surface-elevated p-6 md:p-8 ${Number(data.policy.sum_assured) >= 1e7 ? "premium-glow" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-between items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyStatusBadge, { status: data.policy.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										data.policy.branches?.name,
										", ",
										data.policy.branches?.city
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-4xl font-bold font-display tabular-nums",
								children: compactPKR(Number(data.policy.sum_assured))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground mt-1",
								children: [
									"Sum assured · commenced ",
									new Date(data.policy.commencement_date).toLocaleDateString(),
									" · matures ",
									new Date(data.policy.maturity_date).toLocaleDateString()
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4 mr-1.5" }), " Pay premium"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Monthly premium",
								value: formatPKR(Number(data.policy.premium_amount))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Total paid",
								value: compactPKR(Number(data.policy.total_premiums_paid))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Bonus accumulated",
								value: compactPKR(Number(data.policy.bonus_accumulated))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Cash value",
								value: compactPKR(Number(data.policy.cash_value))
							})
						]
					}),
					data.lapse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-6 p-4 rounded-md border ${data.lapse.probability > .5 ? "border-warning/40 bg-warning/5" : "border-info/30 bg-info/5"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 mt-0.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-medium",
								children: [
									"Lapse risk: ",
									Math.round(data.lapse.probability * 100),
									"%"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									"Recommended intervention: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium capitalize",
										children: data.lapse.recommended_intervention.replace(/_/g, " ")
									}),
									". Based on payment regularity, current state, and premium/income ratio."
								]
							})] })]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "summary",
							children: "Timeline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "premiums",
							children: "Premiums"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "claims",
							children: "Claims"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "nominees",
							children: "Nominees"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "projection",
							children: "Projection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "documents",
							children: "Documents"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "summary",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold font-display mb-4",
								children: "State transitions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [data.events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-full bg-primary" }), i < data.events.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px flex-1 bg-border mt-1" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm",
											children: [e.from_state ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: e.from_state.replace(/_/g, " ")
											}), " → "] }) : "", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: e.to_state.replace(/_/g, " ")
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												"Trigger: ",
												e.trigger.replace(/_/g, " "),
												" · ",
												relativeTime(e.created_at)
											]
										})]
									})]
								}, e.id)), data.events.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: "No state changes yet."
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "premiums",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 border-b border-border bg-muted/20 flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [data.premiums.length, " premium records"]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "text-xs uppercase tracking-wider text-muted-foreground bg-muted/40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3",
											children: "Due date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3",
											children: "Method"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3",
											children: "Receipt"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: data.premiums.slice(0, 24).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: new Date(p.due_date).toLocaleDateString()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 tabular-nums",
												children: formatPKR(Number(p.amount))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-xs px-2 py-0.5 rounded-full ${p.status === "paid" ? "bg-success/15 text-success" : p.status === "overdue" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`,
													children: p.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 capitalize text-muted-foreground",
												children: p.payment_method?.replace(/_/g, " ") ?? "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 font-mono text-xs text-muted-foreground",
												children: p.receipt_number ?? "—"
											})
										]
									}, p.id))
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "claims",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold font-display mb-4",
								children: "Claims on this policy"
							}), data.claims.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg",
								children: "No claims filed on this policy."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: data.claims.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-lg border border-border flex justify-between items-center hover:bg-muted/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-xs text-muted-foreground",
											children: c.claim_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium capitalize mt-0.5",
											children: c.claim_type.replace(/_/g, " ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: ["Filed ", relativeTime(c.filed_at)]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs px-2 py-0.5 rounded-full bg-info/15 text-info capitalize",
											children: c.status.replace(/_/g, " ")
										}), c.fraud_ring_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/trust-safety",
												className: "text-xs text-warning underline",
												children: "Trust & Safety analysis"
											})
										})]
									})]
								}, c.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "nominees",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold font-display mb-4",
								children: "Nominees"
							}), data.nominees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg",
								children: "No nominees added yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: data.nominees.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-lg border border-border flex justify-between items-center hover:bg-muted/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: n.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											n.relationship,
											" · CNIC ",
											n.cnic
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm font-semibold font-display tabular-nums",
											children: [n.share_percentage, "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "share"
										})]
									})]
								}, n.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "projection",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold font-display mb-2",
									children: "Premium projection"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-6",
									children: "Estimated cash value growth over the remaining term assuming continued premium payments and a 4.5% reversionary bonus rate."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-64 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2",
									children: [
										15,
										22,
										30,
										40,
										52,
										66,
										82,
										100
									].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 bg-gradient-to-t from-primary/70 to-primary/40 rounded-t-sm group relative transition-all duration-300 hover:opacity-80 cursor-pointer",
										style: { height: `${h}%` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap",
											children: [
												"Year ",
												i + 1,
												": ~₨",
												(h * .8).toFixed(1),
												"M"
											]
										})
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-muted-foreground mt-2 px-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year 1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year 4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year 8" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year 12" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maturity" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-4",
									children: [
										{
											label: "Current cash value",
											value: compactPKR(Number(data.policy.cash_value))
										},
										{
											label: "Projected maturity",
											value: compactPKR(Number(data.policy.sum_assured) + Number(data.policy.bonus_accumulated))
										},
										{
											label: "Bonus rate",
											value: "4.5% p.a."
										},
										{
											label: "Total premiums remaining",
											value: formatPKR(Math.round(Number(data.policy.premium_amount) * 12 * 5))
										}
									].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/20 rounded-lg p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: m.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold font-display mt-1",
											children: m.value
										})]
									}, m.label))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "documents",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold font-display mb-2",
									children: "Documents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-6",
									children: "Downloadable documents related to this policy."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: [
										{
											name: "Policy Schedule",
											desc: "Original policy document with terms and conditions",
											date: "12 Jan 2024",
											size: "2.4 MB"
										},
										{
											name: "Annual Bonus Statement",
											desc: "Reversionary bonus declaration for FY 2025-26",
											date: "15 Mar 2026",
											size: "0.8 MB"
										},
										{
											name: "Premium Payment History",
											desc: "Complete payment record from commencement",
											date: "Current",
											size: "1.2 MB"
										},
										{
											name: "Tax Certificate (Sec 62)",
											desc: "Tax deduction certificate for FY 2025-26",
											date: "30 Jun 2026",
											size: "0.5 MB"
										},
										{
											name: "Surrender Value Statement",
											desc: "Current surrender value as per policy terms",
											date: "Current",
											size: "0.3 MB"
										}
									].map((doc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium text-sm",
													children: doc.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-muted-foreground",
													children: [
														doc.desc,
														" · ",
														doc.size
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: doc.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												className: "opacity-0 group-hover:opacity-100 transition-opacity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
											})
										]
									}, i))
								})
							]
						})
					})
				]
			})]
		})
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-muted/20 rounded-lg p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold font-display tabular-nums mt-1",
			children: value
		})]
	});
}
//#endregion
export { PolicyDetail as component };
