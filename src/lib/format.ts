// Pakistan formatting helpers.

/** Format PKR using the lakh/crore (Indian/Pakistani) grouping — e.g. 12,34,567. */
export function formatPKR(n: number | null | undefined, opts: { decimals?: number; compact?: boolean } = {}) {
  if (n == null || Number.isNaN(n)) return "—";
  const { decimals = 0, compact = false } = opts;
  if (compact) return compactPKR(n);
  const [intPart, decPart] = Math.abs(n).toFixed(decimals).split(".");
  const lastThree = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  const sign = n < 0 ? "-" : "";
  return `${sign}₨${grouped}${decPart ? "." + decPart : ""}`;
}

/** ₨12L, ₨1.2Cr etc. */
export function compactPKR(n: number) {
  if (Math.abs(n) >= 1_00_00_000) return `₨${(n / 1_00_00_000).toFixed(2)}Cr`;
  if (Math.abs(n) >= 1_00_000) return `₨${(n / 1_00_000).toFixed(2)}L`;
  if (Math.abs(n) >= 1_000) return `₨${(n / 1_000).toFixed(1)}K`;
  return `₨${Math.round(n)}`;
}

export function formatCNIC(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

export function isValidCNIC(v: string) {
  return /^\d{5}-\d{7}-\d$/.test(v);
}

export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^92/, "").slice(0, 10);
  if (d.length <= 3) return `+92 ${d}`;
  return `+92 ${d.slice(0, 3)}-${d.slice(3)}`;
}

export function policyNumber() {
  const y = new Date().getFullYear();
  return `SL${y}${Math.floor(Math.random() * 900000 + 100000)}`;
}

export function claimNumber() {
  const y = new Date().getFullYear();
  return `CL${y}${Math.floor(Math.random() * 900000 + 100000)}`;
}

export function daysBetween(a: Date | string, b: Date | string) {
  const A = typeof a === "string" ? new Date(a) : a;
  const B = typeof b === "string" ? new Date(b) : b;
  return Math.round((A.getTime() - B.getTime()) / (1000 * 60 * 60 * 24));
}

export function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const s = Math.round((now - then) / 1000);
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
