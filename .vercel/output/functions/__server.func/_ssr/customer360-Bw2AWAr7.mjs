import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { J as FileText, h as Shield, i as Users, s as TriangleAlert, wt as BadgeCheck, y as Search } from "../_libs/lucide-react.mjs";
import { c as useServerFn, o as getMyRoles, s as grantDemoRole, t as AppShell } from "./app-shell-DrB0jrAs.mjs";
import { t as compactPKR } from "./format-9Uks8Fou.mjs";
import { t as StatCard } from "./stat-card-BhV2iEEs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as DataTable } from "./data-table-C2yFcY9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer360-Bw2AWAr7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sampleCustomers = [
	{
		id: "c1",
		name: "Ahmed Khan",
		cnic: "42101-1234567-1",
		phone: "0300-1234567",
		email: "ahmed.khan@email.com",
		branch: "Aman Chamber",
		city: "Karachi",
		policies: 3,
		totalCoverage: 195e5,
		kyc: "verified",
		nadra: true,
		lastActive: "2 days ago"
	},
	{
		id: "c2",
		name: "Fatima Hassan",
		cnic: "35202-7654321-2",
		phone: "0321-9876543",
		email: "fatima.h@email.com",
		branch: "Ferozepur Road",
		city: "Lahore",
		policies: 2,
		totalCoverage: 8e6,
		kyc: "verified",
		nadra: true,
		lastActive: "5 days ago"
	},
	{
		id: "c3",
		name: "Tariq Mehmood",
		cnic: "44101-4567890-3",
		phone: "0345-4567890",
		email: "tariq.m@email.com",
		branch: "Blue Area",
		city: "Islamabad",
		policies: 1,
		totalCoverage: 5e6,
		kyc: "pending",
		nadra: false,
		lastActive: "2 weeks ago"
	},
	{
		id: "c4",
		name: "Zara Ali",
		cnic: "42201-9876543-4",
		phone: "0333-3334455",
		email: "zara.a@email.com",
		branch: "Saddar",
		city: "Rawalpindi",
		policies: 2,
		totalCoverage: 12e6,
		kyc: "verified",
		nadra: true,
		lastActive: "1 week ago"
	},
	{
		id: "c5",
		name: "Bilal Ahmed",
		cnic: "13101-5555555-5",
		phone: "0301-1112233",
		email: "bilal.a@email.com",
		branch: "University Road",
		city: "Peshawar",
		policies: 1,
		totalCoverage: 3e6,
		kyc: "verified",
		nadra: true,
		lastActive: "1 month ago"
	}
];
function Customer360Page() {
	const fetchRoles = useServerFn(getMyRoles);
	const grant = useServerFn(grantDemoRole);
	const rolesQ = useQuery({
		queryKey: ["my-roles"],
		queryFn: () => fetchRoles({})
	});
	const grantMut = useMutation({
		mutationFn: () => grant({ data: { role: "agent" } }),
		onSuccess: () => {
			toast.success("Agent role granted");
			rolesQ.refetch();
		}
	});
	const hasRole = (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const filteredCustomers = sampleCustomers.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.cnic.includes(searchTerm) || c.phone.includes(searchTerm));
	if (!hasRole) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Customer 360",
		subtitle: "Unified customer view",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-state",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mx-auto h-10 w-10 text-primary mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold font-display",
					children: "Access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2 mb-4",
					children: "Customer 360 is available to agents and admins."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => grantMut.mutate(),
					disabled: grantMut.isPending,
					children: "Grant demo agent role"
				})
			]
		})
	});
	const totalPolicies = filteredCustomers.reduce((s, c) => s + c.policies, 0);
	const verifiedKyc = filteredCustomers.filter((c) => c.kyc === "verified").length;
	const flaggedCustomers = filteredCustomers.filter((c) => !c.nadra).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Customer 360",
		subtitle: "Unified view of all customers, policies, and risk indicators.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total customers",
					value: filteredCustomers.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
					hint: "Filtered results"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total policies",
					value: totalPolicies,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "KYC verified",
					value: verifiedKyc,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }),
					accent: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Needs attention",
					value: flaggedCustomers,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					accent: "warning"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-elevated p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold font-display",
					children: "Customer directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value),
						placeholder: "Search by name, CNIC, or phone...",
						className: "pl-9"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				data: filteredCustomers,
				columns: [
					{
						key: "name",
						label: "Name",
						sortable: true,
						render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: c.name
						})
					},
					{
						key: "cnic",
						label: "CNIC",
						sortable: true,
						render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-mono text-muted-foreground",
							children: c.cnic
						})
					},
					{
						key: "phone",
						label: "Phone",
						sortable: true
					},
					{
						key: "city",
						label: "City",
						sortable: true
					},
					{
						key: "policies",
						label: "Policies",
						sortable: true,
						className: "text-right",
						render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: c.policies
						})
					},
					{
						key: "totalCoverage",
						label: "Coverage",
						sortable: true,
						className: "text-right",
						render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-semibold",
							children: compactPKR(c.totalCoverage)
						})
					},
					{
						key: "kyc",
						label: "KYC",
						render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs px-2 py-0.5 rounded-full ${c.kyc === "verified" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`,
							children: c.kyc
						})
					},
					{
						key: "nadra",
						label: "NADRA",
						render: (c) => c.nadra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" })
					},
					{
						key: "lastActive",
						label: "Last active",
						sortable: true
					}
				],
				keyExtractor: (c) => c.id,
				searchable: false,
				pageSize: 5,
				emptyMessage: "No customers match your search."
			})]
		})]
	});
}
//#endregion
export { Customer360Page as component };
