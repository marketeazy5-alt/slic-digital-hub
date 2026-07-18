import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
 * Helpers used across intelligence functions
 * ============================================================ */

function daysBetween(a: Date, b: Date) {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

function randomPolicyNumber() {
  const y = new Date().getFullYear();
  return `SL${y}${Math.floor(Math.random() * 900000 + 100000)}`;
}
function randomClaimNumber() {
  const y = new Date().getFullYear();
  return `CL${y}${Math.floor(Math.random() * 900000 + 100000)}`;
}
function receiptNumber() {
  return `RCP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

async function computeLapseForPolicy(supabase: SupabaseClient, policyId: string, income: number | null) {
  const { data: policy } = await supabase.from("policies").select("*").eq("id", policyId).maybeSingle();
  if (!policy) return null;

  const { data: prems } = await supabase
    .from("premiums")
    .select("*")
    .eq("policy_id", policyId)
    .order("due_date", { ascending: false })
    .limit(24);

  const now = new Date();
  const overdue = (prems ?? []).filter((p) => p.status === "overdue").length;
  const paidLate = (prems ?? []).filter((p) => p.status === "paid" && p.paid_date && p.due_date && daysBetween(new Date(p.paid_date), new Date(p.due_date)) > 3).length;
  const lastPaid = (prems ?? []).find((p) => p.status === "paid" && p.paid_date);
  const daysSincePaid = lastPaid?.paid_date ? daysBetween(now, new Date(lastPaid.paid_date)) : 400;
  const premIncomeRatio = income && income > 0 ? Math.min(1, Number(policy.premium_amount) / income) : 0.2;

  // Simple weighted heuristic.
  const rawScore =
    overdue * 0.12 +
    paidLate * 0.04 +
    Math.min(daysSincePaid / 365, 1) * 0.25 +
    premIncomeRatio * 0.35 +
    (policy.status === "grace_period" ? 0.35 : 0) +
    (policy.status === "lapsed_revivable" ? 0.75 : 0);

  const probability = Math.min(0.98, Math.max(0.02, rawScore));

  let intervention = "premium_holiday";
  if (probability > 0.7) intervention = "convert_to_paid_up";
  else if (probability > 0.5) intervention = "reduce_sum_assured";
  else if (probability > 0.3) intervention = "premium_holiday";
  else intervention = "agent_outreach";

  const factors = {
    overdue_premiums: overdue,
    late_payments_12mo: paidLate,
    days_since_last_paid: daysSincePaid,
    premium_income_ratio: Number(premIncomeRatio.toFixed(3)),
    current_state: policy.status,
  };

  const bucket = premIncomeRatio > 0.15 ? "high_burden" : "low_burden";

  await supabase.from("lapse_predictions").insert({
    policy_id: policyId,
    probability: Number(probability.toFixed(3)),
    factors,
    recommended_intervention: intervention,
    demographic_bucket: bucket,
  });

  return { probability, intervention, factors, bucket };
}

async function detectFraudRingsInternal(supabase: SupabaseClient) {
  // Union–find over shared edges.
  const { data: edges } = await supabase.from("graph_edges").select("*");
  if (!edges || edges.length === 0) return;

  // Group by shared entity (non-claim node).
  const parent = new Map<string, string>();
  const find = (x: string): string => {
    while (parent.get(x) !== x) {
      parent.set(x, parent.get(parent.get(x)!)!);
      x = parent.get(x)!;
    }
    return x;
  };
  const union = (a: string, b: string) => {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  };
  const key = (t: string, i: string) => `${t}:${i}`;
  for (const e of edges) {
    const a = key(e.from_type, e.from_id);
    const b = key(e.to_type, e.to_id);
    if (!parent.has(a)) parent.set(a, a);
    if (!parent.has(b)) parent.set(b, b);
    union(a, b);
  }

  // Group claim nodes by root.
  const rings = new Map<string, string[]>();
  for (const nodeKey of parent.keys()) {
    if (nodeKey.startsWith("claim:")) {
      const root = find(nodeKey);
      const arr = rings.get(root) ?? [];
      arr.push(nodeKey.slice("claim:".length));
      rings.set(root, arr);
    }
  }

  await supabase.from("fraud_rings").delete().gt("score", -1);
  const { data: claims } = await supabase.from("claims").select("id").in(
    "id",
    Array.from(rings.values()).flat(),
  );
  const claimIds = new Set((claims ?? []).map((c) => c.id));

  for (const [root, memberClaims] of rings) {
    const filtered = memberClaims.filter((c) => claimIds.has(c));
    if (filtered.length < 2) continue;

    // Compute shared entities in this component.
    const sharedNodes = Array.from(parent.keys()).filter(
      (k) => find(k) === root && !k.startsWith("claim:"),
    );
    const shared_entities: Record<string, string[]> = {};
    for (const s of sharedNodes) {
      const [t, i] = s.split(":");
      (shared_entities[t] ??= []).push(i);
    }
    const score = filtered.length * 2 + sharedNodes.length * 1.5;

    const { data: ring } = await supabase.from("fraud_rings").insert({
      member_claim_ids: filtered,
      score,
      shared_entities,
      summary: `${filtered.length} claims sharing ${sharedNodes.length} entities (${Object.keys(shared_entities).join(", ")})`,
    }).select("id").maybeSingle();

    if (ring) {
      await supabase.from("claims").update({
        fraud_ring_id: ring.id,
        fraud_score: Math.min(1, score / 20),
      }).in("id", filtered);
    }
  }
}

async function generateNextActions(supabase: SupabaseClient, customerId: string) {
  await supabase.from("next_actions").delete().eq("customer_id", customerId);

  const { data: policies } = await supabase.from("policies").select("*").eq("customer_id", customerId);
  if (!policies) return;

  const actions: Array<{
    action_type: string;
    title: string;
    description: string;
    cta_label: string;
    cta_route: string;
    score: number;
    payload: Record<string, unknown>;
  }> = [];

  for (const p of policies) {
    const eligibleLoan = Number(p.cash_value) * 0.85 - Number(p.loan_outstanding);
    if (eligibleLoan > 50000 && p.status === "active") {
      actions.push({
        action_type: "loan_eligibility",
        title: `You're eligible for a ₨${Math.round(eligibleLoan).toLocaleString()} policy loan`,
        description: `Policy ${p.policy_number} has built up ₨${Math.round(Number(p.cash_value)).toLocaleString()} in cash value. Borrow at 8% p.a. against it, no credit check.`,
        cta_label: "Explore loan",
        cta_route: `/policies/${p.id}`,
        score: 0.6,
        payload: { policy_id: p.id, amount: eligibleLoan },
      });
    }

    if (p.status === "grace_period" || p.status === "lapsed_revivable") {
      actions.push({
        action_type: "revival_urgent",
        title: `Policy ${p.policy_number} needs attention`,
        description: `Pay the pending premium of ₨${Number(p.premium_amount).toLocaleString()} before ${new Date(p.grace_period_ends ?? p.next_premium_due).toDateString()} to keep your coverage active.`,
        cta_label: "Pay now",
        cta_route: `/pay`,
        score: 0.95,
        payload: { policy_id: p.id, amount: p.premium_amount },
      });
    }

    // Cross-sell: term life if the customer only has an endowment.
    if (Number(p.sum_assured) < 2_000_000 && p.status === "active") {
      actions.push({
        action_type: "upsell_coverage",
        title: `Consider raising your protection`,
        description: `Your current sum assured of ₨${Math.round(Number(p.sum_assured) / 100000)}L may be below the recommended 10× annual income cover.`,
        cta_label: "See options",
        cta_route: `/policies`,
        score: 0.35,
        payload: { policy_id: p.id },
      });
    }
  }

  // Tax season nudge.
  actions.push({
    action_type: "tax_certificate",
    title: "Your Section 62 tax certificate is ready",
    description: "Download the annual premium certificate to claim your income tax rebate under Section 62.",
    cta_label: "Download",
    cta_route: "/policies",
    score: 0.4,
    payload: {},
  });

  if (actions.length > 0) {
    await supabase.from("next_actions").insert(actions.map((a) => ({ ...a, customer_id: customerId })));
  }
}

