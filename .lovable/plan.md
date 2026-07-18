## SLIC Digital Hub — Customer Portal v1

Build the **Customer Portal** as the flagship surface, backed by Lovable Cloud (Postgres + Auth), with all four "advanced intelligence" features functionally real (not just UI mockups). Light + dark themes wired via tokens, English only. Emerald + gold institutional design system inspired by Stripe/Linear/Vercel/Apple.

### Scope for v1

**Public**
- Landing shell + `/auth` (email + password sign-in/sign-up; CNIC captured on signup). Google OAuth deferred.

**Customer portal (`/_authenticated/*`)**
- **Dashboard** — greeting, 6 stat cards (total coverage, invested, tax saved, active policies, next premium due, nearest maturity) with count-up animation, policy cards list with status-colored left border, AI insights panel (loan eligibility, lapse risk warning, upsell suggestions — from real logic below), **recent activity feed** hydrated from `activity_feed` table (premium received, bonus credited, tax cert generated, payment failed, claim status change, state transition).
- **Policy Center** — list with search/filter/sort, grid/table toggle. Detail page with tabs: Summary (coverage, branch info, maturity projection, timeline of state machine events), Premiums (payment history + link to saga viewer for any payment), Bonus (annual + cumulative chart), Loan (eligibility + EMI calculator + amortization), Claims (per-policy, with a "View trust & safety analysis" link on any flagged claim), Documents (list + download stubs).
- **Premium Payment** — multi-policy selection, 7 payment method UI (JazzCash/EasyPaisa/Raast/Card/Bank Transfer/Auto-Debit/Branch Voucher). Payments simulated (no real gateway), but flow runs a Saga-style server function that **writes each step to `saga_events`**: validate → debit → record payment → advance state machine → recalculate bonus → append activity feed → emit receipt. Failure at any step triggers a compensation write. A post-payment "Transaction trace" screen renders the saga steps as a vertical timeline so the pattern is visible, not implied.
- **Claims Hub** — dashboard + list + detail with pipeline visualization (Submitted → Under Review → Verification → Underwriting → Approval → Payment → Disbursed). New claim wizard (select policy → claim type → doc upload stubs → review → submit). Flagged claims show a "Trust & Safety" callout linking to the ring viewer.
- **Trust & Safety** — first-class sidebar item (not buried). Landing page explains the fraud detection system in plain language, then shows the fraud ring cluster viewer (SVG) with any rings the current user's claims participate in, plus a demo "network view" of aggregate rings for the demo effect. Also linked from claims detail when a claim's `fraud_ring_id` is set.
- **Gamified Savings Goals** — tag policies to goals ("Ali's University Fund", "Hajj 2028"). Visual progress bar combining current cash value + projected maturity + bonus, milestone celebrations (confetti + toast) when % thresholds are crossed. Create/edit/delete goals; each goal has target amount, target date, linked policies.
- **Profile & Settings** — theme toggle (light/dark/system), density mode toggle (comfortable/compact), notification prefs, nominee management, branch info.

**Command palette** (Cmd+K) — global search across policies/claims/goals/settings, keyboard nav.

### Advanced logic — functionally real

All four run as scheduled/on-demand server functions with results persisted:

1. **Policy State Machine** — Postgres enum + `policy_state_events` table. States: `active → grace_period_day_1..30 → lapsed_revivable → lapsed_surrender_only → surrendered/matured`. `advancePolicyStates()` server function checks `next_premium_due` vs today, transitions states, and fires cascading triggers: pauses bonus accrual, disables loan requests, appends to activity feed, records notification event. Full history rendered as a timeline on policy detail.

2. **Predictive Lapse Intervention Engine** — server function computes per-policy lapse probability from real factors (days since last payment, payment regularity variance, grace-period entries in last 12mo, premium/income ratio). Recommends one of: premium holiday, reduce sum assured, convert to paid-up, agent outreach. Persisted in `lapse_predictions`. `intervention_outcomes` tracks acceptance + save; recommender weights by historical save rate per demographic bucket. Surfaced on dashboard + policy detail.

3. **Fraud Ring Graph** — `graph_edges` links claims ↔ hospitals ↔ doctors ↔ phones ↔ addresses ↔ agents. `detectFraudRings()` runs union-find over recent claims, scores clusters (shared entities × claim count × amount). Rings above threshold auto-flag claims (`fraud_ring_id` set). Interactive SVG cluster viewer lives in the **Trust & Safety** sidebar item.

4. **Next-Best-Action Engine** — customer-facing nudges on the dashboard driven by a rule matrix scored by recency + acknowledgement history (e.g., "You're eligible for a ₨2,50,000 policy loan at 8%"). Persisted in `next_actions`, dismissible.

### Design system

