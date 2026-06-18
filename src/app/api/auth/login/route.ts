import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (username === "soulshell" && password === "SoulShell001!") {
    cookies().set("musecraft_auth", "authenticated", { path: "/", maxAge: 86400, httpOnly: true, sameSite: "lax" });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
}
