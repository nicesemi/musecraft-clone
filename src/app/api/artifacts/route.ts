import { NextResponse } from "next/server";
import { artifacts } from "@/lib/mock-data";

let localArtifacts = [...artifacts];

export async function GET() {
  return NextResponse.json(localArtifacts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newArtifact = {
    id: localArtifacts.length + 1,
    name: body.name,
    dynasty: body.dynasty,
    description: body.description || "",
    imageUrl: body.imageUrl || "",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  localArtifacts.push(newArtifact);
  return NextResponse.json(newArtifact);
}
