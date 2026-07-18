import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getFraudLandscape } from "@/lib/customer-queries.functions";
import { detectFraudRings } from "@/lib/intelligence.functions";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { AlertTriangle, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/trust-safety")({
  component: TrustSafety,
});

function TrustSafety() {
  const fetch = useServerFn(getFraudLandscape);
  const rerun = useServerFn(detectFraudRings);
  const { data, refetch } = useQuery({ queryKey: ["fraud"], queryFn: () => fetch({}) });
  const rings = data?.rings ?? [];
  const [selectedRing, setSelectedRing] = useState<string | null>(null);
  const active = rings.find((r) => r.id === selectedRing) ?? rings[0];

  return (
    <AppShell
      title="Trust & Safety"
      subtitle="Real-time fraud-ring detection across our claims graph."
      actions={
        <Button size="sm" variant="outline" onClick={async () => { await rerun({}); await refetch(); toast.success("Fraud graph recomputed"); }}>
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Re-run detection
        </Button>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="surface-elevated p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold font-display">How this works</h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-xl">
                  Every claim is linked in a graph to the doctors, hospitals, phone numbers, addresses, and agents involved. A union-find algorithm identifies clusters where multiple claims share entities — a strong signal of coordinated fraud. Rings scoring above threshold auto-flag their member claims for underwriter review.
                </p>
              </div>
            </div>
          </div>

          {active ? <RingGraph ring={active} allEdges={data?.edges ?? []} /> : (
            <div className="surface-elevated p-10 text-center text-sm text-muted-foreground">
              No fraud rings detected yet.
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Detected rings</h3>
          {rings.map((r) => {
            const isActive = active?.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRing(r.id)}
                className={`w-full text-left surface-elevated p-4 border-l-4 transition-all ${isActive ? "border-l-warning shadow-lg" : "border-l-transparent hover:border-l-primary"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                  <div className="text-xs font-mono text-muted-foreground">ring-{r.id.slice(0, 6)}</div>
                </div>
                <div className="text-sm font-medium">{r.member_claim_ids.length} claims</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.summary}</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: `${Math.min(100, r.score * 5)}%` }} />
                  </div>
                  <div className="text-xs font-mono">{Number(r.score).toFixed(1)}</div>
                </div>
              </button>
            );
          })}
          {rings.length === 0 && <div className="text-xs text-muted-foreground">Run detection to populate.</div>}
        </div>
      </div>
    </AppShell>
  );
}

function RingGraph({ ring, allEdges }: { ring: any; allEdges: any[] }) {
  const nodes = useMemo(() => {
    const set = new Map<string, { type: string; id: string }>();
    const memberSet = new Set(ring.member_claim_ids);
    for (const e of allEdges) {
      if (e.from_type === "claim" && memberSet.has(e.from_id)) {
        set.set(`claim:${e.from_id}`, { type: "claim", id: e.from_id });
        set.set(`${e.to_type}:${e.to_id}`, { type: e.to_type, id: e.to_id });
      }
      if (e.to_type === "claim" && memberSet.has(e.to_id)) {
        set.set(`claim:${e.to_id}`, { type: "claim", id: e.to_id });
        set.set(`${e.from_type}:${e.from_id}`, { type: e.from_type, id: e.from_id });
      }
    }
    return Array.from(set.entries()).map(([k, v]) => ({ key: k, ...v }));
  }, [ring, allEdges]);

  const edges = useMemo(() => {
    const memberSet = new Set(ring.member_claim_ids);
    return allEdges.filter(
      (e) =>
        (e.from_type === "claim" && memberSet.has(e.from_id)) ||
        (e.to_type === "claim" && memberSet.has(e.to_id)),
    );
  }, [ring, allEdges]);

  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;

  const positioned = nodes.map((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
  const pos = new Map(positioned.map((n) => [n.key, n]));

  const typeColor: Record<string, string> = {
    claim: "var(--color-warning)",
    doctor: "var(--color-info)",
    hospital: "var(--color-primary)",
    phone: "var(--color-muted-foreground)",
    agent: "var(--color-destructive)",
    address: "var(--color-emerald-400)",
  };

  return (
    <div className="surface-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold font-display">Cluster visualization</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{ring.summary}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-display tabular-nums text-warning">{Number(ring.score).toFixed(1)}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk score</div>
        </div>
      </div>
      <div className="flex justify-center overflow-auto">
        <svg width={size} height={size} className="max-w-full">
          {edges.map((e, i) => {
            const a = pos.get(`${e.from_type}:${e.from_id}`);
            const b = pos.get(`${e.to_type}:${e.to_id}`);
            if (!a || !b) return null;
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-border)" strokeWidth={1.5} />;
          })}
          {positioned.map((n) => (
            <g key={n.key}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.type === "claim" ? 14 : 10}
                fill={typeColor[n.type] ?? "var(--color-muted)"}
                stroke="var(--color-background)"
                strokeWidth={2}
              />
              <text x={n.x} y={n.y + 26} textAnchor="middle" className="fill-foreground text-[10px] font-mono">
                {n.type}:{n.id.slice(0, 6)}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-4 text-xs">
        {Object.entries(typeColor).map(([t, c]) => (
          <div key={t} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            <span className="text-muted-foreground capitalize">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
