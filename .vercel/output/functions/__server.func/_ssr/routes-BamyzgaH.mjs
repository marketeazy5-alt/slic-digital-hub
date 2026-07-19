import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-B17jvc5H.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { D as Percent, Dt as ArrowRight, E as Phone, Et as ArrowUpRight, F as MapPin, G as GraduationCap, K as Globe, M as Minus, P as Menu, R as Lock, S as Quote, T as PiggyBank, Tt as Award, U as Heart, W as HeartPulse, _t as Calculator, b as RefreshCw, c as TrendingUp, et as DollarSign, f as Star, g as ShieldCheck, h as Shield, ht as ChartColumn, i as Users, it as CircleCheck, k as Network, kt as Activity, n as X, p as Sparkles, t as Zap, u as Target, vt as Building, w as Plus, xt as BookOpen } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BamyzgaH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function Landing() {
	const [signedIn, setSignedIn] = (0, import_react.useState)(false);
	const [scrollY, setScrollY] = (0, import_react.useState)(0);
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	const [activeTestimonial, setActiveTestimonial] = (0, import_react.useState)(0);
	const [mobileNavOpen, setMobileNavOpen] = (0, import_react.useState)(false);
	const [countersVisible, setCountersVisible] = (0, import_react.useState)(false);
	const heroRef = (0, import_react.useRef)(null);
	const countersRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session)).catch(() => {});
		const onScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setCountersVisible(true);
		}, { threshold: .3 });
		if (countersRef.current) observer.observe(countersRef.current);
		return () => observer.disconnect();
	}, []);
	const parallax = scrollY * .3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background overflow-x-hidden selection:bg-primary/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass bg-background/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary-foreground font-bold text-sm font-display",
									children: "S"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold font-display tracking-tight",
									children: "SLIC Digital Hub"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground/70",
									children: "State Life Insurance"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden md:flex items-center gap-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#products",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#pricing",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Pricing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#experience",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Experience"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#calculator",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Estimate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#testimonials",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Testimonials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#insights",
									className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
									children: "Insights"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "gap-1.5 btn-magnetic",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/dashboard",
									children: ["Open portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								className: "btn-magnetic hidden sm:flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									children: "Sign in"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "shadow-lg btn-magnetic",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									children: "Get started →"
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "md:hidden p-2",
								onClick: () => setMobileNavOpen(!mobileNavOpen),
								children: mobileNavOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})]
						})
					]
				}), mobileNavOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden border-t border-border bg-card p-4 space-y-2",
					children: [
						"Products",
						"Pricing",
						"Experience",
						"Estimate",
						"Testimonials",
						"Insights"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${item.toLowerCase()}`,
						onClick: () => setMobileNavOpen(false),
						className: "block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors",
						children: item
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: heroRef,
				className: "relative min-h-[90vh] flex items-center overflow-hidden pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-950/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/4 left-1/4 h-[300px] w-[300px] lg:h-[600px] lg:w-[600px] rounded-full bg-primary/10 blur-[80px] lg:blur-[120px] animate-float pointer-events-none",
						style: { transform: `translateY(${parallax * .5}px)` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/3 right-1/4 h-[200px] w-[200px] lg:h-[400px] lg:w-[400px] rounded-full bg-gold/10 blur-[60px] lg:blur-[100px] animate-float [animation-delay:2000ms] pointer-events-none",
						style: { transform: `translateY(${parallax * .3}px)` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/4 left-1/3 h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-full bg-primary/8 blur-[40px] lg:blur-[80px] animate-float [animation-delay:4000ms] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 w-full z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-8 animate-fade-up glass backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success animate-pulse" }), "Pakistan's institutional insurer — now digital"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold font-display tracking-tighter leading-[1.05] animate-fade-up [animation-delay:100ms]",
								children: [
									"Insurance, delivered with the",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-animate",
										children: "precision"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: " of a bank."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up [animation-delay:200ms] leading-relaxed",
								children: "Your State Life policies, claims, and savings goals — managed with the clarity, speed, and elegance of modern fintech."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:300ms]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "h-14 px-8 text-base rounded-xl shadow-[0_0_30px_rgba(0,77,64,0.3)] hover:shadow-[0_0_50px_rgba(0,77,64,0.5)] btn-magnetic group",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										children: ["Open my portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#products",
									className: "group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50",
									children: ["Explore products", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-16 flex flex-wrap items-center gap-6 animate-fade-up [animation-delay:400ms]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex -space-x-2",
										children: [
											"AK",
											"MH",
											"SR",
											"FZ",
											"NA"
										].map((ini) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-8 w-8 rounded-full gradient-hero-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background",
											children: ini
										}, ini))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-semibold",
											children: "3.6M+"
										}), " policyholders"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [[
										1,
										2,
										3,
										4,
										5
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground ml-1",
										children: "4.9/5 from 12,400+ reviews"
									})]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:block relative animate-fade-up [animation-delay:300ms]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroShowcase, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-6 h-10 rounded-full border-2 border-border flex items-start justify-center pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-2 rounded-full bg-muted-foreground animate-pulse" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				ref: countersRef,
				className: "border-y border-border/50 bg-card/10 backdrop-blur-md py-14 relative z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[1400px] mx-auto px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-8",
						children: [
							{
								value: "420B",
								prefix: "₨",
								label: "Claims paid",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
								suffix: ""
							},
							{
								value: "3.6",
								prefix: "",
								label: "Active policies",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
								suffix: "M+"
							},
							{
								value: "180",
								prefix: "",
								label: "Branches nationwide",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
								suffix: "+"
							},
							{
								value: "70",
								prefix: "",
								label: "Years of trust",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }),
								suffix: "+"
							}
						].map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform mx-auto",
									children: m.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-3xl md:text-4xl font-bold font-display tabular-nums tracking-tight",
									children: [
										m.prefix,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
											value: parseFloat(m.value),
											enabled: countersVisible
										}),
										m.suffix
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 font-bold",
									children: m.label
								})
							]
						}, m.label))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-10 md:mb-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary font-bold mb-3",
								children: "Why SLIC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight mb-3 md:mb-4",
								children: "Built on 70 years of institutional trust"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2",
								children: "State Life Insurance Corporation is Pakistan's largest and most trusted life insurer, backed by the Government of Pakistan."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8",
						children: [
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-6 w-6" }),
								title: "Government Backing",
								desc: "100% state-owned enterprise with sovereign guarantee on every policy issued since 1952."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-6 w-6" }),
								title: "180+ Branches",
								desc: "Physical presence in every major city and district across Pakistan. Your agent is never far away."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-6 w-6" }),
								title: "₨420B+ Paid Out",
								desc: "Over 420 billion rupees in claims, maturity benefits, and bonuses disbursed to policyholders."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" }),
								title: "3.6M Families Protected",
								desc: "From individual policies to large corporate group schemes, we serve millions with integrity."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-6 w-6" }),
								title: "Industry-Leading Bonuses",
								desc: "Consistently among the highest reversionary bonus rates in the South Asian insurance market."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-6 w-6" }),
								title: "SECP & SBP Regulated",
								desc: "Fully compliant with the Securities and Exchange Commission and State Bank of Pakistan regulations."
							}
						].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "feature-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "feature-card-icon",
									children: item.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold font-display text-lg mb-2",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: item.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pricing",
				className: "py-16 md:py-24 bg-card/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-primary font-bold mb-3",
									children: "Compare Plans"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl md:text-4xl font-bold font-display tracking-tight mb-4",
									children: "Find the right plan for your life stage"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground max-w-xl mx-auto",
									children: "Every plan comes with flexible premium terms, tax benefits under Section 62, and the backing of Pakistan's strongest insurer."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "-mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-2xl border-x-0 sm:border-x border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm min-w-[640px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-muted/30 border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3 sm:p-5 font-semibold font-display text-xs sm:text-sm",
											children: "Feature"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-3 sm:p-5 font-semibold font-display text-xs sm:text-sm",
											children: "Shad Abad Endowment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-5 font-semibold font-display",
											children: "Child Education Plan"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-5 font-semibold font-display",
											children: "Whole Life Protector"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-5 font-semibold font-display",
											children: "Retirement Annuity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-left p-5 font-semibold font-display",
											children: "Sadaqah Term"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: [
										{
											feat: "Min. Term",
											vals: [
												"10 years",
												"5 years",
												"Lifetime",
												"5 years",
												"5 years"
											]
										},
										{
											feat: "Max. Term",
											vals: [
												"40 years",
												"25 years",
												"—",
												"30 years",
												"30 years"
											]
										},
										{
											feat: "Min. Age",
											vals: [
												"18",
												"0 (newborn)",
												"18",
												"25",
												"18"
											]
										},
										{
											feat: "Max. Age",
											vals: [
												"65",
												"55",
												"70",
												"60",
												"65"
											]
										},
										{
											feat: "Bonus Type",
											vals: [
												"Reversionary",
												"Reversionary",
												"Reversionary",
												"Cash Bonus",
												"—"
											]
										},
										{
											feat: "Loan Facility",
											vals: [
												"Yes ✓",
												"Yes ✓",
												"Yes ✓",
												"No",
												"No"
											]
										},
										{
											feat: "Tax Benefit (Sec 62)",
											vals: [
												"Yes ✓",
												"Yes ✓",
												"Yes ✓",
												"Yes ✓",
												"Yes ✓"
											]
										},
										{
											feat: "Surrender Value",
											vals: [
												"After 3 years",
												"After 3 years",
												"After 3 years",
												"No",
												"No"
											]
										},
										{
											feat: "Sum Assured Range",
											vals: [
												"₨500K – ₨50M",
												"₨1M – ₨25M",
												"₨500K – Unltd",
												"₨2M – ₨20M",
												"₨1M – ₨50M"
											]
										},
										{
											feat: "Starting Premium/mo",
											vals: [
												"₨3,750",
												"₨4,500",
												"₨5,200",
												"₨8,000",
												"₨1,500"
											]
										}
									].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/10 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 sm:p-5 font-medium text-xs sm:text-sm",
											children: row.feat
										}), row.vals.map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 sm:p-5 text-muted-foreground text-xs sm:text-sm",
											children: v
										}, j))]
									}, i))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mt-6 sm:mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/auth",
									children: ["Compare full details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5" })]
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "testimonials",
				className: "py-16 md:py-24 relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 aurora-bg opacity-20 dark:opacity-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-[1400px] mx-auto px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary font-bold mb-3",
								children: "Testimonials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-4xl font-bold font-display tracking-tight mb-4",
								children: "Trusted by millions of Pakistanis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground max-w-xl mx-auto",
								children: "Real stories from real policyholders who've experienced the SLIC Digital difference."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-3xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex transition-transform duration-500 ease-out",
									style: { transform: `translateX(-${activeTestimonial * 100}%)` },
									children: [
										{
											name: "Ahmed Khan",
											role: "Policyholder since 2018",
											location: "Lahore",
											quote: "I've been with State Life for 6 years. The digital hub lets me see my cash value growing in real-time — something I never thought possible from an insurance company. The premium estimator helped me plan my daughter's wedding fund with total confidence."
										},
										{
											name: "Fatima Hassan",
											role: "Education Plan Beneficiary",
											location: "Islamabad",
											quote: "My father started a Child Education Plan when I was 5. Thanks to SLIC, my entire university fee was covered without any hassle. The claim process was surprisingly smooth — just uploaded the documents and the payment arrived in 2 days."
										},
										{
											name: "Col. (R) Tariq Mehmood",
											role: "Retired, Whole Life Policy",
											location: "Rawalpindi",
											quote: "After 30 years of service, my Whole Life Protector policy matured and the bonus accumulation was far beyond what I expected. State Life's reversionary bonus rate has consistently been the best in the industry."
										},
										{
											name: "Zara Ali",
											role: "Young Professional",
											location: "Karachi",
											quote: "As a freelancer, I wanted a retirement plan that I could contribute to flexibly. The Retirement Annuity plan through the digital hub lets me pause and resume payments whenever my income fluctuates. Absolute game-changer."
										}
									].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "min-w-full px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "surface-elevated p-6 sm:p-8 md:p-12 text-center max-w-2xl mx-auto",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-6 w-6 sm:h-8 sm:w-8 text-primary/30 mx-auto mb-4 sm:mb-6" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 font-medium italic",
													children: [
														"\"",
														t.quote,
														"\""
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-8 flex items-center justify-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-10 w-10 rounded-full gradient-hero-bg flex items-center justify-center text-primary-foreground font-bold",
														children: t.name.split(" ").map((n) => n[0]).join("")
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-semibold",
															children: t.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-xs text-muted-foreground",
															children: [
																t.role,
																" · ",
																t.location
															]
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-center gap-1 mt-4",
													children: [
														1,
														2,
														3,
														4,
														5
													].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }, s))
												})
											]
										})
									}, i))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center gap-3 mt-8",
								children: [
									0,
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTestimonial(i),
									className: cn("h-2.5 rounded-full transition-all duration-300", i === activeTestimonial ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground")
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-center gap-4 mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setActiveTestimonial((p) => Math.max(0, p - 1)),
									disabled: activeTestimonial === 0,
									children: "← Previous"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setActiveTestimonial((p) => Math.min(3, p + 1)),
									disabled: activeTestimonial === 3,
									children: "Next →"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border/50 bg-card/20 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6 sm:mb-8",
						children: "Regulated & recognized by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 sm:h-7 sm:w-7 text-primary" }), " SECP"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 sm:h-7 sm:w-7 text-primary" }), " Govt. of Pakistan"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 sm:h-7 sm:w-7 text-primary" }), " 256-bit"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5 sm:h-7 sm:w-7 text-primary" }), " SBP Compliant"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 sm:h-7 sm:w-7 text-primary" }), " PBA Certified"]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "calculator",
				className: "py-16 md:py-24 bg-card/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-3.5 w-3.5" }), " Live Estimator"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-3xl md:text-4xl font-bold font-display tracking-tight mb-6",
							children: [
								"Transparent pricing, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"zero hidden fees."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed mb-8",
							children: "Adjust the coverage slider to see how your premium scales. Our intelligent engine provides instant, guaranteed estimates for whole life and endowment plans. All premiums include applicable taxes and fees."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractivePremiumEstimator, {})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass p-8 rounded-3xl border border-gold/20 card-spotlight",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display font-semibold text-lg mb-6 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-gold" }), " Growth Projection"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-48 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2",
									children: [
										20,
										35,
										45,
										60,
										75,
										90,
										100
									].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-sm group relative transition-all duration-300 hover:opacity-80 cursor-pointer",
										style: { height: `${h}%` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap",
											children: [
												"Year ",
												i * 5 + 5,
												": ~₨",
												(h * 2.5).toFixed(0),
												"M"
											]
										})
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-4 text-center",
									children: "Projected cash value over a 35-year term including reversionary bonuses at 4.5%."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								{
									label: "Minimum premium",
									val: "₨1,500/mo"
								},
								{
									label: "Tax benefit",
									val: "Sec 62"
								},
								{
									label: "Payout speed",
									val: "24-48 hrs"
								},
								{
									label: "Bonus rate (avg)",
									val: "4.5% p.a."
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-subtle p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground uppercase tracking-wide",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold font-display text-lg mt-1",
									children: s.val
								})]
							}, s.label))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "products",
				className: "py-16 md:py-24 relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6 mb-8 md:mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Our Suite"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight",
						children: "Protection for every life stage."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "marquee-track relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "marquee-inner flex w-max gap-8 pb-8 pt-4",
							children: [[
								{
									title: "Shad Abad Endowment",
									desc: "Guaranteed savings with life cover and industry-best reversionary bonuses.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Child Education Plan",
									desc: "Secure their university funds with guaranteed payouts at every milestone.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Whole Life Protector",
									desc: "Lifelong protection that builds substantial cash value over time.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "h-6 w-6 text-gold" })
								},
								{
									title: "Retirement Annuity",
									desc: "Convert your savings into a steady post-career monthly income stream.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6 text-info" })
								},
								{
									title: "Marriage Plan",
									desc: "Build a solid financial foundation for your children's future weddings.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Sadaqah Term",
									desc: "Pure protection at the lowest possible premium. Maximum cover, minimum cost.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-6 w-6 text-foreground" })
								}
							].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[340px] shrink-0 whitespace-normal glass p-8 rounded-2xl card-spotlight hover:-translate-y-2 transition-transform duration-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl bg-background/50 border border-border flex items-center justify-center mb-6 shadow-sm",
										children: p.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold font-display mb-2",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: p.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 font-medium text-xs text-primary uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer",
										children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								]
							}, i)), [
								{
									title: "Shad Abad Endowment",
									desc: "Guaranteed savings with life cover and industry-best reversionary bonuses.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Child Education Plan",
									desc: "Secure their university funds with guaranteed payouts at every milestone.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Whole Life Protector",
									desc: "Lifelong protection that builds substantial cash value over time.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "h-6 w-6 text-gold" })
								},
								{
									title: "Retirement Annuity",
									desc: "Convert your savings into a steady post-career monthly income stream.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6 text-info" })
								},
								{
									title: "Marriage Plan",
									desc: "Build a solid financial foundation for your children's future weddings.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6 text-primary" })
								},
								{
									title: "Sadaqah Term",
									desc: "Pure protection at the lowest possible premium. Maximum cover, minimum cost.",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-6 w-6 text-foreground" })
								}
							].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[340px] shrink-0 whitespace-normal glass p-8 rounded-2xl card-spotlight hover:-translate-y-2 transition-transform duration-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl bg-background/50 border border-border flex items-center justify-center mb-6 shadow-sm",
										children: p.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold font-display mb-2",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: p.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 font-medium text-xs text-primary uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer",
										children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								]
							}, `dup-${i}`))]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "experience",
				className: "py-20 md:py-32 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 aurora-bg opacity-30 dark:opacity-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary font-bold mb-4",
								children: "The Digital Experience"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight mb-4 md:mb-6",
								children: [
									"Your policies, ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									" beautifully organized."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed",
								children: "We rebuilt the policyholder experience from the ground up. View real-time cash values, pay premiums instantly, and track claims without ever calling an agent."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-6",
								children: [
									{
										title: "One-Tap Payments",
										desc: "Settle premiums instantly via Raast, EasyPaisa, JazzCash, or cards.",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
									},
									{
										title: "Smart Lapse Prevention",
										desc: "Get AI-driven alerts before you lose coverage, with auto-fix suggestions.",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
									},
									{
										title: "Live Cash Value",
										desc: "Watch your endowment grow day by day with real-time bonus tracking.",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5" })
									},
									{
										title: "Fraud Detection",
										desc: "Our Trust & Safety engine flags suspicious activity across the claims network.",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "h-5 w-5" })
									}
								].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4 items-start group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-xl bg-background/50 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform",
										children: f.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground",
										children: f.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground mt-1",
										children: f.desc
									})] })]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-10 btn-magnetic",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									children: "Experience the demo"
								})
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto w-full max-w-md aspect-[9/16] rounded-[2.5rem] border-[8px] border-surface-2 bg-background shadow-2xl overflow-hidden glass",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 inset-x-0 h-7 flex justify-center z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-32 h-6 bg-surface-2 rounded-b-3xl" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-background p-6 pt-12 flex flex-col gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 rounded-full gradient-hero-bg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 rounded-full bg-surface-2" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3/4 h-8 bg-surface-1 rounded-lg" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1/2 h-4 bg-surface-1 rounded-md mb-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "surface-elevated p-4 rounded-2xl card-spotlight",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-20 h-4 bg-surface-2 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-4 bg-success/20 rounded" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1/2 h-8 bg-surface-2 rounded mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full h-2 bg-surface-1 rounded-full overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3/4 h-full bg-primary animate-pulse" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 surface-subtle h-24 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 surface-subtle h-24 rounded-2xl" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-surface-2/50 rounded-2xl p-3 flex items-center gap-3 mt-auto",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-8 w-8 rounded-full bg-success/20 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-semibold text-foreground",
												children: "Premium paid"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Whole Life Endowment · ₨9,375"
											})]
										})]
									})
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 md:py-24 bg-card/20 border-y border-border/50 overflow-hidden relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-2xl border border-border bg-card p-8 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] card-spotlight",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-8 right-8 h-32 w-32 pointer-events-none opacity-20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-primary/30 [animation:radar-pulse_3s_infinite]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-2 rounded-full border border-primary/30 [animation:radar-pulse_3s_infinite_1s]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 left-4 w-1.5 h-1.5 bg-primary rounded-full [animation:node-glow_2s_infinite_alternate]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-6 right-8 w-1 h-1 bg-primary rounded-full [animation:node-glow_1.5s_infinite_alternate]" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 relative z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl sm:text-2xl font-bold font-display tracking-tight mb-2 md:mb-3 relative z-10",
								children: "Trust & Safety, visible"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm relative z-10",
								children: "A fraud-ring detection engine runs across the claims network — you see the same signals our underwriters do."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 relative z-10",
								children: [
									{
										label: "Claims verified",
										val: "99.2%",
										color: "text-success"
									},
									{
										label: "Fraud detected",
										val: "₨2.1B",
										color: "text-warning"
									},
									{
										label: "Response time",
										val: "<24h",
										color: "text-info"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted/50 rounded-lg md:rounded-xl p-2 md:p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-sm md:text-xl font-bold font-display ${s.color}`,
										children: s.val
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[8px] md:text-[10px] text-muted-foreground mt-0.5 md:mt-1 uppercase tracking-wide",
										children: s.label
									})]
								}, s.label))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-2xl border border-border bg-card p-8 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] card-spotlight premium-glow flex flex-col justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 h-56 w-56 bg-gold/5 rounded-full blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl gradient-gold-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6 text-gold-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl sm:text-2xl font-bold font-display tracking-tight mb-2 md:mb-3",
									children: "Gamified savings goals"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm",
									children: "Tag policies to life goals and watch cash value grow in real time."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 space-y-4 relative z-10",
								children: [[{
									label: "Hajj 2032",
									pct: 62
								}, {
									label: "Ali's Uni Fund",
									pct: 38
								}].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: g.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary font-semibold",
										children: [g.pct, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary transition-all",
										style: { width: `${g.pct}%` }
									})
								})] }, g.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted/50 rounded-lg p-3 text-sm flex items-center justify-between mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Combined progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "52%"
									})]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[800px] mx-auto px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12 md:mb-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold font-display tracking-tight mb-4",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "From sign-up to settlement, completely transparent."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative border-l border-border ml-6 md:ml-12 space-y-16 pb-8",
						children: [
							{
								title: "Verify your identity",
								desc: "Instantly and securely verify yourself via NADRA integration. Your data stays encrypted and private.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
							},
							{
								title: "Link your policies",
								desc: "Enter your CNIC and we'll automatically fetch all your active and lapsed policies across every branch.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5" })
							},
							{
								title: "Track cash value",
								desc: "Watch your premiums grow with real-time tracking of reversionary bonuses and projected maturity values.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" })
							},
							{
								title: "Set savings goals",
								desc: "Link policies to life goals — whether it's Hajj, education, or retirement — and track progress in real time.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5" })
							},
							{
								title: "Claim digitally",
								desc: "Upload documents from your phone and track your claim status step-by-step through our 7-stage pipeline.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
							}
						].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-10 md:pl-16 group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -left-5 top-0 h-10 w-10 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors",
									children: step.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold font-display mb-2",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground leading-relaxed",
									children: step.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "insights",
				className: "py-16 md:py-24 bg-card/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between mb-8 md:mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), " Insights"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold font-display tracking-tight",
							children: "Latest from SLIC"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "hidden sm:flex",
							children: ["View all articles ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-6",
						children: [
							{
								tag: "Financial Planning",
								date: "Mar 15, 2026",
								title: "5 reasons why endowment plans outperform savings accounts",
								read: "8 min read",
								desc: "How reversionary bonuses and tax benefits under Section 62 can generate 2-3x more wealth than traditional savings."
							},
							{
								tag: "Claims Guide",
								date: "Feb 28, 2026",
								title: "Your step-by-step guide to filing a death claim online",
								read: "5 min read",
								desc: "Everything you need to know about the digital claim process, from required documents to payout timelines."
							},
							{
								tag: "Industry News",
								date: "Jan 20, 2026",
								title: "SLIC announces record ₨42B bonus payout for FY25-26",
								read: "4 min read",
								desc: "State Life has declared its highest-ever reversionary bonus rate at 4.8%, benefiting over 2 million policyholders."
							}
						].map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group surface-elevated overflow-hidden card-spotlight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-44 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-12 w-12 text-primary/30 group-hover:scale-110 transition-transform" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-xs text-muted-foreground mb-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "badge-pill-info",
												children: post.tag
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.date }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", post.read] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold font-display text-lg mb-2 group-hover:text-primary transition-colors",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: post.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all",
										children: ["Read more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								]
							})]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-16 md:py-20 max-w-[800px] mx-auto px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-10 md:mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight mb-3 md:mb-4",
						children: "Common questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm sm:text-base text-muted-foreground",
						children: "Everything you need to know about the product and billing."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: [
						{
							q: "Is this replacing my physical agent?",
							a: "No. The Digital Hub works alongside your agent, giving you 24/7 visibility into the details they manage. You can still call them anytime. Think of it as your policy's real-time dashboard, not a replacement for personal service."
						},
						{
							q: "How secure is my financial data?",
							a: "We use 256-bit encryption at rest and in transit. Our infrastructure is fully compliant with State Bank of Pakistan regulations and SECP data protection guidelines. Your data is stored locally in secured, geo-redundant facilities within Pakistan."
						},
						{
							q: "Can I pay premiums directly through the app?",
							a: "Yes. We support 1-Click payments via Raast, EasyPaisa, JazzCash, and all major credit/debit cards. You can also set up auto-debit instructions so you never miss a premium again."
						},
						{
							q: "How long do claim payouts take?",
							a: "For straightforward maturity or survival benefits, our automated system can process payouts to your registered IBAN within 24-48 hours. Death claims typically require 5-7 business days for complete verification."
						},
						{
							q: "What documents do I need to file a claim?",
							a: "For maturity claims: policy document, CNIC, and bank account details. For death claims: death certificate, CNIC of nominee, policy document, and claim form. All documents can be uploaded directly through the Digital Hub."
						},
						{
							q: "Can I have multiple policies under one login?",
							a: "Absolutely. Once you verify your CNIC, all policies in your name — whether active, lapsed, or matured — will appear in your dashboard. You can manage them all from a single account."
						},
						{
							q: "What happens if I miss a premium payment?",
							a: "You have a 30-day grace period during which your coverage continues. After that, the policy enters a lapsed-revivable state for 2 years. You can revive it by paying all overdue premiums with a small late fee."
						},
						{
							q: "Is the platform available in Urdu?",
							a: "Urdu language support is coming in Q3 2026. Currently the platform is available in English. All policy documents and communications remain available in both Urdu and English as per regulatory requirements."
						}
					].map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border rounded-xl bg-card overflow-hidden transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "w-full flex items-center justify-between p-5 text-left focus:outline-none",
							onClick: () => setOpenFaq(openFaq === i ? null : i),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: faq.q
							}), openFaq === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-5 w-5 text-muted-foreground shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-muted-foreground shrink-0" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `px-5 text-muted-foreground overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`,
							children: faq.a
						})]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative py-20 md:py-32 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-hero-bg opacity-[0.04]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-primary/10 rounded-full blur-[100px] animate-float" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-2xl mx-auto px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-2xl gradient-hero-bg mx-auto flex items-center justify-center mb-8 shadow-xl hover:scale-110 transition-transform cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary-foreground font-bold text-2xl font-display",
									children: "S"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-4xl md:text-5xl font-bold font-display tracking-tight mb-6",
								children: "Ready to take control?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-10 leading-relaxed text-lg",
								children: "No paperwork. No waiting in line. Just clear, real-time control over every rupee of your insurance portfolio. Join 3.6 million Pakistanis who trust State Life."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row justify-center gap-3 sm:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base rounded-xl shadow-[0_0_40px_rgba(0,77,64,0.35)] hover:shadow-[0_0_60px_rgba(0,77,64,0.55)] btn-magnetic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										children: ["Open my portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "lg",
									className: "h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#products",
										children: "View products"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), " No hidden fees"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), " 256-bit encryption"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), " Govt. backed"]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border bg-card/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[1400px] mx-auto px-4 sm:px-6 py-10 md:py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-9 w-9 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary-foreground font-bold text-sm font-display",
												children: "S"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold font-display",
											children: "SLIC Digital Hub"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-widest text-muted-foreground",
											children: "State Life Insurance"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground max-w-md leading-relaxed",
										children: "Demonstration platform for State Life Insurance Corporation of Pakistan (SLIC). SLIC is Pakistan's largest life insurer with over 70 years of service, 180+ branches, and 3.6 million policyholders."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Head Office, Karachi"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " 0800-01234"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold text-sm mb-4",
								children: "Products"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2.5 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Endowment Plans"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Child Education"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Whole Life"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Retirement Annuity"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Term Assurance"
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold text-sm mb-4",
								children: "Support"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2.5 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Contact us"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Find a branch"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Claim guide"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Privacy policy"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-foreground transition-colors",
										children: "Terms of use"
									}) })
								]
							})] })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 SLIC Digital Hub. All rights reserved. Not for actual financial use — demonstration purposes only." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "hover:text-foreground transition-colors",
									children: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "hover:text-foreground transition-colors",
									children: "Terms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "hover:text-foreground transition-colors",
									children: "Accessibility"
								})
							]
						})]
					})
				})]
			})
		]
	});
}
function HeroShowcase() {
	const barsRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = barsRef.current;
		if (!el) return;
		const bars = el.querySelectorAll(".chart-bar");
		let frame;
		let tick = 0;
		function animate() {
			tick += .025;
			bars.forEach((bar, i) => {
				const base = [
					35,
					55,
					40,
					70,
					50,
					80,
					60,
					95,
					75,
					45,
					65,
					85
				][i % 12];
				const wave = Math.sin(tick + i * .8) * 8;
				bar.style.height = `${Math.max(8, base + wave)}%`;
			});
			frame = requestAnimationFrame(animate);
		}
		frame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-20 bg-primary/5 rounded-full blur-[100px] animate-float pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-10 bg-gold/5 rounded-full blur-[80px] animate-float [animation-delay:3000ms] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-6 py-4 border-b border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-7 w-7 rounded-lg gradient-hero-bg flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary-foreground font-bold text-[10px]",
								children: "S"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold text-foreground/80",
							children: "Digital Hub"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-success animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: "Live"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-colors group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Portfolio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 text-success animate-pulse" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xl font-bold font-display tabular-nums text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedTicker, {
											target: 4.85,
											prefix: "₨",
											suffix: "M"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-success mt-1 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-2.5 w-2.5" }), " +12.3% this year"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 rounded-xl p-4 border border-white/5 hover:border-gold/20 transition-colors group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Bonuses"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-gold animate-pulse [animation-delay:500ms]" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xl font-bold font-display tabular-nums text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedTicker, {
											target: 1.24,
											prefix: "₨",
											suffix: "M"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-gold mt-1 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-2.5 w-2.5" }), " +4.8% rate declared"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/[0.03] rounded-xl p-4 border border-white/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3 w-3 text-primary" }), " Premium Growth"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-success" }), " Live"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: barsRef,
									className: "flex items-end gap-1.5 h-20",
									children: [
										35,
										55,
										40,
										70,
										50,
										80,
										60,
										95,
										75,
										45,
										65,
										85
									].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 flex flex-col items-center gap-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "chart-bar w-full rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/30 hover:to-primary/60 transition-all duration-75 cursor-pointer",
											style: { height: `${h}%` }
										})
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-2 text-[8px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jan" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mar" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "May" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jul" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sep" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nov" })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/[0.04] rounded-xl p-3 border border-white/5 animate-float",
								style: { animationDuration: "5s" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-mono text-muted-foreground",
											children: "END-1001"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "badge-pill-success text-[8px] py-0",
											children: "Active"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold font-display",
										children: "Shad Abad Endowment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mt-2 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "₨2.5M assured"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-success",
											children: "4.5% bonus"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/[0.04] rounded-xl p-3 border border-white/5 animate-float",
								style: {
									animationDuration: "6s",
									animationDelay: "1s"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-mono text-muted-foreground",
											children: "CHILD-EDU"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "badge-pill-info text-[8px] py-0",
											children: "Growing"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold font-display",
										children: "Education Plan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mt-2 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "₨5M assured"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-info",
											children: "18yr term"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-4 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-16 w-16 flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "absolute inset-0 h-full w-full animate-float",
										style: { animationDuration: "8s" },
										viewBox: "0 0 64 64",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "32",
											cy: "32",
											r: "28",
											fill: "none",
											stroke: "oklch(0.72 0.14 85 / 0.3)",
											strokeWidth: "1.5",
											strokeDasharray: "4 4",
											className: "animate-[spin_8s_linear_infinite]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "32",
											cy: "32",
											r: "22",
											fill: "none",
											stroke: "oklch(0.68 0.13 165 / 0.2)",
											strokeWidth: "1",
											strokeDasharray: "3 6",
											className: "animate-[spin_12s_linear_infinite_reverse]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full gradient-gold-bg flex items-center justify-center shadow-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-gold-foreground" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold font-display",
									children: "Govt. Backed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground",
									children: "Since 1952"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-white/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold font-display text-gold",
									children: "AA+"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground",
									children: "Sovereign Rating"
								})] })
							]
						})
					]
				})]
			})
		]
	});
}
function AnimatedTicker({ target, prefix = "", suffix = "" }) {
	const [val, setVal] = (0, import_react.useState)(0);
	const rafRef = (0, import_react.useRef)(0);
	const startRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		startRef.current = Date.now();
		function tick() {
			const elapsed = (Date.now() - startRef.current) / 1e3;
			const progress = Math.min(1, elapsed / 2);
			const eased = 1 - Math.pow(1 - progress, 3);
			setVal(eased * target);
			if (progress < 1) rafRef.current = requestAnimationFrame(tick);
			else rafRef.current = requestAnimationFrame(tick);
		}
		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
		prefix,
		val.toFixed(2),
		suffix
	] });
}
function AnimatedCounter({ value, enabled }) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	const startedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!enabled || startedRef.current) return;
		startedRef.current = true;
		const duration = 1500;
		const steps = 30;
		const increment = value / steps;
		let current = 0;
		const timer = setInterval(() => {
			current += increment;
			if (current >= value) {
				setDisplay(value);
				clearInterval(timer);
			} else setDisplay(Math.floor(current));
		}, duration / steps);
		return () => clearInterval(timer);
	}, [enabled, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.floor(display) });
}
function InteractivePremiumEstimator() {
	const [coverage, setCoverage] = (0, import_react.useState)([1e6]);
	const formatPKR = (num) => {
		return new Intl.NumberFormat("en-PK", {
			style: "currency",
			currency: "PKR",
			maximumFractionDigits: 0
		}).format(num);
	};
	const estimatedPremium = Math.round(coverage[0] * .045 / 12);
	const estimatedCashValue = Math.round(coverage[0] * 2.5);
	const estimatedBonus = Math.round(coverage[0] * .85);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-elevated p-6 rounded-2xl glass card-spotlight",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-between items-end mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-muted-foreground",
					children: "Desired Coverage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl font-bold font-display mt-1",
					children: formatPKR(coverage[0])
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				defaultValue: [1e6],
				max: 1e7,
				min: 5e5,
				step: 1e5,
				value: coverage,
				onValueChange: setCoverage,
				className: "mb-8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-4 border-t border-border/50 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1",
						children: "Est. Monthly Premium"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-bold font-display text-primary",
						children: formatPKR(estimatedPremium)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1",
						children: "Est. Maturity Value"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-bold font-display text-gold",
						children: formatPKR(estimatedCashValue)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1",
						children: "Est. Bonus (20yr)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-bold font-display text-info",
						children: formatPKR(estimatedBonus)
					})] })
				]
			})
		]
	});
}
//#endregion
export { Landing as component };
