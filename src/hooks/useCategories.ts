import { useEffect, useState } from "react";
import { subscribeCategories, ensureDefaultCategories, DEFAULT_CATEGORIES } from "@/services/categories";
import type { Category } from "@/types/blog";

/** Realtime categories; seeds the defaults the first time. */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed defaults if the collection is empty (best-effort).
    ensureDefaultCategories().catch(() => {});
    const unsub = subscribeCategories((data) => {
      setCategories(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Fall back to the known defaults until Firestore responds.
  const names = categories.length ? categories.map((c) => c.name) : DEFAULT_CATEGORIES;

  return { categories, names, loading };
}
