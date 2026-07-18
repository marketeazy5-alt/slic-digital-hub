import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getClaims } from "@/lib/customer-queries.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { relativeTime, compactPKR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, FileText, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/claims")({
  component: ClaimsPage,
});

const PIPELINE = ["submitted", "under_review", "verification", "underwriting", "approval", "payment", "disbursed"];

function ClaimsPage() {
  const fetch = useServerFn(getClaims);
  const { data } = useQuery({ queryKey: ["claims"], queryFn: () => fetch({}) });
  const claims = data?.claims ?? [];

  const activeClaims = claims.filter((c) => c.status !== "disbursed" && c.status !== "rejected");
  const disbursed = claims.filter((c) => c.status === "disbursed").length;
  const flagged = claims.filter((c) => c.fraud_ring_id).length;
  const avgStage = activeClaims.length
    ? Math.round(activeClaims.reduce((s, c) => s + PIPELINE.indexOf(c.status), 0) / activeClaims.length) + 1
    : 0;

  return (
    <AppShell
      title="Claims Hub"
      subtitle="Track every claim across our 7-stage pipeline."
      actions={
        <Button variant="outline" size="sm" className="btn-magnetic">
          <FileText className="h-3.5 w-3.5 mr-1.5" /> File new claim
        </Button>
      }
    >
      {/* Stats overview */}
      {claims.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total claims" value={claims.length} icon={<FileText className="h-4 w-4" />} />
          <StatCard label="In progress" value={activeClaims.length} icon={<Clock className="h-4 w-4" />} accent="info" />
          <StatCard label="Disbursed" value={disbursed} icon={<CheckCircle2 className="h-4 w-4" />} accent="success" />
          <StatCard label="Fraud flagged" value={flagged} icon={<AlertTriangle className="h-4 w-4" />} accent={flagged > 0 ? "warning" : undefined} />
        </div>
      )}

      {claims.length === 0 ? (
        <div className="empty-state">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold font-display text-lg mb-1">No claims yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            When you file a claim, it'll appear here with a full 7-stage pipeline visualization.
          </p>
          <Button className="mt-6 btn-magnetic">File your first claim</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {claims.map((c) => {
            const currentIdx = PIPELINE.indexOf(c.status);
            return (
              <div key={c.id} className={`surface-elevated p-6 ${c.fraud_ring_id ? "border-warning/40" : ""}`}>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{c.claim_number}</div>
                    <div className="font-semibold font-display text-lg capitalize mt-0.5">{c.claim_type.replace(/_/g, " ")}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>Policy {(c.policies as any)?.policy_number}</span>
                      <span>· {(c.policies as any)?.products?.name}</span>
                      <span>· Filed {relativeTime(c.filed_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.fraud_ring_id && (
                      <Link to="/trust-safety" className="flex items-center gap-1.5 text-xs bg-warning/10 border border-warning/30 text-warning px-3 py-2 rounded-md hover:bg-warning/15 btn-magnetic">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Flagged</span>
                      </Link>
                    )}
                    <Button variant="outline" size="sm">View details</Button>
                  </div>
                </div>

                {/* Pipeline */}
                <div className="flex items-center">
                  {PIPELINE.map((s, i) => (
                    <div key={s} className="flex items-center flex-1 last:flex-initial">
                      <div className="flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          i < currentIdx ? "bg-success text-success-foreground" :
                          i === currentIdx ? "bg-primary text-primary-foreground animate-[pulse-ring_2s_infinite]" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {i < currentIdx ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                        </div>
                        <div className={`text-[10px] mt-1.5 text-center capitalize max-w-[60px] leading-tight ${i === currentIdx ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {s.replace(/_/g, " ")}
                        </div>
                      </div>
                      {i < PIPELINE.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-1 -mt-4 ${i < currentIdx ? "bg-success" : "bg-muted"}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Claim details expanded */}
                <div className="mt-6 pt-4 border-t border-border grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Claim amount</div>
                    <div className="font-semibold mt-0.5">{compactPKR(Number((c as any).claim_amount || 0))}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Assigned agent</div>
                    <div className="font-medium mt-0.5">{c.assigned_to || "Auto-assigned"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Fraud score</div>
                    <div className="font-medium mt-0.5">{c.fraud_score ? `${Math.round(Number(c.fraud_score) * 100)}%` : "—"}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