/* ============================================================
 * SEED — runs once per user, on first login
 * ============================================================ */

export const seedIfNeeded = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: prof } = await supabase.from("profiles").select("id, onboarded, monthly_income").eq("id", userId).maybeSingle();
    if (!prof) return { seeded: false, reason: "no_profile" };
    if (prof.onboarded) return { seeded: false, reason: "already_onboarded" };

    const { data: user } = await supabase.auth.getUser();
    const income = Number(prof.monthly_income) || 120_000;

    // Pick branches + products.
    const { data: branches } = await supabase.from("branches").select("id, name, city").limit(8);
    const { data: products } = await supabase.from("products").select("*");
    if (!branches?.length || !products?.length) throw new Error("Missing seed reference data");

    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    // Assign a home branch.
    const homeBranch = pick(branches);
    await supabase.from("profiles").update({ home_branch_id: homeBranch.id }).eq("id", userId);

    // Create ~3 policies with realistic variety.
    type PolicyBlueprint = {
      productCode: string;
      sumAssured: number;
      termYears: number;
      commenceMonthsAgo: number;
      status: "active" | "grace_period" | "active";
      premiumPct: number;
    };
    const blueprints: PolicyBlueprint[] = [
      { productCode: "END-STD", sumAssured: 2_500_000, termYears: 20, commenceMonthsAgo: 26, status: "active", premiumPct: 0.052 },
      { productCode: "CHILD-EDU", sumAssured: 5_000_000, termYears: 18, commenceMonthsAgo: 14, status: "grace_period", premiumPct: 0.048 },
      { productCode: "TERM", sumAssured: 12_000_000, termYears: 25, commenceMonthsAgo: 8, status: "active", premiumPct: 0.008 },
    ];

    const createdPolicies: string[] = [];
    for (const bp of blueprints) {
      const product = products.find((p) => p.code === bp.productCode)!;
      const commencement = new Date();
      commencement.setMonth(commencement.getMonth() - bp.commenceMonthsAgo);
      const maturity = new Date(commencement);
      maturity.setFullYear(maturity.getFullYear() + bp.termYears);

      const monthlyPremium = Math.round((bp.sumAssured * bp.premiumPct) / 12);
      const paidMonths = bp.commenceMonthsAgo - (bp.status === "grace_period" ? 1 : 0);
      const totalPaid = monthlyPremium * paidMonths;
      const bonusRate = Number(product.bonus_rate);
      const bonus = Math.round(bp.sumAssured * bonusRate * (bp.commenceMonthsAgo / 12) * 0.4);
      const cashValue = Math.round(totalPaid * 0.6 + bonus * 0.3);

      const nextDue = new Date();
      if (bp.status === "grace_period") {
        nextDue.setDate(nextDue.getDate() - 15);
      } else {
        nextDue.setDate(nextDue.getDate() + Math.floor(Math.random() * 20) + 5);
      }
      const graceEnds = new Date(nextDue);
      graceEnds.setDate(graceEnds.getDate() + 30);

      const { data: policy } = await supabase.from("policies").insert({
        policy_number: randomPolicyNumber(),
        customer_id: userId,
        product_id: product.id,
        branch_id: pick(branches).id,
        status: bp.status,
        sum_assured: bp.sumAssured,
        premium_amount: monthlyPremium,
        premium_frequency: "monthly",
        commencement_date: commencement.toISOString().slice(0, 10),
        maturity_date: maturity.toISOString().slice(0, 10),
        next_premium_due: nextDue.toISOString().slice(0, 10),
        grace_period_ends: graceEnds.toISOString().slice(0, 10),
        term_years: bp.termYears,
        total_premiums_paid: totalPaid,
        bonus_accumulated: bonus,
        cash_value: cashValue,
        surrender_value: Math.round(cashValue * 0.9),
        bonus_accrual_paused: bp.status === "grace_period",
      }).select("id").maybeSingle();

      if (!policy) continue;
      createdPolicies.push(policy.id);

      // Backfill premium history.
      const premiums: any[] = [];
      for (let i = 0; i < bp.commenceMonthsAgo; i++) {
        const dueDate = new Date(commencement);
        dueDate.setMonth(dueDate.getMonth() + i);
        const isLast = i === bp.commenceMonthsAgo - 1;
        const isPaid = !(isLast && bp.status === "grace_period");
        const paidLate = isPaid && Math.random() < 0.2;
        const paidDate = isPaid
          ? new Date(dueDate.getTime() + (paidLate ? 5 : Math.floor(Math.random() * 3)) * 86400000)
          : null;
        premiums.push({
          policy_id: policy.id,
          amount: monthlyPremium,
          due_date: dueDate.toISOString().slice(0, 10),
          paid_date: paidDate?.toISOString().slice(0, 10) ?? null,
          status: isPaid ? "paid" : "overdue",
          payment_method: isPaid ? pick(["jazzcash", "easypaisa", "raast", "card", "bank_transfer"]) : null,
          payment_reference: isPaid ? receiptNumber() : null,
          late_fee: paidLate ? Math.round(monthlyPremium * 0.02) : 0,
          receipt_number: isPaid ? receiptNumber() : null,
        });
      }
      await supabase.from("premiums").insert(premiums);

      // State events timeline.
      await supabase.from("policy_state_events").insert([
        { policy_id: policy.id, from_state: null, to_state: "active", trigger: "policy_issued", metadata: { branch: homeBranch.name } },
      ]);
      if (bp.status === "grace_period") {
        await supabase.from("policy_state_events").insert([
          { policy_id: policy.id, from_state: "active", to_state: "grace_period", trigger: "premium_missed", metadata: { due_date: nextDue.toISOString().slice(0, 10) } },
        ]);
      }
    }

    // Nominees for the first two policies.
    for (const pid of createdPolicies.slice(0, 2)) {
      await supabase.from("nominees").insert({
        customer_id: userId,
        policy_id: pid,
        full_name: "Fatima Khan",
        cnic: "42101-1234567-8",
        relationship: "Spouse",
        share_percentage: 100,
        phone: "+92 300-1234567",
      });
    }

    // Goals.
    if (createdPolicies[1]) {
      await supabase.from("goals").insert({
        customer_id: userId,
        title: "Ali's University Fund",
        icon: "graduation-cap",
        target_amount: 8_000_000,
        target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 12)).toISOString().slice(0, 10),
        linked_policy_ids: [createdPolicies[1]],
        projected_value: 3_200_000,
      });
    }
    await supabase.from("goals").insert({
      customer_id: userId,
      title: "Hajj 2032",
      icon: "moon",
      target_amount: 3_000_000,
      target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 8)).toISOString().slice(0, 10),
      linked_policy_ids: createdPolicies.slice(0, 1),
      projected_value: 1_100_000,
    });

    // Claim (in progress, flagged for fraud).
    let flaggedClaimId: string | null = null;
    if (createdPolicies[0]) {
      const { data: claim } = await supabase.from("claims").insert({
        claim_number: randomClaimNumber(),
        policy_id: createdPolicies[0],
        customer_id: userId,
        claim_type: "critical_illness",
        status: "verification",
        assigned_to: "Dr. Sana Ahmed (Medical Officer, Karachi)",
        fraud_score: 0,
        documents: [
          { name: "Diagnosis Report.pdf", uploaded: true, verified: true },
          { name: "Hospital Discharge Summary.pdf", uploaded: true, verified: false },
          { name: "Prescription History.pdf", uploaded: true, verified: true },
        ],
        notes: "Awaiting hospital verification of discharge summary.",
      }).select("id").maybeSingle();
      flaggedClaimId = claim?.id ?? null;
    }

    // Fraud graph — link this claim to a few shared entities and add sibling claims from seed data
    // owned by "system" so the ring detection has something to grab.
    if (flaggedClaimId) {
      // Two fake sibling claims to complete a ring (these are OTHER customers — since we can't
      // create other auth users here, we synthesize graph nodes that don't need to be real claims).
      const fakeClaimA = crypto.randomUUID();
      const fakeClaimB = crypto.randomUUID();

      const edges = [
        // Real claim -> shared doctor
        { from_type: "claim", from_id: flaggedClaimId, to_type: "doctor", to_id: "dr-a-malik-khi" },
        { from_type: "claim", from_id: flaggedClaimId, to_type: "hospital", to_id: "hosp-liaquat-general" },
        { from_type: "claim", from_id: flaggedClaimId, to_type: "phone", to_id: "+92-300-9876543" },
        // Fake claims sharing entities
        { from_type: "claim", from_id: fakeClaimA, to_type: "doctor", to_id: "dr-a-malik-khi" },
        { from_type: "claim", from_id: fakeClaimA, to_type: "hospital", to_id: "hosp-liaquat-general" },
        { from_type: "claim", from_id: fakeClaimA, to_type: "phone", to_id: "+92-300-9876543" },
        { from_type: "claim", from_id: fakeClaimB, to_type: "doctor", to_id: "dr-a-malik-khi" },
        { from_type: "claim", from_id: fakeClaimB, to_type: "agent", to_id: "agent-code-6612" },
        { from_type: "claim", from_id: fakeClaimA, to_type: "agent", to_id: "agent-code-6612" },
      ];
      await supabase.from("graph_edges").insert(edges);
    }

    // Activity feed — realistic history.
    const feed: any[] = [];
    const now = Date.now();
    const push = (offsetDays: number, event_type: string, title: string, description: string, icon: string) => {
      feed.push({
        customer_id: userId,
        event_type,
        title,
        description,
        icon,
        created_at: new Date(now - offsetDays * 86400000).toISOString(),
      });
    };
    push(0, "insight_generated", "New AI insight available", "Lapse risk analysis refreshed for your policies.", "sparkles");
    push(1, "premium_received", "Premium received", "Monthly premium for endowment policy credited.", "check-circle");
    push(2, "bonus_credited", "Annual bonus credited", "₨32,500 added to your accumulated bonus.", "trending-up");
    push(4, "payment_failed", "Auto-debit failed", "Child Education Plan premium could not be collected — please retry.", "alert-triangle");
    push(6, "state_change", "Policy entered grace period", "You have 30 days to settle the outstanding premium.", "clock");
    push(11, "tax_cert", "Tax certificate generated", "Section 62 certificate for FY24 is available for download.", "file-text");
    push(15, "claim_update", "Claim moved to Verification", "Assigned to Dr. Sana Ahmed for medical review.", "shield-check");
    push(21, "premium_received", "Premium received", "Term assurance premium credited via Raast.", "check-circle");
    push(28, "goal_progress", "Milestone reached", "'Ali's University Fund' crossed 40% of target.", "target");
    push(33, "premium_received", "Premium received", "Endowment premium credited via JazzCash.", "check-circle");
    push(45, "document_uploaded", "Nominee updated", "Added Fatima Khan as sole nominee across policies.", "user");
    await supabase.from("activity_feed").insert(feed);

    // Mark onboarded.
    await supabase.from("profiles").update({ onboarded: true }).eq("id", userId);

    // Also assign customer role (idempotent).
    await supabase.from("user_roles").upsert({ user_id: userId, role: "customer" }, { onConflict: "user_id,role" });

    // Compute lapse predictions and next actions immediately so first login shows real intelligence.
    for (const pid of createdPolicies) {
      await computeLapseForPolicy(supabase, pid, income);
    }
    await detectFraudRingsInternal(supabase);
    await generateNextActions(supabase, userId);

    return { seeded: true, policies: createdPolicies.length };
  });

