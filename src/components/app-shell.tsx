import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wallet,
  FileText,
  Target,
  Settings,
  Menu,
  Sparkles,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  Briefcase,
  Building2,
  BarChart3,
  Bell,
  BellDot,
  HelpCircle,
  TrendingUp,
  Users,
  Download,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/theme-provider";
import { getMyRoles } from "@/lib/portal-queries.functions";

const customerNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/policies", label: "Policies", icon: FileText },
  { to: "/pay", label: "Pay Premium", icon: Wallet },
  { to: "/claims", label: "Claims", icon: ShieldCheck },
  { to: "/investments", label: "Investments", icon: TrendingUp },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/trust-safety", label: "Trust & Safety", icon: Sparkles },
  { to: "/goals", label: "Savings Goals", icon: Target },
  { to: "/reports", label: "Reports", icon: Download },
  { to: "/support", label: "Support", icon: HelpCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

const portalNav = [
  { to: "/agent", label: "Agent Workbench", icon: Briefcase, roles: ["agent", "admin"] },
  { to: "/admin", label: "Admin Console", icon: Building2, roles: ["admin"] },
  { to: "/analytics", label: "Analytics", icon: BarChart3, roles: ["agent", "admin"] },
  { to: "/customer360", label: "Customer 360", icon: Users, roles: ["agent", "admin"] },
];

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const fetchRoles = useServerFn(getMyRoles);
  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => fetchRoles({}), staleTime: 60_000 });
  const roles = rolesQ.data?.roles ?? [];
  const visiblePortals = portalNav.filter((p) => p.roles.some((r) => roles.includes(r as any)));
  const nav = customerNav;

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth" });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[260px]",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-md gradient-hero-bg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm font-display">S</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-semibold text-sidebar-foreground font-display truncate">SLIC Digital Hub</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Customer Portal</div>
              </div>
            )}
          </Link>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {nav.map((item) => {
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group",
                  active
                    ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm nav-active-indicator"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground card-spotlight",
                  collapsed && "justify-center",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
          {visiblePortals.length > 0 && (
            <>
              <div className={cn("pt-4 pb-1 px-3 text-[10px] uppercase tracking-wider text-muted-foreground", collapsed && "text-center px-0")}>
                {collapsed ? "•" : "Staff portals"}
              </div>
              {visiblePortals.map((item) => {
                const active = location.pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center",
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
        <div className="p-2 border-t border-sidebar-border space-y-0.5">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-sidebar-foreground/80 hover:bg-sidebar-accent",
              collapsed && "justify-center",
            )}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span>{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          <button
            onClick={signOut}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-sidebar-foreground/80 hover:bg-sidebar-accent btn-magnetic",
              collapsed && "justify-center",
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign out</span>}
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full text-muted-foreground hover:bg-sidebar-accent btn-magnetic",
              collapsed && "justify-center",
            )}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-[260px] bg-sidebar border-r border-sidebar-border flex flex-col">
            <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
              <div className="text-sm font-semibold font-display">SLIC Digital Hub</div>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-0.5">
              {nav.map((item) => {
                const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium",
                      active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border glass sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              {title && <h1 className="text-lg md:text-xl font-semibold font-display truncate">{title}</h1>}
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
