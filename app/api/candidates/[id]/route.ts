import { NextRequest, NextResponse } from "next/server";
import { getDrugCandidate } from "@/lib/drugs";

/** GET /api/candidates/:id — full detail record for one candidate. */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const drug = await getDrugCandidate(id);
  if (!drug) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(drug);
}
