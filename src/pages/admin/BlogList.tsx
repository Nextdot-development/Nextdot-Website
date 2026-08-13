import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Copy, Eye, Send, Archive, ArchiveRestore, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useBlogs } from "@/hooks/useBlogs";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import { deleteBlog, duplicateBlog, transitionStatus } from "@/services/blogs";
import { formatDate } from "@/utils/date";
import { blogPublicPath } from "@/utils/slug";
import type { BlogDoc, BlogStatus } from "@/types/blog";

const STATUS_TABS: { value: "all" | BlogStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

type SortKey = "title" | "category" | "status" | "publish" | "updated" | "createdBy" | "readTime";
type SortDir = "asc" | "desc";

// Show the author-set publish date (publishAt) — same value the editor shows —
// not the internal first-went-live stamp (publishedAt), which would make a
// back-dated post appear to jump to whenever it first went live.
const publishTs = (b: BlogDoc) => b.publishAt ?? b.publishedAt ?? null;

function sortValue(b: BlogDoc, key: SortKey): string | number {
  switch (key) {
    case "title": return (b.title || "").toLowerCase();
    case "category": return (b.category || "").toLowerCase();
    case "status": return b.status;
    case "createdBy": return (b.createdBy || "").toLowerCase();
    case "readTime": return parseInt(b.readTime || "0", 10) || 0;
    case "publish": return publishTs(b)?.toMillis() ?? 0;
    case "updated": return b.updatedAt?.toMillis() ?? 0;
  }
}

type PendingKind = "publish" | "archive" | "unarchive" | "delete";

export default function BlogList() {
  const { blogs, loading, error } = useBlogs();
  const { names: categoryNames } = useCategories();
  const { user } = useAuth();
  const actor = user?.email ?? user?.uid ?? "unknown";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | BlogStatus>("all");
  const [category, setCategory] = useState("all");
  // Default to publish-date order (newest first) so the list reads chronologically
  // and a freshly published/edited post doesn't jump to the top on updated_at.
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "publish", dir: "desc" });
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pending, setPending] = useState<{ kind: PendingKind; blog: BlogDoc } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = blogs.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (category !== "all" && b.category !== category) return false;
      if (q && !`${b.title} ${b.slug}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = sortValue(a, sort.key), vb = sortValue(b, sort.key);
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
  }, [blogs, search, status, category, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  const SortHead = ({ label, k, right }: { label: string; k: SortKey; right?: boolean }) => (
    <th className={`px-4 py-3 font-semibold ${right ? "text-right" : ""}`}>
      <button onClick={() => toggleSort(k)} className={`inline-flex items-center gap-1 hover:text-ink ${right ? "flex-row-reverse" : ""}`}>
        {label}
        {sort.key === k ? (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : <ArrowUpDown size={12} className="opacity-40" />}
      </button>
    </th>
  );

  const handleDuplicate = async (id: string) => {
    setBusyId(id);
    try {
      const newId = await duplicateBlog(id, actor);
      if (newId) navigate(`/admin/blogs/${newId}/edit`);
    } finally {
      setBusyId(null);
    }
  };

  const runPending = async () => {
    if (!pending) return;
    const { kind, blog } = pending;
    setBusyId(blog.id!);
    try {
      if (kind === "delete") await deleteBlog(blog.id!);
      else if (kind === "publish") await transitionStatus(blog.id!, "published", actor);
      else if (kind === "archive") await transitionStatus(blog.id!, "archived", actor);
      else if (kind === "unarchive") await transitionStatus(blog.id!, "draft", actor);
    } finally {
      setBusyId(null);
      setPending(null);
    }
  };

  const IconBtn = ({ title, onClick, danger, disabled, children }: { title: string; onClick: () => void; danger?: boolean; disabled?: boolean; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-40 ${danger ? "text-ink/60 hover:bg-red-50 hover:text-red-600" : "text-ink/60 hover:bg-accent/10 hover:text-accent"}`}
    >
      {children}
    </button>
  );

  const confirmCopy: Record<PendingKind, { title: string; message: string; label: string; tone: "danger" | "primary" | "warning" }> = {
    publish: { title: "Publish this blog?", message: "It becomes Published and goes live on the next build & deploy.", label: "Publish", tone: "primary" },
    archive: { title: "Archive this blog?", message: "It will be hidden from the public site and excluded from the sitemap.", label: "Archive", tone: "warning" },
    unarchive: { title: "Unarchive this blog?", message: "It returns to Draft so you can review and republish.", label: "Unarchive", tone: "primary" },
    delete: { title: "Delete this blog?", message: "This permanently removes the blog and its version history. This cannot be undone.", label: "Delete permanently", tone: "danger" },
  };

  return (
    <AdminLayout
      title="Blogs"
      action={
        <Link to="/admin/blogs/new" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-all hover:bg-ink/90 active:scale-95">
          <Plus size={16} /> Add Blog
        </Link>
      }
    >
      {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      {/* Controls */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_TABS.map((t) => (
            <button key={t.value} onClick={() => setStatus(t.value)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${status === t.value ? "bg-ink text-paper" : "border border-line text-ink/70 hover:border-accent"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none" aria-label="Filter by category">
            <option value="all">All categories</option>
            {categoryNames.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blogs…" className="w-48 rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none sm:w-60" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/50">
              <SortHead label="Title" k="title" />
              <SortHead label="Category" k="category" />
              <SortHead label="Status" k="status" />
              <SortHead label="Publish Date" k="publish" />
              <SortHead label="Last Updated" k="updated" />
              <SortHead label="Created By" k="createdBy" />
              <SortHead label="Read Time" k="readTime" />
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-ink/50">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-ink/50">{blogs.length === 0 ? "No blogs yet. Create your first one." : "No blogs match your filters."}</td></tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="hover:bg-paper/60">
                  <td className="max-w-xs px-4 py-3">
                    <Link to={`/admin/blogs/${b.id}/edit`} className="block truncate font-medium text-ink hover:text-accent">{b.title || "(untitled)"}</Link>
                    <span className="block truncate text-xs text-ink/40">/{b.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{b.category || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-ink/70">{formatDate(publishTs(b))}</td>
                  <td className="px-4 py-3 text-ink/70">{formatDate(b.updatedAt)}</td>
                  <td className="max-w-[10rem] truncate px-4 py-3 text-ink/60" title={b.createdBy}>{b.createdBy || "—"}</td>
                  <td className="px-4 py-3 text-ink/70">{b.readTime || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-0.5">
                      <Link to={`/admin/blogs/${b.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 hover:bg-accent/10 hover:text-accent" title="Edit"><Pencil size={15} /></Link>
                      <IconBtn title="Duplicate" onClick={() => handleDuplicate(b.id!)} disabled={busyId === b.id}><Copy size={15} /></IconBtn>
                      <a href={blogPublicPath(b.slug)} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 hover:bg-accent/10 hover:text-accent" title="Preview (opens public URL)"><Eye size={15} /></a>
                      {b.status !== "published" && <IconBtn title="Publish" onClick={() => setPending({ kind: "publish", blog: b })} disabled={busyId === b.id}><Send size={15} /></IconBtn>}
                      {b.status === "archived" ? (
                        <IconBtn title="Unarchive" onClick={() => setPending({ kind: "unarchive", blog: b })} disabled={busyId === b.id}><ArchiveRestore size={15} /></IconBtn>
                      ) : (
                        <IconBtn title="Archive" onClick={() => setPending({ kind: "archive", blog: b })} disabled={busyId === b.id}><Archive size={15} /></IconBtn>
                      )}
                      <IconBtn title="Delete" onClick={() => setPending({ kind: "delete", blog: b })} disabled={busyId === b.id} danger><Trash2 size={15} /></IconBtn>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink/40">Showing {filtered.length} of {blogs.length} blog{blogs.length === 1 ? "" : "s"}.</p>

      {pending && (
        <ConfirmModal
          open
          title={confirmCopy[pending.kind].title}
          message={<>{confirmCopy[pending.kind].message}<br /><span className="mt-1 block text-xs text-ink/50">“{pending.blog.title || "untitled"}”</span></>}
          confirmLabel={confirmCopy[pending.kind].label}
          tone={confirmCopy[pending.kind].tone}
          busy={busyId === pending.blog.id}
          onConfirm={runPending}
          onCancel={() => setPending(null)}
        />
      )}
    </AdminLayout>
  );
}
