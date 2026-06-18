"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <>
      {!isLogin && <Navbar />}
      <main className={isLogin ? "" : "max-w-7xl mx-auto px-6 py-6"}>{children}</main>
    </>
  );
}
