import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { $ as Download, D as Percent, Et as ArrowUpRight, c as TrendingUp, et as DollarSign, ht as ChartColumn, pt as ChartPie, r as Wallet, u as Target } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investments-B-CvvMgc.js
var import_jsx_runtime = require_jsx_runtime();
var portfolioData = {
	totalValue: 585e4,
	totalInvested: 42e5,
	totalReturns: 165e4,
	returnPct: 39.3,
	allocation: [
		{
			label: "Endowment Plans",
			value: 65,
			color: "bg-primary"
		},
		{
			label: "Whole Life",
			value: 20,
			color: "bg-gold"
		},
		{
			label: "Term Assurance",
			value: 10,
			color: "bg-info"
		},
		{
			label: "Education Plans",
			value: 5,
			color: "bg-success"
		}
	],
	performance: [
		{
			year: "Year 1",
			value: 42e5
		},
		{
			year: "Year 2",
			value: 445e4
		},
		{
			year: "Year 3",
			value: 472e4
		},
		{
			year: "Year 4",
			value: 505e4
		},
		{
			year: "Year 5",
			value: 54e5
		},
		{
			year: "Current",
			value: 585e4
		}
	]
};
var formatPKR = (num) => new Intl.NumberFormat("en-PK", {
	style: "currency",
	currency: "PKR",
	maximumFractionDigits: 0
}).format(num);
function InvestmentsPage() {
	const maxPerf = Math.max(...portfolioData.performance.map((p) => p.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Investment Dashboard",
		subtitle: "Track your portfolio growth and asset allocation.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-1.5 btn-magnetic",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Export report"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Portfolio value",
						value: portfolioData.totalValue,
						format: "pkr",
						compact: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
						accent: "gold",
						hint: "Current value"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total invested",
						value: portfolioData.totalInvested,
						format: "pkr",
						compact: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" }),
						hint: "Premiums paid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total returns",
						value: portfolioData.totalReturns,
						format: "pkr",
						compact: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
						accent: "success",
						hint: "Growth earned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Return rate",
						value: portfolioData.returnPct,
						format: "text",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-4 w-4" }),
						accent: "info",
						hint: "Overall return %"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-6 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartPie, { className: "h-4 w-4 text-primary" }), " Asset allocation"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-6 rounded-full overflow-hidden mb-6",
							children: portfolioData.allocation.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: a.color,
								style: { width: `${a.value}%` },
								title: `${a.label}: ${a.value}%`
							}, a.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: portfolioData.allocation.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 w-3 rounded-full ${a.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.label })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: formatPKR(Math.round(portfolioData.totalValue * a.value / 100))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums font-medium w-8 text-right",
										children: [a.value, "%"]
									})]
								})]
							}, a.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4 text-primary" }), " Portfolio growth"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-48 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2",
							children: portfolioData.performance.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col items-center gap-1 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full rounded-t bg-gradient-to-t from-primary/80 to-primary/40 hover:from-primary hover:to-primary/60 transition-all cursor-pointer",
										style: {
											height: `${p.value / maxPerf * 100}%`,
											minHeight: "8px"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10",
										children: formatPKR(p.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] text-muted-foreground",
									children: p.year === "Current" ? "Now" : p.year
								})]
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Total return:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold ml-2 text-success",
								children: ["+", formatPKR(portfolioData.totalReturns)]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Annualized return:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold ml-2 text-info",
								children: "~6.8% p.a."
							})] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-elevated p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold font-display mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-primary" }), " Investment-linked policies"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							policy: "END-STD-1001",
							product: "Shad Abad Endowment",
							invested: 24e5,
							current: 32e5,
							bonus: 8e5,
							returnPct: 33.3
						},
						{
							policy: "WL-2002",
							product: "Whole Life Protector",
							invested: 12e5,
							current: 17e5,
							bonus: 5e5,
							returnPct: 41.7
						},
						{
							policy: "CHILD-EDU-3003",
							product: "Child Education Plan",
							invested: 6e5,
							current: 95e4,
							bonus: 35e4,
							returnPct: 58.3
						}
					].map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-sm",
								children: inv.product
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground font-mono",
								children: inv.policy
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "Invested"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium tabular-nums",
										children: formatPKR(inv.invested)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "Current"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold tabular-nums",
										children: formatPKR(inv.current)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "Return"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-success tabular-nums",
										children: [
											"+",
											inv.returnPct,
											"%"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "opacity-0 group-hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })
								})
							]
						})]
					}, inv.policy))
				})]
			})
		]
	});
}
//#endregion
export { InvestmentsPage as component };
