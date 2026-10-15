import "server-only";
import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import type {
  DrugCandidate,
  DrugCandidateSummary,
  PaginatedResult,
  DrugStatus,
} from "./types";

/**
 * Data-access layer for drug candidates.
 *
 * Deliberately keeps ALL querying server-side so the client never holds the
 * full dataset: the same `list` contract (filters + pagination) works
 * unchanged if the JSON file is swapped for a real API or database later.
 */

const DATA_FILE = path.join(process.cwd(), "data", "drugs.json");

/** Load the dataset once per process (React `cache` dedupes within a render). */
const loadAll = cache(async (): Promise<DrugCandidate[]> => {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as DrugCandidate[];
});

export interface ListParams {
  /** Case-insensitive substring match on `name`. */
  search?: string;
  /** Exact status filter. */
  status?: DrugStatus;
  /** 1-based page index. */
  page?: number;
  pageSize?: number;
}

const toSummary = ({ id, name, status, description }: DrugCandidate): DrugCandidateSummary => ({
  id,
  name,
  status,
  description,
});

export async function listDrugCandidates(
  params: ListParams = {}
): Promise<PaginatedResult<DrugCandidateSummary>> {
  const { search = "", status, page = 1, pageSize = 9 } = params;

  const all = await loadAll();
  const needle = search.trim().toLowerCase();

  const filtered = all.filter(
    (d) =>
      (!needle || d.name.toLowerCase().includes(needle)) &&
      (!status || d.status === status)
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = filtered
    .slice((safePage - 1) * pageSize, safePage * pageSize)
    .map(toSummary);

  return { items, total, page: safePage, pageSize, totalPages };
}

export async function getDrugCandidate(id: string): Promise<DrugCandidate | null> {
  const all = await loadAll();
  return all.find((d) => d.id === id) ?? null;
}

export async function listStatuses(): Promise<DrugStatus[]> {
  const all = await loadAll();
  return [...new Set(all.map((d) => d.status))].sort();
}