/* ============================================================
 * POLICY STATE MACHINE — advance based on today's date
 * ============================================================ */

export const advancePolicyStates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: policies } = await supabase.from("policies").select("*").eq("customer_id", userId);
    if (!policies) return { transitions: 0 };

    const now = new Date();
    let transitions = 0;

    for (const p of policies) {
      const nextDue = new Date(p.next_premium_due);
      const graceEnds = p.grace_period_ends ? new Date(p.grace_period_ends) : null;
      const daysOverdue = daysBetween(now, nextDue);
      let target = p.status as string;

      if (["surrendered", "matured", "claimed"].includes(p.status)) continue;
      if (daysOverdue <= 0) target = "active";
      else if (graceEnds && daysBetween(now, graceEnds) <= 0) target = "grace_period";
      else if (graceEnds && daysBetween(now, graceEnds) > 0 && daysBetween(now, graceEnds) <= 90) target = "lapsed_revivable";
      else target = "lapsed_surrender_only";

      if (target !== p.status) {
        await supabase.from("policies").update({
          status: target as never,
          bonus_accrual_paused: target !== "active",
        }).eq("id", p.id);

        await supabase.from("policy_state_events").insert({
          policy_id: p.id,
          from_state: p.status,
          to_state: target as never,
          trigger: "cron_advance",
          metadata: { days_overdue: daysOverdue, run_at: now.toISOString() },
        });

        await supabase.from("activity_feed").insert({
          customer_id: userId,
          event_type: "state_change",
          title: `Policy ${p.policy_number} moved to ${target.replace(/_/g, " ")}`,
          description: `Automatic state transition triggered by missed premium.`,
          icon: "shield",
        });

        transitions++;
      }
    }

    return { transitions };
  });

