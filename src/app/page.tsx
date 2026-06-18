"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DashboardData, Proposal } from "@/types";
import { ChevronRight, Sparkles, TrendingUp, PlusCircle, FileText, Radar, Send } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [showRefine, setShowRefine] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  const suggestions = ["故宫元素香氛礼盒", "唐三彩书桌摆件", "青花瓷主题文具", "宫廷纹样丝巾系列", "节日限定文创盲盒"];

  async function generateCustom() {
    if (!customPrompt.trim()) return;
    const res = await fetch("/api/proposals/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requirement: customPrompt }),
    });
    if (res.ok) {
      const p = await res.json();
      router.push(`/workbench/${p.id}`);
    }
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-serif">文创机会仪表盘</h1>
        <p className="text-ink-500 mt-1">今日 Top3 提案机会 · 快速生成自定义提案</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today Top3 */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif flex items-center gap-2">
              <TrendingUp size={20} className="text-palace-600" />
              今日 Top3 提案机会
            </h2>
            <div className="space-y-4">
              {data.top3.map((proposal: Proposal) => (
                <div key={proposal.id} className="flex items-center justify-between p-4 bg-ink-50 rounded-lg hover:bg-palace-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`tag text-xs ${proposal.type === "system" ? "bg-palace-100 text-palace-700" : "bg-ink-200 text-ink-600"}`}>
                        {proposal.type === "system" ? "系统推荐" : "自定义"}
                      </span>
                      <span className="text-xs text-ink-400">{proposal.status === "completed" ? "已完成" : proposal.status === "in_progress" ? "进行中" : "草稿"}</span>
                    </div>
                    <h3 className="font-medium text-ink-800 truncate">{proposal.title}</h3>
                    <p className="text-sm text-ink-500 mt-0.5">综合评分 {proposal.score} · v{proposal.version}</p>
                  </div>
                  <button onClick={() => router.push(`/workbench/${proposal.id}`)} className="btn-palace text-sm whitespace-nowrap ml-4">
                    打开提案
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: ZiXiaoyi Panel */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif flex items-center gap-2">
              <Sparkles size={20} className="text-palace-600" />
              紫小艺策划
            </h2>
            <textarea
              className="input-field mb-3 resize-none"
              rows={3}
              placeholder="描述你的文创方向需求..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <div className="flex flex-wrap gap-1.5 mb-3">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setCustomPrompt(s)} className="tag hover:bg-palace-100 cursor-pointer transition-colors">
                  {s}
                </button>
              ))}
            </div>
            <button onClick={generateCustom} className="btn-palace w-full flex items-center justify-center gap-2">
              <Send size={16} /> 生成自定义提案
            </button>
            <button onClick={() => setShowRefine(!showRefine)} className="btn-outline w-full mt-2 text-sm text-center">
              点击完善方向
            </button>
          </div>
        </div>
      </div>

      {/* Refine Panel */}
      {showRefine && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-ink-800 font-serif">完善方向</h2>
            <button onClick={() => setShowRefine(false)} className="text-ink-400 hover:text-ink-600 text-sm">关闭</button>
          </div>
          <RefineForm onClose={() => setShowRefine(false)} />
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif">快速入口</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { href: "/top10", label: "Top10 趋势", icon: TrendingUp, desc: "近7天滚动榜单" },
            { href: "/opportunities", label: "机会池", icon: Sparkles, desc: "文创机会浏览" },
            { href: "/artifacts/new", label: "录入藏品", icon: PlusCircle, desc: "素材录入管理" },
            { href: "/proposals", label: "已生成提案", icon: FileText, desc: "提案列表" },
            { href: "/radar", label: "全球审美雷达", icon: Radar, desc: "市场信号监测" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="card p-5 hover:shadow-md transition-shadow group">
              <item.icon size={28} className="text-palace-600 mb-3" />
              <h3 className="font-medium text-ink-800 group-hover:text-palace-700 transition-colors">{item.label}</h3>
              <p className="text-xs text-ink-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* System Metrics */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif">系统运行概览</h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { label: "今日 Top3 已上榜", value: data.systemMetrics.top3Count },
            { label: "协作中", value: data.systemMetrics.collaborating },
            { label: "持续接入", value: data.systemMetrics.connected },
            { label: "持续观察", value: data.systemMetrics.observing },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-bold text-palace-600">{m.value}</div>
              <div className="text-xs text-ink-500 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-ink-400 pb-4">
        故宫文化 × 人工智能 · 让文物活起来，让文化走出去 · v1.0.18
      </div>
    </div>
  );
}

function RefineForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    requirement: "",
    targetAudience: "不限",
    category: "不限",
    priceRange: "不限",
    style: "不限",
    copyFocus: "不限",
  });
  const router = useRouter();

  const selectClass = "input-field text-sm py-2";

  async function handleSubmit() {
    const res = await fetch("/api/proposals/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const p = await res.json();
      onClose();
      router.push(`/workbench/${p.id}`);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-ink-700 mb-1">一句话需求</label>
        <textarea className="input-field resize-none" rows={2} maxLength={500} placeholder="描述你的文创需求..."
          value={form.requirement} onChange={(e) => setForm({ ...form, requirement: e.target.value })} />
        <p className="text-xs text-ink-400 mt-1">{form.requirement.length}/500</p>
      </div>
      {[
        { label: "目标客群", key: "targetAudience", options: ["年轻客群", "亲子家庭", "高端礼赠", "文创爱好者", "不限"] },
        { label: "品类偏好", key: "category", options: ["香氛礼盒", "生活用品", "随身香囊", "礼盒套装", "不限"] },
        { label: "价格带偏好", key: "priceRange", options: ["入门", "中端", "高端礼品", "收藏级", "不限"] },
        { label: "风格关键词", key: "style", options: ["清新雅致", "国潮鲜明", "宫廷华贵", "节庆限定", "不限"] },
        { label: "文案侧重点", key: "copyFocus", options: ["文化叙事", "产品落地", "市场卖点", "不限"] },
      ].map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-ink-700 mb-1">{field.label}</label>
          <select className={selectClass} value={(form as any)[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}>
            {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      ))}
      <div className="md:col-span-2 flex justify-end">
        <button onClick={handleSubmit} className="btn-palace">生成定制提案</button>
      </div>
    </div>
  );
}


