import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAdminOverview, getMyRoles, grantDemoRole } from "@/lib/portal-queries.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, ShieldAlert, Package, Activity } from "lucide-react";
import { toast } from "sonner";
import { formatCNIC } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminConsole,
});

function AdminConsole() {
  const fetchRoles = useServerFn(getMyRoles);
  const fetchOverview = useServerFn(getAdminOverview);
  const grant = useServerFn(grantDemoRole);
  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => fetchRoles({}) });
  const q = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview({}),
    enabled: (rolesQ.data?.roles ?? []).includes("admin"),
    retry: false,
  });
  const grantMut = useMutation({
    mutationFn: () => grant({ data: { role: "admin" } }),
    onSuccess: () => { toast.success("Admin role granted"); rolesQ.refetch(); },
  });

  if (!rolesQ.data?.roles.includes("admin")) {
    return (
      <AppShell title="Admin Console" subtitle="Head office control plane">
        <div className="surface-elevated p-10 text-center max-w-lg mx-auto">
          <ShieldAlert className="mx-auto h-10 w-10 text-primary mb-3" />
          <h2 className="text-lg font-semibold font-display">Admin role required</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Grant yourself the admin role for demo purposes.</p>
          <Button onClick={() => grantMut.mutate()} disabled={grantMut.isPending}>
            {grantMut.isPending ? "Granting…" : "Grant demo admin role"}
          </Button>
        </div>
      </AppShell>
    );
  }

  const d = q.data;
  const roleCount = (role: string) => (d?.roles ?? []).filter((r: any) => r.role === role).length;

  return (
    <AppShell title="Admin Console" subtitle="Users, branches, products, and system health">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total users" value={d?.users.length ?? 0} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Branches" value={d?.branches.length ?? 0} icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Active fraud rings" value={d?.rings.length ?? 0} icon={<ShieldAlert className="h-4 w-4" />} accent="warning" />
        <StatCard label="Products in catalog" value={d?.products.length ?? 0} icon={<Package className="h-4 w-4" />} />
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users & roles</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="rings">Fraud rings</TabsTrigger>
          <TabsTrigger value="saga">System events</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-elevated p-4"><div className="text-xs text-muted-foreground">Customers</div><div className="text-2xl font-bold font-display mt-1">{roleCount("customer")}</div></div>
            <div className="surface-elevated p-4"><div className="text-xs text-muted-foreground">Agents</div><div className="text-2xl font-bold font-display mt-1">{roleCount("agent")}</div></div>
            <div className="surface-elevated p-4"><div className="text-xs text-muted-foreground">Admins</div><div className="text-2xl font-bold font-display mt-1">{roleCount("admin")}</div></div>
          </div>
          <div className="surface-elevated overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr><th className="text-left p-3">Name</th><th className="text-left p-3">CNIC</th><th className="text-left p-3">Branch</th><th className="text-left p-3">KYC</th><th className="text-left p-3">Joined</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(d?.users ?? []).slice(0, 25).map((u: any) => (
                  <tr key={u.id}>
                    <td className="p-3">{u.full_name ?? "—"}</td>
                    <td className="p-3 font-mono text-xs">{u.cnic ? formatCNIC(u.cnic) : "—"}</td>
                    <td className="p-3 text-xs">{u.branches?.name ?? "—"}</td>
                    <td className="p-3 text-xs capitalize">{u.kyc_status ?? "pending"}</td>
                    <td className="p-3 text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="branches" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {(d?.branches ?? []).map((b: any) => (
              <div key={b.id} className="surface-elevated p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold font-display">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.city} · {b.region}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted">{b.code}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-3">{b.address}</div>
                <div className="text-xs font-mono mt-1">{b.phone}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2">
            {(d?.products ?? []).map((p: any) => (
              <div key={p.code} className="surface-elevated p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold font-display">{p.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{p.category?.replace(/_/g, " ")}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted">{p.code}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 line-clamp-3">{p.description ?? "—"}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rings" className="mt-4">
          <div className="surface-elevated divide-y divide-border">
            {(d?.rings ?? []).map((r: any) => (
              <div key={r.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Ring #{String(r.id).slice(0, 8)}</div>
                  <div className="text-xs text-muted-foreground">{(r.member_claim_ids ?? []).length} claims · {Object.keys(r.shared_entities_json ?? {}).length} shared entities</div>
                </div>
                <div className="text-2xl font-bold text-destructive tabular-nums">{Number(r.score).toFixed(1)}</div>
              </div>
            ))}
            {!d?.rings.length && <div className="p-8 text-center text-sm text-muted-foreground">No fraud rings detected.</div>}
          </div>
        </TabsContent>

        <TabsContent value="saga" className="mt-4">
          <div className="surface-elevated divide-y divide-border font-mono text-xs">
            {(d?.sagaEvents ?? []).map((e: any, i: number) => (
              <div key={i} className="p-3 flex items-center gap-3">
                <Activity className="h-3 w-3 text-muted-foreground" />
                <span className="w-40 truncate">{e.saga_id}</span>
                <span className="flex-1">{e.step}</span>
                <span className={`px-2 py-0.5 rounded ${e.status === "success" ? "bg-success/10 text-success" : e.status === "failed" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}>{e.status}</span>
                <span className="text-muted-foreground">{new Date(e.created_at).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
