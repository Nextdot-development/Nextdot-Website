import { supabase, channelName } from "@/supabase/config";
import type { Category } from "@/types/blog";
import { slugify } from "@/utils/slug";

const TABLE = "categories";

// The categories the public site already uses.
export const DEFAULT_CATEGORIES = ["Featured", "Voice AI", "Healthcare", "Compliance", "AI Strategy"];

function rowToCategory(r: Record<string, unknown>): Category {
  return { id: r.id as string, name: (r.name as string) ?? "", slug: (r.slug as string) ?? "" };
}

/** Seed the default categories if missing (idempotent; also seeded by migration). */
export async function ensureDefaultCategories(): Promise<void> {
  const rows = DEFAULT_CATEGORIES.map((name) => ({ name, slug: slugify(name) }));
  await supabase.from(TABLE).upsert(rows, { onConflict: "name", ignoreDuplicates: true });
}

async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from(TABLE).select("*").order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToCategory);
}

export function subscribeCategories(onData: (categories: Category[]) => void) {
  let cancelled = false;
  const load = () => fetchCategories().then((c) => !cancelled && onData(c)).catch(() => {});
  load();
  const channel = supabase
    .channel(channelName("categories-changes"))
    .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, load)
    .subscribe();
  return () => {
    cancelled = true;
    supabase.removeChannel(channel);
  };
}

export async function createCategory(name: string): Promise<void> {
  const { error } = await supabase.from(TABLE).insert({ name: name.trim(), slug: slugify(name) });
  if (error) throw new Error(error.message);
}
