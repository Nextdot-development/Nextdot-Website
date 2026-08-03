import { useEffect, useState } from "react";
import { subscribeHistory } from "@/services/history";
import type { BlogVersion } from "@/types/blog";

/** Realtime version history for a blog (newest version first). */
export function useBlogHistory(blogId: string | undefined) {
  const [versions, setVersions] = useState<BlogVersion[]>([]);
  const [loading, setLoading] = useState(Boolean(blogId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) {
      setVersions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeHistory(
      blogId,
      (data) => { setVersions(data); setLoading(false); },
      (err) => { setError(err.message); setLoading(false); }
    );
    return unsub;
  }, [blogId]);

  return { versions, loading, error };
}
