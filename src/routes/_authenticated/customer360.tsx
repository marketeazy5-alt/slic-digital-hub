import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyRoles, grantDemoRole } from "@/lib/portal-queries.functions";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { PolicyStatusBadge } from "@/components/policy-status-badge";
import { compactPKR, formatPKR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Shield, Users, FileText, Target, Phone, Mail, MapPin,
  ShieldAlert, Search, BadgeCheck, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/customer360")({
  component: Customer360Page,
});

const sampleCustomers = [
  { id: "c1", name: "Ahmed Khan", cnic: "42101-1234567-1", phone: "0300-1234567", email: "ahmed.khan@email.com", branch: "Aman Chamber", city: "Karachi", policies: 3, totalCoverage: 19500000, kyc: "verified", nadra: true, lastActive: "2 days ago" },
  { id: "c2", name: "Fatima Hassan", cnic: "35202-7654321-2", phone: "0321-9876543", email: "fatima.h@email.com", branch: "Ferozepur Road", city: "Lahore", policies: 2, totalCoverage: 8000000, kyc: "verified", nadra: true, lastActive: "5 days ago" },
  { id: "c3", name: "Tariq Mehmood", cnic: "44101-4567890-3", phone: "0345-4567890", email: "tariq.m@email.com", branch: "Blue Area", city: "Islamabad", policies: 1, totalCoverage: 5000000, kyc: "pending", nadra: false, lastActive: "2 weeks ago" },
  { id: "c4", name: "Zara Ali", cnic: "42201-9876543-4", phone: "0333-3334455", email: "zara.a@email.com", branch: "Saddar", city: "Rawalpindi", policies: 2, totalCoverage: 12000000, kyc: "verified", nadra: true, lastActive: "1 week ago" },
  { id: "c5", name: "Bilal Ahmed", cnic: "13101-5555555-5", phone: "0301-1112233", email: "bilal.a@email.com", branch: "University Road", city: "Peshawar", policies: 1, totalCoverage: 3000000, kyc: "verified", nadra: true, lastActive: "1 month ago" },
];

function Customer360Page() {
  const fetchRoles = useServerFn(getMyRoles);
  const grant = useServerFn(grantDemoRole);
  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => fetchRoles({}) });
  const grantMut = useMutation({
    mutationFn: () => grant({ data: { role: "agent" } }),
    onSuccess: () => { toast.success("Agent role granted"); rolesQ.refetch(); },
  });

  const hasRole = (rolesQ.data?.roles ?? []).some((r) => r === "admin" || r === "agent");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = sampleCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnic.includes(searchTerm) ||
      c.phone.includes(searchTerm)
  );

  if (!hasRole) {
    return (
      <AppShell title="Customer 360" subtitle="Unified customer view">
        <div className="empty-state">
          <Shield className="mx-auto h-10 w-10 text-primary mb-3" />
          <h2 className="text-lg font-semibold font-display">Access required</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Customer 360 is available to agents and admins.</p>
          <Button onClick={() => grantMut.mutate()} disabled={grantMut.isPending}>Grant demo agent role</Button>
        </div>
      </AppShell>
    );
  }

  const totalPolicies = filteredCustomers.reduce((s, c) => s + c.policies, 0);
  const verifiedKyc = filteredCustomers.filter((c) => c.kyc === "verified").length;
  const flaggedCustomers = filteredCustomers.filter((c) => !c.nadra).length;

  const customerColumns = [
    { key: "name", label: "Name", sortable: true, render: (c: any) => <span className="font-medium">{c.name}</span> },
    { key: "cnic", label: "CNIC", sortable: true, render: (c: any) => <span className="text-xs font-mono text-muted-foreground">{c.cnic}</span> },
    { key: "phone", label: "Phone", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "policies", label: "Policies", sortable: true, className: "text-right" as const, render: (c: any) => <span className="tabular-nums">{c.policies}</span> },
    { key: "totalCoverage", label: "Coverage", sortable: true, className: "text-right" as const, render: (c: any) => <span className="tabular-nums font-semibold">{compactPKR(c.totalCoverage)}</span> },
    { key: "kyc", label: "KYC", render: (c: any) => (
      <span className={`text-xs px-2 py-0.5 rounded-full ${c.kyc === "verified" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
        {c.kyc}
      </span>
    )},
    { key: "nadra", label: "NADRA", render: (c: any) => c.nadra ? <BadgeCheck className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" /> },
    { key: "lastActive", label: "Last active", sortable: true },
  ];

  return (
    <AppShell
      title="Customer 360"
      subtitle="Unified view of all customers, policies, and risk indicators."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total customers" value={filteredCustomers.length} icon={<Users className="h-4 w-4" />} hint="Filtered results" />
        <StatCard label="Total policies" value={totalPolicies} icon={<FileText className="h-4 w-4" />} />
        <StatCard label="KYC verified" value={verifiedKyc} icon={<BadgeCheck className="h-4 w-4" />} accent="success" />
        <StatCard label="Needs attention" value={flaggedCustomers} icon={<AlertTriangle className="h-4 w-4" />} accent="warning" />
      </div>

      <div className="surface-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold font-display">Customer directory</h3>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, CNIC, or phone..."
              className="pl-9"
            />
          </div>
        </div>
        <DataTable
          data={filteredCustomers}
          columns={customerColumns}
          keyExtractor={(c) => c.id}
          searchable={false}
          pageSize={5}
          emptyMessage="No customers match your search."
        />
      </div>
    </AppShell>
  );
}
