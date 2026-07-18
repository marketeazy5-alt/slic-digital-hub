import { r as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn } from "./button-BpE9Czok.mjs";
import { ot as ChevronsUpDown, st as ChevronUp, ut as ChevronDown, y as Search } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-C2yFcY9c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataTable({ data, columns, keyExtractor, searchable = true, searchPlaceholder = "Search...", pageSize: defaultPageSize = 10, pageSizeOptions = [
	5,
	10,
	25,
	50
], emptyMessage = "No data found.", onRowClick }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [sortKey, setSortKey] = (0, import_react.useState)(null);
	const [sortDir, setSortDir] = (0, import_react.useState)("asc");
	const [page, setPage] = (0, import_react.useState)(0);
	const [pageSize, setPageSize] = (0, import_react.useState)(defaultPageSize);
	const filtered = (0, import_react.useMemo)(() => {
		let items = data;
		if (search.trim()) {
			const q = search.toLowerCase();
			const filterableKeys = columns.filter((c) => c.filterable !== false).map((c) => c.key);
			items = items.filter((item) => filterableKeys.some((k) => String(item[k] ?? "").toLowerCase().includes(q)));
		}
		if (sortKey) items = [...items].sort((a, b) => {
			const av = a[sortKey] ?? "";
			const bv = b[sortKey] ?? "";
			const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
			return sortDir === "asc" ? cmp : -cmp;
		});
		return items;
	}, [
		data,
		search,
		sortKey,
		sortDir,
		columns
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
	const safePage = Math.min(page, totalPages - 1);
	const pageData = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize);
	function toggleSort(key) {
		if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		searchable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: search,
				onChange: (e) => {
					setSearch(e.target.value);
					setPage(0);
				},
				placeholder: searchPlaceholder,
				className: "pl-9"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-lg border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border bg-muted/30",
					children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: cn("text-left p-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold", col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors", col.className),
						onClick: () => col.sortable && toggleSort(col.key),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [col.label, col.sortable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex",
								children: sortKey === col.key ? sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "h-3 w-3 opacity-40" })
							})]
						})
					}, col.key))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: pageData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: columns.length,
						className: "p-8 text-center text-muted-foreground",
						children: emptyMessage
					}) }) : pageData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						onClick: () => onRowClick?.(item),
						className: cn("transition-colors", onRowClick ? "cursor-pointer hover:bg-muted/30" : ""),
						children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("p-3", col.className),
							children: col.render ? col.render(item) : String(item[col.key] ?? "—")
						}, col.key))
					}, keyExtractor(item)))
				})]
			})
		}),
		totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mt-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Rows per page:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: pageSize,
						onChange: (e) => {
							setPageSize(Number(e.target.value));
							setPage(0);
						},
						className: "bg-background border border-border rounded px-2 py-1 text-xs",
						children: pageSizeOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							safePage * pageSize + 1,
							"–",
							Math.min((safePage + 1) * pageSize, filtered.length),
							" of ",
							filtered.length
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPage(0),
						disabled: safePage === 0,
						className: "px-2 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors",
						children: "First"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPage((p) => Math.max(0, p - 1)),
						disabled: safePage === 0,
						className: "px-2 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors",
						children: "Prev"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
						disabled: safePage >= totalPages - 1,
						className: "px-2 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors",
						children: "Next"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPage(totalPages - 1),
						disabled: safePage >= totalPages - 1,
						className: "px-2 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors",
						children: "Last"
					})
				]
			})]
		})
	] });
}
//#endregion
export { DataTable as t };
