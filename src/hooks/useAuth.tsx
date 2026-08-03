import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/supabase/config";

/** Normalised admin user — mirrors the shape the app previously used (uid + email). */
export interface AdminUser {
  uid: string;
  email: string | null;
}

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  configured: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, configured: false });

/** Wraps the admin app and tracks the signed-in Supabase user. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    // Resolve the current session, then keep it in sync.
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      setUser(u ? { uid: u.id, email: u.email ?? null } : null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setUser(u ? { uid: u.id, email: u.email ?? null } : null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, loading, configured: isSupabaseConfigured }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

/** Email + password sign-in. Throws on failure (Login maps the message). */
export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const logout = () => supabase.auth.signOut();
