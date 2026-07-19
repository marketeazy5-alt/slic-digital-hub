import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { J as FileText, Q as ExternalLink, St as Bell, et as DollarSign, ft as CheckCheck, h as Shield, l as Trash2, nt as Clock, s as TriangleAlert, u as Target } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DrB0jrAs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-DR9m754M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var allNotifications = [
	{
		id: "n1",
		title: "Premium due in 5 days",
		description: "Your Whole Life Endowment premium of ₨9,375 is due on Aug 15, 2026.",
		time: "2 hours ago",
		read: false,
		type: "payment",
		route: "/pay"
	},
	{
		id: "n2",
		title: "Claim advanced to Underwriting",
		description: "Claim CLM-2024-0891 has passed verification and is now under underwriting review.",
		time: "5 hours ago",
		read: false,
		type: "claim",
		route: "/claims"
	},
	{
		id: "n3",
		title: "Cash value milestone reached",
		description: "Your policy END-1001 has crossed ₨1.2M in accumulated cash value.",
		time: "1 day ago",
		read: false,
		type: "policy"
	},
	{
		id: "n4",
		title: "Hajj 2032 goal: 62% complete",
		description: "You're making great progress on your savings goal. Keep it up!",
		time: "2 days ago",
		read: true,
		type: "goal",
		route: "/goals"
	},
	{
		id: "n5",
		title: "Lapse risk detected",
		description: "Policy CHILD-EDU-2024 has a 72% lapse probability. Consider paying the overdue premium.",
		time: "3 days ago",
		read: true,
		type: "system",
		route: "/policies"
	},
	{
		id: "n6",
		title: "Premium paid successfully",
		description: "Your payment of ₨9,375 for END-1001 has been received. Receipt: RCPT-2026-4712.",
		time: "1 week ago",
		read: true,
		type: "payment"
	},
	{
		id: "n7",
		title: "Bonus declared for FY 2025-26",
		description: "SLIC has declared a 4.8% reversionary bonus for the current financial year.",
		time: "2 weeks ago",
		read: true,
		type: "policy"
	},
	{
		id: "n8",
		title: "Claim filed successfully",
		description: "Your maturity claim for END-1001 has been received. Claim number: CLM-2024-0891.",
		time: "3 weeks ago",
		read: true,
		type: "claim",
		route: "/claims"
	},
	{
		id: "n9",
		title: "New savings goal created",
		description: "Ali's University Fund goal has been created with a target of ₨5,000,000.",
		time: "1 month ago",
		read: true,
		type: "goal",
		route: "/goals"
	},
	{
		id: "n10",
		title: "KYC verification completed",
		description: "Your identity has been verified successfully via NADRA.",
		time: "1 month ago",
		read: true,
		type: "system"
	},
	{
		id: "n11",
		title: "Fraud ring alert",
		description: "A new fraud ring has been detected involving a hospital in your network. No action needed.",
		time: "1 month ago",
		read: true,
		type: "system",
		route: "/trust-safety"
	},
	{
		id: "n12",
		title: "Annual statement available",
		description: "Your FY 2025-26 annual policy statement is now available for download.",
		time: "2 months ago",
		read: true,
		type: "policy"
	}
];
var typeConfig = {
	payment: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" }),
		color: "bg-warning/10 text-warning"
	},
	claim: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
		color: "bg-info/10 text-info"
	},
	policy: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
		color: "bg-primary/10 text-primary"
	},
	goal: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
		color: "bg-success/10 text-success"
	},
	system: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
		color: "bg-destructive/10 text-destructive"
	}
};
function NotificationsPage() {
	const [notifications, setNotifications] = (0, import_react.useState)(allNotifications);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
	const unreadCount = notifications.filter((n) => !n.read).length;
	function markAllRead() {
		setNotifications((prev) => prev.map((n) => ({
			...n,
			read: true
		})));
	}
	function toggleRead(id) {
		setNotifications((prev) => prev.map((n) => n.id === id ? {
			...n,
			read: !n.read
		} : n));
	}
	function clearAll() {
		setNotifications([]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Notifications",
		subtitle: unreadCount > 0 ? `${unreadCount} unread notifications` : "No unread notifications",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: markAllRead,
				className: "btn-magnetic gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3.5 w-3.5" }), " Mark all read"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: clearAll,
				className: "gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Clear all"]
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setFilter("all"),
				className: cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === "all" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"),
				children: [
					"All (",
					notifications.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setFilter("unread"),
				className: cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === "unread" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"),
				children: [
					"Unread (",
					unreadCount,
					")"
				]
			})]
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-state",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-12 w-12 text-muted-foreground mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold font-display text-lg mb-1",
					children: "All caught up!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No notifications to show."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: filtered.map((n) => {
				const cfg = typeConfig[n.type];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => toggleRead(n.id),
					className: cn("flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer", n.read ? "border-border bg-card hover:bg-muted/10" : "border-primary/20 bg-primary/[0.02] hover:bg-primary/[0.04]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", cfg.color),
						children: cfg.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("text-sm", !n.read && "font-semibold"),
									children: n.title
								}), !n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 leading-relaxed",
								children: n.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), n.time]
								}), n.route && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.route,
									onClick: (e) => e.stopPropagation(),
									className: "text-xs text-primary hover:underline flex items-center gap-0.5",
									children: ["View ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
								})]
							})
						]
					})]
				}, n.id);
			})
		})]
	});
}
//#endregion
export { NotificationsPage as component };
