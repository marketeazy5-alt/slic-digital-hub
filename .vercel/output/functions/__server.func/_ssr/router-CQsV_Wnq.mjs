import { r as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-B17jvc5H.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as ThemeProvider } from "./theme-provider-Cvuke6KH.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$20 } from "./policies._policyId-BcWaPgtZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CQsV_Wnq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DyPxFuDm.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SLIC Digital Hub — State Life Insurance Corporation of Pakistan" },
			{
				name: "description",
				content: "Modern digital platform for policyholders of State Life Insurance Corporation of Pakistan. Manage policies, premiums, claims, and savings goals with institutional precision."
			},
			{
				name: "author",
				content: "SLIC Digital Hub"
			},
			{
				property: "og:title",
				content: "SLIC Digital Hub"
			},
			{
				property: "og:description",
				content: "Pakistan's institutional insurance, reimagined for the modern policyholder."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/slic-icon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "alternate icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/slic-icon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		try {
			const { data: sub } = supabase.auth.onAuthStateChange((event) => {
				if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
				router.invalidate();
				if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			});
			return () => sub.subscription.unsubscribe();
		} catch {
			console.warn("Supabase unavailable — skipping auth listener");
		}
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "bottom-right",
			toastOptions: { classNames: { toast: "bg-card border border-border text-foreground shadow-elegant" } }
		})] })
	});
}
var $$splitComponentImporter$18 = () => import("./auth-CJnOWbN4.mjs");
var Route$18 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Sign in — SLIC Digital Hub" }, {
		name: "description",
		content: "Access your State Life Insurance policies, premiums, and claims."
	}] })
});
var $$splitComponentImporter$17 = () => import("./route-Di7iQBCH.mjs");
var Route$17 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (!error && data?.user) return { user: data.user };
		const { data: sessionData } = await supabase.auth.getSession();
		if (sessionData?.session) return { user: sessionData.session.user };
		throw redirect({ to: "/auth" });
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./routes-BamyzgaH.mjs");
var Route$16 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./trust-safety-Bkz76AHU.mjs");
var Route$15 = createFileRoute("/_authenticated/trust-safety")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./support-DKlFDdGa.mjs");
var Route$14 = createFileRoute("/_authenticated/support")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./settings-DeYgOJJ9.mjs");
var Route$13 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./reports-BBTVDd7n.mjs");
var Route$12 = createFileRoute("/_authenticated/reports")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./policies-DY-3xXx3.mjs");
var Route$11 = createFileRoute("/_authenticated/policies")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./pay-CsX2fd0v.mjs");
var Route$10 = createFileRoute("/_authenticated/pay")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./notifications-DR9m754M.mjs");
var Route$9 = createFileRoute("/_authenticated/notifications")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./investments-YYzAeLGa.mjs");
var Route$8 = createFileRoute("/_authenticated/investments")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./goals-CwdKv7pN.mjs");
var Route$7 = createFileRoute("/_authenticated/goals")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./dashboard-BcIYW0Mm.mjs");
var Route$6 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./customer360-Bw2AWAr7.mjs");
var Route$5 = createFileRoute("/_authenticated/customer360")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./claims-CS3PdFB0.mjs");
var Route$4 = createFileRoute("/_authenticated/claims")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./analytics-mkI2wN46.mjs");
var Route$3 = createFileRoute("/_authenticated/analytics")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./agent-ClC0rMer.mjs");
var Route$2 = createFileRoute("/_authenticated/agent")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-ANke0v6g.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./policies.index-CF_DFqsj.mjs");
var Route = createFileRoute("/_authenticated/policies/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AuthRoute = Route$18.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$17.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AuthenticatedTrustSafetyRoute = Route$15.update({
	id: "/trust-safety",
	path: "/trust-safety",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupportRoute = Route$14.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$13.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$12.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPoliciesRoute = Route$11.update({
	id: "/policies",
	path: "/policies",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPayRoute = Route$10.update({
	id: "/pay",
	path: "/pay",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$9.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInvestmentsRoute = Route$8.update({
	id: "/investments",
	path: "/investments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedGoalsRoute = Route$7.update({
	id: "/goals",
	path: "/goals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCustomer360Route = Route$5.update({
	id: "/customer360",
	path: "/customer360",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedClaimsRoute = Route$4.update({
	id: "/claims",
	path: "/claims",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAnalyticsRoute = Route$3.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAgentRoute = Route$2.update({
	id: "/agent",
	path: "/agent",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPoliciesIndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedPoliciesRoute
});
var AuthenticatedPoliciesRouteChildren = {
	AuthenticatedPoliciesPolicyIdRoute: Route$20.update({
		id: "/$policyId",
		path: "/$policyId",
		getParentRoute: () => AuthenticatedPoliciesRoute
	}),
	AuthenticatedPoliciesIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedAgentRoute,
	AuthenticatedAnalyticsRoute,
	AuthenticatedClaimsRoute,
	AuthenticatedCustomer360Route,
	AuthenticatedDashboardRoute,
	AuthenticatedGoalsRoute,
	AuthenticatedInvestmentsRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedPayRoute,
	AuthenticatedPoliciesRoute: AuthenticatedPoliciesRoute._addFileChildren(AuthenticatedPoliciesRouteChildren),
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSupportRoute,
	AuthenticatedTrustSafetyRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: {
			staleTime: 3e4,
			refetchOnWindowFocus: false
		} } }) },
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