- **Palette**: emerald (`#00251A → #E0F2F1`, base `#004D40`), gold accent (`#8B6914 → #F9F3DE`, base `#D4AF37`), semantic success/warning/error/info, neutrals `#1A1A2E → #F5F7FA`.
- **Themes**: Light (customer default, airy institutional white) + Dark (Vercel/Linear-style deep emerald-900 to neutral-900). OKLCH tokens via `@theme inline` in `src/styles.css`.
- **Typography**: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (numbers/data). Loaded via `<link>` in root head.
- **Card system**: 5 elevation levels (Elevated / Standard / Subtle / Interactive / Flat) as component variants.
- **Density modes**: Comfortable (default) + Compact toggle in settings (CSS variables swap padding/font-size).
- **Motion**: 150–400ms ease-out, count-up on stat cards, pipeline pulse on active stage, card lift on hover, `prefers-reduced-motion` disables all.
- **Gold premium accents**: applied to loan disbursement CTA, maturity approval, and policies with sum assured ≥ ₨10M via a `premium` variant.
- **Pakistan formatting**: lakh/crore currency formatter, CNIC input with auto-dash (`XXXXX-XXXXXXX-X`), phone `+92 XXX-XXXXXXX`.
- **Layouts**: Dashboard layout (sidebar 260px collapsible to 72px), Form wizard layout (max-w-640, progressive disclosure) for claims/registration.

### Data model (v1 tables)

```
profiles(id → auth.users, cnic, full_name, dob, phone, occupation, monthly_income,
         nadra_verified, kyc_status, risk_rating, home_branch_id → branches)
branches(id, code, name, city, region, latitude, longitude, address, phone)
products(code, name, category, premium_rate_json, bonus_rules_json)
policies(policy_number, customer_id, product_id, branch_id → branches, status enum,
         sum_assured, premium_amount, premium_frequency, commencement_date, maturity_date,
         next_premium_due, grace_period_ends, total_premiums_paid, bonus_accumulated,
         cash_value, loan_outstanding, surrender_value, bonus_accrual_paused)
premiums(policy_id, amount, due_date, paid_date, status, payment_method, saga_id, late_fee)
policy_state_events(policy_id, from_state, to_state, trigger, metadata_json, created_at)
claims(claim_number, policy_id, customer_id, claim_type, status, assigned_to,
       approved_amount, fraud_score, fraud_ring_id, documents_json)
nominees(id, customer_id, policy_id, full_name, cnic, relationship, share_percentage)
goals(id, customer_id, title, target_amount, target_date, linked_policy_ids[], projected_value)
lapse_predictions(policy_id, probability, factors_json, recommended_intervention, generated_at)
intervention_outcomes(policy_id, intervention_type, offered_at, accepted, saved, demographic_bucket)
next_actions(customer_id, action_type, payload_json, score, acknowledged_at)
graph_edges(from_type, from_id, to_type, to_id, weight)
fraud_rings(id, member_claim_ids[], score, shared_entities_json)
saga_events(saga_id, step, status, payload_json, compensation_json, created_at)
activity_feed(customer_id, event_type, payload_json, created_at)
user_roles(user_id, role) — enum: customer, agent, admin  [customer only used in v1]
```

RLS: customers see only their own rows (via `auth.uid()`); `has_role()` security-definer function scaffolded for future agent/admin portals. Public tables (`products`, `branches`) have `TO anon` SELECT.

**Seed migration** creates: 4 realistic products (Endowment, Child Education, Whole Life, Term) and ~8 real Pakistani branches (Karachi/Lahore/Islamabad/Peshawar/etc). On first sign-in, a server function seeds the new user with 2–3 policies (linked to a branch), ~24 months of premium history (some late, some in grace to make the state machine visible with real saga_events), 1 in-progress claim (one seeded user gets a fraud-flagged claim so the ring viewer has content), 1 nominee, 1–2 goals, and ~15 activity feed entries covering premium received, bonus credited, tax cert generated, payment failed, claim status change, and state transitions.

### Tech notes

- TanStack Start file-based routing under `src/routes/_authenticated/`.
- `createServerFn` for all reads/writes; loaders prime via `ensureQueryData` + `useSuspenseQuery`.
- Sagas + state machine + lapse engine + fraud detection = separate `*.functions.ts` files in `src/lib/`.
- No real payment gateway, no real NADRA, no real WhatsApp — clearly labeled as simulated in the UI.
- Charts via Recharts, fraud rings via hand-rolled SVG (union-find clusters positioned in circular layout — no force simulation needed).

### Explicitly deferred (future iterations)

**Financial Genome Map** (family graph with SVG force layout — deferred until graph infra solidifies; Gamified Savings Goals covers the emotional/motivational slot for v1). Agent Portal, Admin/Head Office Portal, Analytics Platform, Urdu/RTL, real payment gateways, real NADRA/CNIC verification, WhatsApp/SMS delivery, voice biometrics, AR proposal, mobile app, micro-insurance wallet, regulatory sandbox, reinsurance optimization, product configuration engine, workflow builder.