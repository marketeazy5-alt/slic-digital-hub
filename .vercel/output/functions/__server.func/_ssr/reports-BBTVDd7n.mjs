import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { $ as Download, C as Printer, J as FileText, Z as Eye } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DrB0jrAs.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BBTVDd7n.js
var import_jsx_runtime = require_jsx_runtime();
var reports = [
	{
		category: "Policy Documents",
		items: [
			{
				name: "Policy Schedules",
				desc: "All active policy documents",
				date: "Current",
				size: "PDF, 3.2 MB"
			},
			{
				name: "Annual Bonus Statements",
				desc: "Reversionary bonus declarations",
				date: "Mar 2026",
				size: "PDF, 1.8 MB"
			},
			{
				name: "Premium Payment History",
				desc: "Complete payment records",
				date: "Current",
				size: "PDF, 2.1 MB"
			}
		]
	},
	{
		category: "Tax Documents",
		items: [
			{
				name: "Tax Certificate FY 2025-26",
				desc: "Section 62 tax deduction certificate",
				date: "Jun 2026",
				size: "PDF, 0.5 MB"
			},
			{
				name: "Tax Certificate FY 2024-25",
				desc: "Previous year certificate",
				date: "Jun 2025",
				size: "PDF, 0.5 MB"
			},
			{
				name: "Zakat Deduction Statement",
				desc: "Annual zakat deduction record",
				date: "Current",
				size: "PDF, 0.3 MB"
			}
		]
	},
	{
		category: "Statements & Summaries",
		items: [
			{
				name: "Portfolio Summary",
				desc: "Complete policy portfolio overview",
				date: "Current",
				size: "PDF, 4.5 MB"
			},
			{
				name: "Cash Value Statement",
				desc: "Current cash value across all policies",
				date: "Current",
				size: "PDF, 1.2 MB"
			},
			{
				name: "Claims History",
				desc: "All claims filed with status and amounts",
				date: "Current",
				size: "PDF, 0.8 MB"
			},
			{
				name: "Maturity Schedule",
				desc: "Upcoming policy maturity dates and amounts",
				date: "Current",
				size: "PDF, 0.6 MB"
			}
		]
	}
];
function ReportsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Reports & Documents",
		subtitle: "Download policy documents, tax certificates, and portfolio summaries.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "all",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All documents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "tax",
						children: "Tax certificates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "statements",
						children: "Statements"
					})
				]
			}), [
				"all",
				"tax",
				"statements"
			].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: tab,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-8",
					children: reports.filter((r) => tab === "all" || r.category.toLowerCase().includes(tab === "tax" ? "tax" : "statement")).map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold font-display text-lg mb-4",
						children: group.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: group.items.map((doc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-5 flex items-center gap-4 card-spotlight",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: doc.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: doc.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 mt-1 text-[11px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: doc.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", doc.size] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "btn-magnetic",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "btn-magnetic",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "btn-magnetic",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
										})
									]
								})
							]
						}, i))
					})] }, group.category))
				})
			}, tab))]
		})
	});
}
//#endregion
export { ReportsPage as component };
