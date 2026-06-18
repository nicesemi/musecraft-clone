import { NextResponse } from "next/server";
import { proposals } from "@/lib/mock-data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const proposal = proposals.find((p) => p.id === id);
  if (!proposal) {
    return NextResponse.json({ error: "提案未找到" }, { status: 404 });
  }
  return NextResponse.json(proposal);
}
