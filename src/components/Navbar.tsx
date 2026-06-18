"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "仪表盘" },
  { href: "/top10", label: "Top10 趋势" },
  { href: "/opportunities", label: "机会池" },
  { href: "/artifacts/new", label: "录入藏品" },
  { href: "/proposals", label: "已生成提案" },
  { href: "/radar", label: "全球审美雷达" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-ink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-palace-600 flex items-center justify-center text-white text-sm font-bold">宫</div>
          <span className="text-lg font-bold text-ink-900 font-serif">故宫 AI 造办局</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === item.href
                  ? "bg-palace-100 text-palace-700 font-medium"
                  : "text-ink-600 hover:bg-ink-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <form action="/api/auth/logout" method="POST" className="ml-3">
            <button type="submit" className="px-3 py-1.5 text-sm text-ink-500 hover:text-ink-700 transition-colors">
              退出登录
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
