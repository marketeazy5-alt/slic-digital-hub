import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCNIC, formatPhone } from "@/lib/format";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in — SLIC Digital Hub" },
      { name: "description", content: "Access your State Life Insurance policies, premiums, and claims." },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: sd }) => {
      if (sd.session) navigate({ to: "/dashboard" });
      else setChecking(false);
    });
  }, [navigate]);

  if (checking) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-5 w-5 text-muted-foreground" /></div>;

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden md:flex relative flex-col gradient-hero-bg text-primary-foreground p-12 justify-between overflow-hidden">
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md bg-white/10 backdrop-blur flex items-center justify-center shadow-sm">
              <span className="font-bold font-display">S</span>
            </div>
            <div>
              <div className="font-semibold font-display tracking-tight">SLIC Digital Hub</div>
              <div className="text-xs uppercase tracking-wider text-white/60 font-medium">State Life Insurance</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-md animate-fade-up [animation-delay:100ms]">
          <h2 className="text-4xl font-bold font-display leading-tight tracking-tight">"For the first time, my policy makes sense."</h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">Manage every rupee, every claim, every nominee — with the clarity of a modern financial product and the trust of Pakistan's oldest life insurer.</p>
        </div>
        <div className="relative z-10 text-xs text-white/50 animate-fade-in">Demonstration data. No real transactions.</div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-[100px] animate-float" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-[80px] animate-float [animation-delay:2000ms]" />
      </div>

      {/* Auth panel */}
      <div className="flex flex-col p-6 md:p-12">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold font-display">Welcome</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in or create your policyholder account.</p>
            <Tabs defaultValue="signin" className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="signin" className="flex-1">Sign in</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin"><SignInForm /></TabsContent>
              <TabsContent value="signup"><SignUpForm /></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Welcome back");
    navigate({ to: "/dashboard" });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 mt-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
      </div>
      <Button type="submit" className="w-full h-12 mt-2 shadow-premium hover:shadow-hover transition-all" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
      </Button>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", cnic: "", phone: "", monthly_income: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: form.full_name },
      },
    });
    if (error) { setLoading(false); toast.error(error.message); return; }

    // Update the profile row created by the trigger (or upsert if missing)
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: form.full_name,
        cnic: form.cnic || null,
        phone: form.phone || null,
        monthly_income: form.monthly_income ? Number(form.monthly_income) : null,
      });
    }

    setLoading(false);

    // If session returned immediately (email confirm disabled), navigate in
    if (data.session) {
      toast.success("Account created. Loading your portal…");
      navigate({ to: "/dashboard" });
      return;
    }

    // Email confirmation required — tell user what to do
    toast.success("Account created! Check your email for the confirmation link, then sign in.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 mt-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Ahmed Khan" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email2">Email</Label>
        <Input id="email2" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password2">Password</Label>
        <Input id="password2" type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cnic">CNIC</Label>
          <Input id="cnic" value={form.cnic} onChange={(e) => setForm({ ...form, cnic: formatCNIC(e.target.value) })} placeholder="XXXXX-XXXXXXX-X" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })} placeholder="+92 300-1234567" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="income">Monthly income (PKR, optional)</Label>
        <Input id="income" type="number" value={form.monthly_income} onChange={(e) => setForm({ ...form, monthly_income: e.target.value })} placeholder="120000" className="h-12 transition-all focus:ring-2 focus:ring-primary/20" />
        <p className="text-[11px] text-muted-foreground mt-1">Used only to tune your lapse-risk model and coverage suggestions.</p>
      </div>
      <Button type="submit" className="w-full h-12 mt-2 shadow-premium hover:shadow-hover transition-all" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
      </Button>
    </form>
  );
}
