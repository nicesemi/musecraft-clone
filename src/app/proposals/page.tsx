"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Proposal } from "@/types";
import { ArrowLeft, FileText, Search, Filter, ArrowUpDown } from "lucide-react";

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/proposals").then((r) => r.json()).then(setProposals);
  }, []);

  let filtered = proposals;
  if (filter === "system") filtered = filtered.filter((p) => p.type === "system");
  if (filter === "custom") filtered = filtered.filter((p) => p.type === "custom");
  if (filter === "other") filtered = filtered.filter((p) => p.type === "other");
  if (statusFilter === "completed") filtered = filtered.filter((p) => p.status === "completed");
  if (statusFilter === "in_progress") filtered = filtered.filter((p) => p.status === "in_progress");
  if (statusFilter === "draft") filtered = filtered.filter((p) => p.status === "draft");
  if (search) filtered = filtered.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  if (sort === "newest") filtered = [...filtered].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  if (sort === "oldest") filtered = [...filtered].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  if (sort === "score") filtered = [...filtered].sort((a, b) => b.score - a.score);

  const statusLabel = (s: string) => s === "completed" ? "已完成" : s === "in_progress" ? "进行中" : "草稿";
  const typeLabel = (t: string) => t === "system" ? "系统推荐" : t === "custom" ? "用户自定义" : "其他来源";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-ink-500 hover:text-ink-700 transition-colors flex items-center gap-1">
          <ArrowLeft size={16} /> 返回首页
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-serif flex items-center gap-2">
          <FileText size={24} className="text-palace-600" />
          已生成提案
        </h1>
        <p className="text-ink-500 mt-1">浏览所有已生成的提案 · 支持搜索、筛选、排序</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input type="text" className="input-field pl-10 py-2" placeholder="搜索提案..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1 bg-white border border-ink-200 rounded-lg p-1">
          {[
            { key: "all", label: "全部" },
            { key: "system", label: "系统机会提案" },
            { key: "custom", label: "用户自定义提案" },
            { key: "other", label: "其他来源" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${filter === f.key ? "bg-palace-600 text-white" : "text-ink-600 hover:bg-ink-100"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <select className="input-field w-auto py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">全部状态</option>
          <option value="completed">已完成</option>
          <option value="in_progress">进行中</option>
          <option value="draft">草稿</option>
        </select>
        <select className="input-field w-auto py-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">最近更新</option>
          <option value="oldest">最早更新</option>
          <option value="score">按评分</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="card overflow-hidden hover:shadow-md transition-shadow cursor-pointer group" onClick={() => router.push(`/workbench/${p.id}`)}>
            <div className="h-32 bg-gradient-to-br from-palace-100 to-ink-100 flex items-center justify-center">
              <span className="text-4xl">🏺</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`tag text-xs ${p.type === "system" ? "bg-palace-100 text-palace-700" : "bg-ink-200 text-ink-600"}`}>{typeLabel(p.type)}</span>
                <span className={`tag text-xs ${p.status === "completed" ? "bg-green-100 text-green-700" : p.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-ink-200 text-ink-600"}`}>{statusLabel(p.status)}</span>
              </div>
              <h3 className="font-medium text-ink-800 group-hover:text-palace-700 transition-colors line-clamp-2">{p.title}</h3>
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span>评分 {p.score}</span>
                <span>v{p.version}</span>
              </div>
              <div className="text-xs text-ink-400">
                {p.updatedAt} 更新
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
