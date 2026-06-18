"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { MarketSignal } from "@/types";
import { ArrowLeft, Radar, ExternalLink, Tag } from "lucide-react";

export default function RadarPage() {
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [activeTag, setActiveTag] = useState("全部");

  useEffect(() => {
    fetch("/api/radar/signals").then((r) => r.json()).then(setSignals);
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    signals.forEach((s) => s.tags.forEach((t) => tagSet.add(t)));
    return ["全部", ...Array.from(tagSet)];
  }, [signals]);

  const filtered = activeTag === "全部" ? signals : signals.filter((s) => s.tags.includes(activeTag));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-ink-500 hover:text-ink-700 transition-colors flex items-center gap-1">
          <ArrowLeft size={16} /> 返回首页
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-serif flex items-center gap-2">
          <Radar size={24} className="text-palace-600" />
          全球审美雷达
        </h1>
        <p className="text-ink-500 mt-1">{signals.length} 条市场信号 · 实时监测文创趋势</p>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className={`tag text-xs cursor-pointer transition-colors ${activeTag === tag ? "tag-active" : "hover:bg-ink-200"}`}>
            {tag}
          </button>
        ))}
      </div>

      {/* Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((signal) => (
          <div key={signal.id} className="card p-5 space-y-3 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-ink-800 line-clamp-2">{signal.title}</h3>
            <p className="text-sm text-ink-600 line-clamp-2">{signal.summary}</p>
            <div className="flex flex-wrap gap-1">
              {signal.tags.map((t) => <span key={t} className="tag text-xs">{t}</span>)}
            </div>
            <div className="flex items-center justify-between text-xs text-ink-500 pt-2 border-t border-ink-100">
              <span>来源：{signal.source}</span>
              <a href={signal.url} target="_blank" rel="noopener noreferrer" className="text-palace-600 hover:text-palace-800 flex items-center gap-1">
                查看溯源详情 <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
