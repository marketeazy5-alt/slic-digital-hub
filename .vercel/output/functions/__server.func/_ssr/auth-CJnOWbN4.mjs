import { r as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-B17jvc5H.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { Ot as ArrowLeft, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { i as formatPhone, n as formatCNIC } from "./format-9Uks8Fou.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CJnOWbN4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [checking, setChecking] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: sd }) => {
			if (sd.session) navigate({ to: "/dashboard" });
			else setChecking(false);
		});
	}, [navigate]);
	if (checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin h-5 w-5 text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden md:flex relative flex-col gradient-hero-bg text-primary-foreground p-12 justify-between overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 animate-fade-in",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-9 w-9 rounded-md bg-white/10 backdrop-blur flex items-center justify-center shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold font-display",
								children: "S"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold font-display tracking-tight",
							children: "SLIC Digital Hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-white/60 font-medium",
							children: "State Life Insurance"
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-md animate-fade-up [animation-delay:100ms]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-bold font-display leading-tight tracking-tight",
						children: "\"For the first time, my policy makes sense.\""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-white/70 text-lg leading-relaxed",
						children: "Manage every rupee, every claim, every nominee — with the clarity of a modern financial product and the trust of Pakistan's oldest life insurer."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 text-xs text-white/50 animate-fade-in",
					children: "Demonstration data. No real transactions."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-[100px] animate-float" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-[80px] animate-float [animation-delay:2000ms]" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col p-6 md:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back"]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold font-display",
							children: "Welcome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Sign in or create your policyholder account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							defaultValue: "signin",
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "signin",
										className: "flex-1",
										children: "Sign in"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "signup",
										className: "flex-1",
										children: "Create account"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "signin",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInForm, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "signup",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUpForm, {})
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function SignInForm() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Welcome back");
		navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-5 mt-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					autoComplete: "email",
					className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "password",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "password",
					type: "password",
					required: true,
					value: password,
					onChange: (e) => setPassword(e.target.value),
					autoComplete: "current-password",
					className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full h-12 mt-2 shadow-premium hover:shadow-hover transition-all",
				disabled: loading,
				children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Sign in"]
			})
		]
	});
}
function SignUpForm() {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		password: "",
		cnic: "",
		phone: "",
		monthly_income: ""
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await supabase.auth.signUp({
			email: form.email,
			password: form.password,
			options: {
				emailRedirectTo: `${window.location.origin}/`,
				data: { full_name: form.full_name }
			}
		});
		if (error) {
			setLoading(false);
			toast.error(error.message);
			return;
		}
		if (data.user) await supabase.from("profiles").upsert({
			id: data.user.id,
			full_name: form.full_name,
			cnic: form.cnic || null,
			phone: form.phone || null,
			monthly_income: form.monthly_income ? Number(form.monthly_income) : null
		});
		setLoading(false);
		if (data.session) {
			toast.success("Account created. Loading your portal…");
			navigate({ to: "/dashboard" });
			return;
		}
		toast.success("Account created! Check your email for the confirmation link, then sign in.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-5 mt-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "full_name",
					children: "Full name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "full_name",
					required: true,
					value: form.full_name,
					onChange: (e) => setForm({
						...form,
						full_name: e.target.value
					}),
					placeholder: "Ahmed Khan",
					className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email2",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email2",
					type: "email",
					required: true,
					value: form.email,
					onChange: (e) => setForm({
						...form,
						email: e.target.value
					}),
					className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "password2",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "password2",
					type: "password",
					required: true,
					minLength: 6,
					value: form.password,
					onChange: (e) => setForm({
						...form,
						password: e.target.value
					}),
					className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "cnic",
						children: "CNIC"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "cnic",
						value: form.cnic,
						onChange: (e) => setForm({
							...form,
							cnic: formatCNIC(e.target.value)
						}),
						placeholder: "XXXXX-XXXXXXX-X",
						className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "phone",
						children: "Phone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						value: form.phone,
						onChange: (e) => setForm({
							...form,
							phone: formatPhone(e.target.value)
						}),
						placeholder: "+92 300-1234567",
						className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "income",
						children: "Monthly income (PKR, optional)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "income",
						type: "number",
						value: form.monthly_income,
						onChange: (e) => setForm({
							...form,
							monthly_income: e.target.value
						}),
						placeholder: "120000",
						className: "h-12 transition-all focus:ring-2 focus:ring-primary/20"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mt-1",
						children: "Used only to tune your lapse-risk model and coverage suggestions."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full h-12 mt-2 shadow-premium hover:shadow-hover transition-all",
				disabled: loading,
				children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Create account"]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
