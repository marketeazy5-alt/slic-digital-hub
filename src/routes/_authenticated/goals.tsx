import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getGoals, createGoal, deleteGoal } from "@/lib/customer-queries.functions";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { compactPKR, formatPKR } from "@/lib/format";
import { useState } from "react";
import { Plus, Target, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/goals")({
  component: GoalsPage,
});

function GoalsPage() {
  const fetch = useServerFn(getGoals);
  const create = useServerFn(createGoal);
  const del = useServerFn(deleteGoal);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["goals"], queryFn: () => fetch({}) });

  const goals = data?.goals ?? [];
  const policies = data?.policies ?? [];

  const addMut = useMutation({
    mutationFn: (v: any) => create({ data: v }),
    onSuccess: () => { toast.success("Goal created"); qc.invalidateQueries({ queryKey: ["goals"] }); },
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  return (
    <AppShell
      title="Savings Goals"
      subtitle="Tag policies to what matters. Watch progress compound."
      actions={
        <CreateGoalDialog policies={policies} onCreate={(v) => addMut.mutate(v)} />
      }
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((g) => {
          const linked = policies.filter((p) => g.linked_policy_ids.includes(p.id));
          const current = linked.reduce((s, p) => s + Number(p.cash_value) + Number(p.bonus_accumulated), 0) + Number(g.projected_value ?? 0);
          const pct = Math.min(100, (current / Number(g.target_amount)) * 100);
          return (
            <div key={g.id} className="surface-elevated p-6 relative">
              <button
                onClick={() => delMut.mutate(g.id)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-semibold font-display text-lg">{g.title}</h3>
              {g.target_date && <p className="text-xs text-muted-foreground mt-0.5">by {new Date(g.target_date).toLocaleDateString()}</p>}
              <div className="mt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold font-display tabular-nums">{compactPKR(current)}</span>
                  <span className="text-xs text-muted-foreground">of {compactPKR(Number(g.target_amount))}</span>
                </div>
                <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${pct >= 100 ? "gradient-gold-bg" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 tabular-nums">{pct.toFixed(1)}% funded</div>
              </div>
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                {linked.length} linked polic{linked.length === 1 ? "y" : "ies"}
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
          <div className="col-span-full surface-elevated p-10 text-center text-sm text-muted-foreground">
            No goals yet. Create one to start tracking.
          </div>
        )}
      </div>
    </AppShell>
  );
}

function CreateGoalDialog({ policies, onCreate }: { policies: any[]; onCreate: (v: any) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", target_amount: "", target_date: "" });
  const [linked, setLinked] = useState<string[]>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" /> New goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create a savings goal</DialogTitle></DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onCreate({
              title: form.title,
              target_amount: Number(form.target_amount),
              target_date: form.target_date || null,
              linked_policy_ids: linked,
            });
            setOpen(false);
            setForm({ title: "", target_amount: "", target_date: "" });
            setLinked([]);
          }}
        >
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ali's University Fund" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Target (PKR)</Label>
              <Input required type="number" value={form.target_amount} onChange={(e) => setForm({ ...form, target_amount: e.target.value })} placeholder="5000000" />
            </div>
            <div className="space-y-1.5">
              <Label>Target date</Label>
              <Input type="date" value={form.target_date} onChange={(e) => setForm({ ...form, target_date: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Link policies</Label>
            <div className="space-y-1.5 max-h-40 overflow-auto">
              {policies.map((p) => (
                <label key={p.id} className="flex items-center gap-2 p-2 rounded hover:bg-accent text-sm">
                  <Checkbox
                    checked={linked.includes(p.id)}
                    onCheckedChange={(v) => setLinked(v ? [...linked, p.id] : linked.filter((x) => x !== p.id))}
                  />
                  <span className="flex-1 truncate">{p.policy_number} · {(p.products as any)?.name}</span>
                  <span className="text-xs text-muted-foreground">{compactPKR(Number(p.sum_assured))}</span>
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">Create goal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
