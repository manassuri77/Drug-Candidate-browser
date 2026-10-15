import type { DrugStatus } from "@/lib/types";

const COLORS: Record<DrugStatus, string> = {
  Approved: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  "Phase III": "bg-sky-100 text-sky-800 ring-sky-600/20",
  "In Development": "bg-amber-100 text-amber-800 ring-amber-600/20",
  Discontinued: "bg-rose-100 text-rose-800 ring-rose-600/20",
};

export function StatusBadge({ status }: { status: DrugStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${COLORS[status]}`}
    >
      {status}
    </span>
  );
}
