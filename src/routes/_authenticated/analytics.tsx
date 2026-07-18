import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAnalytics, getMyRoles, grantDemoRole } from "@/lib/portal-queries.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { compactPKR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Wallet, TrendingUp, ShieldAlert, FileCheck, ShieldAlert as ShieldIcon,
  Download, Calendar, Filter, BarChart, PieChart, Activity,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPortal,
});

function AnalyticsPortal() {
  const fetchRoles = useServerFn(getMyRoles);
  const fetchA = useServerFn(getAnalytics);
  const grant = useServerFn(grantDemoRole);
  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => fetchRoles({}) });
  const q = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchA({}),
    enabled: (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent"),
    retry: false,
  });
  const grantMut = useMutation({
    mutationFn: () => grant({ data: { role: "admin" } }),
    onSuccess: () => { toast.success("Admin role granted"); rolesQ.refetch(); },
  });

  const hasRole = (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent");
  const [period, setPeriod] = useState("12m");

  if (!hasRole) {
    return (
      <AppShell title="Analytics Platform" subtitle="Portfolio intelligence">
        <div className="surface-elevated p-10 text-center max-w-lg mx-auto">
          <ShieldIcon className="mx-auto h-10 w-10 text-primary mb-3" />
          <h2 className="text-lg font-semibold font-display">Access required</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Analytics is available to agents and admins.</p>
          <Button onClick={() => grantMut.mutate()} disabled={grantMut.isPending}>Grant demo admin role</Button>
        </div>
      </AppShell>
    );
  }

  const d = q.data;
  const maxMonthly = Math.max(1, ...(d?.monthly ?? []).map((m: any) => m.amount));
  const totalStatus = Object.values(d?.statusBreakdown ?? {}).reduce((s: number, n: any) => s + Number(n), 0) || 1;

  const statusColors: Record<string, string> = {
    active: "bg-success",
    grace_period: "bg-warning",
    lapsed_revivable: "bg-destructive/70",
    lapsed_surrender_only: "bg-destructive",
    matured: "bg-primary",
    surrendered: "bg-muted-foreground",
  };

  const branchColumns = [
    { key: "branch", label: "Branch", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "count", label: "Policies", sortable: true, className: "text-right" as const, render: (b: any) => <span className="tabular-nums">{b.count}</span> },
    { key: "aum", label: "AUM", sortable: true, className: "text-right" as const, render: (b: any) => <span className="tabular-nums font-semibold">{compactPKR(b.aum)}</span> },
  ];

  return (
    <AppShell
      title="Analytics Platform"
      subtitle="Portfolio, collections, and risk intelligence"
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {["6m", "12m", "all"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${period === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {p === "6m" ? "6 Months" : p === "12m" ? "12 Months" : "All Time"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      }
    >
      {/* KPI row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total AUM" value={d?.kpis.totalAUM ?? 0} icon={<Wallet className="h-4 w-4" />} format="pkr" compact accent="gold" />
        <StatCard label="Premium collected" value={d?.kpis.collectedPremium ?? 0} icon={<TrendingUp className="h-4 w-4" />} format="pkr" compact accent="info" />
        <StatCard label="Overdue premium" value={d?.kpis.overduePremium ?? 0} icon={<ShieldAlert className="h-4 w-4" />} format="pkr" compact accent="warning" />
        <StatCard label="Claims disbursed" value={d?.kpis.claimsPaid ?? 0} icon={<FileCheck className="h-4 w-4" />} format="pkr" compact />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="surface-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold font-display flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" /> Monthly premium collection
            </h3>
            <span className="text-xs text-muted-foreground">{period === "6m" ? "Last 6 months" : period === "12m" ? "Last 12 months" : "All time"}</span>
          </div>
          <div className="flex items-end gap-2 h-48">
            {(d?.monthly ?? []).map((m: any, i: number) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full">
                  <div className="w-full rounded-t bg-primary/80 hover:bg-primary transition-colors cursor-pointer" style={{ height: `${(m.amount / maxMonthly) * 100}%`, minHeight: "6px" }} title={compactPKR(m.amount)} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {compactPKR(m.amount)}
                  </div>
                </div>
                <div className="text-[8px] text-muted-foreground rotate-45 origin-left whitespace-nowrap">{m.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total collected:</span>
              <span className="font-semibold ml-2">{compactPKR(d?.kpis.collectedPremium ?? 0)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Monthly avg:</span>
              <span className="font-semibold ml-2">{compactPKR(Math.round((d?.kpis.collectedPremium ?? 0) / Math.max(1, (d?.monthly ?? []).length)))}</span>
            </div>
          </div>
        </div>

        <div className="surface-elevated p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" /> Policy status distribution
          </h3>
          <div className="flex h-8 rounded-full overflow-hidden mb-4">
            {Object.entries(d?.statusBreakdown ?? {}).map(([status, count]) => (
              <div key={status} className={statusColors[status] ?? "bg-muted"} style={{ width: `${(Number(count) / totalStatus) * 100}%` }} title={`${status}: ${count}`} />
            ))}
          </div>
          <div className="space-y-2">
            {Object.entries(d?.statusBreakdown ?? {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-sm hover:bg-muted/10 px-2 py-1 rounded transition-colors">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${statusColors[status] ?? "bg-muted"}`} />
                  <span className="capitalize">{status.replace(/_/g, " ")}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{((Number(count) / totalStatus) * 100).toFixed(1)}%</span>
                  <span className="tabular-nums font-medium min-w-[3ch] text-right">{String(count)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="surface-elevated p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Lapse risk distribution
          </h3>
          <div className="space-y-3">
            {[
              { label: "Low risk", val: d?.lapseBuckets.low ?? 0, color: "bg-success", pct: ((d?.lapseBuckets.low ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0))) * 100 },
              { label: "Medium risk", val: d?.lapseBuckets.medium ?? 0, color: "bg-warning", pct: ((d?.lapseBuckets.medium ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0))) * 100 },
              { label: "High risk", val: d?.lapseBuckets.high ?? 0, color: "bg-destructive", pct: ((d?.lapseBuckets.high ?? 0) / Math.max(1, (d?.lapseBuckets.low ?? 0) + (d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0))) * 100 },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2"><div className={`h-2.5 w-2.5 rounded-full ${r.color}`} />{r.label}</span>
                  <span className="tabular-nums font-medium">{r.val} ({r.pct.toFixed(0)}%)</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className={`${r.color} h-full rounded-full transition-all duration-500`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted/20 rounded-lg text-sm flex items-center justify-between">
            <span className="text-muted-foreground">Policies requiring attention</span>
            <span className="font-bold font-display text-warning">{(d?.lapseBuckets.medium ?? 0) + (d?.lapseBuckets.high ?? 0)}</span>
          </div>
        </div>

        <div className="surface-elevated p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" /> Fraud & risk signals
          </h3>
          <div className="text-4xl font-bold font-display tabular-nums">{d?.kpis.flagged ?? 0}</div>
          <p className="text-sm text-muted-foreground mt-1">Claims flagged (score &gt; 0.6) out of {d?.kpis.totalClaims ?? 0} total claims</p>
          <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-destructive rounded-full transition-all" style={{ width: `${((d?.kpis.flagged ?? 0) / Math.max(1, d?.kpis.totalClaims ?? 1)) * 100}%` }} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold font-display text-destructive">{d?.kpis.flagged ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1">High confidence flags</div>
            </div>
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold font-display text-success">{((d?.kpis.totalClaims ?? 0) - (d?.kpis.flagged ?? 0))}</div>
              <div className="text-xs text-muted-foreground mt-1">Clean claims</div>
            </div>
          </div>
        </div>
      </div>

      {/* Branch performance table */}
      <div className="surface-elevated p-6">
        <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
          <BarChart className="h-4 w-4 text-primary" /> Branch performance
        </h3>
        <DataTable
          data={d?.branchPerf ?? []}
          columns={branchColumns}
          keyExtractor={(b: any) => `${b.branch}-${b.city}`}
          searchable={true}
          searchPlaceholder="Search branches..."
          pageSize={8}
          emptyMessage="No branch data available."
        />
      </div>
    </AppShell>
  );
}
