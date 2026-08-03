import type { Timestamp } from "@/lib/time";

/** Format a Firestore Timestamp as e.g. "Jul 31, 2026". Returns "—" if null. */
export function formatDate(ts: Timestamp | null | undefined): string {
  if (!ts) return "—";
  const d = ts.toDate();
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Format a Firestore Timestamp with time, e.g. "Jul 31, 2026, 2:30 PM". */
export function formatDateTime(ts: Timestamp | null | undefined): string {
  if (!ts) return "—";
  const d = ts.toDate();
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** For a datetime-local input value (yyyy-MM-ddThh:mm) from a Timestamp. */
export function toDateTimeLocal(ts: Timestamp | null | undefined): string {
  if (!ts) return "";
  const d = ts.toDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
