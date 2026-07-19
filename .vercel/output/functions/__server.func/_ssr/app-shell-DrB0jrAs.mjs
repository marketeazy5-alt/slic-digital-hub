import { r as __toESM } from "../_runtime.mjs";
import { O as isRedirect, g as Link, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-0Ym40rMb.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { t as supabase } from "./client-B17jvc5H.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useTheme } from "./theme-provider-Cvuke6KH.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as Download, A as Moon, B as LayoutDashboard, J as FileText, L as LogOut, P as Menu, St as Bell, bt as Briefcase, c as TrendingUp, d as Sun, g as ShieldCheck, ht as ChartColumn, i as Users, lt as ChevronLeft, p as Sparkles, r as Wallet, rt as CircleQuestionMark, u as Target, v as Settings, yt as Building2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DrB0jrAs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMyRoles = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("87b3567cd273e867ba5913be0d7e64e7c61875a9fb17f0877743c49ff614fec2"));
var grantDemoRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createSsrRpc("02741e54a20dfd84066c4820b954733c4fc6f9912aa9f1265f4a5c154c333e9e"));
var getAgentBook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4f27023f02f00fee1d5782150f408f7303fcb006089873fcb18ca9a7fbf915b3"));
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("31ac20df5403143799078189bef1f65115092cc346a8078c1ee26adaf0a21ae4"));
var getAnalytics = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d8691e180f424a967cf6f6ffb379dcf634f0981d4672c2bcc8a3cb1c9ffbc48b"));
var customerNav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		end: true
	},
	{
		to: "/policies",
		label: "Policies",
		icon: FileText
	},
	{
		to: "/pay",
		label: "Pay Premium",
		icon: Wallet
	},
	{
		to: "/claims",
		label: "Claims",
		icon: ShieldCheck
	},
	{
		to: "/investments",
		label: "Investments",
		icon: TrendingUp
	},
	{
		to: "/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/trust-safety",
		label: "Trust & Safety",
		icon: Sparkles
	},
	{
		to: "/goals",
		label: "Savings Goals",
		icon: Target
	},
	{
		to: "/reports",
		label: "Reports",
		icon: Download
	},
	{
		to: "/support",
		label: "Support",
		icon: CircleQuestionMark
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
var portalNav = [
	{
		to: "/agent",
		label: "Agent Workbench",
		icon: Briefcase,
		roles: ["agent", "admin"]
	},
	{
		to: "/admin",
		label: "Admin Console",
		icon: Building2,
		roles: ["admin"]
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn,
		roles: ["agent", "admin"]
	},
	{
		to: "/customer360",
		label: "Customer 360",
		icon: Users,
		roles: ["agent", "admin"]
	}
];
function AppShell({ children, title, subtitle, actions }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const location = useLocation();
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();
	const fetchRoles = useServerFn(getMyRoles);
	const roles = useQuery({
		queryKey: ["my-roles"],
		queryFn: () => fetchRoles({}),
		staleTime: 6e4
	}).data?.roles ?? [];
	const visiblePortals = portalNav.filter((p) => p.roles.some((r) => roles.includes(r)));
	const nav = customerNav;
	async function signOut() {
		await supabase.auth.signOut();
		router.navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("hidden md:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300", collapsed ? "w-[72px]" : "w-[260px]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 items-center justify-between px-4 border-b border-sidebar-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2.5 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-md gradient-hero-bg flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary-foreground font-bold text-sm font-display",
									children: "S"
								})
							}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-sidebar-foreground font-display truncate",
									children: "SLIC Digital Hub"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-wider text-muted-foreground",
									children: "Customer Portal"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 py-4 px-2 space-y-0.5",
						children: [nav.map((item) => {
							const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group", active ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm nav-active-indicator" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground card-spotlight", collapsed && "justify-center"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 flex-shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}, item.to);
						}), visiblePortals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("pt-4 pb-1 px-3 text-[10px] uppercase tracking-wider text-muted-foreground", collapsed && "text-center px-0"),
							children: collapsed ? "•" : "Staff portals"
						}), visiblePortals.map((item) => {
							const active = location.pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors", active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", collapsed && "justify-center"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 flex-shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}, item.to);
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2 border-t border-sidebar-border space-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
								className: cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-sidebar-foreground/80 hover:bg-sidebar-accent", collapsed && "justify-center"),
								children: [resolvedTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: resolvedTheme === "dark" ? "Light mode" : "Dark mode" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: signOut,
								className: cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-sidebar-foreground/80 hover:bg-sidebar-accent btn-magnetic", collapsed && "justify-center"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign out" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setCollapsed((c) => !c),
								className: cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-muted-foreground hover:bg-sidebar-accent btn-magnetic", collapsed && "justify-center"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: cn("h-4 w-4 transition-transform", collapsed && "rotate-180") }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collapse" })]
							})
						]
					})
				]
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden fixed inset-0 z-50 flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/40",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "relative w-[260px] bg-sidebar border-r border-sidebar-border flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 flex items-center px-4 border-b border-sidebar-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold font-display",
							children: "SLIC Digital Hub"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 py-4 px-2 space-y-0.5",
						children: nav.map((item) => {
							const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMobileOpen(false),
								className: cn("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium", active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.to);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "h-16 border-b border-border glass sticky top-0 z-40 flex items-center justify-between px-4 md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							onClick: () => setMobileOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg md:text-xl font-semibold font-display truncate",
								children: title
							}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground truncate",
								children: subtitle
							})]
						})]
					}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: actions
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto",
					children
				})]
			})
		]
	});
}
//#endregion
export { getAnalytics as a, useServerFn as c, getAgentBook as i, createSsrRpc as n, getMyRoles as o, getAdminOverview as r, grantDemoRole as s, AppShell as t };
