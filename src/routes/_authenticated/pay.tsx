import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboard, getSagaTrace } from "@/lib/customer-queries.functions";
import { payPremiumSaga } from "@/lib/intelligence.functions";
import { AppShell } from "@/components/app-shell";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { formatPKR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { Check, X, Loader2, Zap } from "lucide-react";

export const Route = createFileRoute("/_authenticated/pay")({
  component: PayPage,
});

const METHODS = [
  { code: "jazzcash", label: "JazzCash", tag: "Mobile wallet" },
  { code: "easypaisa", label: "EasyPaisa", tag: "Mobile wallet" },
  { code: "raast", label: "Raast", tag: "Instant bank" },
  { code: "card", label: "Debit / Credit card", tag: "1LINK" },
  { code: "bank_transfer", label: "1LINK transfer", tag: "Bank" },
  { code: "auto_debit", label: "Auto-debit", tag: "Recurring" },
  { code: "branch_voucher", label: "Branch voucher", tag: "Cash" },
];

function PayPage() {
  const fetchDash = useServerFn(getDashboard);
  const pay = useServerFn(payPremiumSaga);
  const fetchTrace = useServerFn(getSagaTrace);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDash({}) });
  const [selected, setSelected] = useState<string[]>([]);
  const [method, setMethod] = useState("jazzcash");
  const [simulateFail, setSimulateFail] = useState(false);
  const [sagaId, setSagaId] = useState<string | null>(null);

  const policies = data?.policies ?? [];
  const eligible = policies.filter((p) => ["active", "grace_period", "lapsed_revivable"].includes(p.status));
  const total = policies.filter((p) => selected.includes(p.id)).reduce((s, p) => s + Number(p.premium_amount), 0);

  const runPay = useMutation({
    mutationFn: () => pay({ data: { policyIds: selected, method, simulateFailAt: simulateFail ? "debit_gateway" : null } }),
    onSuccess: (r) => {
      setSagaId(r.sagaId);
      toast.success("Payment processed", { description: `Receipt(s): ${r.receipts.join(", ")}` });
      qc.invalidateQueries();
    },
    onError: (e: any) => {
      toast.error("Payment failed", { description: e.message });
      // Try to grab last saga id from response — for demo, refetch dashboard.
      qc.invalidateQueries();
    },
  });

  const trace = useQuery({
    queryKey: ["saga", sagaId],
    queryFn: () => fetchTrace({ data: { sagaId: sagaId! } }),
    enabled: !!sagaId,
    refetchInterval: (q) => (q.state.data?.events.some((e: any) => e.status === "pending") ? 1000 : false),
  });

  return (
    <AppShell title="Pay Premium" subtitle="Simulated Saga — every step is written to the transaction log below.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">1 · Select policies</h2>
            <div className="space-y-2">
              {eligible.map((p) => (
                <label key={p.id} className="flex items-center gap-3 p-3 rounded border border-border hover:bg-accent/40 cursor-pointer">
                  <Checkbox
                    checked={selected.includes(p.id)}
                    onCheckedChange={(v) => setSelected(v ? [...selected, p.id] : selected.filter((x) => x !== p.id))}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{p.policy_number}</span>
                      <PolicyStatusBadge status={p.status} />
                    </div>
                    <div className="font-medium truncate">{(p.products as any)?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold font-display tabular-nums">{formatPKR(Number(p.premium_amount))}</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                </label>
              ))}
              {eligible.length === 0 && <div className="text-sm text-muted-foreground text-center p-6">All caught up — no premiums due right now.</div>}
            </div>
          </section>

          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">2 · Payment method</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {METHODS.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setMethod(m.code)}
                  className={`p-3 rounded border text-left ${method === m.code ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`}
                >
                  <div className="text-sm font-medium">{m.label}</div>
                  <div className="text-[11px] text-muted-foreground">{m.tag}</div>
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Checkbox checked={simulateFail} onCheckedChange={(v) => setSimulateFail(!!v)} />
              Simulate a gateway failure (to see the Saga compensation path)
            </label>
          </section>
        </div>

        <div className="space-y-4">
          <div className="surface-elevated p-6 sticky top-24">
            <h3 className="font-semibold font-display mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <Row label="Policies" value={String(selected.length)} />
              <Row label="Method" value={METHODS.find((m) => m.code === method)?.label ?? method} />
              <div className="border-t border-border pt-3 mt-3 flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold font-display tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>
            <Button
              className="w-full mt-4"
              disabled={selected.length === 0 || runPay.isPending}
              onClick={() => runPay.mutate()}
            >
              {runPay.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Pay {formatPKR(total)}
            </Button>
            <p className="text-[11px] text-muted-foreground mt-3 text-center">Simulated payment · no real money moves</p>
          </div>

          {sagaId && (
            <div className="surface-elevated p-5">
              <h3 className="font-semibold font-display mb-1 flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Transaction trace</h3>
              <p className="text-[11px] text-muted-foreground mb-3 font-mono">{sagaId}</p>
              <div className="space-y-2">
                {(trace.data?.events ?? []).map((e: any) => (
                  <div key={e.id} className="flex items-start gap-2.5">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      e.status === "success" ? "bg-success/20 text-success" :
                      e.status === "failed" ? "bg-destructive/20 text-destructive" :
                      e.status === "compensated" ? "bg-warning/20 text-warning" :
                      "bg-muted"
                    }`}>
                      {e.status === "success" ? <Check className="h-3 w-3" /> :
                       e.status === "failed" ? <X className="h-3 w-3" /> :
                       <Loader2 className="h-3 w-3 animate-spin" />}
                    </div>
                    <div className="text-xs min-w-0 flex-1">
                      <div className="font-medium">{e.step.replace(/_/g, " ")}</div>
                      <div className="text-muted-foreground">{e.duration_ms}ms · {e.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
