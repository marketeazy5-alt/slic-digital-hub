import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAgentBook, getMyRoles, grantDemoRole } from "@/lib/portal-queries.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { compactPKR, formatPKR, formatCNIC } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, AlertTriangle, Clock, FileWarning, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/agent")({
  component: AgentPortal,
});

function AgentPortal() {
  const fetchBook = useServerFn(getAgentBook);
  const fetchRoles = useServerFn(getMyRoles);
  const grant = useServerFn(grantDemoRole);
  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => fetchRoles({}) });
  const bookQ = useQuery({
    queryKey: ["agent-book"],
    queryFn: () => fetchBook({}),
    enabled: (rolesQ.data?.roles ?? []).some((r) => r === "agent" || r === "admin"),
    retry: false,
  });
  const grantMut = useMutation({
    mutationFn: () => grant({ data: { role: "agent" } }),
    onSuccess: () => { toast.success("Agent role granted"); rolesQ.refetch(); },
  });

  const hasRole = (rolesQ.data?.roles ?? []).some((r) => r === "agent" || r === "admin");

  if (!hasRole) {
    return (
      <AppShell title="Agent Workbench" subtitle="Field & branch operations">
        <div className="surface-elevated p-10 text-center max-w-lg mx-auto">
          <ShieldAlert className="mx-auto h-10 w-10 text-primary mb-3" />
          <h2 className="text-lg font-semibold font-display">Role required</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            The agent portal is scoped to sales & servicing staff. For demo purposes, grant yourself the role.
          </p>
          <Button onClick={() => grantMut.mutate()} disabled={grantMut.isPending}>
            {grantMut.isPending ? "Granting…" : "Grant demo agent role"}
          </Button>
        </div>
      </AppShell>
    );
  }

  const book = bookQ.data;
  return (
    <AppShell title="Agent Workbench" subtitle="Book of business, collections & at-risk policies">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Customers" value={book?.customers.length ?? 0} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Policies in book" value={book?.policies.length ?? 0} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Premiums due/overdue" value={book?.dueSoon.length ?? 0} icon={<Clock className="h-4 w-4" />} accent="warning" />
        <StatCard label="Lapse-risk policies" value={book?.atRisk.length ?? 0} icon={<AlertTriangle className="h-4 w-4" />} accent="warning" />
      </div>

      <Tabs defaultValue="collections">
        <TabsList>
          <TabsTrigger value="collections">Collections queue</TabsTrigger>
          <TabsTrigger value="at-risk">At-risk</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="collections" className="mt-4">
          <div className="surface-elevated divide-y divide-border">
            {(book?.dueSoon ?? []).map((p: any) => (
              <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium font-mono">{p.policies?.policy_number}</div>
                  <div className="text-xs text-muted-foreground">Due {new Date(p.due_date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold tabular-nums">{formatPKR(Number(p.amount))}</div>
                  <div className="text-xs uppercase tracking-wide text-warning">{p.status}</div>
                </div>
              </div>
            ))}
            {!book?.dueSoon.length && <div className="p-8 text-center text-sm text-muted-foreground">No overdue premiums.</div>}
          </div>
        </TabsContent>

        <TabsContent value="at-risk" className="mt-4">
          <div className="surface-elevated divide-y divide-border">
            {(book?.atRisk ?? []).map((r: any) => (
              <div key={r.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-mono">{r.policies?.policy_number}</div>
                  <div className="text-xs text-muted-foreground capitalize">{r.recommended_intervention?.replace(/_/g, " ")}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold tabular-nums ${Number(r.probability) > 0.66 ? "text-destructive" : "text-warning"}`}>
                    {(Number(r.probability) * 100).toFixed(0)}%
                  </div>
                  <div className="text-[10px] uppercase text-muted-foreground">lapse risk</div>
                </div>
              </div>
            ))}
            {!book?.atRisk.length && <div className="p-8 text-center text-sm text-muted-foreground">No at-risk policies detected.</div>}
          </div>
        </TabsContent>

        <TabsContent value="claims" className="mt-4">
          <div className="surface-elevated divide-y divide-border">
            {(book?.claims ?? []).map((c: any) => (
              <div key={c.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-mono">{c.claim_number}</div>
                  <div className="text-xs text-muted-foreground">{c.policies?.policy_number} · {new Date(c.filed_at).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  {Number(c.fraud_score) > 0.6 && <FileWarning className="h-4 w-4 text-destructive" />}
                  <span className="text-xs uppercase tracking-wide px-2 py-1 rounded bg-muted">{c.status}</span>
                  <div className="font-semibold tabular-nums w-28 text-right">{compactPKR(Number(c.claim_amount || 0))}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <div className="surface-elevated overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">CNIC</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Branch</th>
                  <th className="text-right p-3">Income</th>
                  <th className="text-left p-3">KYC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(book?.customers ?? []).map((c: any) => (
                  <tr key={c.id}>
                    <td className="p-3 font-medium">{c.full_name ?? "—"}</td>
                    <td className="p-3 font-mono text-xs">{c.cnic ? formatCNIC(c.cnic) : "—"}</td>
                    <td className="p-3 font-mono text-xs">{c.phone ?? "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground">{c.branches?.name ?? "—"}</td>
                    <td className="p-3 text-right tabular-nums">{c.monthly_income ? compactPKR(Number(c.monthly_income)) : "—"}</td>
                    <td className="p-3"><PolicyStatusBadge status={c.kyc_status ?? "pending"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
