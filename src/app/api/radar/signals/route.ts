import { NextResponse } from "next/server";
import { marketSignals } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(marketSignals);
}
