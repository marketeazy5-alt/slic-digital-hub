import { useState, useRef, useEffect } from "react";
import { Bell, BellDot, X, CheckCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read: boolean;
  type: "payment" | "claim" | "policy" | "system" | "goal";
  route?: string;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Premium due reminder",
    description: "Your Whole Life Endowment premium of ₨9,375 is due in 5 days.",
    time: "2 hours ago",
    read: false,
    type: "payment",
    route: "/pay",
  },
  {
    id: "2",
    title: "Claim update",
    description: "Your claim CLM-2024-0891 has moved to Underwriting stage.",
    time: "Yesterday",
    read: false,
    type: "claim",
    route: "/claims",
  },
  {
    id: "3",
    title: "Cash value milestone",
    description: "Your policy END-1001 has crossed ₨1.2M in accumulated cash value.",
    time: "2 days ago",
    read: true,
    type: "policy",
  },
  {
    id: "4",
    title: "Savings goal progress",
    description: "You're 62% towards your Hajj 2032 goal. Keep it up!",
    time: "3 days ago",
    read: true,
    type: "goal",
    route: "/goals",
  },
  {
    id: "5",
    title: "Lapse risk alert",
    description: "Policy CHILD-EDU-2024 may lapse soon. Consider paying your overdue premium.",
    time: "5 days ago",
    read: true,
    type: "system",
    route: "/policies",
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  const typeColors: Record<string, string> = {
    payment: "bg-warning/10 text-warning",
    claim: "bg-info/10 text-info",
    policy: "bg-primary/10 text-primary",
    system: "bg-destructive/10 text-destructive",
    goal: "bg-success/10 text-success",
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        {unread > 0 ? (
          <>
            <BellDot className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] flex items-center justify-center text-[10px] font-bold text-white bg-destructive rounded-full px-1">
              {unread}
            </span>
          </>
        ) : (
          <Bell className="h-5 w-5" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[520px] bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-fade-slide">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold font-display">Notifications</h3>
            <div className="flex items-center gap-1">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline flex items-center gap-1 px-2 py-1"
                >
                  <CheckCheck className="h-3 w-3" /> Mark all read
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No notifications.</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "p-4 hover:bg-muted/20 transition-colors group relative",
                    !n.read && "bg-primary/[0.02]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", typeColors[n.type])}>
                      <div className={cn("h-2 w-2 rounded-full", !n.read ? "bg-destructive" : "bg-transparent")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-sm leading-snug", !n.read && "font-semibold")}>{n.title}</p>
                        <button
                          onClick={() => dismiss(n.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-0.5 hover:bg-muted rounded"
                        >
                          <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                      {n.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-muted-foreground">{n.time}</span>
                        {n.route && (
                          <Link
                            to={n.route as any}
                            onClick={() => setOpen(false)}
                            className="text-xs text-primary hover:underline flex items-center gap-0.5"
                          >
                            View <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="block text-center text-sm text-primary font-medium py-3 border-t border-border hover:bg-muted/20 transition-colors"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
