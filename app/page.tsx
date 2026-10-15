import { Suspense } from "react";
import { listDrugCandidates, listStatuses } from "@/lib/drugs";
import type { DrugStatus } from "@/lib/types";
import { CandidateCard } from "@/components/CandidateCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Pagination } from "@/components/Pagination";

interface HomeProps {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search, status, page } = await searchParams;

  // Filtering + pagination happen server-side; only one page of data is rendered.
  const [result, statuses] = await Promise.all([
    listDrugCandidates({
      search,
      status: status as DrugStatus | undefined,
      page: Number(page) || 1,
    }),
    listStatuses(),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Drug candidates</h1>
        <p className="mt-1 text-sm text-slate-600">
          Search and filter the development pipeline.
        </p>
      </div>

      <Suspense fallback={null}>
        <SearchFilters statuses={statuses} />
      </Suspense>

      {result.items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-500">No candidates match your filters.</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((c) => (
            <li key={c.id}>
              <CandidateCard candidate={c} />
            </li>
          ))}
        </ul>
      )}

      <Suspense fallback={null}>
        <Pagination page={result.page} totalPages={result.totalPages} total={result.total} />
      </Suspense>
    </div>
  );
}
