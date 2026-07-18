import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { Ct as BellDot, Dt as ArrowRight, J as FileText, Q as ExternalLink, St as Bell, c as TrendingUp, ct as ChevronRight, ft as CheckCheck, gt as Calendar, h as Shield, n as X, nt as Clock, p as Sparkles, r as Wallet, tt as CreditCard, u as Target, wt as BadgeCheck, x as ReceiptText } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { a as relativeTime, r as formatPKR, t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PolicyStatusBadge } from "./policy-status-badge-DywwcWUe.mjs";
import { i as getDashboard } from "./customer-queries.functions-B5cT18LS.mjs";
import { a as seedIfNeeded, i as runLapseEngine, n as dismissNextAction } from "./intelligence.functions-Bu_xEd0P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-B1sBb6o0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sampleNotifications = [
	{
		id: "1",
		title: "Premium due reminder",
		description: "Your Whole Life Endowment premium of ₨9,375 is due in 5 days.",
		time: "2 hours ago",
		read: false,
		type: "payment",
		route: "/pay"
	},
	{
		id: "2",
		title: "Claim update",
		description: "Your claim CLM-2024-0891 has moved to Underwriting stage.",
		time: "Yesterday",
		read: false,
		type: "claim",
		route: "/claims"
	},
	{
		id: "3",
		title: "Cash value milestone",
		description: "Your policy END-1001 has crossed ₨1.2M in accumulated cash value.",
		time: "2 days ago",
		read: true,
		type: "policy"
	},
	{
		id: "4",
		title: "Savings goal progress",
		description: "You're 62% towards your Hajj 2032 goal. Keep it up!",
		time: "3 days ago",
		read: true,
		type: "goal",
		route: "/goals"
	},
	{
		id: "5",
		title: "Lapse risk alert",
		description: "Policy CHILD-EDU-2024 may lapse soon. Consider paying your overdue premium.",
		time: "5 days ago",
		read: true,
		type: "system",
		route: "/policies"
	}
];
function NotificationBell() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [notifications, setNotifications] = (0, import_react.useState)(sampleNotifications);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function handleClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const unread = notifications.filter((n) => !n.read).length;
	function markAllRead() {
		setNotifications((prev) => prev.map((n) => ({
			...n,
			read: true
		})));
	}
	function dismiss(id) {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	}
	const typeColors = {
		payment: "bg-warning/10 text-warning",
		claim: "bg-info/10 text-info",
		policy: "bg-primary/10 text-primary",
		system: "bg-destructive/10 text-destructive",
		goal: "bg-success/10 text-success"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(!open),
			className: "relative p-2 rounded-lg hover:bg-muted transition-colors",
			"aria-label": "Notifications",
			children: unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellDot, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-0.5 -right-0.5 h-4 min-w-[16px] flex items-center justify-center text-[10px] font-bold text-white bg-destructive rounded-full px-1",
				children: unread
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 top-full mt-2 w-[380px] max-h-[520px] bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-fade-slide",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold font-display",
						children: "Notifications"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						children: unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: markAllRead,
							className: "text-xs text-primary hover:underline flex items-center gap-1 px-2 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3 w-3" }), " Mark all read"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto divide-y divide-border",
					children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "No notifications."
					}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("p-4 hover:bg-muted/20 transition-colors group relative", !n.read && "bg-primary/[0.02]"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", typeColors[n.type]),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2 w-2 rounded-full", !n.read ? "bg-destructive" : "bg-transparent") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("text-sm leading-snug", !n.read && "font-semibold"),
											children: n.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => dismiss(n.id),
											className: "opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-0.5 hover:bg-muted rounded",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-muted-foreground" })
										})]
									}),
									n.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1 leading-relaxed",
										children: n.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: n.time
										}), n.route && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: n.route,
											onClick: () => setOpen(false),
											className: "text-xs text-primary hover:underline flex items-center gap-0.5",
											children: ["View ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })]
										})]
									})
								]
							})]
						})
					}, n.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notifications",
					onClick: () => setOpen(false),
					className: "block text-center text-sm text-primary font-medium py-3 border-t border-border hover:bg-muted/20 transition-colors",
					children: "View all notifications"
				})
			]
		})]
	});
}
function Dashboard() {
	const seed = useServerFn(seedIfNeeded);
	const fetchDash = useServerFn(getDashboard);
	const runLapse = useServerFn(runLapseEngine);
	const dismiss = useServerFn(dismissNextAction);
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		seed({}).then((r) => {
			if (r?.seeded) {
				toast.success("Your portal is ready", { description: "We've provisioned demonstration policies, premiums, and intelligence." });
				qc.invalidateQueries({ queryKey: ["dashboard"] });
			}
		}).catch(() => {});
	}, [seed, qc]);
	const { data, isLoading } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => fetchDash({})
	});
	const dismissAction = useMutation({
		mutationFn: (id) => dismiss({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] })
	});
	const rerunLapse = useMutation({
		mutationFn: () => runLapse({}),
		onSuccess: () => {
			toast.success("Lapse intelligence refreshed");
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		}
	});
	const policies = data?.policies ?? [];
	const activity = data?.activity ?? [];
	const actions = data?.actions ?? [];
	const lapsePreds = data?.lapsePreds ?? [];
	const profile = data?.profile;
	const totalCoverage = policies.reduce((s, p) => s + Number(p.sum_assured), 0);
	const totalInvested = policies.reduce((s, p) => s + Number(p.total_premiums_paid), 0);
	const totalBonus = policies.reduce((s, p) => s + Number(p.bonus_accumulated), 0);
	const activeCount = policies.filter((p) => p.status === "active").length;
	const graceCount = policies.filter((p) => p.status === "grace_period").length;
	policies.filter((p) => p.status === "matured" || p.status === "active").length;
	const NextDue = policies.filter((p) => p.status === "active" || p.status === "grace_period").map((p) => new Date(p.next_premium_due)).sort((a, b) => a.getTime() - b.getTime())[0];
	const totalDue = policies.filter((p) => p.status === "grace_period" || p.status === "lapsed_revivable").reduce((s, p) => s + Number(p.premium_amount), 0);
	const firstName = profile?.full_name?.split(" ")[0] ?? "there";
	const upcomingPayments = policies.filter((p) => p.status === "active" || p.status === "grace_period").slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: `Assalam-o-alaikum, ${firstName}`,
		subtitle: profile?.branches ? `Home branch: ${profile.branches.name}, ${profile.branches.city}` : "Welcome to your policyholder portal",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => rerunLapse.mutate(),
				disabled: rerunLapse.isPending,
				className: "btn-magnetic",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 mr-1.5" }), "Refresh intelligence"]
			})]
		}),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 shimmer-bg rounded-lg" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 animate-[fade-slide_0.4s_ease-out]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "btn-magnetic gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5" }), " Pay premium"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "btn-magnetic gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/claims",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), " My claims"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "btn-magnetic gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/goals",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3.5 w-3.5" }), " Savings goals"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "btn-magnetic gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/trust-safety",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), " Trust & Safety"]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total coverage",
							value: totalCoverage,
							format: "pkr",
							compact: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
							accent: "primary",
							hint: "Sum assured across all policies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total invested",
							value: totalInvested,
							format: "pkr",
							compact: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
							hint: "Premiums paid to date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Bonus earned",
							value: totalBonus,
							format: "pkr",
							compact: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
							accent: "gold",
							hint: "Accumulated bonuses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Active policies",
							value: activeCount,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }),
							hint: `${policies.length} total · ${graceCount} in grace`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Amount due now",
							value: totalDue,
							format: "pkr",
							compact: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, { className: "h-4 w-4" }),
							accent: totalDue > 0 ? "warning" : void 0,
							hint: totalDue > 0 ? "Pay to keep coverage active" : "You're up to date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Next premium",
							value: NextDue ? NextDue.toLocaleDateString("en-PK", {
								month: "short",
								day: "numeric"
							}) : "—",
							format: "text",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
							hint: NextDue ? NextDue.getFullYear().toString() : "No upcoming"
						})
					]
				}),
				actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-5 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold font-display text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " Next-best actions"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Personalized nudges scored by our intelligence engine."
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 gap-3",
						children: actions.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `surface-subtle p-4 relative group border ${a.score > .8 ? "border-warning/40 bg-warning/5" : "border-transparent"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => dismissAction.mutate(a.id),
									className: "absolute top-2 right-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium leading-snug pr-6",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
									children: a.description
								}),
								a.cta_route && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									variant: "link",
									className: "mt-2 h-auto p-0 text-primary btn-magnetic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: a.cta_route,
										children: [
											a.cta_label,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
										]
									})
								})
							]
						}, a.id))
					})]
				}),
				upcomingPayments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-5 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold font-display text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Upcoming premiums"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pay",
								children: ["Pay now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-4 gap-3",
						children: upcomingPayments.slice(0, 4).map((p) => {
							const due = new Date(p.next_premium_due);
							const daysUntil = Math.ceil((due.getTime() - Date.now()) / (1e3 * 60 * 60 * 24));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-lg border p-4 ${daysUntil < 15 ? "border-warning/40 bg-warning/5" : "border-border"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: p.products?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-lg font-bold font-display mt-1",
										children: formatPKR(Number(p.premium_amount))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: ["Due ", due.toLocaleDateString("en-PK", {
												month: "short",
												day: "numeric"
											})]
										}), daysUntil <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "badge-pill-destructive text-[10px]",
											children: "Overdue"
										}) : daysUntil < 15 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "badge-pill-warning text-[10px]",
											children: [daysUntil, "d left"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "badge-pill-info text-[10px]",
											children: [daysUntil, "d left"]
										})]
									})
								]
							}, p.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold font-display text-lg",
								children: "Your policies"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/policies",
									children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [policies.slice(0, 4).map((p) => {
								const lapse = lapsePreds.find((lp) => lp.policy_id === p.id);
								const borderColor = p.status === "active" ? "border-l-success" : p.status === "grace_period" ? "border-l-warning" : "border-l-destructive";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/policies/$policyId",
									params: { policyId: p.id },
									className: `block surface-elevated p-4 md:p-5 border-l-4 ${borderColor} transition-all group card-spotlight`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-mono text-muted-foreground",
															children: p.policy_number
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyStatusBadge, { status: p.status }),
														Number(p.sum_assured) >= 1e7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] uppercase tracking-wider gradient-gold-bg text-gold-foreground px-1.5 py-0.5 rounded font-semibold",
															children: "Premium"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1.5 font-semibold font-display truncate",
													children: p.products?.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: [
														p.branches?.name ?? "—",
														" · Matures ",
														new Date(p.maturity_date).getFullYear()
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right flex-shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: "Sum assured"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold font-display tabular-nums",
												children: compactPKR(Number(p.sum_assured))
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground",
												children: "Premium/mo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium tabular-nums mt-0.5",
												children: formatPKR(Number(p.premium_amount))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground",
												children: "Cash value"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium tabular-nums mt-0.5",
												children: compactPKR(Number(p.cash_value))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground",
												children: "Lapse risk"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `font-medium mt-0.5 ${lapse && lapse.probability > .5 ? "text-warning" : lapse && lapse.probability > .3 ? "text-info" : "text-success"}`,
												children: lapse ? `${Math.round(lapse.probability * 100)}%` : "—"
											})] })
										]
									})]
								}, p.id);
							}), policies.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "surface-elevated p-8 text-center text-sm text-muted-foreground",
								children: "No policies yet. They'll appear after seeding completes."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display text-lg",
							children: "Recent activity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-elevated p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-h-[560px] overflow-auto divide-y divide-border",
								children: [activity.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 p-3 hover:bg-muted/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-md bg-accent/60 flex items-center justify-center flex-shrink-0 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityIcon, { icon: e.icon })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium leading-snug",
												children: e.title
											}),
											e.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground mt-0.5 leading-relaxed",
												children: e.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground mt-1",
												children: relativeTime(e.created_at)
											})
										]
									})]
								}, e.id)), activity.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-6 text-sm text-muted-foreground text-center",
									children: "No activity yet."
								})]
							})
						})]
					})]
				})
			]
		})
	});
}
function ActivityIcon({ icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-bold",
		children: {
			"check-circle": "✓",
			"trending-up": "↑",
			"alert-triangle": "!",
			"clock": "◷",
			"file-text": "≡",
			"shield-check": "◈",
			"shield": "◈",
			"target": "◎",
			"user": "◉",
			"sparkles": "✧"
		}[icon] ?? "•"
	});
}
//#endregion
export { Dashboard as component };
