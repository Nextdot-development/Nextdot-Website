import { useEffect, useMemo, useRef, useState } from "react";
import { subscribeBlogs, transitionStatus } from "@/services/blogs";
import { useAuth } from "@/hooks/useAuth";
import type { BlogDoc, BlogStatus } from "@/types/blog";

/** Realtime list of all blogs plus derived status counts. */
export function useBlogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const promoted = useRef<Set<string>>(new Set()); // ids already auto-promoted this session

  useEffect(() => {
    const unsub = subscribeBlogs(
      (data) => {
        setBlogs(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  // Auto-publish scheduled blogs whose time has arrived (no server cron on
  // static hosting — promotion happens on load / while the admin is open).
  useEffect(() => {
    const actor = user?.email ?? user?.uid ?? "system";
    const now = Date.now();
    const due = blogs.filter(
      (b) => b.id && b.status === "scheduled" && b.publishAt && b.publishAt.toMillis() <= now && !promoted.current.has(b.id)
    );
    for (const b of due) {
      promoted.current.add(b.id!);
      transitionStatus(b.id!, "published", actor).catch(() => promoted.current.delete(b.id!));
    }
  }, [blogs, user]);

  const counts = useMemo(() => {
    const c: Record<BlogStatus, number> = { draft: 0, scheduled: 0, published: 0, archived: 0 };
    for (const b of blogs) c[b.status] = (c[b.status] ?? 0) + 1;
    return { total: blogs.length, ...c };
  }, [blogs]);

  return { blogs, counts, loading, error };
}
