import { NextRequest, NextResponse } from "next/server";
import { listDrugCandidates } from "@/lib/drugs";
import type { DrugStatus } from "@/lib/types";

/**
 * GET /api/candidates?search=&status=&page=&pageSize=
 * Server-side filter + paginate; the client only ever receives one page.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const result = await listDrugCandidates({
    search: sp.get("search") ?? undefined,
    status: (sp.get("status") as DrugStatus) ?? undefined,
    page: Number(sp.get("page")) || 1,
    pageSize: Number(sp.get("pageSize")) || 9,
  });
  return NextResponse.json(result);
}
