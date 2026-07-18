import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Role = "customer" | "agent" | "admin";

export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r) => r.role as Role);
    return { roles };
  });

// Demo helper: allow any signed-in user to self-assign agent/admin/analytics roles
// so all portals are explorable. In production this would be admin-gated.
export const grantDemoRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { role: Role }) => v)
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: data.role }, { onConflict: "user_id,role" });
    return { ok: true };
  });

async function assertRole(context: any, roles: Role[]) {
  const { data } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId);
  const mine = (data ?? []).map((r: any) => r.role);
  if (!mine.some((r: string) => roles.includes(r as Role))) {
    throw new Error("Forbidden — role required: " + roles.join(", "));
  }
}

// ============ AGENT PORTAL ============
export const getAgentBook = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertRole(context, ["agent", "admin"]);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [customers, policies, dueSoon, lapse, claims] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id, full_name, cnic, phone, monthly_income, kyc_status, risk_rating, branches(name, city)")
        .limit(50),
      supabaseAdmin
        .from("policies")
        .select("id, policy_number, status, sum_assured, premium_amount, next_premium_due, customer_id, products(name)")
        .order("next_premium_due", { ascending: true })
        .limit(200),
      supabaseAdmin
        .from("premiums")
        .select("id, amount, due_date, status, policy_id, policies(policy_number, customer_id)")
        .in("status", ["pending", "overdue"])
        .order("due_date", { ascending: true })
        .limit(30),
      supabaseAdmin
        .from("lapse_predictions")
        .select("*, policies(policy_number, customer_id)")
        .order("probability", { ascending: false })
        .limit(20),
      supabaseAdmin
        .from("claims")
        .select("id, claim_number, status, claim_amount, fraud_score, filed_at, policies(policy_number, customer_id)")
        .order("filed_at", { ascending: false })
        .limit(20),
    ]);
    return {
      customers: customers.data ?? [],
      policies: policies.data ?? [],
      dueSoon: dueSoon.data ?? [],
      atRisk: lapse.data ?? [],
      claims: claims.data ?? [],
    };
  });

// ============ ADMIN PORTAL ============
export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertRole(context, ["admin"]);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [users, roles, branches, rings, products, sagaEvents] = await Promise.all([
      supabaseAdmin.from("profiles").select("id, full_name, cnic, phone, kyc_status, created_at, branches(name)").order("created_at", { ascending: false }).limit(100),
      supabaseAdmin.from("user_roles").select("user_id, role"),
      supabaseAdmin.from("branches").select("*").order("city"),
      supabaseAdmin.from("fraud_rings").select("*").order("score", { ascending: false }).limit(20),
      supabaseAdmin.from("products").select("*"),
      supabaseAdmin.from("saga_events").select("saga_id, step, status, created_at").order("created_at", { ascending: false }).limit(30),
    ]);
    return {
      users: users.data ?? [],
      roles: roles.data ?? [],
      branches: branches.data ?? [],
      rings: rings.data ?? [],
      products: products.data ?? [],
      sagaEvents: sagaEvents.data ?? [],
    };
  });

// ============ ANALYTICS PORTAL ============
export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertRole(context, ["admin", "agent"]);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [policies, premiums, claims, lapse, branches, products] = await Promise.all([
      supabaseAdmin.from("policies").select("id, status, sum_assured, premium_amount, commencement_date, branch_id, product_id"),
      supabaseAdmin.from("premiums").select("amount, paid_date, status, due_date"),
      supabaseAdmin.from("claims").select("id, status, claim_amount, fraud_score, filed_at"),
      supabaseAdmin.from("lapse_predictions").select("probability, generated_at"),
      supabaseAdmin.from("branches").select("id, name, city"),
      supabaseAdmin.from("products").select("code, name"),
    ]);

    const P = policies.data ?? [];
    const PR = premiums.data ?? [];
    const CL = claims.data ?? [];

    // KPIs
    const totalAUM = P.reduce((s, p: any) => s + Number(p.sum_assured || 0), 0);
    const activePolicies = P.filter((p: any) => p.status === "active").length;
    const collectedPremium = PR.filter((p: any) => p.status === "paid").reduce((s, p: any) => s + Number(p.amount || 0), 0);
    const overduePremium = PR.filter((p: any) => p.status === "overdue" || p.status === "due").reduce((s, p: any) => s + Number(p.amount || 0), 0);
    const claimsPaid = CL.filter((c: any) => c.status === "disbursed").reduce((s, c: any) => s + Number(c.claim_amount || 0), 0);
    const flagged = CL.filter((c: any) => Number(c.fraud_score || 0) > 0.6).length;

    // Status breakdown
    const statusBreakdown = P.reduce((acc: Record<string, number>, p: any) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    // Branch performance
    const branchMap = new Map((branches.data ?? []).map((b: any) => [b.id, b]));
    const branchPerf = Object.entries(
      P.reduce((acc: Record<string, { count: number; aum: number }>, p: any) => {
        const key = p.branch_id ?? "unknown";
        acc[key] = acc[key] || { count: 0, aum: 0 };
        acc[key].count += 1;
        acc[key].aum += Number(p.sum_assured || 0);
        return acc;
      }, {}),
    ).map(([id, v]) => ({ branch: (branchMap.get(id) as any)?.name ?? "—", city: (branchMap.get(id) as any)?.city ?? "", ...v }))
     .sort((a, b) => b.aum - a.aum);

    // Monthly premium collection (last 12 months buckets)
    const buckets: Record<string, number> = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`] = 0;
    }
    PR.filter((p: any) => p.status === "paid" && p.paid_date).forEach((p: any) => {
      const d = new Date(p.paid_date);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (k in buckets) buckets[k] += Number(p.amount || 0);
    });
    const monthly = Object.entries(buckets).map(([month, amount]) => ({ month, amount }));

    // Lapse risk distribution
    const lapseBuckets = { low: 0, medium: 0, high: 0 };
    (lapse.data ?? []).forEach((l: any) => {
      const p = Number(l.probability || 0);
      if (p < 0.33) lapseBuckets.low++;
      else if (p < 0.66) lapseBuckets.medium++;
      else lapseBuckets.high++;
    });

    return {
      kpis: { totalAUM, activePolicies, collectedPremium, overduePremium, claimsPaid, flagged, totalPolicies: P.length, totalClaims: CL.length },
      statusBreakdown,
      branchPerf,
      monthly,
      lapseBuckets,
      products: products.data ?? [],
    };
  });
