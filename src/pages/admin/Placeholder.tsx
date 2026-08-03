import { AdminLayout } from "@/components/admin/AdminLayout";

/** Generic "coming in a later feature" screen so sidebar navigation works today. */
export default function Placeholder({ title, note }: { title: string; note: string }) {
  return (
    <AdminLayout title={title}>
      <div className="rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
        <p className="font-display text-lg font-medium text-ink/70">{title}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/40">{note}</p>
      </div>
    </AdminLayout>
  );
}
