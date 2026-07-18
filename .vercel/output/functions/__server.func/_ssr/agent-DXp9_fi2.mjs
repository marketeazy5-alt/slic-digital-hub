import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { Y as FileExclamationPoint, _ as ShieldAlert, i as Users, nt as Clock, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { c as useServerFn, i as getAgentBook, o as getMyRoles, s as grantDemoRole, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { n as formatCNIC, r as formatPKR, t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PolicyStatusBadge } from "./policy-status-badge-DywwcWUe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent-DXp9_fi2.js
var import_jsx_runtime = require_jsx_runtime();
function AgentPortal() {
	const fetchBook = useServerFn(getAgentBook);
	const fetchRoles = useServerFn(getMyRoles);
	const grant = useServerFn(grantDemoRole);
	const rolesQ = useQuery({
		queryKey: ["my-roles"],
		queryFn: () => fetchRoles({})
	});
	const bookQ = useQuery({
		queryKey: ["agent-book"],
		queryFn: () => fetchBook({}),
		enabled: (rolesQ.data?.roles ?? []).some((r) => r === "agent" || r === "admin"),
		retry: false
	});
	const grantMut = useMutation({
		mutationFn: () => grant({ data: { role: "agent" } }),
		onSuccess: () => {
			toast.success("Agent role granted");
			rolesQ.refetch();
		}
	});
	if (!(rolesQ.data?.roles ?? []).some((r) => r === "agent" || r === "admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Agent Workbench",
		subtitle: "Field & branch operations",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-elevated p-10 text-center max-w-lg mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto h-10 w-10 text-primary mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold font-display",
					children: "Role required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2 mb-4",
					children: "The agent portal is scoped to sales & servicing staff. For demo purposes, grant yourself the role."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => grantMut.mutate(),
					disabled: grantMut.isPending,
					children: grantMut.isPending ? "Granting…" : "Grant demo agent role"
				})
			]
		})
	});
	const book = bookQ.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Agent Workbench",
		subtitle: "Book of business, collections & at-risk policies",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Customers",
					value: book?.customers.length ?? 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Policies in book",
					value: book?.policies.length ?? 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Premiums due/overdue",
					value: book?.dueSoon.length ?? 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
					accent: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Lapse-risk policies",
					value: book?.atRisk.length ?? 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					accent: "warning"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "collections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "collections",
						children: "Collections queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "at-risk",
						children: "At-risk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "claims",
						children: "Claims"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "customers",
						children: "Customers"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "collections",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-elevated divide-y divide-border",
						children: [(book?.dueSoon ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium font-mono",
									children: p.policies?.policy_number
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: ["Due ", new Date(p.due_date).toLocaleDateString()]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold tabular-nums",
									children: formatPKR(Number(p.amount))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wide text-warning",
									children: p.status
								})]
							})]
						}, p.id)), !book?.dueSoon.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-sm text-muted-foreground",
							children: "No overdue premiums."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "at-risk",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-elevated divide-y divide-border",
						children: [(book?.atRisk ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-mono",
								children: r.policies?.policy_number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground capitalize",
								children: r.recommended_intervention?.replace(/_/g, " ")
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `text-lg font-bold tabular-nums ${Number(r.probability) > .66 ? "text-destructive" : "text-warning"}`,
									children: [(Number(r.probability) * 100).toFixed(0), "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase text-muted-foreground",
									children: "lapse risk"
								})]
							})]
						}, r.id)), !book?.atRisk.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-sm text-muted-foreground",
							children: "No at-risk policies detected."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "claims",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-elevated divide-y divide-border",
						children: (book?.claims ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-mono",
								children: c.claim_number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									c.policies?.policy_number,
									" · ",
									new Date(c.filed_at).toLocaleDateString()
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									Number(c.fraud_score) > .6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "h-4 w-4 text-destructive" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-wide px-2 py-1 rounded bg-muted",
										children: c.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold tabular-nums w-28 text-right",
										children: compactPKR(Number(c.claim_amount || 0))
									})
								]
							})]
						}, c.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "customers",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-elevated overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs uppercase text-muted-foreground border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left p-3",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left p-3",
										children: "CNIC"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left p-3",
										children: "Phone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left p-3",
										children: "Branch"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-right p-3",
										children: "Income"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left p-3",
										children: "KYC"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: (book?.customers ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-medium",
										children: c.full_name ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-mono text-xs",
										children: c.cnic ? formatCNIC(c.cnic) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-mono text-xs",
										children: c.phone ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs text-muted-foreground",
										children: c.branches?.name ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right tabular-nums",
										children: c.monthly_income ? compactPKR(Number(c.monthly_income)) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyStatusBadge, { status: c.kyc_status ?? "pending" })
									})
								] }, c.id))
							})]
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { AgentPortal as component };
