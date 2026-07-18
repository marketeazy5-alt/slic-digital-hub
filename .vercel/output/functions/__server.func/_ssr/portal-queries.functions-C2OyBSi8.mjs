import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { t as createServerRpc } from "./createServerRpc-MBa5GZ-L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-queries.functions-C2OyBSi8.js
var getMyRoles_createServerFn_handler = createServerRpc({
	id: "87b3567cd273e867ba5913be0d7e64e7c61875a9fb17f0877743c49ff614fec2",
	name: "getMyRoles",
	filename: "src/lib/portal-queries.functions.ts"
}, (opts) => getMyRoles.__executeServer(opts));
var getMyRoles = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyRoles_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
	return { roles: (data ?? []).map((r) => r.role) };
});
var grantDemoRole_createServerFn_handler = createServerRpc({
	id: "02741e54a20dfd84066c4820b954733c4fc6f9912aa9f1265f4a5c154c333e9e",
	name: "grantDemoRole",
	filename: "src/lib/portal-queries.functions.ts"
}, (opts) => grantDemoRole.__executeServer(opts));
var grantDemoRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(grantDemoRole_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	await supabaseAdmin.from("user_roles").upsert({
		user_id: context.userId,
		role: data.role
	}, { onConflict: "user_id,role" });
	return { ok: true };
});
async function assertRole(context, roles) {
	const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
	if (!(data ?? []).map((r) => r.role).some((r) => roles.includes(r))) throw new Error("Forbidden — role required: " + roles.join(", "));
}
var getAgentBook_createServerFn_handler = createServerRpc({
	id: "4f27023f02f00fee1d5782150f408f7303fcb006089873fcb18ca9a7fbf915b3",
	name: "getAgentBook",
	filename: "src/lib/portal-queries.functions.ts"
}, (opts) => getAgentBook.__executeServer(opts));
var getAgentBook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAgentBook_createServerFn_handler, async ({ context }) => {
	await assertRole(context, ["agent", "admin"]);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const [customers, policies, dueSoon, lapse, claims] = await Promise.all([
		supabaseAdmin.from("profiles").select("id, full_name, cnic, phone, monthly_income, kyc_status, risk_rating, branches(name, city)").limit(50),
		supabaseAdmin.from("policies").select("id, policy_number, status, sum_assured, premium_amount, next_premium_due, customer_id, products(name)").order("next_premium_due", { ascending: true }).limit(200),
		supabaseAdmin.from("premiums").select("id, amount, due_date, status, policy_id, policies(policy_number, customer_id)").in("status", ["pending", "overdue"]).order("due_date", { ascending: true }).limit(30),
		supabaseAdmin.from("lapse_predictions").select("*, policies(policy_number, customer_id)").order("probability", { ascending: false }).limit(20),
		supabaseAdmin.from("claims").select("id, claim_number, status, claim_amount, fraud_score, filed_at, policies(policy_number, customer_id)").order("filed_at", { ascending: false }).limit(20)
	]);
	return {
		customers: customers.data ?? [],
		policies: policies.data ?? [],
		dueSoon: dueSoon.data ?? [],
		atRisk: lapse.data ?? [],
		claims: claims.data ?? []
	};
});
var getAdminOverview_createServerFn_handler = createServerRpc({
	id: "31ac20df5403143799078189bef1f65115092cc346a8078c1ee26adaf0a21ae4",
	name: "getAdminOverview",
	filename: "src/lib/portal-queries.functions.ts"
}, (opts) => getAdminOverview.__executeServer(opts));
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminOverview_createServerFn_handler, async ({ context }) => {
	await assertRole(context, ["admin"]);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const [users, roles, branches, rings, products, sagaEvents] = await Promise.all([
		supabaseAdmin.from("profiles").select("id, full_name, cnic, phone, kyc_status, created_at, branches(name)").order("created_at", { ascending: false }).limit(100),
		supabaseAdmin.from("user_roles").select("user_id, role"),
		supabaseAdmin.from("branches").select("*").order("city"),
		supabaseAdmin.from("fraud_rings").select("*").order("score", { ascending: false }).limit(20),
		supabaseAdmin.from("products").select("*"),
		supabaseAdmin.from("saga_events").select("saga_id, step, status, created_at").order("created_at", { ascending: false }).limit(30)
	]);
	return {
		users: users.data ?? [],
		roles: roles.data ?? [],
		branches: branches.data ?? [],
		rings: rings.data ?? [],
		products: products.data ?? [],
		sagaEvents: sagaEvents.data ?? []
	};
});
var getAnalytics_createServerFn_handler = createServerRpc({
	id: "d8691e180f424a967cf6f6ffb379dcf634f0981d4672c2bcc8a3cb1c9ffbc48b",
	name: "getAnalytics",
	filename: "src/lib/portal-queries.functions.ts"
}, (opts) => getAnalytics.__executeServer(opts));
var getAnalytics = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAnalytics_createServerFn_handler, async ({ context }) => {
	await assertRole(context, ["admin", "agent"]);
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const [policies, premiums, claims, lapse, branches, products] = await Promise.all([
		supabaseAdmin.from("policies").select("id, status, sum_assured, premium_amount, commencement_date, branch_id, product_id"),
		supabaseAdmin.from("premiums").select("amount, paid_date, status, due_date"),
		supabaseAdmin.from("claims").select("id, status, claim_amount, fraud_score, filed_at"),
		supabaseAdmin.from("lapse_predictions").select("probability, generated_at"),
		supabaseAdmin.from("branches").select("id, name, city"),
		supabaseAdmin.from("products").select("code, name")
	]);
	const P = policies.data ?? [];
	const PR = premiums.data ?? [];
	const CL = claims.data ?? [];
	const totalAUM = P.reduce((s, p) => s + Number(p.sum_assured || 0), 0);
	const activePolicies = P.filter((p) => p.status === "active").length;
	const collectedPremium = PR.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount || 0), 0);
	const overduePremium = PR.filter((p) => p.status === "overdue" || p.status === "due").reduce((s, p) => s + Number(p.amount || 0), 0);
	const claimsPaid = CL.filter((c) => c.status === "disbursed").reduce((s, c) => s + Number(c.claim_amount || 0), 0);
	const flagged = CL.filter((c) => Number(c.fraud_score || 0) > .6).length;
	const statusBreakdown = P.reduce((acc, p) => {
		acc[p.status] = (acc[p.status] || 0) + 1;
		return acc;
	}, {});
	const branchMap = new Map((branches.data ?? []).map((b) => [b.id, b]));
	const branchPerf = Object.entries(P.reduce((acc, p) => {
		const key = p.branch_id ?? "unknown";
		acc[key] = acc[key] || {
			count: 0,
			aum: 0
		};
		acc[key].count += 1;
		acc[key].aum += Number(p.sum_assured || 0);
		return acc;
	}, {})).map(([id, v]) => ({
		branch: branchMap.get(id)?.name ?? "—",
		city: branchMap.get(id)?.city ?? "",
		...v
	})).sort((a, b) => b.aum - a.aum);
	const buckets = {};
	const now = /* @__PURE__ */ new Date();
	for (let i = 11; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		buckets[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`] = 0;
	}
	PR.filter((p) => p.status === "paid" && p.paid_date).forEach((p) => {
		const d = new Date(p.paid_date);
		const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
		if (k in buckets) buckets[k] += Number(p.amount || 0);
	});
	const monthly = Object.entries(buckets).map(([month, amount]) => ({
		month,
		amount
	}));
	const lapseBuckets = {
		low: 0,
		medium: 0,
		high: 0
	};
	(lapse.data ?? []).forEach((l) => {
		const p = Number(l.probability || 0);
		if (p < .33) lapseBuckets.low++;
		else if (p < .66) lapseBuckets.medium++;
		else lapseBuckets.high++;
	});
	return {
		kpis: {
			totalAUM,
			activePolicies,
			collectedPremium,
			overduePremium,
			claimsPaid,
			flagged,
			totalPolicies: P.length,
			totalClaims: CL.length
		},
		statusBreakdown,
		branchPerf,
		monthly,
		lapseBuckets,
		products: products.data ?? []
	};
});
//#endregion
export { getAdminOverview_createServerFn_handler, getAgentBook_createServerFn_handler, getAnalytics_createServerFn_handler, getMyRoles_createServerFn_handler, grantDemoRole_createServerFn_handler };
