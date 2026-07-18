//#region node_modules/.nitro/vite/services/ssr/assets/format-9Uks8Fou.js
/** Format PKR using the lakh/crore (Indian/Pakistani) grouping — e.g. 12,34,567. */
function formatPKR(n, opts = {}) {
	if (n == null || Number.isNaN(n)) return "—";
	const { decimals = 0, compact = false } = opts;
	if (compact) return compactPKR(n);
	const [intPart, decPart] = Math.abs(n).toFixed(decimals).split(".");
	const lastThree = intPart.slice(-3);
	const rest = intPart.slice(0, -3);
	const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
	return `${n < 0 ? "-" : ""}₨${grouped}${decPart ? "." + decPart : ""}`;
}
/** ₨12L, ₨1.2Cr etc. */
function compactPKR(n) {
	if (Math.abs(n) >= 1e7) return `₨${(n / 1e7).toFixed(2)}Cr`;
	if (Math.abs(n) >= 1e5) return `₨${(n / 1e5).toFixed(2)}L`;
	if (Math.abs(n) >= 1e3) return `₨${(n / 1e3).toFixed(1)}K`;
	return `₨${Math.round(n)}`;
}
function formatCNIC(raw) {
	const digits = raw.replace(/\D/g, "").slice(0, 13);
	if (digits.length <= 5) return digits;
	if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
	return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}
function formatPhone(raw) {
	const d = raw.replace(/\D/g, "").replace(/^92/, "").slice(0, 10);
	if (d.length <= 3) return `+92 ${d}`;
	return `+92 ${d.slice(0, 3)}-${d.slice(3)}`;
}
function relativeTime(iso) {
	const then = new Date(iso).getTime();
	const s = Math.round((Date.now() - then) / 1e3);
	if (s < 60) return "just now";
	const m = Math.round(s / 60);
	if (m < 60) return `${m}m ago`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}h ago`;
	const d = Math.round(h / 24);
	if (d < 7) return `${d}d ago`;
	if (d < 30) return `${Math.round(d / 7)}w ago`;
	if (d < 365) return `${Math.round(d / 30)}mo ago`;
	return `${Math.round(d / 365)}y ago`;
}
//#endregion
export { relativeTime as a, formatPhone as i, formatCNIC as n, formatPKR as r, compactPKR as t };
