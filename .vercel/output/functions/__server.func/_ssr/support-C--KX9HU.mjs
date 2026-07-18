import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { E as Phone, F as MapPin, I as Mail, J as FileText, M as Minus, N as MessageCircle, at as CircleAlert, it as CircleCheck, n as X, nt as Clock, o as Upload, q as File, rt as CircleQuestionMark, w as Plus, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DO3DZj4v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-C--KX9HU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FileUpload({ accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx", maxSizeMB = 10, multiple = true, onFilesChanged, className }) {
	const [files, setFiles] = (0, import_react.useState)([]);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const addFiles = (0, import_react.useCallback)((fileList) => {
		const newFiles = Array.from(fileList).map((f) => ({
			name: f.name,
			size: f.size,
			status: "complete"
		}));
		const updated = multiple ? [...files, ...newFiles] : newFiles;
		setFiles(updated);
		onFilesChanged?.(updated);
	}, [
		files,
		multiple,
		onFilesChanged
	]);
	const removeFile = (0, import_react.useCallback)((index) => {
		const updated = files.filter((_, i) => i !== index);
		setFiles(updated);
		onFilesChanged?.(updated);
	}, [files, onFilesChanged]);
	function formatSize(bytes) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onDragOver: (e) => {
				e.preventDefault();
				setDragOver(true);
			},
			onDragLeave: () => setDragOver(false),
			onDrop: (e) => {
				e.preventDefault();
				setDragOver(false);
				addFiles(e.dataTransfer.files);
			},
			onClick: () => inputRef.current?.click(),
			className: cn("border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200", dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/20"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept,
				multiple,
				className: "hidden",
				onChange: (e) => e.target.files && addFiles(e.target.files)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-sm",
					children: "Drop files here or click to browse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: [
						"Accepted: ",
						accept,
						" · Max ",
						maxSizeMB,
						"MB per file"
					]
				})] })]
			})]
		}), files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: files.map((file, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-lg bg-muted flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "h-4 w-4 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium truncate",
							children: file.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: formatSize(file.size)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							file.status === "complete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }),
							file.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								className: "h-4 w-4 text-destructive",
								title: file.error
							}),
							file.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									removeFile(i);
								},
								className: "opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 text-muted-foreground" })
							})
						]
					})
				]
			}, i))
		})]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var faqs = [
	{
		q: "How do I file a claim?",
		a: "Navigate to the Claims Hub from the sidebar, then click 'File new claim'. You'll need your policy number and supporting documents ready for upload."
	},
	{
		q: "What payment methods are accepted?",
		a: "We accept Raast, EasyPaisa, JazzCash, all major credit/debit cards, bank transfers, and auto-debit instructions."
	},
	{
		q: "How do I update my contact information?",
		a: "Go to Settings → Profile from the sidebar menu. You can update your phone number, address, and other contact details there."
	},
	{
		q: "Can I view my policy documents online?",
		a: "Yes. Navigate to Policies → select a policy → Documents tab to view and download all your policy documents."
	},
	{
		q: "How do I add or change a nominee?",
		a: "Nominee changes can be made from the policy detail view under the Nominees tab. This requires verification."
	},
	{
		q: "What is the grace period for premium payments?",
		a: "You have a 30-day grace period after the due date. During this time, your coverage continues uninterrupted."
	}
];
function SupportPage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Support Center",
		subtitle: "We're here to help.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "faq",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "faq",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }), " FAQ"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "ticket",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " Submit ticket"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "contact",
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Contact us"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "faq",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "Search FAQs...",
								className: "pl-9"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [filteredFaqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							}, i)), filteredFaqs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-10 text-sm text-muted-foreground",
								children: "No FAQs match your search. Try different keywords or submit a ticket."
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ticket",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-2xl space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold font-display mb-4",
								children: "Submit a support ticket"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "space-y-4",
								onSubmit: (e) => {
									e.preventDefault();
									toast.success("Ticket submitted", { description: "We'll get back to you within 24 hours." });
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Payment issue" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Claim question" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Policy inquiry" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Technical support" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Account issue" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Low" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Medium" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "High" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Urgent" })
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 5,
											placeholder: "Describe your issue in detail..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Attachments (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
											accept: ".pdf,.jpg,.png,.doc,.docx",
											maxSizeMB: 10
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "btn-magnetic",
										children: "Submit ticket"
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "contact",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-6 max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold font-display text-lg mb-2",
									children: "Phone support"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-4",
									children: "Speak directly with our support team during business hours."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary" }), " 0800-01234 (Toll-free)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Mon–Fri, 9:00 AM – 6:00 PM"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Sat, 9:00 AM – 2:00 PM"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-elevated p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-6 w-6 text-gold" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold font-display text-lg mb-2",
									children: "Email & chat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-4",
									children: "Send us an email or use the live chat feature."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-gold" }), " support@slicdigital.pk"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-gold" }), " Live chat (available 24/7)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold" }), " 180+ branches nationwide"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "mt-4 w-full btn-magnetic",
									children: "Start live chat"
								})
							]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { SupportPage as component };
