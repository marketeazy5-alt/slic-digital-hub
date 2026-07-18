import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as Trash2, n as X, u as Target, w as Plus } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { t as compactPKR } from "./format-9Uks8Fou.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { n as deleteGoal, o as getGoals, t as createGoal } from "./customer-queries.functions-B5cT18LS.mjs";
import { t as Checkbox } from "./checkbox-nEie9MAD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goals-DtMXnJas.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function GoalsPage() {
	const fetch = useServerFn(getGoals);
	const create = useServerFn(createGoal);
	const del = useServerFn(deleteGoal);
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["goals"],
		queryFn: () => fetch({})
	});
	const goals = data?.goals ?? [];
	const policies = data?.policies ?? [];
	const addMut = useMutation({
		mutationFn: (v) => create({ data: v }),
		onSuccess: () => {
			toast.success("Goal created");
			qc.invalidateQueries({ queryKey: ["goals"] });
		}
	});
	const delMut = useMutation({
		mutationFn: (id) => del({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Savings Goals",
		subtitle: "Tag policies to what matters. Watch progress compound.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateGoalDialog, {
			policies,
			onCreate: (v) => addMut.mutate(v)
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [goals.map((g) => {
				const linked = policies.filter((p) => g.linked_policy_ids.includes(p.id));
				const current = linked.reduce((s, p) => s + Number(p.cash_value) + Number(p.bonus_accumulated), 0) + Number(g.projected_value ?? 0);
				const pct = Math.min(100, current / Number(g.target_amount) * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-elevated p-6 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => delMut.mutate(g.id),
							className: "absolute top-3 right-3 text-muted-foreground hover:text-destructive",
							"aria-label": "Delete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold font-display text-lg",
							children: g.title
						}),
						g.target_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: ["by ", new Date(g.target_date).toLocaleDateString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-baseline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-bold font-display tabular-nums",
										children: compactPKR(current)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: ["of ", compactPKR(Number(g.target_amount))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 bg-muted rounded-full mt-2 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all duration-700 ${pct >= 100 ? "gradient-gold-bg" : "bg-primary"}`,
										style: { width: `${pct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-1.5 tabular-nums",
									children: [pct.toFixed(1), "% funded"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-border text-xs text-muted-foreground",
							children: [
								linked.length,
								" linked polic",
								linked.length === 1 ? "y" : "ies"
							]
						})
					]
				}, g.id);
			}), goals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full surface-elevated p-10 text-center text-sm text-muted-foreground",
				children: "No goals yet. Create one to start tracking."
			})]
		})
	});
}
function CreateGoalDialog({ policies, onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		target_amount: "",
		target_date: ""
	});
	const [linked, setLinked] = (0, import_react.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1.5" }), " New goal"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create a savings goal" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				onCreate({
					title: form.title,
					target_amount: Number(form.target_amount),
					target_date: form.target_date || null,
					linked_policy_ids: linked
				});
				setOpen(false);
				setForm({
					title: "",
					target_amount: "",
					target_date: ""
				});
				setLinked([]);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						placeholder: "Ali's University Fund"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target (PKR)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							type: "number",
							value: form.target_amount,
							onChange: (e) => setForm({
								...form,
								target_amount: e.target.value
							}),
							placeholder: "5000000"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.target_date,
							onChange: (e) => setForm({
								...form,
								target_date: e.target.value
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Link policies" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5 max-h-40 overflow-auto",
						children: policies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 p-2 rounded hover:bg-accent text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: linked.includes(p.id),
									onCheckedChange: (v) => setLinked(v ? [...linked, p.id] : linked.filter((x) => x !== p.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1 truncate",
									children: [
										p.policy_number,
										" · ",
										p.products?.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: compactPKR(Number(p.sum_assured))
								})
							]
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					children: "Create goal"
				})
			]
		})] })]
	});
}
//#endregion
export { GoalsPage as component };
