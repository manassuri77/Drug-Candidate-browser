import Link from "next/link";
import type { DrugCandidateSummary } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function CandidateCard({ candidate }: { candidate: DrugCandidateSummary }) {
  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-700">
          {candidate.name}
        </h2>
        <StatusBadge status={candidate.status} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{candidate.description}</p>
      <span className="mt-3 inline-block text-sm font-medium text-indigo-600 group-hover:underline">
        View details →
      </span>
    </Link>
  );
}