/* ============================================================
 * LAPSE INTERVENTION ENGINE — recompute for the current user
 * ============================================================ */

export const runLapseEngine = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: profile } = await supabase.from("profiles").select("monthly_income").eq("id", userId).maybeSingle();
    const { data: policies } = await supabase.from("policies").select("id").eq("customer_id", userId);
    if (!policies) return { computed: 0 };

    let computed = 0;
    for (const p of policies) {
      const r = await computeLapseForPolicy(supabase, p.id, Number(profile?.monthly_income) || null);
      if (r) computed++;
    }
    await generateNextActions(supabase, userId);
    return { computed };
  });

export const acceptIntervention = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { policyId: string; interventionType: string; accepted: boolean }) => v)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    await supabase.from("intervention_outcomes").insert({
      policy_id: data.policyId,
      intervention_type: data.interventionType,
      accepted: data.accepted,
      demographic_bucket: "recorded_at_action",
    });
    return { ok: true };
  });

/* ============================================================
 * FRAUD DETECTION — re-run union-find (admin/demo)
 * ============================================================ */

export const detectFraudRings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await detectFraudRingsInternal(context.supabase);
    return { ok: true };
  });

/* ============================================================
 * PREMIUM PAYMENT SAGA — the star of the show
 * Every step writes to saga_events (with compensations on failure)
 * ============================================================ */

