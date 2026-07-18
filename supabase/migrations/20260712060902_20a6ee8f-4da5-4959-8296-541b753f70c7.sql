
-- =========================================================
-- ENUMS
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('customer','agent','admin');

CREATE TYPE public.policy_status AS ENUM (
  'draft','pending','active',
  'grace_period','lapsed_revivable','lapsed_surrender_only',
  'surrendered','matured','claimed'
);

CREATE TYPE public.premium_status AS ENUM ('pending','paid','overdue','waived','holiday');

CREATE TYPE public.claim_status AS ENUM (
  'submitted','under_review','verification','underwriting','approval','payment','disbursed','rejected'
);

CREATE TYPE public.saga_step_status AS ENUM ('pending','success','failed','compensated');

CREATE TYPE public.kyc_status AS ENUM ('pending','verified','rejected');

-- =========================================================
-- ROLES
-- =========================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT
TO authenticated USING (auth.uid() = user_id);

-- =========================================================
-- BRANCHES (public read)
-- =========================================================
CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.branches TO anon, authenticated;
GRANT ALL ON public.branches TO service_role;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "branches public read" ON public.branches FOR SELECT TO anon, authenticated USING (true);

-- =========================================================
-- PRODUCTS (public read)
-- =========================================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  min_sum_assured NUMERIC NOT NULL DEFAULT 100000,
  max_sum_assured NUMERIC NOT NULL DEFAULT 100000000,
  base_premium_rate NUMERIC NOT NULL DEFAULT 0.045,
  bonus_rate NUMERIC NOT NULL DEFAULT 0.055,
  term_years_min INT NOT NULL DEFAULT 10,
  term_years_max INT NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products public read" ON public.products FOR SELECT TO anon, authenticated USING (true);

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cnic TEXT UNIQUE,
  full_name TEXT NOT NULL,
  dob DATE,
  gender TEXT,
  phone TEXT,
  occupation TEXT,
  monthly_income NUMERIC,
  nadra_verified BOOLEAN NOT NULL DEFAULT false,
  kyc_status public.kyc_status NOT NULL DEFAULT 'pending',
  risk_rating TEXT NOT NULL DEFAULT 'low',
  home_branch_id UUID REFERENCES public.branches(id),
  onboarded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- =========================================================
-- POLICIES
-- =========================================================
CREATE TABLE public.policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  branch_id UUID REFERENCES public.branches(id),
  status public.policy_status NOT NULL DEFAULT 'active',
  sum_assured NUMERIC NOT NULL,
  premium_amount NUMERIC NOT NULL,
  premium_frequency TEXT NOT NULL DEFAULT 'monthly',
  commencement_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  next_premium_due DATE NOT NULL,
  grace_period_ends DATE,
  term_years INT NOT NULL DEFAULT 20,
  total_premiums_paid NUMERIC NOT NULL DEFAULT 0,
  bonus_accumulated NUMERIC NOT NULL DEFAULT 0,
  cash_value NUMERIC NOT NULL DEFAULT 0,
  loan_outstanding NUMERIC NOT NULL DEFAULT 0,
  surrender_value NUMERIC NOT NULL DEFAULT 0,
  bonus_accrual_paused BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.policies TO authenticated;
GRANT ALL ON public.policies TO service_role;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own policies" ON public.policies FOR SELECT TO authenticated USING (auth.uid() = customer_id);
CREATE POLICY "own policies update" ON public.policies FOR UPDATE TO authenticated USING (auth.uid() = customer_id);

CREATE INDEX idx_policies_customer ON public.policies(customer_id);
CREATE INDEX idx_policies_next_due ON public.policies(next_premium_due);

-- =========================================================
-- PREMIUMS
-- =========================================================
CREATE TABLE public.premiums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status public.premium_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_reference TEXT,
  late_fee NUMERIC NOT NULL DEFAULT 0,
  receipt_number TEXT,
  saga_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.premiums TO authenticated;
GRANT ALL ON public.premiums TO service_role;
ALTER TABLE public.premiums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own premiums" ON public.premiums FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.policies p WHERE p.id = premiums.policy_id AND p.customer_id = auth.uid()));
CREATE INDEX idx_premiums_policy ON public.premiums(policy_id);

