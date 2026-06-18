"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Opportunity } from "@/types";
import { ArrowLeft, Sparkles, Filter, ArrowUpDown } from "lucide-react";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState<"all" | "ready" | "pending">("all");
  const [sortByScore, setSortByScore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/opportunities").then((r) => r.json()).then(setOpportunities);
  }, []);

  let filtered = opportunities;
  if (filter === "ready") filtered = filtered.filter((o) => o.status === "ready");
  if (filter === "pending") filtered = filtered.filter((o) => o.status === "pending");
  if (sortByScore) filtered = [...filtered].sort((a, b) => b.score - a.score);

  const readyCount = opportunities.filter((o) => o.status === "ready").length;
  const pendingCount = opportunities.filter((o) => o.status === "pending").length;

  async function generateProposal(opp: Opportunity) {
    const res = await fetch("/api/proposals/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requirement: `${opp.artifactName} × ${opp.category}` }),
    });
    if (res.ok) {
      const p = await res.json();
      router.push(`/workbench/${p.id}`);
    }
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
          <Sparkles size={24} className="text-palace-600" />
          机会池
        </h1>
        <p className="text-ink-500 mt-1">浏览今日文创机会 · 一键生成提案</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-white rounded-lg border border-ink-200 p-1">
          {[
            { key: "all", label: `全部 ${opportunities.length}` },
            { key: "ready", label: `可立即生成 ${readyCount}` },
            { key: "pending", label: `暂未达条件 ${pendingCount}` },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key as any)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${filter === f.key ? "bg-palace-600 text-white" : "text-ink-600 hover:bg-ink-100"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => setSortByScore(!sortByScore)}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border transition-colors ${sortByScore ? "bg-palace-100 border-palace-300 text-palace-700" : "border-ink-200 text-ink-600 hover:bg-ink-50"}`}>
          <ArrowUpDown size={14} /> 按评分排序
        </button>
      </div>

      {/* Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((opp) => (
          <div key={opp.id} className="card p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-ink-800">{opp.artifactName}</h3>
                <p className="text-xs text-ink-500">来源馆藏 · ID: {opp.artifactId}</p>
              </div>
              <span className={`tag text-xs ${opp.status === "ready" ? "bg-green-100 text-green-700" : "bg-ink-200 text-ink-500"}`}>
                {opp.status === "ready" ? "可立即生成" : "暂未达条件"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-ink-500">综合评分</span>
                <span className="font-bold text-palace-600">{opp.score}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {opp.signals.map((s) => <span key={s} className="tag text-xs">{s}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-ink-600 bg-ink-50 rounded-lg p-3">
              <div><span className="text-ink-400">品类：</span>{opp.category}</div>
              <div><span className="text-ink-400">人群：</span>{opp.targetAudience}</div>
              <div><span className="text-ink-400">场景：</span>{opp.scenario}</div>
              <div><span className="text-ink-400">渠道：</span>{opp.channel}</div>
              <div className="col-span-2"><span className="text-ink-400">价位：</span>{opp.priceRange}</div>
            </div>
            <button onClick={() => generateProposal(opp)} disabled={opp.status !== "ready"}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${opp.status === "ready" ? "btn-palace" : "bg-ink-100 text-ink-400 cursor-not-allowed"}`}>
              一键生成提案
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
