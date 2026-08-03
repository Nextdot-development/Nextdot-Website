import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Gates an admin screen behind a signed-in Supabase user. While auth state is
 * resolving it shows a lightweight loader; unauthenticated users are sent to
 * /admin/login. (Data access is separately enforced by Supabase Row Level
 * Security — this guard is UX, not the security boundary.)
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();

  if (!configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-center">
        <div className="max-w-md">
          <h1 className="mb-3 font-display text-2xl font-semibold text-ink">Supabase not configured</h1>
          <p className="text-ink/60">
            Set <code className="rounded bg-surface px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-sm">VITE_SUPABASE_PUBLISHABLE_KEY</code> and rebuild
            to enable the admin panel.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