-- =========================================================
-- POLICY STATE EVENTS
-- =========================================================
CREATE TABLE public.policy_state_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  from_state public.policy_status,
  to_state public.policy_status NOT NULL,
  trigger TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.policy_state_events TO authenticated;
GRANT ALL ON public.policy_state_events TO service_role;
ALTER TABLE public.policy_state_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own state events" ON public.policy_state_events FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.policies p WHERE p.id = policy_state_events.policy_id AND p.customer_id = auth.uid()));

-- =========================================================
-- NOMINEES
-- =========================================================
CREATE TABLE public.nominees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES public.policies(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cnic TEXT,
  relationship TEXT NOT NULL,
  share_percentage NUMERIC NOT NULL DEFAULT 100,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nominees TO authenticated;
GRANT ALL ON public.nominees TO service_role;
ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own nominees" ON public.nominees FOR ALL TO authenticated
USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

-- =========================================================
-- CLAIMS
-- =========================================================
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number TEXT NOT NULL UNIQUE,
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  claim_type TEXT NOT NULL,
  status public.claim_status NOT NULL DEFAULT 'submitted',
  assigned_to TEXT,
  approved_amount NUMERIC,
  paid_amount NUMERIC,
  fraud_score NUMERIC NOT NULL DEFAULT 0,
  fraud_ring_id UUID,
  documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  filed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.claims TO authenticated;
GRANT ALL ON public.claims TO service_role;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own claims" ON public.claims FOR SELECT TO authenticated USING (auth.uid() = customer_id);
CREATE POLICY "own claims insert" ON public.claims FOR INSERT TO authenticated WITH CHECK (auth.uid() = customer_id);

-- =========================================================
-- GOALS
-- =========================================================
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'target',
  target_amount NUMERIC NOT NULL,
  target_date DATE,
  linked_policy_ids UUID[] NOT NULL DEFAULT '{}',
  projected_value NUMERIC NOT NULL DEFAULT 0,
  milestones_hit INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.goals TO authenticated;
GRANT ALL ON public.goals TO service_role;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own goals" ON public.goals FOR ALL TO authenticated
USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

-- =========================================================
-- LAPSE PREDICTIONS
-- =========================================================
CREATE TABLE public.lapse_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  probability NUMERIC NOT NULL,
  factors JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommended_intervention TEXT NOT NULL,
  demographic_bucket TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lapse_predictions TO authenticated;
GRANT ALL ON public.lapse_predictions TO service_role;
ALTER TABLE public.lapse_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own lapse preds" ON public.lapse_predictions FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.policies p WHERE p.id = lapse_predictions.policy_id AND p.customer_id = auth.uid()));
CREATE INDEX idx_lapse_policy ON public.lapse_predictions(policy_id, generated_at DESC);

-- =========================================================
-- INTERVENTION OUTCOMES
-- =========================================================
CREATE TABLE public.intervention_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  intervention_type TEXT NOT NULL,
  demographic_bucket TEXT,
  offered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted BOOLEAN,
  saved BOOLEAN,
  resolved_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE ON public.intervention_outcomes TO authenticated;
GRANT ALL ON public.intervention_outcomes TO service_role;
ALTER TABLE public.intervention_outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own interventions" ON public.intervention_outcomes FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.policies p WHERE p.id = intervention_outcomes.policy_id AND p.customer_id = auth.uid()));

-- =========================================================
-- NEXT-BEST-ACTIONS
-- =========================================================
CREATE TABLE public.next_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cta_label TEXT NOT NULL DEFAULT 'Learn more',
  cta_route TEXT,
  score NUMERIC NOT NULL DEFAULT 0,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  acknowledged_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.next_actions TO authenticated;
GRANT ALL ON public.next_actions TO service_role;
ALTER TABLE public.next_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own next actions" ON public.next_actions FOR ALL TO authenticated
USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

-- =========================================================
-- FRAUD GRAPH
-- =========================================================
CREATE TABLE public.graph_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_type TEXT NOT NULL,
  from_id TEXT NOT NULL,
  to_type TEXT NOT NULL,
  to_id TEXT NOT NULL,
  weight NUMERIC NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.graph_edges TO authenticated;
GRANT ALL ON public.graph_edges TO service_role;
ALTER TABLE public.graph_edges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "graph edges auth read" ON public.graph_edges FOR SELECT TO authenticated USING (true);
CREATE INDEX idx_edges_from ON public.graph_edges(from_type, from_id);
CREATE INDEX idx_edges_to ON public.graph_edges(to_type, to_id);

CREATE TABLE public.fraud_rings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_claim_ids UUID[] NOT NULL,
  score NUMERIC NOT NULL,
  shared_entities JSONB NOT NULL DEFAULT '{}'::jsonb,
  summary TEXT,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fraud_rings TO authenticated;
GRANT ALL ON public.fraud_rings TO service_role;
ALTER TABLE public.fraud_rings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rings auth read" ON public.fraud_rings FOR SELECT TO authenticated USING (true);

-- =========================================================
-- SAGA EVENTS
-- =========================================================
CREATE TABLE public.saga_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saga_id UUID NOT NULL,
  saga_type TEXT NOT NULL,
  step TEXT NOT NULL,
  step_index INT NOT NULL,
  status public.saga_step_status NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  compensation JSONB,
  actor_id UUID,
  duration_ms INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.saga_events TO authenticated;
GRANT ALL ON public.saga_events TO service_role;
ALTER TABLE public.saga_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own sagas" ON public.saga_events FOR SELECT TO authenticated USING (auth.uid() = actor_id);
CREATE INDEX idx_saga_events ON public.saga_events(saga_id, step_index);

-- =========================================================
-- ACTIVITY FEED
-- =========================================================
CREATE TABLE public.activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'circle',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activity_feed TO authenticated;
GRANT ALL ON public.activity_feed TO service_role;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own activity" ON public.activity_feed FOR SELECT TO authenticated USING (auth.uid() = customer_id);
CREATE INDEX idx_activity_customer ON public.activity_feed(customer_id, created_at DESC);

-- =========================================================
-- updated_at trigger
-- =========================================================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER touch_profiles BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_policies BEFORE UPDATE ON public.policies
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_claims BEFORE UPDATE ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_goals BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- SEED: branches and products
-- =========================================================
INSERT INTO public.branches (code, name, city, region, address, phone, latitude, longitude) VALUES
  ('KHI-001','Aman Chamber','Karachi','Sindh','Shahrah-e-Faisal, Karachi','+92-21-111-111-111',24.8607,67.0011),
  ('LHR-001','Ferozepur Road','Lahore','Punjab','Main Boulevard Gulberg, Lahore','+92-42-111-111-222',31.5204,74.3587),
  ('ISB-001','Blue Area','Islamabad','Federal','Jinnah Avenue, Blue Area','+92-51-111-111-333',33.6844,73.0479),
  ('RWP-001','Saddar','Rawalpindi','Punjab','Kashmir Road, Saddar','+92-51-111-111-444',33.5651,73.0169),
  ('PEW-001','University Road','Peshawar','KPK','University Road, Peshawar','+92-91-111-111-555',34.0151,71.5249),
  ('QTA-001','Zarghoon Road','Quetta','Balochistan','Zarghoon Road, Quetta','+92-81-111-111-666',30.1798,66.9750),
  ('MUL-001','Bosan Road','Multan','Punjab','Bosan Road, Multan','+92-61-111-111-777',30.1575,71.5249),
  ('FSD-001','D-Ground','Faisalabad','Punjab','D-Ground, Peoples Colony','+92-41-111-111-888',31.4504,73.1350);

INSERT INTO public.products (code, name, category, tagline, description, min_sum_assured, max_sum_assured, base_premium_rate, bonus_rate, term_years_min, term_years_max) VALUES
  ('END-STD','Shad Abad Endowment','endowment','Guaranteed maturity with participating bonuses','A participating endowment plan combining protection with disciplined savings and annual bonuses.', 250000, 50000000, 0.052, 0.065, 10, 30),
  ('CHILD-EDU','Child Education Plan','child','Secure your child''s future education','Structured savings plan aligned to your child''s education milestones, with waiver-of-premium on parental disability.', 500000, 20000000, 0.048, 0.058, 12, 25),
  ('WLIFE','Whole Life Protector','whole_life','Lifelong coverage with cash value','Whole-of-life protection accumulating cash value you can borrow against or surrender.', 1000000, 100000000, 0.038, 0.052, 20, 40),
  ('TERM','Sadaqah Term Assurance','term','Pure protection, maximum coverage','Pure term life cover for the sole earners of the household — highest sum assured per rupee of premium.', 500000, 100000000, 0.008, 0.000, 10, 30);