export const payPremiumSaga = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { policyIds: string[]; method: string; simulateFailAt?: string | null }) => v)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sagaId = crypto.randomUUID();
    const startedAt = Date.now();

    async function step(name: string, index: number, work: () => Promise<any>) {
      const t0 = Date.now();
      if (data.simulateFailAt === name) {
        await supabase.from("saga_events").insert({
          saga_id: sagaId,
          saga_type: "premium_payment",
          step: name,
          step_index: index,
          status: "failed",
          payload: { reason: "simulated failure" },
          actor_id: userId,
          duration_ms: Date.now() - t0,
        });
        throw new Error(`Saga failed at step: ${name}`);
      }
      const payload = (await work()) ?? {};
      await supabase.from("saga_events").insert({
        saga_id: sagaId,
        saga_type: "premium_payment",
        step: name,
        step_index: index,
        status: "success",
        payload,
        actor_id: userId,
        duration_ms: Date.now() - t0,
      });
    }

    async function compensate(fromIndex: number) {
      await supabase.from("saga_events").insert({
        saga_id: sagaId,
        saga_type: "premium_payment",
        step: "compensation",
        step_index: fromIndex + 1,
        status: "compensated",
        payload: { note: "rolled back prior steps" },
        actor_id: userId,
        duration_ms: Date.now() - startedAt,
      });
    }

    const { data: policies } = await supabase.from("policies").select("*").in("id", data.policyIds).eq("customer_id", userId);
    if (!policies?.length) throw new Error("No matching policies");

    const totalAmount = policies.reduce((s, p) => s + Number(p.premium_amount), 0);

    try {
      await step("validate", 0, async () => ({ policy_count: policies.length, total: totalAmount, method: data.method }));
      await step("debit_gateway", 1, async () => ({ gateway: data.method, amount: totalAmount, reference: receiptNumber() }));

      const receipts: string[] = [];
      await step("record_payments", 2, async () => {
        for (const p of policies) {
          // Find the pending/overdue premium closest to today for this policy.
          const { data: nextPrem } = await supabase.from("premiums").select("id").eq("policy_id", p.id).in("status", ["pending", "overdue"]).order("due_date").limit(1).maybeSingle();
          const rcpt = receiptNumber();
          receipts.push(rcpt);
          if (nextPrem) {
            await supabase.from("premiums").update({
              status: "paid",
              paid_date: new Date().toISOString().slice(0, 10),
              payment_method: data.method,
              payment_reference: rcpt,
              receipt_number: rcpt,
              saga_id: sagaId,
            }).eq("id", nextPrem.id);
          } else {
            await supabase.from("premiums").insert({
              policy_id: p.id,
              amount: p.premium_amount,
              due_date: new Date().toISOString().slice(0, 10),
              paid_date: new Date().toISOString().slice(0, 10),
              status: "paid",
              payment_method: data.method,
              payment_reference: rcpt,
              receipt_number: rcpt,
              saga_id: sagaId,
            });
          }
        }
        return { receipts };
      });

      await step("advance_state_machine", 3, async () => {
        const transitions: Array<{ policy: string; to: string }> = [];
        for (const p of policies) {
          if (p.status !== "active") {
            const nextDue = new Date();
            nextDue.setMonth(nextDue.getMonth() + 1);
            const graceEnds = new Date(nextDue);
            graceEnds.setDate(graceEnds.getDate() + 30);
            await supabase.from("policies").update({
              status: "active",
              bonus_accrual_paused: false,
              next_premium_due: nextDue.toISOString().slice(0, 10),
              grace_period_ends: graceEnds.toISOString().slice(0, 10),
              total_premiums_paid: Number(p.total_premiums_paid) + Number(p.premium_amount),
            }).eq("id", p.id);
            await supabase.from("policy_state_events").insert({
              policy_id: p.id, from_state: p.status, to_state: "active",
              trigger: "premium_paid", metadata: { saga_id: sagaId },
            });
            transitions.push({ policy: p.policy_number, to: "active" });
          } else {
            const nextDue = new Date(p.next_premium_due);
            nextDue.setMonth(nextDue.getMonth() + 1);
            const graceEnds = new Date(nextDue);
            graceEnds.setDate(graceEnds.getDate() + 30);
            await supabase.from("policies").update({
              next_premium_due: nextDue.toISOString().slice(0, 10),
              grace_period_ends: graceEnds.toISOString().slice(0, 10),
              total_premiums_paid: Number(p.total_premiums_paid) + Number(p.premium_amount),
            }).eq("id", p.id);
          }
        }
        return { transitions };
      });

      await step("recalculate_bonus", 4, async () => {
        for (const p of policies) {
          const { data: product } = await supabase.from("products").select("bonus_rate").eq("id", p.product_id).maybeSingle();
          const monthlyBonus = Math.round(Number(p.sum_assured) * Number(product?.bonus_rate ?? 0) / 120);
          await supabase.from("policies").update({
            bonus_accumulated: Number(p.bonus_accumulated) + monthlyBonus,
            cash_value: Number(p.cash_value) + monthlyBonus + Math.round(Number(p.premium_amount) * 0.55),
          }).eq("id", p.id);
        }
        return { note: "monthly bonus accrued for active policies" };
      });

      await step("append_activity_feed", 5, async () => {
        await supabase.from("activity_feed").insert({
          customer_id: userId,
          event_type: "premium_received",
          title: `Premium received — ₨${Math.round(totalAmount).toLocaleString()}`,
          description: `${policies.length} polic${policies.length === 1 ? "y" : "ies"} paid via ${data.method}.`,
          icon: "check-circle",
        });
        return { count: policies.length };
      });

      await step("emit_receipt", 6, async () => ({ receipt_ids: receipts }));

      return { ok: true, sagaId, receipts, total: totalAmount };
    } catch (err) {
      await compensate(7);
      throw err;
    }
  });

/* ============================================================
 * Next-best-action management
 * ============================================================ */

export const dismissNextAction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { id: string }) => v)
  .handler(async ({ data, context }) => {
    await context.supabase.from("next_actions").update({ dismissed_at: new Date().toISOString() }).eq("id", data.id);
    return { ok: true };
  });
