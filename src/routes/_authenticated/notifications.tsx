import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Bell, BellDot, CheckCheck, Trash2, Filter, Clock, DollarSign,
  Shield, AlertTriangle, Target, FileText, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
});

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "payment" | "claim" | "policy" | "goal" | "system";
  route?: string;
}

const allNotifications: Notification[] = [
  { id: "n1", title: "Premium due in 5 days", description: "Your Whole Life Endowment premium of ₨9,375 is due on Aug 15, 2026.", time: "2 hours ago", read: false, type: "payment", route: "/pay" },
  { id: "n2", title: "Claim advanced to Underwriting", description: "Claim CLM-2024-0891 has passed verification and is now under underwriting review.", time: "5 hours ago", read: false, type: "claim", route: "/claims" },
  { id: "n3", title: "Cash value milestone reached", description: "Your policy END-1001 has crossed ₨1.2M in accumulated cash value.", time: "1 day ago", read: false, type: "policy" },
  { id: "n4", title: "Hajj 2032 goal: 62% complete", description: "You're making great progress on your savings goal. Keep it up!", time: "2 days ago", read: true, type: "goal", route: "/goals" },
  { id: "n5", title: "Lapse risk detected", description: "Policy CHILD-EDU-2024 has a 72% lapse probability. Consider paying the overdue premium.", time: "3 days ago", read: true, type: "system", route: "/policies" },
  { id: "n6", title: "Premium paid successfully", description: "Your payment of ₨9,375 for END-1001 has been received. Receipt: RCPT-2026-4712.", time: "1 week ago", read: true, type: "payment" },
  { id: "n7", title: "Bonus declared for FY 2025-26", description: "SLIC has declared a 4.8% reversionary bonus for the current financial year.", time: "2 weeks ago", read: true, type: "policy" },
  { id: "n8", title: "Claim filed successfully", description: "Your maturity claim for END-1001 has been received. Claim number: CLM-2024-0891.", time: "3 weeks ago", read: true, type: "claim", route: "/claims" },
  { id: "n9", title: "New savings goal created", description: "Ali's University Fund goal has been created with a target of ₨5,000,000.", time: "1 month ago", read: true, type: "goal", route: "/goals" },
  { id: "n10", title: "KYC verification completed", description: "Your identity has been verified successfully via NADRA.", time: "1 month ago", read: true, type: "system" },
  { id: "n11", title: "Fraud ring alert", description: "A new fraud ring has been detected involving a hospital in your network. No action needed.", time: "1 month ago", read: true, type: "system", route: "/trust-safety" },
  { id: "n12", title: "Annual statement available", description: "Your FY 2025-26 annual policy statement is now available for download.", time: "2 months ago", read: true, type: "policy" },
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  payment: { icon: <DollarSign className="h-4 w-4" />, color: "bg-warning/10 text-warning" },
  claim: { icon: <FileText className="h-4 w-4" />, color: "bg-info/10 text-info" },
  policy: { icon: <Shield className="h-4 w-4" />, color: "bg-primary/10 text-primary" },
  goal: { icon: <Target className="h-4 w-4" />, color: "bg-success/10 text-success" },
  system: { icon: <AlertTriangle className="h-4 w-4" />, color: "bg-destructive/10 text-destructive" },
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <AppShell
      title="Notifications"
      subtitle={unreadCount > 0 ? `${unreadCount} unread notifications` : "No unread notifications"}
      actions={
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="btn-magnetic gap-1.5">
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1.5">
            <Trash2 className="h-3.5 w-3.5" /> Clear all
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === "all" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === "unread" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold font-display text-lg mb-1">All caught up!</h3>
          <p className="text-sm text-muted-foreground">No notifications to show.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const cfg = typeConfig[n.type];
            return (
              <div
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                  n.read ? "border-border bg-card hover:bg-muted/10" : "border-primary/20 bg-primary/[0.02] hover:bg-primary/[0.04]",
                )}
              >
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", cfg.color)}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className={cn("text-sm", !n.read && "font-semibold")}>{n.title}</div>
                    {!n.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {n.time}
                    </div>
                    {n.route && (
                      <Link
                        to={n.route as any}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary hover:underline flex items-center gap-0.5"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
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
