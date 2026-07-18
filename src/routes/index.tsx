import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ShieldCheck, Sparkles, TrendingUp, Network,
  Star, CheckCircle2, Zap, Lock, BarChart3, Users, Award, Globe,
  HeartPulse, Baby, Briefcase, Plus, Minus, Calculator, RefreshCw, Activity,
  Quote, BookOpen, Phone, Mail, MapPin, Clock, DollarSign, PiggyBank,
  Home, Building, GraduationCap, Shield, Heart, Percent, ArrowUpRight,
  Play, ChevronRight, Menu, X, Target,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Landing,
});

function Landing() {
  const [signedIn, setSignedIn] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersVisible(true); },
      { threshold: 0.3 },
    );
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  const parallax = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass bg-background/60">
        <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-sm font-display">S</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold font-display tracking-tight">SLIC Digital Hub</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">State Life Insurance</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Products</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#experience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Estimate</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#insights" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Insights</a>
          </nav>
          <div className="flex items-center gap-3">
            {signedIn ? (
              <Button asChild size="sm" className="gap-1.5 btn-magnetic">
                <Link to="/dashboard">Open portal <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="btn-magnetic hidden sm:flex"><Link to="/auth">Sign in</Link></Button>
                <Button asChild size="sm" className="shadow-lg btn-magnetic"><Link to="/auth">Get started →</Link></Button>
              </>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
            {["Products", "Pricing", "Experience", "Estimate", "Testimonials", "Insights"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">{item}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-950/20" />

        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] lg:h-[600px] lg:w-[600px] rounded-full bg-primary/10 blur-[80px] lg:blur-[120px] animate-float pointer-events-none" style={{ transform: `translateY(${parallax * 0.5}px)` }} />
        <div className="absolute top-1/3 right-1/4 h-[200px] w-[200px] lg:h-[400px] lg:w-[400px] rounded-full bg-gold/10 blur-[60px] lg:blur-[100px] animate-float [animation-delay:2000ms] pointer-events-none" style={{ transform: `translateY(${parallax * 0.3}px)` }} />
        <div className="absolute bottom-1/4 left-1/3 h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-full bg-primary/8 blur-[40px] lg:blur-[80px] animate-float [animation-delay:4000ms] pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 w-full z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-8 animate-fade-up glass backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Pakistan's institutional insurer — now digital
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold font-display tracking-tighter leading-[1.05] animate-fade-up [animation-delay:100ms]">
              Insurance, delivered with the
              <br />
              <span className="text-gradient-animate">precision</span>
              <span className="text-foreground"> of a bank.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up [animation-delay:200ms] leading-relaxed">
              Your State Life policies, claims, and savings goals — managed with the clarity, speed, and elegance of modern fintech.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:300ms]">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl shadow-[0_0_30px_rgba(0,77,64,0.3)] hover:shadow-[0_0_50px_rgba(0,77,64,0.5)] btn-magnetic group">
                <Link to="/auth">Open my portal <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
              <a href="#products" className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50">
                Explore products
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-6 animate-fade-up [animation-delay:400ms]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["AK", "MH", "SR", "FZ", "NA"].map((ini) => (
                    <div key={ini} className="h-8 w-8 rounded-full gradient-hero-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background">
                      {ini}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">3.6M+</span> policyholders
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                <span className="text-sm text-muted-foreground ml-1">4.9/5 from 12,400+ reviews</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Animated Dashboard Showcase ── */}
          <div className="hidden lg:block relative animate-fade-up [animation-delay:300ms]">
            <HeroShowcase />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP with animated counters ── */}
      <section ref={countersRef} className="border-y border-border/50 bg-card/10 backdrop-blur-md py-14 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "420B", prefix: "₨", label: "Claims paid", icon: <CheckCircle2 className="h-4 w-4" />, suffix: "" },
              { value: "3.6", prefix: "", label: "Active policies", icon: <Users className="h-4 w-4" />, suffix: "M+" },
              { value: "180", prefix: "", label: "Branches nationwide", icon: <Globe className="h-4 w-4" />, suffix: "+" },
              { value: "70", prefix: "", label: "Years of trust", icon: <Award className="h-4 w-4" />, suffix: "+" },
            ].map((m, idx) => (
              <div key={m.label} className="text-center group">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform mx-auto">
                  {m.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold font-display tabular-nums tracking-tight">
                  {m.prefix}
                  <AnimatedCounter value={parseFloat(m.value)} enabled={countersVisible} />
                  {m.suffix}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 font-bold">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SLIC ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Why SLIC</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight mb-3 md:mb-4">
              Built on 70 years of institutional trust
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              State Life Insurance Corporation is Pakistan's largest and most trusted life insurer, backed by the Government of Pakistan.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "Government Backing", desc: "100% state-owned enterprise with sovereign guarantee on every policy issued since 1952." },
              { icon: <Building className="h-6 w-6" />, title: "180+ Branches", desc: "Physical presence in every major city and district across Pakistan. Your agent is never far away." },
              { icon: <DollarSign className="h-6 w-6" />, title: "₨420B+ Paid Out", desc: "Over 420 billion rupees in claims, maturity benefits, and bonuses disbursed to policyholders." },
              { icon: <Users className="h-6 w-6" />, title: "3.6M Families Protected", desc: "From individual policies to large corporate group schemes, we serve millions with integrity." },
              { icon: <Percent className="h-6 w-6" />, title: "Industry-Leading Bonuses", desc: "Consistently among the highest reversionary bonus rates in the South Asian insurance market." },
              { icon: <Award className="h-6 w-6" />, title: "SECP & SBP Regulated", desc: "Fully compliant with the Securities and Exchange Commission and State Bank of Pakistan regulations." },
            ].map((item, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card-icon">{item.icon}</div>
                <h3 className="font-bold font-display text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT COMPARISON TABLE ── */}
      <section id="pricing" className="py-16 md:py-24 bg-card/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Compare Plans</div>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              Find the right plan for your life stage
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every plan comes with flexible premium terms, tax benefits under Section 62, and the backing of Pakistan's strongest insurer.
            </p>
          </div>
          <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-2xl border-x-0 sm:border-x border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="text-left p-3 sm:p-5 font-semibold font-display text-xs sm:text-sm">Feature</th>
                  <th className="text-left p-3 sm:p-5 font-semibold font-display text-xs sm:text-sm">Shad Abad Endowment</th>
                  <th className="text-left p-5 font-semibold font-display">Child Education Plan</th>
                  <th className="text-left p-5 font-semibold font-display">Whole Life Protector</th>
                  <th className="text-left p-5 font-semibold font-display">Retirement Annuity</th>
                  <th className="text-left p-5 font-semibold font-display">Sadaqah Term</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feat: "Min. Term", vals: ["10 years", "5 years", "Lifetime", "5 years", "5 years"] },
                  { feat: "Max. Term", vals: ["40 years", "25 years", "—", "30 years", "30 years"] },
                  { feat: "Min. Age", vals: ["18", "0 (newborn)", "18", "25", "18"] },
                  { feat: "Max. Age", vals: ["65", "55", "70", "60", "65"] },
                  { feat: "Bonus Type", vals: ["Reversionary", "Reversionary", "Reversionary", "Cash Bonus", "—"] },
                  { feat: "Loan Facility", vals: ["Yes ✓", "Yes ✓", "Yes ✓", "No", "No"] },
                  { feat: "Tax Benefit (Sec 62)", vals: ["Yes ✓", "Yes ✓", "Yes ✓", "Yes ✓", "Yes ✓"] },
                  { feat: "Surrender Value", vals: ["After 3 years", "After 3 years", "After 3 years", "No", "No"] },
                  { feat: "Sum Assured Range", vals: ["₨500K – ₨50M", "₨1M – ₨25M", "₨500K – Unltd", "₨2M – ₨20M", "₨1M – ₨50M"] },
                  { feat: "Starting Premium/mo", vals: ["₨3,750", "₨4,500", "₨5,200", "₨8,000", "₨1,500"] },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="p-3 sm:p-5 font-medium text-xs sm:text-sm">{row.feat}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="p-3 sm:p-5 text-muted-foreground text-xs sm:text-sm">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button asChild variant="outline">
              <Link to="/auth">Compare full details <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-20 dark:opacity-10" />
        <div className="relative max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              Trusted by millions of Pakistanis
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real stories from real policyholders who've experienced the SLIC Digital difference.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {[
                  { name: "Ahmed Khan", role: "Policyholder since 2018", location: "Lahore", quote: "I've been with State Life for 6 years. The digital hub lets me see my cash value growing in real-time — something I never thought possible from an insurance company. The premium estimator helped me plan my daughter's wedding fund with total confidence." },
                  { name: "Fatima Hassan", role: "Education Plan Beneficiary", location: "Islamabad", quote: "My father started a Child Education Plan when I was 5. Thanks to SLIC, my entire university fee was covered without any hassle. The claim process was surprisingly smooth — just uploaded the documents and the payment arrived in 2 days." },
                  { name: "Col. (R) Tariq Mehmood", role: "Retired, Whole Life Policy", location: "Rawalpindi", quote: "After 30 years of service, my Whole Life Protector policy matured and the bonus accumulation was far beyond what I expected. State Life's reversionary bonus rate has consistently been the best in the industry." },
                  { name: "Zara Ali", role: "Young Professional", location: "Karachi", quote: "As a freelancer, I wanted a retirement plan that I could contribute to flexibly. The Retirement Annuity plan through the digital hub lets me pause and resume payments whenever my income fluctuates. Absolute game-changer." },
                ].map((t, i) => (
                  <div key={i} className="min-w-full px-4">
                    <div className="surface-elevated p-6 sm:p-8 md:p-12 text-center max-w-2xl mx-auto">
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/30 mx-auto mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 font-medium italic">"{t.quote}"</p>
                      <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="h-10 w-10 rounded-full gradient-hero-bg flex items-center justify-center text-primary-foreground font-bold">
                          {t.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role} · {t.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-4">
                        {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {[0,1,2,3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === activeTestimonial ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTestimonial((p) => Math.max(0, p - 1))}
                disabled={activeTestimonial === 0}
              >
                ← Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTestimonial((p) => Math.min(3, p + 1))}
                disabled={activeTestimonial === 3}
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS TRUST BAR ── */}
      <section className="border-y border-border/50 bg-card/20 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <p className="text-center text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6 sm:mb-8">
            Regulated & recognized by
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg"><ShieldCheck className="h-5 w-5 sm:h-7 sm:w-7 text-primary" /> SECP</div>
            <div className="flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg"><Globe className="h-5 w-5 sm:h-7 sm:w-7 text-primary" /> Govt. of Pakistan</div>
            <div className="flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg"><Lock className="h-5 w-5 sm:h-7 sm:w-7 text-primary" /> 256-bit</div>
            <div className="flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg"><BarChart3 className="h-5 w-5 sm:h-7 sm:w-7 text-primary" /> SBP Compliant</div>
            <div className="flex items-center gap-2 sm:gap-3 font-bold text-sm sm:text-lg"><Award className="h-5 w-5 sm:h-7 sm:w-7 text-primary" /> PBA Certified</div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PREMIUM ESTIMATOR ── */}
      <section id="calculator" className="py-16 md:py-24 bg-card/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2">
              <Calculator className="h-3.5 w-3.5" /> Live Estimator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6">Transparent pricing, <br/>zero hidden fees.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Adjust the coverage slider to see how your premium scales. Our intelligent engine provides instant, guaranteed estimates for whole life and endowment plans. All premiums include applicable taxes and fees.
            </p>
            <InteractivePremiumEstimator />
          </div>
          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl border border-gold/20 card-spotlight">
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold" /> Growth Projection
              </h3>
              <div className="h-48 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2">
                {[20, 35, 45, 60, 75, 90, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-sm group relative transition-all duration-300 hover:opacity-80 cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap">
                      Year {i * 5 + 5}: ~₨{(h * 2.5).toFixed(0)}M
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">Projected cash value over a 35-year term including reversionary bonuses at 4.5%.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Minimum premium", val: "₨1,500/mo" },
                { label: "Tax benefit", val: "Sec 62" },
                { label: "Payout speed", val: "24-48 hrs" },
                { label: "Bonus rate (avg)", val: "4.5% p.a." },
              ].map((s) => (
                <div key={s.label} className="surface-subtle p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
                  <div className="font-bold font-display text-lg mt-1">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS MARQUEE ── */}
      <section id="products" className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-8 md:mb-12">
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Our Suite
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight">Protection for every life stage.</h2>
        </div>

        <div className="marquee-track relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="marquee-inner flex w-max gap-8 pb-8 pt-4">
            {[
              { title: "Shad Abad Endowment", desc: "Guaranteed savings with life cover and industry-best reversionary bonuses.", icon: <PiggyBank className="h-6 w-6 text-primary" /> },
              { title: "Child Education Plan", desc: "Secure their university funds with guaranteed payouts at every milestone.", icon: <GraduationCap className="h-6 w-6 text-primary" /> },
              { title: "Whole Life Protector", desc: "Lifelong protection that builds substantial cash value over time.", icon: <HeartPulse className="h-6 w-6 text-gold" /> },
              { title: "Retirement Annuity", desc: "Convert your savings into a steady post-career monthly income stream.", icon: <TrendingUp className="h-6 w-6 text-info" /> },
              { title: "Marriage Plan", desc: "Build a solid financial foundation for your children's future weddings.", icon: <Heart className="h-6 w-6 text-primary" /> },
              { title: "Sadaqah Term", desc: "Pure protection at the lowest possible premium. Maximum cover, minimum cost.", icon: <Shield className="h-6 w-6 text-foreground" /> },
            ].map((p, i) => (
              <div key={i} className="w-[340px] shrink-0 whitespace-normal glass p-8 rounded-2xl card-spotlight hover:-translate-y-2 transition-transform duration-300">
                <div className="h-12 w-12 rounded-xl bg-background/50 border border-border flex items-center justify-center mb-6 shadow-sm">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-6 font-medium text-xs text-primary uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
            {[
              { title: "Shad Abad Endowment", desc: "Guaranteed savings with life cover and industry-best reversionary bonuses.", icon: <PiggyBank className="h-6 w-6 text-primary" /> },
              { title: "Child Education Plan", desc: "Secure their university funds with guaranteed payouts at every milestone.", icon: <GraduationCap className="h-6 w-6 text-primary" /> },
              { title: "Whole Life Protector", desc: "Lifelong protection that builds substantial cash value over time.", icon: <HeartPulse className="h-6 w-6 text-gold" /> },
              { title: "Retirement Annuity", desc: "Convert your savings into a steady post-career monthly income stream.", icon: <TrendingUp className="h-6 w-6 text-info" /> },
              { title: "Marriage Plan", desc: "Build a solid financial foundation for your children's future weddings.", icon: <Heart className="h-6 w-6 text-primary" /> },
              { title: "Sadaqah Term", desc: "Pure protection at the lowest possible premium. Maximum cover, minimum cost.", icon: <Shield className="h-6 w-6 text-foreground" /> },
            ].map((p, i) => (
              <div key={`dup-${i}`} className="w-[340px] shrink-0 whitespace-normal glass p-8 rounded-2xl card-spotlight hover:-translate-y-2 transition-transform duration-300">
                <div className="h-12 w-12 rounded-xl bg-background/50 border border-border flex items-center justify-center mb-6 shadow-sm">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-6 font-medium text-xs text-primary uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AURORA DIGITAL EXPERIENCE ── */}
      <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-30 dark:opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-4">The Digital Experience</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight mb-4 md:mb-6">
              Your policies, <br /> beautifully organized.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              We rebuilt the policyholder experience from the ground up. View real-time cash values, pay premiums instantly, and track claims without ever calling an agent.
            </p>

            <div className="space-y-6">
              {[
                { title: "One-Tap Payments", desc: "Settle premiums instantly via Raast, EasyPaisa, JazzCash, or cards.", icon: <Zap className="h-5 w-5" /> },
                { title: "Smart Lapse Prevention", desc: "Get AI-driven alerts before you lose coverage, with auto-fix suggestions.", icon: <ShieldCheck className="h-5 w-5" /> },
                { title: "Live Cash Value", desc: "Watch your endowment grow day by day with real-time bonus tracking.", icon: <BarChart3 className="h-5 w-5" /> },
                { title: "Fraud Detection", desc: "Our Trust & Safety engine flags suspicious activity across the claims network.", icon: <Network className="h-5 w-5" /> },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="h-10 w-10 rounded-xl bg-background/50 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{f.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="mt-10 btn-magnetic" size="lg">
              <Link to="/auth">Experience the demo</Link>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-md aspect-[9/16] rounded-[2.5rem] border-[8px] border-surface-2 bg-background shadow-2xl overflow-hidden glass">
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
              <div className="w-32 h-6 bg-surface-2 rounded-b-3xl"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background p-6 pt-12 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <div className="w-10 h-10 rounded-full gradient-hero-bg"></div>
                <div className="w-8 h-8 rounded-full bg-surface-2"></div>
              </div>
              <div className="w-3/4 h-8 bg-surface-1 rounded-lg"></div>
              <div className="w-1/2 h-4 bg-surface-1 rounded-md mb-4"></div>

              <div className="surface-elevated p-4 rounded-2xl card-spotlight">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-20 h-4 bg-surface-2 rounded"></div>
                  <div className="w-12 h-4 bg-success/20 rounded"></div>
                </div>
                <div className="w-1/2 h-8 bg-surface-2 rounded mb-2"></div>
                <div className="w-full h-2 bg-surface-1 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary animate-pulse"></div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 surface-subtle h-24 rounded-2xl"></div>
                <div className="flex-1 surface-subtle h-24 rounded-2xl"></div>
              </div>

              <div className="bg-surface-2/50 rounded-2xl p-3 flex items-center gap-3 mt-auto">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-success" /></div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-foreground">Premium paid</div>
                  <div className="text-[10px] text-muted-foreground">Whole Life Endowment · ₨9,375</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED FRAUD NETWORK & BENTO ── */}
      <section className="py-16 md:py-24 bg-card/20 border-y border-border/50 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 relative z-10">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] card-spotlight">
            <div className="absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="absolute top-8 right-8 h-32 w-32 pointer-events-none opacity-20">
               <div className="absolute inset-0 rounded-full border border-primary/30 [animation:radar-pulse_3s_infinite]" />
               <div className="absolute inset-2 rounded-full border border-primary/30 [animation:radar-pulse_3s_infinite_1s]" />
               <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-primary rounded-full [animation:node-glow_2s_infinite_alternate]" />
               <div className="absolute bottom-6 right-8 w-1 h-1 bg-primary rounded-full [animation:node-glow_1.5s_infinite_alternate]" />
            </div>

            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 relative z-10">
              <Network className="h-6 w-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight mb-2 md:mb-3 relative z-10">Trust & Safety, visible</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm relative z-10">A fraud-ring detection engine runs across the claims network — you see the same signals our underwriters do.</p>
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 relative z-10">
              {[
                { label: "Claims verified", val: "99.2%", color: "text-success" },
                { label: "Fraud detected", val: "₨2.1B", color: "text-warning" },
                { label: "Response time", val: "<24h", color: "text-info" },
              ].map(s => (
                <div key={s.label} className="bg-muted/50 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
                  <div className={`text-sm md:text-xl font-bold font-display ${s.color}`}>{s.val}</div>
                  <div className="text-[8px] md:text-[10px] text-muted-foreground mt-0.5 md:mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] card-spotlight premium-glow flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 h-56 w-56 bg-gold/5 rounded-full blur-3xl" />
            <div>
              <div className="h-12 w-12 rounded-xl gradient-gold-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-gold-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight mb-2 md:mb-3">Gamified savings goals</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">Tag policies to life goals and watch cash value grow in real time.</p>
            </div>
            <div className="mt-8 space-y-4 relative z-10">
              {[{ label: "Hajj 2032", pct: 62 }, { label: "Ali's Uni Fund", pct: 38 }].map(g => (
                <div key={g.label}>
                  <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">{g.label}</span><span className="text-primary font-semibold">{g.pct}%</span></div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${g.pct}%` }} /></div>
                </div>
              ))}
              <div className="bg-muted/50 rounded-lg p-3 text-sm flex items-center justify-between mt-4">
                <span className="text-muted-foreground">Combined progress</span>
                <span className="font-semibold">52%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLL TIMELINE ── */}
      <section className="py-20 md:py-32">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground">From sign-up to settlement, completely transparent.</p>
          </div>
          <div className="relative border-l border-border ml-6 md:ml-12 space-y-16 pb-8">
             {[
                { title: "Verify your identity", desc: "Instantly and securely verify yourself via NADRA integration. Your data stays encrypted and private.", icon: <ShieldCheck className="h-5 w-5" /> },
                { title: "Link your policies", desc: "Enter your CNIC and we'll automatically fetch all your active and lapsed policies across every branch.", icon: <RefreshCw className="h-5 w-5" /> },
                { title: "Track cash value", desc: "Watch your premiums grow with real-time tracking of reversionary bonuses and projected maturity values.", icon: <Activity className="h-5 w-5" /> },
                { title: "Set savings goals", desc: "Link policies to life goals — whether it's Hajj, education, or retirement — and track progress in real time.", icon: <Target className="h-5 w-5" /> },
                { title: "Claim digitally", desc: "Upload documents from your phone and track your claim status step-by-step through our 7-stage pipeline.", icon: <CheckCircle2 className="h-5 w-5" /> },
             ].map((step, i) => (
                <div key={i} className="relative pl-10 md:pl-16 group">
                   <div className="absolute -left-5 top-0 h-10 w-10 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                      {step.icon}
                   </div>
                   <h3 className="text-xl font-bold font-display mb-2">{step.title}</h3>
                   <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS / BLOG PREVIEW ── */}
      <section id="insights" className="py-16 md:py-24 bg-card/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" /> Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Latest from SLIC</h2>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:flex">View all articles <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Financial Planning", date: "Mar 15, 2026", title: "5 reasons why endowment plans outperform savings accounts", read: "8 min read", desc: "How reversionary bonuses and tax benefits under Section 62 can generate 2-3x more wealth than traditional savings." },
              { tag: "Claims Guide", date: "Feb 28, 2026", title: "Your step-by-step guide to filing a death claim online", read: "5 min read", desc: "Everything you need to know about the digital claim process, from required documents to payout timelines." },
              { tag: "Industry News", date: "Jan 20, 2026", title: "SLIC announces record ₨42B bonus payout for FY25-26", read: "4 min read", desc: "State Life has declared its highest-ever reversionary bonus rate at 4.8%, benefiting over 2 million policyholders." },
            ].map((post, i) => (
              <div key={i} className="group surface-elevated overflow-hidden card-spotlight">
                <div className="h-44 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary/30 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="badge-pill-info">{post.tag}</span>
                    <span>{post.date}</span>
                    <span>· {post.read}</span>
                  </div>
                  <h3 className="font-bold font-display text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.desc}</p>
                  <div className="mt-4 text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight mb-3 md:mb-4">Common questions</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Everything you need to know about the product and billing.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "Is this replacing my physical agent?", a: "No. The Digital Hub works alongside your agent, giving you 24/7 visibility into the details they manage. You can still call them anytime. Think of it as your policy's real-time dashboard, not a replacement for personal service." },
            { q: "How secure is my financial data?", a: "We use 256-bit encryption at rest and in transit. Our infrastructure is fully compliant with State Bank of Pakistan regulations and SECP data protection guidelines. Your data is stored locally in secured, geo-redundant facilities within Pakistan." },
            { q: "Can I pay premiums directly through the app?", a: "Yes. We support 1-Click payments via Raast, EasyPaisa, JazzCash, and all major credit/debit cards. You can also set up auto-debit instructions so you never miss a premium again." },
            { q: "How long do claim payouts take?", a: "For straightforward maturity or survival benefits, our automated system can process payouts to your registered IBAN within 24-48 hours. Death claims typically require 5-7 business days for complete verification." },
            { q: "What documents do I need to file a claim?", a: "For maturity claims: policy document, CNIC, and bank account details. For death claims: death certificate, CNIC of nominee, policy document, and claim form. All documents can be uploaded directly through the Digital Hub." },
            { q: "Can I have multiple policies under one login?", a: "Absolutely. Once you verify your CNIC, all policies in your name — whether active, lapsed, or matured — will appear in your dashboard. You can manage them all from a single account." },
            { q: "What happens if I miss a premium payment?", a: "You have a 30-day grace period during which your coverage continues. After that, the policy enters a lapsed-revivable state for 2 years. You can revive it by paying all overdue premiums with a small late fee." },
            { q: "Is the platform available in Urdu?", a: "Urdu language support is coming in Q3 2026. Currently the platform is available in English. All policy documents and communications remain available in both Urdu and English as per regulatory requirements." },
          ].map((faq, i) => (
            <div key={i} className="border border-border rounded-xl bg-card overflow-hidden transition-all duration-300">
              <button
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold">{faq.q}</span>
                {openFaq === i ? <Minus className="h-5 w-5 text-muted-foreground shrink-0" /> : <Plus className="h-5 w-5 text-muted-foreground shrink-0" />}
              </button>
              <div
                className={`px-5 text-muted-foreground overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero-bg opacity-[0.04]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-primary/10 rounded-full blur-[100px] animate-float" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="h-16 w-16 rounded-2xl gradient-hero-bg mx-auto flex items-center justify-center mb-8 shadow-xl hover:scale-110 transition-transform cursor-pointer">
             <span className="text-primary-foreground font-bold text-2xl font-display">S</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-6">
            Ready to take control?
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed text-lg">No paperwork. No waiting in line. Just clear, real-time control over every rupee of your insurance portfolio. Join 3.6 million Pakistanis who trust State Life.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base rounded-xl shadow-[0_0_40px_rgba(0,77,64,0.35)] hover:shadow-[0_0_60px_rgba(0,77,64,0.55)] btn-magnetic">
              <Link to="/auth">Open my portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base">
              <a href="#products">View products</a>
            </Button>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No hidden fees</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> 256-bit encryption</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Govt. backed</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl gradient-hero-bg flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-sm font-display">S</span>
                </div>
                <div>
                  <div className="text-sm font-bold font-display">SLIC Digital Hub</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">State Life Insurance</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Demonstration platform for State Life Insurance Corporation of Pakistan (SLIC). 
                SLIC is Pakistan's largest life insurer with over 70 years of service, 180+ branches, and 3.6 million policyholders.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Head Office, Karachi</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> 0800-01234</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Products</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Endowment Plans</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Child Education</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Whole Life</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Retirement Annuity</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Term Assurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Find a branch</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Claim guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of use</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-6">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 SLIC Digital Hub. All rights reserved. Not for actual financial use — demonstration purposes only.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Hero animated dashboard showcase ── */
function HeroShowcase() {
  const barsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLDivElement>(".chart-bar");
    let frame: number;
    let tick = 0;
    function animate() {
      tick += 0.025;
      bars.forEach((bar, i) => {
        const base = [35, 55, 40, 70, 50, 80, 60, 95, 75, 45, 65, 85][i % 12];
        const wave = Math.sin(tick + i * 0.8) * 8;
        bar.style.height = `${Math.max(8, base + wave)}%`;
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative">
      {/* Glow behind */}
      <div className="absolute -inset-20 bg-primary/5 rounded-full blur-[100px] animate-float pointer-events-none" />
      <div className="absolute -inset-10 bg-gold/5 rounded-full blur-[80px] animate-float [animation-delay:3000ms] pointer-events-none" />

      {/* Main showcase card */}
      <div className="relative glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Fake header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg gradient-hero-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">S</span>
            </div>
            <div className="text-xs font-semibold text-foreground/80">Digital Hub</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Top row — animated metric cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-colors group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Portfolio</span>
                <TrendingUp className="h-3.5 w-3.5 text-success animate-pulse" />
              </div>
              <div className="text-xl font-bold font-display tabular-nums text-foreground">
                <AnimatedTicker target={4.85} prefix="₨" suffix="M" />
              </div>
              <div className="text-[10px] text-success mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-2.5 w-2.5" /> +12.3% this year
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-gold/20 transition-colors group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Bonuses</span>
                <Award className="h-3.5 w-3.5 text-gold animate-pulse [animation-delay:500ms]" />
              </div>
              <div className="text-xl font-bold font-display tabular-nums text-foreground">
                <AnimatedTicker target={1.24} prefix="₨" suffix="M" />
              </div>
              <div className="text-[10px] text-gold mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-2.5 w-2.5" /> +4.8% rate declared
              </div>
            </div>
          </div>

          {/* Animated chart */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BarChart3 className="h-3 w-3 text-primary" /> Premium Growth
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-success" /> Live
              </div>
            </div>
            <div ref={barsRef} className="flex items-end gap-1.5 h-20">
              {[35, 55, 40, 70, 50, 80, 60, 95, 75, 45, 65, 85].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="chart-bar w-full rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/30 hover:to-primary/60 transition-all duration-75 cursor-pointer"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[8px] text-muted-foreground">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>

          {/* Floating policy cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.04] rounded-xl p-3 border border-white/5 animate-float" style={{ animationDuration: "5s" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-muted-foreground">END-1001</span>
                <span className="badge-pill-success text-[8px] py-0">Active</span>
              </div>
              <div className="text-sm font-bold font-display">Shad Abad Endowment</div>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-muted-foreground">₨2.5M assured</span>
                <span className="text-success">4.5% bonus</span>
              </div>
            </div>
            <div className="bg-white/[0.04] rounded-xl p-3 border border-white/5 animate-float" style={{ animationDuration: "6s", animationDelay: "1s" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-muted-foreground">CHILD-EDU</span>
                <span className="badge-pill-info text-[8px] py-0">Growing</span>
              </div>
              <div className="text-sm font-bold font-display">Education Plan</div>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-muted-foreground">₨5M assured</span>
                <span className="text-info">18yr term</span>
              </div>
            </div>
          </div>

          {/* Animated circular trust badge */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="relative h-16 w-16 flex items-center justify-center">
              <svg className="absolute inset-0 h-full w-full animate-float" style={{ animationDuration: "8s" }} viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="oklch(0.72 0.14 85 / 0.3)" strokeWidth="1.5"
                  strokeDasharray="4 4" className="animate-[spin_8s_linear_infinite]" />
                <circle cx="32" cy="32" r="22" fill="none" stroke="oklch(0.68 0.13 165 / 0.2)" strokeWidth="1"
                  strokeDasharray="3 6" className="animate-[spin_12s_linear_infinite_reverse]" />
              </svg>
              <div className="h-10 w-10 rounded-full gradient-gold-bg flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-gold-foreground" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold font-display">Govt. Backed</div>
              <div className="text-[10px] text-muted-foreground">Since 1952</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-xs font-bold font-display text-gold">AA+</div>
              <div className="text-[10px] text-muted-foreground">Sovereign Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Continuously counting ticker */
function AnimatedTicker({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = Date.now();
    function tick() {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const progress = Math.min(1, elapsed / 2);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = requestAnimationFrame(tick); // keep looping
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return <span>{prefix}{val.toFixed(2)}{suffix}</span>;
}

function AnimatedCounter({ value, enabled }: { value: number; enabled: boolean }) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current) return;
    startedRef.current = true;
    const duration = 1500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [enabled, value]);

  return <span>{Math.floor(display)}</span>;
}

function InteractivePremiumEstimator() {
  const [coverage, setCoverage] = useState([1000000]);

  const formatPKR = (num: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(num);
  };

  const estimatedPremium = Math.round(coverage[0] * 0.045 / 12);
  const estimatedCashValue = Math.round(coverage[0] * 2.5);
  const estimatedBonus = Math.round(coverage[0] * 0.85);

  return (
    <div className="surface-elevated p-6 rounded-2xl glass card-spotlight">
      <div className="flex justify-between items-end mb-6">
         <div>
            <div className="text-sm font-medium text-muted-foreground">Desired Coverage</div>
            <div className="text-3xl font-bold font-display mt-1">{formatPKR(coverage[0])}</div>
         </div>
      </div>

      <Slider
         defaultValue={[1000000]}
         max={10000000}
         min={500000}
         step={100000}
         value={coverage}
         onValueChange={setCoverage}
         className="mb-8"
      />

      <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
         <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Est. Monthly Premium</div>
            <div className="text-xl font-bold font-display text-primary">{formatPKR(estimatedPremium)}</div>
         </div>
         <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Est. Maturity Value</div>
            <div className="text-xl font-bold font-display text-gold">{formatPKR(estimatedCashValue)}</div>
         </div>
         <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Est. Bonus (20yr)</div>
            <div className="text-xl font-bold font-display text-info">{formatPKR(estimatedBonus)}</div>
         </div>
      </div>
    </div>
  );
}
