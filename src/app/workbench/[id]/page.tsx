"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Proposal, ProposalSection } from "@/types";
import {
  ArrowLeft, ChevronDown, ChevronRight, Download, Edit3, Maximize2,
  MessageCircle, Send, Paperclip, Users, History, PanelLeftClose
} from "lucide-react";

export default function WorkbenchPage() {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [showExperts, setShowExperts] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "你好！我是紫小艺，你的 AI 文创策划助手。我可以帮你分析提案、优化方案、回答文创相关问题。试试输入 /帮助 查看可用技能。" },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch(`/api/workbench/${id}`).then((r) => r.json()).then(setProposal);
  }, [id]);

  if (!proposal) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ink-500">加载中...</p>
      </div>
    );
  }

  function toggleSection(idx: number) {
    const next = new Set(expandedSections);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setExpandedSections(next);
  }

  function sendChat() {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        role: "assistant",
        content: chatInput.startsWith("/") ? `已收到技能指令 "${chatInput}"，正在为您分析...（这是模拟响应，实际部署时将对接真实 AI 后端）` : `关于"${chatInput}"，建议参考提案第3章市场洞察中的竞品分析数据，同时结合第7章定价模型来综合判断。（模拟响应）`
      }]);
    }, 600);
  }

  const statusLabel = (s: string) => s === "completed" ? "已完成" : s === "in_progress" ? "进行中" : "草稿";
  const typeLabel = (t: string) => t === "system" ? "系统推荐" : t === "custom" ? "用户自定义" : "其他来源";

  return (
    <div className="flex gap-6 h-[calc(100vh-5rem)]">
      {/* Sidebar */}
      <div className={`flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? "w-10" : "w-56"}`}>
        <div className="card p-4 sticky top-20">
          <div className="flex items-center justify-between mb-4">
            {!sidebarCollapsed && <h3 className="text-sm font-semibold text-ink-700 font-serif">提案大纲</h3>}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-ink-400 hover:text-ink-600">
              <PanelLeftClose size={16} />
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="space-y-1">
              {proposal.sections.map((s, idx) => (
                <button key={idx} onClick={() => {
                  setExpandedSections(new Set([idx]));
                  document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors truncate ${expandedSections.has(idx) ? "bg-palace-100 text-palace-700 font-medium" : "text-ink-600 hover:bg-ink-50"}`}>
                  {String(idx + 1).padStart(2, "0")} {s.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Toolbar */}
        <div className="flex items-center justify-between sticky top-0 bg-ink-50 z-10 py-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-ink-500 hover:text-ink-700 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-ink-900 font-serif">{proposal.title}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="tag text-xs">{typeLabel(proposal.type)}</span>
                <span className={`tag text-xs ${proposal.status === "completed" ? "bg-green-100 text-green-700" : proposal.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-ink-200 text-ink-600"}`}>{statusLabel(proposal.status)}</span>
                <span className="text-xs text-ink-400">评分 {proposal.score} · v{proposal.version}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-outline text-sm flex items-center gap-1"><Download size={14} /> 导出提案</button>
            <button onClick={() => setShowExperts(!showExperts)}
              className={`btn-outline text-sm flex items-center gap-1 ${showExperts ? "bg-palace-100 border-palace-300" : ""}`}>
              <Users size={14} /> 专家工作台
            </button>
          </div>
        </div>

        {/* Experts Panel */}
        {showExperts && (
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-ink-700 mb-3 font-serif">AI 专家团队</h3>
            <div className="grid grid-cols-4 gap-3">
              {proposal.experts.map((expert) => (
                <div key={expert.role} className="flex items-center gap-2 p-2 bg-ink-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${expert.status === "working" ? "bg-green-500" : "bg-ink-300"}`} />
                  <div>
                    <div className="text-xs font-medium text-ink-700">{expert.name}</div>
                    <div className="text-xs text-ink-400">{expert.status === "working" ? "工作中" : "待命"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections */}
        {proposal.sections.map((section, idx) => (
          <div key={idx} id={`section-${idx}`} className="card overflow-hidden">
            <button onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between p-5 hover:bg-ink-50 transition-colors text-left">
              <div>
                <span className="text-xs text-palace-600 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-ink-800 font-serif mt-0.5">{section.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-outline text-xs flex items-center gap-1"><Edit3 size={12} /> 编辑本节</button>
                {expandedSections.has(idx) ? <ChevronDown size={20} className="text-ink-400" /> : <ChevronRight size={20} className="text-ink-400" />}
              </div>
            </button>
            {expandedSections.has(idx) && (
              <div className="px-5 pb-5 space-y-3 border-t border-ink-100 pt-4">
                <p className="text-sm text-ink-700 leading-relaxed">{section.content}</p>
                {section.subSections?.map((sub, si) => (
                  <div key={si} className="bg-ink-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-ink-700 mb-1">{sub.title}</h4>
                    <p className="text-xs text-ink-600 whitespace-pre-line">{sub.content}</p>
                  </div>
                ))}
                {/* Product Design Four Images */}
                {idx === 4 && (
                  <div className="grid grid-cols-4 gap-3 mt-3">
                    {["主视觉", "细节工艺", "包装开箱", "生活场景"].map((label) => (
                      <div key={label} className="bg-gradient-to-br from-palace-100 to-ink-100 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">
                          {label === "主视觉" ? "🏺" : label === "细节工艺" ? "🔍" : label === "包装开箱" ? "📦" : "🏠"}
                        </div>
                        <p className="text-xs text-ink-600 mb-2">{label}</p>
                        <button className="text-xs text-palace-600 hover:text-palace-800 flex items-center gap-1 mx-auto">
                          <Maximize2 size={12} /> 放大查看
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* BOM Table for pricing section */}
                {idx === 6 && (
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-ink-100">
                          <th className="p-2 text-left">物料项</th><th className="p-2 text-right">单价</th><th className="p-2 text-right">占比</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-ink-100"><td className="p-2">主材</td><td className="p-2 text-right">¥45</td><td className="p-2 text-right">35%</td></tr>
                        <tr className="border-b border-ink-100"><td className="p-2">工艺加工</td><td className="p-2 text-right">¥38</td><td className="p-2 text-right">30%</td></tr>
                        <tr className="border-b border-ink-100"><td className="p-2">包装</td><td className="p-2 text-right">¥22</td><td className="p-2 text-right">17%</td></tr>
                        <tr className="border-b border-ink-100"><td className="p-2">品控</td><td className="p-2 text-right">¥8</td><td className="p-2 text-right">6%</td></tr>
                        <tr><td className="p-2">履约</td><td className="p-2 text-right">¥15</td><td className="p-2 text-right">12%</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Supply Chain Gantt for section 9 */}
                {idx === 8 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-ink-700 mb-2">生产周期（50天甘特图）</h4>
                    <div className="space-y-2">
                      {[
                        { label: "打样确认", start: 0, duration: 15, color: "bg-palace-400" },
                        { label: "模具开发", start: 10, duration: 10, color: "bg-palace-500" },
                        { label: "批量生产", start: 20, duration: 25, color: "bg-palace-600" },
                        { label: "质检包装", start: 40, duration: 10, color: "bg-palace-700" },
                      ].map((bar) => (
                        <div key={bar.label} className="flex items-center gap-3">
                          <span className="text-xs text-ink-600 w-16 flex-shrink-0">{bar.label}</span>
                          <div className="flex-1 h-5 bg-ink-100 rounded-full overflow-hidden relative">
                            <div className={`h-full rounded-full ${bar.color}`}
                              style={{ marginLeft: `${(bar.start / 50) * 100}%`, width: `${(bar.duration / 50) * 100}%` }} />
                          </div>
                          <span className="text-xs text-ink-400 w-20 text-right">D{bar.start + 1}-D{bar.start + bar.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Risk Matrix for section 9 */}
                {idx === 8 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-ink-700 mb-2">供应链风险矩阵</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "物料风险", level: "低", color: "bg-green-100 text-green-700" },
                        { name: "质量风险", level: "中", color: "bg-yellow-100 text-yellow-700" },
                        { name: "物流风险", level: "低", color: "bg-green-100 text-green-700" },
                      ].map((r) => (
                        <div key={r.name} className={`p-2 rounded-lg text-center ${r.color}`}>
                          <div className="text-xs font-medium">{r.name}</div>
                          <div className="text-xs">{r.level}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Panel */}
      <div className="w-80 flex-shrink-0">
        <div className="card h-full flex flex-col sticky top-20" style={{ maxHeight: "calc(100vh - 6rem)" }}>
          <div className="p-4 border-b border-ink-100 flex items-center gap-2">
            <MessageCircle size={18} className="text-palace-600" />
            <h3 className="font-semibold text-ink-800 font-serif text-sm">紫小艺</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${msg.role === "user" ? "bg-palace-600 text-white" : "bg-ink-100 text-ink-800"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-ink-100">
            <div className="flex items-center gap-2 mb-2">
              <button className="text-ink-400 hover:text-ink-600"><Paperclip size={16} /></button>
            </div>
            <div className="flex items-center gap-2">
              <input type="text" className="input-field py-2 text-sm" placeholder="输入消息或 /技能指令..."
                value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }} />
              <button onClick={sendChat} className="p-2 bg-palace-600 text-white rounded-lg hover:bg-palace-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
