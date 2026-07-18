import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { $ as Download, X as FileCheck, _ as ShieldAlert, c as TrendingUp, kt as Activity, mt as ChartNoAxesColumnIncreasing, pt as ChartPie, r as Wallet } from "../_libs/lucide-react.mjs";
import { a as getAnalytics, c as useServerFn, o as getMyRoles, s as grantDemoRole, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as DataTable } from "./data-table-C2yFcY9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-CojviLKg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPortal() {
	const fetchRoles = useServerFn(getMyRoles);
	const fetchA = useServerFn(getAnalytics);
	const grant = useServerFn(grantDemoRole);
	const rolesQ = useQuery({
		queryKey: ["my-roles"],
		queryFn: () => fetchRoles({})
	});
	const q = useQuery({
		queryKey: ["analytics"],
		queryFn: () => fetchA({}),
		enabled: (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent"),
		retry: false
	});
	const grantMut = useMutation({
		mutationFn: () => grant({ data: { role: "admin" } }),
		onSuccess: () => {
			toast.success("Admin role granted");
			rolesQ.refetch();
		}
	});
	const hasRole = (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent");
	const [period, setPeriod] = (0, import_react.useState)("12m");
	if (!hasRole) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Analytics Platform",
		subtitle: "Portfolio intelligence",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-elevated p-10 text-center max-w-lg mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto h-10 w-10 text-primary mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold font-display",
					children: "Access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2 mb-4",
					children: "Analytics is available to agents and admins."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => grantMut.mutate(),
					disabled: grantMut.isPending,
					children: "Grant demo admin role"
				})
			]
		})
	});
	const d = q.data;
	const maxMonthly = Math.max(1, ...(d?.monthly ?? []).map((m) => m.amount));
	const totalStatus = Object.values(d?.statusBreakdown ?? {}).reduce((s, n) => s + Number(n), 0) || 1;
	const statusColors = {
		active: "bg-success",
		grace_period: "bg-warning",
		lapsed_revivable: "bg-destructive/70",
		lapsed_surrender_only: "bg-destructive",
		matured: "bg-primary",
		surrendered: "bg-muted-foreground"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Analytics Platform",
		subtitle: "Portfolio, collections, and risk intelligence",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 bg-muted rounded-lg p-1",
				children: [
					"6m",
					"12m",
					"all"
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPeriod(p),
					className: `px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${period === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: p === "6m" ? "6 Months" : p === "12m" ? "12 Months" : "All Time"
				}, p))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Export"]
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total AUM",
						value: d?.kpis.totalAUM ?? 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
						format: "pkr",
						compact: true,
						accent: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Premium collected",
						value: d?.kpis.collectedPremium ?? 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
						format: "pkr",
						compact: true,
						accent: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Overdue premium",
						value: d?.kpis.overduePremium ?? 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" }),
						format: "pkr",
						compact: true,
						accent: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Claims disbursed",
						value: d?.kpis.claimsPaid ?? 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "h-4 w-4" }),
						format: "pkr",
						compact: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold font-display flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, { className: "h-4 w-4 text-primary" }), " Monthly premium collection"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: period === "6m" ? "Last 6 months" : period === "12m" ? "Last 12 months" : "All time"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end gap-2 h-48",
							children: (d?.monthly ?? []).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col items-center gap-2 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full rounded-t bg-primary/80 hover:bg-primary transition-colors cursor-pointer",
										style: {
											height: `${m.amount / maxMonthly * 100}%`,
											minHeight: "6px"
										},
										title: compactPKR(m.amount)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10",
										children: compactPKR(m.amount)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[8px] text-muted-foreground rotate-45 origin-left whitespace-nowrap",
									children: m.month
								})]
							}, m.month))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Total collected:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold ml-2",
								children: compactPKR(d?.kpis.collectedPremium ?? 0)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Monthly avg:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold ml-2",
								children: compactPKR(Math.round((d?.kpis.collectedPremium ?? 0) / Math.max(1, (d?.monthly ?? []).length)))
							})] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartPie, { className: "h-4 w-4 text-primary" }), " Policy status distribution"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 rounded-full overflow-hidden mb-4",
							children: Object.entries(d?.statusBreakdown ?? {}).map(([status, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: statusColors[status] ?? "bg-muted",
								style: { width: `${Number(count) / totalStatus * 100}%` },
								title: `${status}: ${count}`
							}, status))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: Object.entries(d?.statusBreakdown ?? {}).map(([status, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm hover:bg-muted/10 px-2 py-1 rounded transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 w-3 rounded-full ${statusColors[status] ?? "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: status.replace(/_/g, " ")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [(Number(count) / totalStatus * 100).toFixed(1), "%"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums font-medium min-w-[3ch] text-right",
										children: String(count)
									})]
								})]
							}, status))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), " Lapse risk distribution"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: [
								{
									label: "Low risk",
									val: d?.lapseBuckets.low ?? 0,
									color: "bg-success",
									pct: (d?.lapseBuckets.low ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0)) * 100
								},
								{
									label: "Medium risk",
									val: d?.lapseBuckets.medium ?? 0,
									color: "bg-warning",
									pct: (d?.lapseBuckets.medium ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0)) * 100
								},
								{
									label: "High risk",
									val: d?.lapseBuckets.high ?? 0,
									color: "bg-destructive",
									pct: (d?.lapseBuckets.high ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0)) * 100
								}
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2.5 w-2.5 rounded-full ${r.color}` }), r.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums font-medium",
									children: [
										r.val,
										" (",
										r.pct.toFixed(0),
										"%)"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2.5 rounded-full bg-muted overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `${r.color} h-full rounded-full transition-all duration-500`,
									style: { width: `${r.pct}%` }
								})
							})] }, r.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 p-4 bg-muted/20 rounded-lg text-sm flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Policies requiring attention"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold font-display text-warning",
								children: (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0)
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-primary" }), " Fraud & risk signals"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl font-bold font-display tabular-nums",
							children: d?.kpis.flagged ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: [
								"Claims flagged (score > 0.6) out of ",
								d?.kpis.totalClaims ?? 0,
								" total claims"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-3 rounded-full bg-muted overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-destructive rounded-full transition-all",
								style: { width: `${(d?.kpis.flagged ?? 0) / Math.max(1, d?.kpis.totalClaims ?? 1) * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/20 rounded-lg p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-bold font-display text-destructive",
									children: d?.kpis.flagged ?? 0
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: "High confidence flags"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/20 rounded-lg p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-bold font-display text-success",
									children: (d?.kpis.totalClaims ?? 0) - (d?.kpis.flagged ?? 0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Clean claims"
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-elevated p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold font-display mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, { className: "h-4 w-4 text-primary" }), " Branch performance"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					data: d?.branchPerf ?? [],
					columns: [
						{
							key: "branch",
							label: "Branch",
							sortable: true
						},
						{
							key: "city",
							label: "City",
							sortable: true
						},
						{
							key: "count",
							label: "Policies",
							sortable: true,
							className: "text-right",
							render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: b.count
							})
						},
						{
							key: "aum",
							label: "AUM",
							sortable: true,
							className: "text-right",
							render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums font-semibold",
								children: compactPKR(b.aum)
							})
						}
					],
					keyExtractor: (b) => `${b.branch}-${b.city}`,
					searchable: true,
					searchPlaceholder: "Search branches...",
					pageSize: 8,
					emptyMessage: "No branch data available."
				})]
			})
		]
	});
}
//#endregion
export { AnalyticsPortal as component };
