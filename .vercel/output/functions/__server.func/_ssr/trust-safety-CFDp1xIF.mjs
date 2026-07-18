import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as RefreshCw, h as Shield, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { c as useServerFn, t as AppShell } from "./app-shell-CFjUDRoE.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getFraudLandscape } from "./customer-queries.functions-B5cT18LS.mjs";
import { t as detectFraudRings } from "./intelligence.functions-Bu_xEd0P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-safety-CFDp1xIF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrustSafety() {
	const fetch = useServerFn(getFraudLandscape);
	const rerun = useServerFn(detectFraudRings);
	const { data, refetch } = useQuery({
		queryKey: ["fraud"],
		queryFn: () => fetch({})
	});
	const rings = data?.rings ?? [];
	const [selectedRing, setSelectedRing] = (0, import_react.useState)(null);
	const active = rings.find((r) => r.id === selectedRing) ?? rings[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Trust & Safety",
		subtitle: "Real-time fraud-ring detection across our claims graph.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: async () => {
				await rerun({});
				await refetch();
				toast.success("Fraud graph recomputed");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5" }), " Re-run detection"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-elevated p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold font-display",
							children: "How this works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1 leading-relaxed max-w-xl",
							children: "Every claim is linked in a graph to the doctors, hospitals, phone numbers, addresses, and agents involved. A union-find algorithm identifies clusters where multiple claims share entities — a strong signal of coordinated fraud. Rings scoring above threshold auto-flag their member claims for underwriter review."
						})] })]
					})
				}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RingGraph, {
					ring: active,
					allEdges: data?.edges ?? []
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-elevated p-10 text-center text-sm text-muted-foreground",
					children: "No fraud rings detected yet."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Detected rings"
					}),
					rings.map((r) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedRing(r.id),
							className: `w-full text-left surface-elevated p-4 border-l-4 transition-all ${active?.id === r.id ? "border-l-warning shadow-lg" : "border-l-transparent hover:border-l-primary"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-mono text-muted-foreground",
										children: ["ring-", r.id.slice(0, 6)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-medium",
									children: [r.member_claim_ids.length, " claims"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1 line-clamp-2",
									children: r.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 h-1 bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-warning",
											style: { width: `${Math.min(100, r.score * 5)}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono",
										children: Number(r.score).toFixed(1)
									})]
								})
							]
						}, r.id);
					}),
					rings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Run detection to populate."
					})
				]
			})]
		})
	});
}
function RingGraph({ ring, allEdges }) {
	const nodes = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Map();
		const memberSet = new Set(ring.member_claim_ids);
		for (const e of allEdges) {
			if (e.from_type === "claim" && memberSet.has(e.from_id)) {
				set.set(`claim:${e.from_id}`, {
					type: "claim",
					id: e.from_id
				});
				set.set(`${e.to_type}:${e.to_id}`, {
					type: e.to_type,
					id: e.to_id
				});
			}
			if (e.to_type === "claim" && memberSet.has(e.to_id)) {
				set.set(`claim:${e.to_id}`, {
					type: "claim",
					id: e.to_id
				});
				set.set(`${e.from_type}:${e.from_id}`, {
					type: e.from_type,
					id: e.from_id
				});
			}
		}
		return Array.from(set.entries()).map(([k, v]) => ({
			key: k,
			...v
		}));
	}, [ring, allEdges]);
	const edges = (0, import_react.useMemo)(() => {
		const memberSet = new Set(ring.member_claim_ids);
		return allEdges.filter((e) => e.from_type === "claim" && memberSet.has(e.from_id) || e.to_type === "claim" && memberSet.has(e.to_id));
	}, [ring, allEdges]);
	const size = 420;
	const cx = size / 2;
	const cy = size / 2;
	const radius = size * .38;
	const positioned = nodes.map((n, i) => {
		const angle = i / nodes.length * Math.PI * 2 - Math.PI / 2;
		return {
			...n,
			x: cx + radius * Math.cos(angle),
			y: cy + radius * Math.sin(angle)
		};
	});
	const pos = new Map(positioned.map((n) => [n.key, n]));
	const typeColor = {
		claim: "var(--color-warning)",
		doctor: "var(--color-info)",
		hospital: "var(--color-primary)",
		phone: "var(--color-muted-foreground)",
		agent: "var(--color-destructive)",
		address: "var(--color-emerald-400)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-elevated p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold font-display",
					children: "Cluster visualization"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: ring.summary
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold font-display tabular-nums text-warning",
						children: Number(ring.score).toFixed(1)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Risk score"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: size,
					height: size,
					className: "max-w-full",
					children: [edges.map((e, i) => {
						const a = pos.get(`${e.from_type}:${e.from_id}`);
						const b = pos.get(`${e.to_type}:${e.to_id}`);
						if (!a || !b) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: a.x,
							y1: a.y,
							x2: b.x,
							y2: b.y,
							stroke: "var(--color-border)",
							strokeWidth: 1.5
						}, i);
					}), positioned.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: n.x,
						cy: n.y,
						r: n.type === "claim" ? 14 : 10,
						fill: typeColor[n.type] ?? "var(--color-muted)",
						stroke: "var(--color-background)",
						strokeWidth: 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: n.x,
						y: n.y + 26,
						textAnchor: "middle",
						className: "fill-foreground text-[10px] font-mono",
						children: [
							n.type,
							":",
							n.id.slice(0, 6)
						]
					})] }, n.key))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3 justify-center mt-4 text-xs",
				children: Object.entries(typeColor).map(([t, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2.5 w-2.5 rounded-full",
						style: { background: c }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground capitalize",
						children: t
					})]
				}, t))
			})
		]
	});
}
//#endregion
export { TrustSafety as component };
