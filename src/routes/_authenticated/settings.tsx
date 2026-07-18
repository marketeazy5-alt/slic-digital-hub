import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboard, updateProfile } from "@/lib/customer-queries.functions";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sun, Moon, Monitor, Bell, Shield, Key, Smartphone, Globe, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  const fetch = useServerFn(getDashboard);
  const update = useServerFn(updateProfile);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetch({}) });
  const { theme, setTheme, density, setDensity } = useTheme();

  const profile = data?.profile;
  const [form, setForm] = useState({ full_name: "", phone: "", occupation: "", monthly_income: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        phone: profile.phone ?? "",
        occupation: profile.occupation ?? "",
        monthly_income: profile.monthly_income?.toString() ?? "",
      });
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: () => update({ data: {
      full_name: form.full_name,
      phone: form.phone,
      occupation: form.occupation,
      monthly_income: form.monthly_income ? Number(form.monthly_income) : undefined,
    } }),
    onSuccess: () => { toast.success("Profile updated"); qc.invalidateQueries(); },
  });

  return (
    <AppShell title="Settings" subtitle="Preferences, profile, and security.">
      <Tabs defaultValue="appearance" className="max-w-4xl">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance" className="gap-2"><Sun className="h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="account" className="gap-2"><Shield className="h-4 w-4" /> Account</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">Theme</h2>
            <div className="flex gap-3">
              {[
                { v: "light", label: "Light", icon: Sun },
                { v: "dark", label: "Dark", icon: Moon },
                { v: "system", label: "System", icon: Monitor },
              ].map(({ v, label, icon: Icon }) => (
                <button
                  key={v}
                  onClick={() => setTheme(v as any)}
                  className={`flex-1 p-4 rounded-xl border text-sm flex flex-col items-center gap-2 transition-all ${
                    theme === v ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/20"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">Density</h2>
            <div className="flex gap-3">
              {["comfortable", "compact"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d as any)}
                  className={`flex-1 p-4 rounded-xl border text-sm capitalize transition-all ${
                    density === d ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/20"
                  }`}
                >
                  <div className="font-medium mb-1">{d}</div>
                  <div className="text-xs text-muted-foreground">
                    {d === "comfortable" ? "More spacing, easier reading" : "Tighter layout, more data"}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">Personal information</h2>
            <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}>
              <div className="space-y-1.5">
                <Label>Full name</Label>
                <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Occupation</Label>
                <Input value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Monthly income (PKR)</Label>
                <Input type="number" value={form.monthly_income} onChange={(e) => setForm({ ...form, monthly_income: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={save.isPending} className="btn-magnetic">Save changes</Button>
              </div>
            </form>
          </section>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4">Account details</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Field label="CNIC" value={profile?.cnic ?? "—"} />
              <Field label="KYC status" value={<span className={`inline-flex items-center gap-1.5 ${profile?.kyc_status === "verified" ? "text-success" : "text-warning"}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${profile?.kyc_status === "verified" ? "bg-success" : "bg-warning"}`} />
                {profile?.kyc_status ?? "—"}
              </span>} />
              <Field label="NADRA verified" value={profile?.nadra_verified ? "Yes" : "No (simulated)"} />
              <Field label="Home branch" value={(profile?.branches as any)?.name ?? "—"} />
              <Field label="Branch city" value={(profile?.branches as any)?.city ?? "—"} />
              <Field label="Email" value={profile?.email ?? "—"} />
            </div>
          </section>

          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Security
            </h2>
            <div className="space-y-4">
              {[
                { icon: <Key className="h-4 w-4" />, title: "Password", desc: "Last changed 3 months ago", action: "Change" },
                { icon: <Smartphone className="h-4 w-4" />, title: "Two-factor authentication", desc: "Add an extra layer of security", action: "Enable", badge: "Recommended" },
                { icon: <Globe className="h-4 w-4" />, title: "Active sessions", desc: "2 active sessions across devices", action: "Manage" },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">{item.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && <span className="badge-pill-info text-[10px]">{item.badge}</span>}
                    <Button variant="outline" size="sm">{item.action}</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <section className="surface-elevated p-6">
            <h2 className="font-semibold font-display mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Notification preferences
            </h2>
            <div className="space-y-4">
              {[
                { title: "Premium reminders", desc: "Get notified 7 days before premium is due", default: true },
                { title: "Lapse warnings", desc: "Alerts when a policy enters grace period", default: true },
                { title: "Claim updates", desc: "Status changes on filed claims", default: true },
                { title: "Savings goal milestones", desc: "Celebrate when you hit a savings target", default: true },
                { title: "Fraud alerts", desc: "Notifications about Trust & Safety findings", default: false },
                { title: "Marketing & offers", desc: "New products and special promotions", default: false },
              ].map((n) => (
                <div key={n.title} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors">
                  <div>
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <Switch defaultChecked={n.default} />
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-3 rounded-lg border border-border">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
