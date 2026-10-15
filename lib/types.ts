export type DrugStatus = "In Development" | "Approved" | "Phase III" | "Discontinued";

export interface DrugCandidate {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
  indication: string;
  developer: string;
  phase: string;
}

export interface DrugCandidateSummary {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
