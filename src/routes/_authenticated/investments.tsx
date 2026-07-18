import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  TrendingUp, PieChart, BarChart3, Wallet, Download, ArrowUpRight,
  DollarSign, Percent, Calendar, Target,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/investments")({
  component: InvestmentsPage,
});

const portfolioData = {
  totalValue: 5850000,
  totalInvested: 4200000,
  totalReturns: 1650000,
  returnPct: 39.3,
  allocation: [
    { label: "Endowment Plans", value: 65, color: "bg-primary" },
    { label: "Whole Life", value: 20, color: "bg-gold" },
    { label: "Term Assurance", value: 10, color: "bg-info" },
    { label: "Education Plans", value: 5, color: "bg-success" },
  ],
  performance: [
    { year: "Year 1", value: 4200000 },
    { year: "Year 2", value: 4450000 },
    { year: "Year 3", value: 4720000 },
    { year: "Year 4", value: 5050000 },
    { year: "Year 5", value: 5400000 },
    { year: "Current", value: 5850000 },
  ],
};

const formatPKR = (num: number) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(num);

function InvestmentsPage() {
  const maxPerf = Math.max(...portfolioData.performance.map((p) => p.value));

  return (
    <AppShell
      title="Investment Dashboard"
      subtitle="Track your portfolio growth and asset allocation."
      actions={
        <Button variant="outline" size="sm" className="gap-1.5 btn-magnetic">
          <Download className="h-3.5 w-3.5" /> Export report
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Portfolio value" value={portfolioData.totalValue} format="pkr" compact icon={<Wallet className="h-4 w-4" />} accent="gold" hint="Current value" />
        <StatCard label="Total invested" value={portfolioData.totalInvested} format="pkr" compact icon={<DollarSign className="h-4 w-4" />} hint="Premiums paid" />
        <StatCard label="Total returns" value={portfolioData.totalReturns} format="pkr" compact icon={<TrendingUp className="h-4 w-4" />} accent="success" hint="Growth earned" />
        <StatCard label="Return rate" value={portfolioData.returnPct} format="text" icon={<Percent className="h-4 w-4" />} accent="info" hint="Overall return %" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Portfolio allocation */}
        <div className="surface-elevated p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" /> Asset allocation
          </h3>
          <div className="flex h-6 rounded-full overflow-hidden mb-6">
            {portfolioData.allocation.map((a) => (
              <div key={a.label} className={a.color} style={{ width: `${a.value}%` }} title={`${a.label}: ${a.value}%`} />
            ))}
          </div>
          <div className="space-y-3">
            {portfolioData.allocation.map((a) => (
              <div key={a.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${a.color}`} />
                  <span>{a.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{formatPKR(Math.round(portfolioData.totalValue * a.value / 100))}</span>
                  <span className="tabular-nums font-medium w-8 text-right">{a.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance chart */}
        <div className="surface-elevated p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Portfolio growth
          </h3>
          <div className="h-48 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2">
            {portfolioData.performance.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary/80 to-primary/40 hover:from-primary hover:to-primary/60 transition-all cursor-pointer"
                    style={{ height: `${(p.value / maxPerf) * 100}%`, minHeight: "8px" }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {formatPKR(p.value)}
                  </div>
                </div>
                <div className="text-[9px] text-muted-foreground">{p.year === "Current" ? "Now" : p.year}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total return:</span>
              <span className="font-semibold ml-2 text-success">+{formatPKR(portfolioData.totalReturns)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Annualized return:</span>
              <span className="font-semibold ml-2 text-info">~6.8% p.a.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment-linked policies */}
      <div className="surface-elevated p-6">
        <h3 className="font-semibold font-display mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" /> Investment-linked policies
        </h3>
        <div className="space-y-3">
          {[
            { policy: "END-STD-1001", product: "Shad Abad Endowment", invested: 2400000, current: 3200000, bonus: 800000, returnPct: 33.3 },
            { policy: "WL-2002", product: "Whole Life Protector", invested: 1200000, current: 1700000, bonus: 500000, returnPct: 41.7 },
            { policy: "CHILD-EDU-3003", product: "Child Education Plan", invested: 600000, current: 950000, bonus: 350000, returnPct: 58.3 },
          ].map((inv) => (
            <div key={inv.policy} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{inv.product}</div>
                  <div className="text-xs text-muted-foreground font-mono">{inv.policy}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Invested</div>
                  <div className="font-medium tabular-nums">{formatPKR(inv.invested)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Current</div>
                  <div className="font-semibold tabular-nums">{formatPKR(inv.current)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Return</div>
                  <div className="font-semibold text-success tabular-nums">+{inv.returnPct}%</div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
