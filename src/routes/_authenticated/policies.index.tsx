import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboard } from "@/lib/customer-queries.functions";
import { AppShell } from "@/components/app-shell";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { compactPKR, formatPKR } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/policies/")({
  component: PoliciesList,
});

function PoliciesList() {
  const fetchDash = useServerFn(getDashboard);
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDash({}) });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const policies = data?.policies ?? [];
  const filtered = useMemo(() => {
    return policies.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (q && !JSON.stringify(p).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [policies, q, status]);

  return (
    <AppShell title="Policy Center" subtitle={`${policies.length} polic${policies.length === 1 ? "y" : "ies"} on file`}>
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search policies…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1 p-1 rounded-md border border-border bg-card">
          {["all", "active", "grace_period", "lapsed_revivable"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded text-xs font-medium capitalize ${status === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to="/policies/$policyId"
            params={{ policyId: p.id }}
            className="surface-elevated p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-xs font-mono text-muted-foreground">{p.policy_number}</div>
                <div className="mt-1 font-semibold font-display text-lg">{(p.products as any)?.name}</div>
              </div>
              <PolicyStatusBadge status={p.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Sum assured</div>
                <div className="font-semibold font-display mt-0.5">{compactPKR(Number(p.sum_assured))}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Monthly premium</div>
                <div className="font-semibold font-display mt-0.5 tabular-nums">{formatPKR(Number(p.premium_amount))}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cash value</div>
                <div className="font-medium tabular-nums mt-0.5">{compactPKR(Number(p.cash_value))}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Matures</div>
                <div className="font-medium mt-0.5">{new Date(p.maturity_date).getFullYear()}</div>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full surface-elevated p-10 text-center text-sm text-muted-foreground">
            No policies match your filters.
          </div>
        )}
      </div>
    </AppShell>
  );
}
