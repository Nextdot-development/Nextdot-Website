import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useCategories } from "@/hooks/useCategories";
import { createCategory } from "@/services/categories";

export default function Categories() {
  const { categories, loading } = useCategories();
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);

  const add = async () => {
    if (!name.trim()) return;
    setAdding(true);
    try {
      await createCategory(name);
      setName("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <AdminLayout title="Categories">
      <div className="max-w-lg">
        <div className="mb-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="New category name"
            className="flex-1 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none"
          />
          <button
            onClick={add}
            disabled={adding || !name.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/90 disabled:opacity-60"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        <div className="rounded-2xl border border-line bg-surface">
          {loading ? (
            <p className="p-6 text-center text-sm text-ink/50">Loading…</p>
          ) : (
            <ul className="divide-y divide-line">
              {categories.map((c) => (
                <li key={c.id} className="flex items-center justify-between px-4 py-3">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-xs text-ink/40">/{c.slug}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
