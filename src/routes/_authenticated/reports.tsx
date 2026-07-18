import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, FileText, FileSpreadsheet, Printer, Eye, Calendar } from "lucide-react";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});

const reports = [
  {
    category: "Policy Documents",
    items: [
      { name: "Policy Schedules", desc: "All active policy documents", date: "Current", size: "PDF, 3.2 MB" },
      { name: "Annual Bonus Statements", desc: "Reversionary bonus declarations", date: "Mar 2026", size: "PDF, 1.8 MB" },
      { name: "Premium Payment History", desc: "Complete payment records", date: "Current", size: "PDF, 2.1 MB" },
    ],
  },
  {
    category: "Tax Documents",
    items: [
      { name: "Tax Certificate FY 2025-26", desc: "Section 62 tax deduction certificate", date: "Jun 2026", size: "PDF, 0.5 MB" },
      { name: "Tax Certificate FY 2024-25", desc: "Previous year certificate", date: "Jun 2025", size: "PDF, 0.5 MB" },
      { name: "Zakat Deduction Statement", desc: "Annual zakat deduction record", date: "Current", size: "PDF, 0.3 MB" },
    ],
  },
  {
    category: "Statements & Summaries",
    items: [
      { name: "Portfolio Summary", desc: "Complete policy portfolio overview", date: "Current", size: "PDF, 4.5 MB" },
      { name: "Cash Value Statement", desc: "Current cash value across all policies", date: "Current", size: "PDF, 1.2 MB" },
      { name: "Claims History", desc: "All claims filed with status and amounts", date: "Current", size: "PDF, 0.8 MB" },
      { name: "Maturity Schedule", desc: "Upcoming policy maturity dates and amounts", date: "Current", size: "PDF, 0.6 MB" },
    ],
  },
];

function ReportsPage() {
  return (
    <AppShell
      title="Reports & Documents"
      subtitle="Download policy documents, tax certificates, and portfolio summaries."
    >
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All documents</TabsTrigger>
          <TabsTrigger value="tax">Tax certificates</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        {["all", "tax", "statements"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="space-y-8">
              {reports
                .filter((r) => tab === "all" || r.category.toLowerCase().includes(tab === "tax" ? "tax" : "statement"))
                .map((group) => (
                  <div key={group.category}>
                    <h3 className="font-semibold font-display text-lg mb-4">{group.category}</h3>
                    <div className="space-y-3">
                      {group.items.map((doc, i) => (
                        <div key={i} className="surface-elevated p-5 flex items-center gap-4 card-spotlight">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{doc.desc}</div>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                              <span>{doc.date}</span>
                              <span>· {doc.size}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="btn-magnetic"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="btn-magnetic"><Download className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="btn-magnetic"><Printer className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
