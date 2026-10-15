import { describe, it, expect } from "vitest";
import { listDrugCandidates, getDrugCandidate, listStatuses } from "@/lib/drugs";

describe("listDrugCandidates", () => {
  it("returns a paginated page of summaries", async () => {
    const res = await listDrugCandidates({ page: 1, pageSize: 5 });
    expect(res.items).toHaveLength(5);
    expect(res.total).toBeGreaterThan(5);
    expect(res.page).toBe(1);
    expect(res.items[0]).not.toHaveProperty("mechanismOfAction");
  });

  it("filters by name case-insensitively", async () => {
    const res = await listDrugCandidates({ search: "verapimod" });
    expect(res.total).toBe(1);
    expect(res.items[0].name).toBe("Verapimod");
  });

  it("filters by status", async () => {
    const res = await listDrugCandidates({ status: "Approved", pageSize: 50 });
    expect(res.items.every((i) => i.status === "Approved")).toBe(true);
  });

  it("combines search + status", async () => {
    const res = await listDrugCandidates({ search: "vera", status: "Approved" });
    expect(res.total).toBe(1);
  });

  it("clamps out-of-range pages", async () => {
    const res = await listDrugCandidates({ page: 999, pageSize: 5 });
    expect(res.page).toBe(res.totalPages);
  });
});

describe("getDrugCandidate", () => {
  it("returns the full record", async () => {
    const drug = await getDrugCandidate("dc-001");
    expect(drug?.mechanismOfAction).toBeTruthy();
    expect(drug?.sideEffects.length).toBeGreaterThan(0);
  });

  it("returns null for an unknown id", async () => {
    expect(await getDrugCandidate("nope")).toBeNull();
  });
});

describe("listStatuses", () => {
  it("returns unique sorted statuses", async () => {
    const statuses = await listStatuses();
    expect(statuses).toEqual([...statuses].sort());
    expect(statuses).toContain("Approved");
  });
});
