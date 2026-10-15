"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@/lib/useDebouncedCallback";
import type { DrugStatus } from "@/lib/types";

/**
 * Controlled inputs synced to the URL query string. Filters live in the URL
 * so results are shareable, SSR-rendered, and preserved on back/forward.
 */
export function SearchFilters({ statuses }: { statuses: DrugStatus[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // reset pagination on new filter
    router.push(`/?${params.toString()}`);
  };

  // Debounce keystrokes so each letter doesn't trigger a navigation/fetch.
  const debouncedSearch = useDebouncedCallback((value: string) => update("search", value), 300);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <label htmlFor="search" className="sr-only">
          Search by name
        </label>
        <input
          id="search"
          type="search"
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search candidates by name…"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <div>
        <label htmlFor="status" className="sr-only">
          Filter by status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => update("status", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-52"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
