"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ page, totalPages, total }: { page: number; totalPages: number; total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    router.push(`/?${params.toString()}`);
  };

  if (totalPages <= 1) return <p className="mt-6 text-sm text-slate-500">{total} result{total === 1 ? "" : "s"}</p>;

  return (
    <nav className="mt-6 flex items-center justify-between" aria-label="Pagination">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages} · {total} results
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>
        <button
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </nav>
  );
}
