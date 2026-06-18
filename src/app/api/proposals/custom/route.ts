import { NextResponse } from "next/server";
import { proposals } from "@/lib/mock-data";

let customIdCounter = 100;

export async function POST(request: Request) {
  const body = await request.json();
  const title = body.requirement || "自定义提案";
  const newProposal = {
    ...proposals[0],
    id: customIdCounter++,
    title,
    type: "custom" as const,
    status: "draft" as const,
    version: "v1.0",
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    score: 7.5,
  };
  proposals.push(newProposal);
  return NextResponse.json(newProposal);
}
