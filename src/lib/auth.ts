import { cookies } from "next/headers";

const AUTH_COOKIE = "musecraft_auth";

export function getAuth(): boolean {
  const cookieStore = cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "authenticated";
}

export function setAuthCookie() {
  // In a real app, use httpOnly secure cookie; simplified for demo
  cookies().set(AUTH_COOKIE, "authenticated", { path: "/", maxAge: 86400, httpOnly: true, sameSite: "lax" });
}
