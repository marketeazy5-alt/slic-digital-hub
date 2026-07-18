import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [profile, policies, activity, actions, lapsePreds] = await Promise.all([
      supabase.from("profiles").select("*, branches(name, city)").eq("id", userId).maybeSingle(),
      supabase
        .from("policies")
        .select("*, products(name, category, code), branches(name, city)")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("activity_feed")
        .select("*")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("next_actions")
        .select("*")
        .eq("customer_id", userId)
        .is("dismissed_at", null)
        .order("score", { ascending: false })
        .limit(6),
      supabase
        .from("lapse_predictions")
        .select("*")
        .order("generated_at", { ascending: false })
        .limit(50),
    ]);

    return {
      profile: profile.data,
      policies: policies.data ?? [],
      activity: activity.data ?? [],
      actions: actions.data ?? [],
      lapsePreds: lapsePreds.data ?? [],
    };
  });

export const getPolicyDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { policyId: string }) => v)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const [policy, premiums, events, lapse, claims, nominees] = await Promise.all([
      supabase
        .from("policies")
        .select("*, products(*), branches(name, city, address, phone)")
        .eq("id", data.policyId)
        .eq("customer_id", userId)
        .maybeSingle(),
      supabase
        .from("premiums")
        .select("*")
        .eq("policy_id", data.policyId)
        .order("due_date", { ascending: false }),
      supabase
        .from("policy_state_events")
        .select("*")
        .eq("policy_id", data.policyId)
        .order("created_at", { ascending: false }),
      supabase
        .from("lapse_predictions")
        .select("*")
        .eq("policy_id", data.policyId)
        .order("generated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("claims")
        .select("*")
        .eq("policy_id", data.policyId)
        .order("filed_at", { ascending: false }),
      supabase.from("nominees").select("*").eq("policy_id", data.policyId),
    ]);
    if (!policy.data) throw new Error("Policy not found");
    return {
      policy: policy.data,
      premiums: premiums.data ?? [],
      events: events.data ?? [],
      lapse: lapse.data,
      claims: claims.data ?? [],
      nominees: nominees.data ?? [],
    };
  });

export const getSagaTrace = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { sagaId: string }) => v)
  .handler(async ({ data, context }) => {
    const { data: events } = await context.supabase
      .from("saga_events")
      .select("*")
      .eq("saga_id", data.sagaId)
      .order("step_index", { ascending: true });
    return { events: events ?? [] };
  });

export const getClaims = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("claims")
      .select("*, policies(policy_number, products(name))")
      .eq("customer_id", userId)
      .order("filed_at", { ascending: false });
    return { claims: data ?? [] };
  });

export const getFraudLandscape = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [rings, myClaims, edges] = await Promise.all([
      supabase.from("fraud_rings").select("*").order("score", { ascending: false }).limit(12),
      supabase.from("claims").select("id, claim_number, fraud_ring_id, fraud_score").eq("customer_id", userId),
      supabase.from("graph_edges").select("*"),
    ]);
    return {
      rings: rings.data ?? [],
      myClaims: myClaims.data ?? [],
      edges: edges.data ?? [],
    };
  });

export const getGoals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [goals, policies] = await Promise.all([
      supabase.from("goals").select("*").eq("customer_id", userId).order("created_at"),
      supabase.from("policies").select("id, policy_number, cash_value, sum_assured, bonus_accumulated, products(name)").eq("customer_id", userId),
    ]);
    return { goals: goals.data ?? [], policies: policies.data ?? [] };
  });

export const createGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { title: string; target_amount: number; target_date?: string | null; linked_policy_ids: string[]; icon?: string }) => v)
  .handler(async ({ data, context }) => {
    await context.supabase.from("goals").insert({
      customer_id: context.userId,
      title: data.title,
      target_amount: data.target_amount,
      target_date: data.target_date ?? null,
      linked_policy_ids: data.linked_policy_ids,
      icon: data.icon ?? "target",
    });
    return { ok: true };
  });

export const deleteGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { id: string }) => v)
  .handler(async ({ data, context }) => {
    await context.supabase.from("goals").delete().eq("id", data.id).eq("customer_id", context.userId);
    return { ok: true };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { full_name?: string; phone?: string; occupation?: string; monthly_income?: number }) => v)
  .handler(async ({ data, context }) => {
    await context.supabase.from("profiles").update(data).eq("id", context.userId);
    return { ok: true };
  });
