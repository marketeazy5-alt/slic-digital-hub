import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useTheme } from "./theme-provider-Cvuke6KH.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as Moon, K as Globe, St as Bell, V as Key, a as User, d as Sun, h as Shield, j as Monitor, m as Smartphone } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-DrB0jrAs.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { i as getDashboard, l as updateProfile } from "./customer-queries.functions-cCJAxELZ.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DeYgOJJ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function Settings() {
	const fetch = useServerFn(getDashboard);
	const update = useServerFn(updateProfile);
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => fetch({})
	});
	const { theme, setTheme, density, setDensity } = useTheme();
	const profile = data?.profile;
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		phone: "",
		occupation: "",
		monthly_income: ""
	});
	(0, import_react.useEffect)(() => {
		if (profile) setForm({
			full_name: profile.full_name ?? "",
			phone: profile.phone ?? "",
			occupation: profile.occupation ?? "",
			monthly_income: profile.monthly_income?.toString() ?? ""
		});
	}, [profile]);
	const save = useMutation({
		mutationFn: () => update({ data: {
			full_name: form.full_name,
			phone: form.phone,
			occupation: form.occupation,
			monthly_income: form.monthly_income ? Number(form.monthly_income) : void 0
		} }),
		onSuccess: () => {
			toast.success("Profile updated");
			qc.invalidateQueries();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Settings",
		subtitle: "Preferences, profile, and security.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "appearance",
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "appearance",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }), " Appearance"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "profile",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Profile"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "account",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }), " Account"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "notifications",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), " Notifications"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "appearance",
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display mb-4",
							children: "Theme"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3",
							children: [
								{
									v: "light",
									label: "Light",
									icon: Sun
								},
								{
									v: "dark",
									label: "Dark",
									icon: Moon
								},
								{
									v: "system",
									label: "System",
									icon: Monitor
								}
							].map(({ v, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setTheme(v),
								className: `flex-1 p-4 rounded-xl border text-sm flex flex-col items-center gap-2 transition-all ${theme === v ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: label
								})]
							}, v))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display mb-4",
							children: "Density"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3",
							children: ["comfortable", "compact"].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setDensity(d),
								className: `flex-1 p-4 rounded-xl border text-sm capitalize transition-all ${density === d ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium mb-1",
									children: d
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: d === "comfortable" ? "More spacing, easier reading" : "Tighter layout, more data"
								})]
							}, d))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "profile",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display mb-4",
							children: "Personal information"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "grid md:grid-cols-2 gap-4",
							onSubmit: (e) => {
								e.preventDefault();
								save.mutate();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.full_name,
										onChange: (e) => setForm({
											...form,
											full_name: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Occupation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.occupation,
										onChange: (e) => setForm({
											...form,
											occupation: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Monthly income (PKR)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: form.monthly_income,
										onChange: (e) => setForm({
											...form,
											monthly_income: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: save.isPending,
										className: "btn-magnetic",
										children: "Save changes"
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "account",
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display mb-4",
							children: "Account details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid md:grid-cols-2 gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "CNIC",
									value: profile?.cnic ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "KYC status",
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1.5 ${profile?.kyc_status === "verified" ? "text-success" : "text-warning"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 w-1.5 rounded-full ${profile?.kyc_status === "verified" ? "bg-success" : "bg-warning"}` }), profile?.kyc_status ?? "—"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "NADRA verified",
									value: profile?.nadra_verified ? "Yes" : "No (simulated)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Home branch",
									value: (profile?.branches)?.name ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Branch city",
									value: (profile?.branches)?.city ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									value: profile?.email ?? "—"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-primary" }), " Security"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-4 w-4" }),
									title: "Password",
									desc: "Last changed 3 months ago",
									action: "Change"
								},
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4" }),
									title: "Two-factor authentication",
									desc: "Add an extra layer of security",
									action: "Enable",
									badge: "Recommended"
								},
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
									title: "Active sessions",
									desc: "2 active sessions across devices",
									action: "Manage"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-lg bg-muted flex items-center justify-center",
										children: item.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: item.desc
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge-pill-info text-[10px]",
										children: item.badge
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										children: item.action
									})]
								})]
							}, item.title))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "notifications",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-elevated p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold font-display mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-primary" }), " Notification preferences"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									title: "Premium reminders",
									desc: "Get notified 7 days before premium is due",
									default: true
								},
								{
									title: "Lapse warnings",
									desc: "Alerts when a policy enters grace period",
									default: true
								},
								{
									title: "Claim updates",
									desc: "Status changes on filed claims",
									default: true
								},
								{
									title: "Savings goal milestones",
									desc: "Celebrate when you hit a savings target",
									default: true
								},
								{
									title: "Fraud alerts",
									desc: "Notifications about Trust & Safety findings",
									default: false
								},
								{
									title: "Marketing & offers",
									desc: "New products and special promotions",
									default: false
								}
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm",
									children: n.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: n.desc
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: n.default })]
							}, n.title))
						})]
					})
				})
			]
		})
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 rounded-lg border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-medium",
			children: value
		})]
	});
}
//#endregion
export { Settings as component };
