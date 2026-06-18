import { NextResponse } from "next/server";
import { proposals } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(proposals);
}
