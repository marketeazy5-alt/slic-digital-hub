import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboard } from "@/lib/customer-queries.functions";
import { seedIfNeeded, runLapseEngine, dismissNextAction } from "@/lib/intelligence.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { NotificationBell } from "@/components/notification-bell";
import { formatPKR, compactPKR, relativeTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Shield, Wallet, TrendingUp, Calendar, ChevronRight, Sparkles, X,
  ReceiptText, BadgeCheck, ArrowRight, FileText, Bell, Target,
  BarChart3, Clock, CheckCircle2, AlertTriangle, CreditCard, PiggyBank,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const seed = useServerFn(seedIfNeeded);
  const fetchDash = useServerFn(getDashboard);
  const runLapse = useServerFn(runLapseEngine);
  const dismiss = useServerFn(dismissNextAction);
  const qc = useQueryClient();

  useEffect(() => {
    seed({}).then((r) => {
      if (r?.seeded) {
        toast.success("Your portal is ready", { description: "We've provisioned demonstration policies, premiums, and intelligence." });
        qc.invalidateQueries({ queryKey: ["dashboard"] });
      }
    }).catch(() => {});
  }, [seed, qc]);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDash({}),
  });

  const dismissAction = useMutation({
    mutationFn: (id: string) => dismiss({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  const rerunLapse = useMutation({
    mutationFn: () => runLapse({}),
    onSuccess: () => {
      toast.success("Lapse intelligence refreshed");
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const policies = data?.policies ?? [];
  const activity = data?.activity ?? [];
  const actions = data?.actions ?? [];
  const lapsePreds = data?.lapsePreds ?? [];
  const profile = data?.profile;

  const totalCoverage = policies.reduce((s, p) => s + Number(p.sum_assured), 0);
  const totalInvested = policies.reduce((s, p) => s + Number(p.total_premiums_paid), 0);
  const totalBonus = policies.reduce((s, p) => s + Number(p.bonus_accumulated), 0);
  const activeCount = policies.filter((p) => p.status === "active").length;
  const graceCount = policies.filter((p) => p.status === "grace_period").length;
  const claimablePolicies = policies.filter((p) => p.status === "matured" || p.status === "active").length;
  const NextDue = policies
    .filter((p) => p.status === "active" || p.status === "grace_period")
    .map((p) => new Date(p.next_premium_due))
    .sort((a, b) => a.getTime() - b.getTime())[0];
  const totalDue = policies
    .filter((p) => p.status === "grace_period" || p.status === "lapsed_revivable")
    .reduce((s, p) => s + Number(p.premium_amount), 0);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  const upcomingPayments = policies
    .filter((p) => p.status === "active" || p.status === "grace_period")
    .slice(0, 5);

  return (
    <AppShell
      title={`Assalam-o-alaikum, ${firstName}`}
      subtitle={profile?.branches ? `Home branch: ${(profile.branches as any).name}, ${(profile.branches as any).city}` : "Welcome to your policyholder portal"}
      actions={
        <div className="flex items-center gap-2">
          <NotificationBell />
          <Button variant="outline" size="sm" onClick={() => rerunLapse.mutate()} disabled={rerunLapse.isPending} className="btn-magnetic">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Refresh intelligence
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-32 shimmer-bg rounded-lg" />)}
        </div>
      ) : (
        <div className="space-y-6 animate-[fade-slide_0.4s_ease-out]">
          {/* Quick action bar */}
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline" className="btn-magnetic gap-1.5">
              <Link to="/pay"><CreditCard className="h-3.5 w-3.5" /> Pay premium</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="btn-magnetic gap-1.5">
              <Link to="/claims"><FileText className="h-3.5 w-3.5" /> My claims</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="btn-magnetic gap-1.5">
              <Link to="/goals"><Target className="h-3.5 w-3.5" /> Savings goals</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="btn-magnetic gap-1.5">
              <Link to="/trust-safety"><Shield className="h-3.5 w-3.5" /> Trust & Safety</Link>
            </Button>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Total coverage" value={totalCoverage} format="pkr" compact icon={<Shield className="h-4 w-4" />} accent="primary" hint="Sum assured across all policies" />
            <StatCard label="Total invested" value={totalInvested} format="pkr" compact icon={<Wallet className="h-4 w-4" />} hint="Premiums paid to date" />
            <StatCard label="Bonus earned" value={totalBonus} format="pkr" compact icon={<TrendingUp className="h-4 w-4" />} accent="gold" hint="Accumulated bonuses" />
            <StatCard label="Active policies" value={activeCount} icon={<BadgeCheck className="h-4 w-4" />} hint={`${policies.length} total · ${graceCount} in grace`} />
            <StatCard
              label="Amount due now"
              value={totalDue}
              format="pkr"
              compact
              icon={<ReceiptText className="h-4 w-4" />}
              accent={totalDue > 0 ? "warning" : undefined}
              hint={totalDue > 0 ? "Pay to keep coverage active" : "You're up to date"}
            />
            <StatCard
              label="Next premium"
              value={NextDue ? NextDue.toLocaleDateString("en-PK", { month: "short", day: "numeric" }) : "—"}
              format="text"
              icon={<Calendar className="h-4 w-4" />}
              hint={NextDue ? NextDue.getFullYear().toString() : "No upcoming"}
            />
          </div>

          {/* Next actions */}
          {actions.length > 0 && (
            <div className="surface-elevated p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold font-display text-lg flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> Next-best actions
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Personalized nudges scored by our intelligence engine.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {actions.slice(0, 4).map((a) => (
                  <div key={a.id} className={`surface-subtle p-4 relative group border ${a.score > 0.8 ? "border-warning/40 bg-warning/5" : "border-transparent"}`}>
                    <button
                      onClick={() => dismissAction.mutate(a.id)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <div className="text-sm font-medium leading-snug pr-6">{a.title}</div>
                    <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{a.description}</div>
                    {a.cta_route && (
                      <Button asChild size="sm" variant="link" className="mt-2 h-auto p-0 text-primary btn-magnetic">
                        <Link to={a.cta_route as string}>{a.cta_label} <ChevronRight className="h-3.5 w-3.5" /></Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming payments mini-calendar */}
          {upcomingPayments.length > 0 && (
            <div className="surface-elevated p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold font-display text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Upcoming premiums
                </h2>
                <Button asChild variant="ghost" size="sm"><Link to="/pay">Pay now <ArrowRight className="h-3.5 w-3.5" /></Link></Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {upcomingPayments.slice(0, 4).map((p) => {
                  const due = new Date(p.next_premium_due);
                  const daysUntil = Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={p.id} className={`rounded-lg border p-4 ${daysUntil < 15 ? "border-warning/40 bg-warning/5" : "border-border"}`}>
                      <div className="text-xs text-muted-foreground">{(p.products as any)?.name}</div>
                      <div className="text-lg font-bold font-display mt-1">{formatPKR(Number(p.premium_amount))}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Due {due.toLocaleDateString("en-PK", { month: "short", day: "numeric" })}</span>
                        {daysUntil <= 0 ? (
                          <span className="badge-pill-destructive text-[10px]">Overdue</span>
                        ) : daysUntil < 15 ? (
                          <span className="badge-pill-warning text-[10px]">{daysUntil}d left</span>
                        ) : (
                          <span className="badge-pill-info text-[10px]">{daysUntil}d left</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Two-column: policies + activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold font-display text-lg">Your policies</h2>
                <Button asChild variant="ghost" size="sm"><Link to="/policies">View all <ChevronRight className="h-3.5 w-3.5" /></Link></Button>
              </div>
              <div className="space-y-3">
                {policies.slice(0, 4).map((p) => {
                  const lapse = lapsePreds.find((lp) => lp.policy_id === p.id);
                  const borderColor =
                    p.status === "active" ? "border-l-success" :
                    p.status === "grace_period" ? "border-l-warning" :
                    "border-l-destructive";
                  return (
                    <Link
                      key={p.id}
                      to="/policies/$policyId"
                      params={{ policyId: p.id }}
                      className={`block surface-elevated p-4 md:p-5 border-l-4 ${borderColor} transition-all group card-spotlight`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-muted-foreground">{p.policy_number}</span>
                            <PolicyStatusBadge status={p.status} />
                            {Number(p.sum_assured) >= 10_000_000 && (
                              <span className="text-[10px] uppercase tracking-wider gradient-gold-bg text-gold-foreground px-1.5 py-0.5 rounded font-semibold">Premium</span>
                            )}
                          </div>
                          <div className="mt-1.5 font-semibold font-display truncate">{(p.products as any)?.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {(p.branches as any)?.name ?? "—"} · Matures {new Date(p.maturity_date).getFullYear()}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-muted-foreground">Sum assured</div>
                          <div className="font-semibold font-display tabular-nums">{compactPKR(Number(p.sum_assured))}</div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-muted-foreground">Premium/mo</div>
                          <div className="font-medium tabular-nums mt-0.5">{formatPKR(Number(p.premium_amount))}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Cash value</div>
                          <div className="font-medium tabular-nums mt-0.5">{compactPKR(Number(p.cash_value))}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Lapse risk</div>
                          <div className={`font-medium mt-0.5 ${lapse && lapse.probability > 0.5 ? "text-warning" : lapse && lapse.probability > 0.3 ? "text-info" : "text-success"}`}>
                            {lapse ? `${Math.round(lapse.probability * 100)}%` : "—"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {policies.length === 0 && (
                  <div className="surface-elevated p-8 text-center text-sm text-muted-foreground">
                    No policies yet. They'll appear after seeding completes.
                  </div>
                )}
              </div>
            </div>

            {/* Activity feed */}
            <div className="space-y-3">
              <h2 className="font-semibold font-display text-lg">Recent activity</h2>
              <div className="surface-elevated p-2">
                <div className="max-h-[560px] overflow-auto divide-y divide-border">
                  {activity.map((e) => (
                    <div key={e.id} className="flex gap-3 p-3 hover:bg-muted/10 transition-colors">
                      <div className="h-8 w-8 rounded-md bg-accent/60 flex items-center justify-center flex-shrink-0 text-primary">
                        <ActivityIcon icon={e.icon} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium leading-snug">{e.title}</div>
                        {e.description && <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{e.description}</div>}
                        <div className="text-[11px] text-muted-foreground mt-1">{relativeTime(e.created_at)}</div>
                      </div>
                    </div>
                  ))}
                  {activity.length === 0 && (
                    <div className="p-6 text-sm text-muted-foreground text-center">No activity yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function ActivityIcon({ icon }: { icon: string }) {
  const glyph: Record<string, string> = {
    "check-circle": "✓",
    "trending-up": "↑",
    "alert-triangle": "!",
    "clock": "◷",
    "file-text": "≡",
    "shield-check": "◈",
    "shield": "◈",
    "target": "◎",
    "user": "◉",
    "sparkles": "✧",
  };
  return <span className="text-xs font-bold">{glyph[icon] ?? "•"}</span>;
}
