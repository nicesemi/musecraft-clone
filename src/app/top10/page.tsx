"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TrendItem } from "@/types";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function Top10Page() {
  const [items, setItems] = useState<TrendItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/trends/top10").then((r) => r.json()).then(setItems);
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-ink-500 hover:text-ink-700 transition-colors flex items-center gap-1">
          <ArrowLeft size={16} /> 返回首页
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-serif flex items-center gap-2">
          <TrendingUp size={24} className="text-palace-600" />
          Top10 趋势
        </h1>
        <p className="text-ink-500 mt-1">近 7 天滚动榜单 · 系统自动评估推荐</p>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="card p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-palace-100 flex items-center justify-center">
              <span className={`text-lg font-bold ${idx < 3 ? "text-palace-600" : "text-ink-500"}`}>{idx + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-ink-800">{item.title}</h3>
              <p className="text-sm text-ink-500 mt-0.5">{item.summary}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-palace-600">{item.score}</div>
              <div className="text-xs text-ink-400">综合评分</div>
            </div>
            {item.proposalId > 0 && (
              <button onClick={() => router.push(`/workbench/${item.proposalId}`)} className="btn-palace text-sm whitespace-nowrap">
                打开提案
              </button>
            )}
            {item.proposalId === 0 && (
              <button onClick={async () => {
                const res = await fetch("/api/proposals/custom", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requirement: item.title }) });
                if (res.ok) { const p = await res.json(); router.push(`/workbench/${p.id}`); }
              }} className="btn-palace text-sm whitespace-nowrap">
                一键生成提案
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
