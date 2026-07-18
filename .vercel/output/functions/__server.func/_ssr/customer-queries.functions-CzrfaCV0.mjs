import { c as createServerFn } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { t as createServerRpc } from "./createServerRpc-MBa5GZ-L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-queries.functions-CzrfaCV0.js
var getDashboard_createServerFn_handler = createServerRpc({
	id: "cb7e862f05d2dbd6c9b3436c9c5c657f41a84846dbde1abaf17679a6d994d304",
	name: "getDashboard",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [profile, policies, activity, actions, lapsePreds] = await Promise.all([
		supabase.from("profiles").select("*, branches(name, city)").eq("id", userId).maybeSingle(),
		supabase.from("policies").select("*, products(name, category, code), branches(name, city)").eq("customer_id", userId).order("created_at", { ascending: false }),
		supabase.from("activity_feed").select("*").eq("customer_id", userId).order("created_at", { ascending: false }).limit(12),
		supabase.from("next_actions").select("*").eq("customer_id", userId).is("dismissed_at", null).order("score", { ascending: false }).limit(6),
		supabase.from("lapse_predictions").select("*").order("generated_at", { ascending: false }).limit(50)
	]);
	return {
		profile: profile.data,
		policies: policies.data ?? [],
		activity: activity.data ?? [],
		actions: actions.data ?? [],
		lapsePreds: lapsePreds.data ?? []
	};
});
var getPolicyDetail_createServerFn_handler = createServerRpc({
	id: "03be6c2e32c8be2327aeb6ef21b3dc5091a1a4ce4a2af89c5149b0ee20f12257",
	name: "getPolicyDetail",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getPolicyDetail.__executeServer(opts));
var getPolicyDetail = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(getPolicyDetail_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const [policy, premiums, events, lapse, claims, nominees] = await Promise.all([
		supabase.from("policies").select("*, products(*), branches(name, city, address, phone)").eq("id", data.policyId).eq("customer_id", userId).maybeSingle(),
		supabase.from("premiums").select("*").eq("policy_id", data.policyId).order("due_date", { ascending: false }),
		supabase.from("policy_state_events").select("*").eq("policy_id", data.policyId).order("created_at", { ascending: false }),
		supabase.from("lapse_predictions").select("*").eq("policy_id", data.policyId).order("generated_at", { ascending: false }).limit(1).maybeSingle(),
		supabase.from("claims").select("*").eq("policy_id", data.policyId).order("filed_at", { ascending: false }),
		supabase.from("nominees").select("*").eq("policy_id", data.policyId)
	]);
	if (!policy.data) throw new Error("Policy not found");
	return {
		policy: policy.data,
		premiums: premiums.data ?? [],
		events: events.data ?? [],
		lapse: lapse.data,
		claims: claims.data ?? [],
		nominees: nominees.data ?? []
	};
});
var getSagaTrace_createServerFn_handler = createServerRpc({
	id: "da8388fc2dde62622f8ee3b8e943b214ae96509df7439f4eff2077bafe092e99",
	name: "getSagaTrace",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getSagaTrace.__executeServer(opts));
var getSagaTrace = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(getSagaTrace_createServerFn_handler, async ({ data, context }) => {
	const { data: events } = await context.supabase.from("saga_events").select("*").eq("saga_id", data.sagaId).order("step_index", { ascending: true });
	return { events: events ?? [] };
});
var getClaims_createServerFn_handler = createServerRpc({
	id: "1da8d6b889b08ab41e97a99d8242f95cb2dd8e5c94bd2e5c4ac925ca64fab4a9",
	name: "getClaims",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getClaims.__executeServer(opts));
var getClaims = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getClaims_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data } = await supabase.from("claims").select("*, policies(policy_number, products(name))").eq("customer_id", userId).order("filed_at", { ascending: false });
	return { claims: data ?? [] };
});
var getFraudLandscape_createServerFn_handler = createServerRpc({
	id: "5b2fb4cec909b62ee03312eb2f1f21de9cbc29231515d2edb3f1031d393c45ec",
	name: "getFraudLandscape",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getFraudLandscape.__executeServer(opts));
var getFraudLandscape = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getFraudLandscape_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [rings, myClaims, edges] = await Promise.all([
		supabase.from("fraud_rings").select("*").order("score", { ascending: false }).limit(12),
		supabase.from("claims").select("id, claim_number, fraud_ring_id, fraud_score").eq("customer_id", userId),
		supabase.from("graph_edges").select("*")
	]);
	return {
		rings: rings.data ?? [],
		myClaims: myClaims.data ?? [],
		edges: edges.data ?? []
	};
});
var getGoals_createServerFn_handler = createServerRpc({
	id: "2ceb8af31169a5522308e02ccae7e58533fc7114c058603378d626579f6af7f7",
	name: "getGoals",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => getGoals.__executeServer(opts));
var getGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getGoals_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [goals, policies] = await Promise.all([supabase.from("goals").select("*").eq("customer_id", userId).order("created_at"), supabase.from("policies").select("id, policy_number, cash_value, sum_assured, bonus_accumulated, products(name)").eq("customer_id", userId)]);
	return {
		goals: goals.data ?? [],
		policies: policies.data ?? []
	};
});
var createGoal_createServerFn_handler = createServerRpc({
	id: "b95622f41894fbe59ea0bb5296519667cb7d57f4979ef7629c27022c83ab18bb",
	name: "createGoal",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => createGoal.__executeServer(opts));
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(createGoal_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("goals").insert({
		customer_id: context.userId,
		title: data.title,
		target_amount: data.target_amount,
		target_date: data.target_date ?? null,
		linked_policy_ids: data.linked_policy_ids,
		icon: data.icon ?? "target"
	});
	return { ok: true };
});
var deleteGoal_createServerFn_handler = createServerRpc({
	id: "a7631d588f6597fcfaa63b38cdefb48fae3e6a57e857cdd093b52fe8d939416f",
	name: "deleteGoal",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => deleteGoal.__executeServer(opts));
var deleteGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(deleteGoal_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("goals").delete().eq("id", data.id).eq("customer_id", context.userId);
	return { ok: true };
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "c3f1602f7b3cce0db00daba5c91e5fd1bb0f379567e2d812d3eb2c2a1b391346",
	name: "updateProfile",
	filename: "src/lib/customer-queries.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((v) => v).handler(updateProfile_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("profiles").update(data).eq("id", context.userId);
	return { ok: true };
});
//#endregion
export { createGoal_createServerFn_handler, deleteGoal_createServerFn_handler, getClaims_createServerFn_handler, getDashboard_createServerFn_handler, getFraudLandscape_createServerFn_handler, getGoals_createServerFn_handler, getPolicyDetail_createServerFn_handler, getSagaTrace_createServerFn_handler, updateProfile_createServerFn_handler };
