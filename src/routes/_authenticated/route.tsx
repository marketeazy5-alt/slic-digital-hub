import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Try server-side token validation first
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) return { user: data.user };

    // Fall back to the local session (handles mobile/slow-network issues)
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) return { user: sessionData.session.user };

    throw redirect({ to: "/auth" });
  },
  component: () => <Outlet />,
});
