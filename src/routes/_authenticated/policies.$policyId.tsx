import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPolicyDetail } from "@/lib/customer-queries.functions";
import { AppShell } from "@/components/app-shell";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { formatPKR, compactPKR, relativeTime } from "@/lib/format";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Wallet, FileText, Download, Info, CheckCircle2, Percent, Calendar, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/policies/$policyId")({
  component: PolicyDetail,
});

function PolicyDetail() {
  const { policyId } = Route.useParams();
  const fetch = useServerFn(getPolicyDetail);
  const { data, isLoading } = useQuery({
    queryKey: ["policy", policyId],
    queryFn: () => fetch({ data: { policyId } }),
  });

  return (
    <AppShell
      title={data ? (data.policy.products as any)?.name : "Policy"}
      subtitle={data?.policy.policy_number}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="btn-magnetic">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Download PDF
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/policies"><ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back</Link>
          </Button>
        </div>
      }
    >
      {isLoading || !data ? (
        <div className="h-64 shimmer-bg rounded-lg" />
      ) : (
        <div className="space-y-6">
          {/* Hero */}
          <div className={`surface-elevated p-6 md:p-8 ${Number(data.policy.sum_assured) >= 10_000_000 ? "premium-glow" : ""}`}>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <PolicyStatusBadge status={data.policy.status} />
                  <span className="text-xs text-muted-foreground">
                    {(data.policy.branches as any)?.name}, {(data.policy.branches as any)?.city}
                  </span>
                </div>
                <div className="mt-3 text-4xl font-bold font-display tabular-nums">
                  {compactPKR(Number(data.policy.sum_assured))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Sum assured · commenced {new Date(data.policy.commencement_date).toLocaleDateString()} · matures {new Date(data.policy.maturity_date).toLocaleDateString()}
                </div>
              </div>
              <Button asChild>
                <Link to="/pay"><Wallet className="h-4 w-4 mr-1.5" /> Pay premium</Link>
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric label="Monthly premium" value={formatPKR(Number(data.policy.premium_amount))} />
              <Metric label="Total paid" value={compactPKR(Number(data.policy.total_premiums_paid))} />
              <Metric label="Bonus accumulated" value={compactPKR(Number(data.policy.bonus_accumulated))} />
              <Metric label="Cash value" value={compactPKR(Number(data.policy.cash_value))} />
            </div>

            {data.lapse && (
              <div className={`mt-6 p-4 rounded-md border ${data.lapse.probability > 0.5 ? "border-warning/40 bg-warning/5" : "border-info/30 bg-info/5"}`}>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Lapse risk: {Math.round(data.lapse.probability * 100)}%</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Recommended intervention: <span className="font-medium capitalize">{data.lapse.recommended_intervention.replace(/_/g, " ")}</span>. Based on payment regularity, current state, and premium/income ratio.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary">Timeline</TabsTrigger>
              <TabsTrigger value="premiums">Premiums</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="nominees">Nominees</TabsTrigger>
              <TabsTrigger value="projection">Projection</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-4">
              <div className="surface-elevated p-6">
                <h3 className="font-semibold font-display mb-4">State transitions</h3>
                <div className="space-y-4">
                  {data.events.map((e, i) => (
                    <div key={e.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        {i < data.events.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-4">
                        <div className="text-sm">
                          {e.from_state ? <><span className="text-muted-foreground">{e.from_state.replace(/_/g, " ")}</span> → </> : ""}
                          <span className="font-medium">{e.to_state.replace(/_/g, " ")}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Trigger: {e.trigger.replace(/_/g, " ")} · {relativeTime(e.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.events.length === 0 && <div className="text-sm text-muted-foreground">No state changes yet.</div>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="premiums" className="mt-4">
              <div className="surface-elevated overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{data.premiums.length} premium records</span>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
                    <tr>
                      <th className="text-left p-3">Due date</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Method</th>
                      <th className="text-left p-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.premiums.slice(0, 24).map((p) => (
                      <tr key={p.id} className="hover:bg-muted/10">
                        <td className="p-3">{new Date(p.due_date).toLocaleDateString()}</td>
                        <td className="p-3 tabular-nums">{formatPKR(Number(p.amount))}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            p.status === "paid" ? "bg-success/15 text-success" :
                            p.status === "overdue" ? "bg-destructive/15 text-destructive" :
                            "bg-muted text-muted-foreground"
                          }`}>{p.status}</span>
                        </td>
                        <td className="p-3 capitalize text-muted-foreground">{p.payment_method?.replace(/_/g, " ") ?? "—"}</td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">{p.receipt_number ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="claims" className="mt-4">
              <div className="surface-elevated p-6">
                <h3 className="font-semibold font-display mb-4">Claims on this policy</h3>
                {data.claims.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">No claims filed on this policy.</div>
                ) : (
                  <div className="space-y-3">
                    {data.claims.map((c) => (
                      <div key={c.id} className="p-4 rounded-lg border border-border flex justify-between items-center hover:bg-muted/10 transition-colors">
                        <div>
                          <div className="font-mono text-xs text-muted-foreground">{c.claim_number}</div>
                          <div className="font-medium capitalize mt-0.5">{c.claim_type.replace(/_/g, " ")}</div>
                          <div className="text-xs text-muted-foreground">Filed {relativeTime(c.filed_at)}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-info/15 text-info capitalize">{c.status.replace(/_/g, " ")}</span>
                          {c.fraud_ring_id && (
                            <div className="mt-1">
                              <Link to="/trust-safety" className="text-xs text-warning underline">Trust & Safety analysis</Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="nominees" className="mt-4">
              <div className="surface-elevated p-6">
                <h3 className="font-semibold font-display mb-4">Nominees</h3>
                {data.nominees.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">No nominees added yet.</div>
                ) : (
                  <div className="space-y-3">
                    {data.nominees.map((n) => (
                      <div key={n.id} className="p-4 rounded-lg border border-border flex justify-between items-center hover:bg-muted/10 transition-colors">
                        <div>
                          <div className="font-medium">{n.full_name}</div>
                          <div className="text-xs text-muted-foreground">{n.relationship} · CNIC {n.cnic}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold font-display tabular-nums">{n.share_percentage}%</div>
                          <div className="text-[10px] text-muted-foreground">share</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="projection" className="mt-4">
              <div className="surface-elevated p-6">
                <h3 className="font-semibold font-display mb-2">Premium projection</h3>
                <p className="text-xs text-muted-foreground mb-6">Estimated cash value growth over the remaining term assuming continued premium payments and a 4.5% reversionary bonus rate.</p>
                <div className="h-64 w-full border-b border-l border-border relative flex items-end gap-2 pb-2 pl-2">
                  {[15, 22, 30, 40, 52, 66, 82, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary/70 to-primary/40 rounded-t-sm group relative transition-all duration-300 hover:opacity-80 cursor-pointer" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap">
                        Year {i + 1}: ~₨{(h * 0.8).toFixed(1)}M
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
                  <span>Year 1</span>
                  <span>Year 4</span>
                  <span>Year 8</span>
                  <span>Year 12</span>
                  <span>Maturity</span>
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Current cash value", value: compactPKR(Number(data.policy.cash_value)) },
                    { label: "Projected maturity", value: compactPKR(Number(data.policy.sum_assured) + Number(data.policy.bonus_accumulated)) },
                    { label: "Bonus rate", value: "4.5% p.a." },
                    { label: "Total premiums remaining", value: formatPKR(Math.round(Number(data.policy.premium_amount) * 12 * 5)) },
                  ].map((m) => (
                    <div key={m.label} className="bg-muted/20 rounded-lg p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                      <div className="font-bold font-display mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="surface-elevated p-6">
                <h3 className="font-semibold font-display mb-2">Documents</h3>
                <p className="text-xs text-muted-foreground mb-6">Downloadable documents related to this policy.</p>
                <div className="space-y-3">
                  {[
                    { name: "Policy Schedule", desc: "Original policy document with terms and conditions", date: "12 Jan 2024", size: "2.4 MB" },
                    { name: "Annual Bonus Statement", desc: "Reversionary bonus declaration for FY 2025-26", date: "15 Mar 2026", size: "0.8 MB" },
                    { name: "Premium Payment History", desc: "Complete payment record from commencement", date: "Current", size: "1.2 MB" },
                    { name: "Tax Certificate (Sec 62)", desc: "Tax deduction certificate for FY 2025-26", date: "30 Jun 2026", size: "0.5 MB" },
                    { name: "Surrender Value Statement", desc: "Current surrender value as per policy terms", date: "Current", size: "0.3 MB" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors group">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">{doc.desc} · {doc.size}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{doc.date}</div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/20 rounded-lg p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-semibold font-display tabular-nums mt-1">{value}</div>
    </div>
  );
}
