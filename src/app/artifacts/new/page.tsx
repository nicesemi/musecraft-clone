"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Artifact } from "@/types";
import { ArrowLeft, PlusCircle, Upload, ExternalLink } from "lucide-react";

export default function ArtifactsNewPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [form, setForm] = useState({ name: "", dynasty: "", description: "", imageUrl: "" });
  const [parsing, setParsing] = useState(false);

  useEffect(() => {
    fetch("/api/artifacts").then((r) => r.json()).then(setArtifacts);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setParsing(true);
    const res = await fetch("/api/artifacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newArtifact = await res.json();
      setArtifacts([...artifacts, newArtifact]);
      setForm({ name: "", dynasty: "", description: "", imageUrl: "" });
    }
    setParsing(false);
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
          <PlusCircle size={24} className="text-palace-600" />
          录入藏品
        </h1>
        <p className="text-ink-500 mt-1">录入新藏品素材 · 由 AI 自动解析文物特征</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif">藏品信息录入</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">文物名称</label>
              <input type="text" className="input-field" placeholder="例如：三彩马" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">朝代/年代</label>
              <input type="text" className="input-field" placeholder="例如：唐" value={form.dynasty}
                onChange={(e) => setForm({ ...form, dynasty: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">藏品图片链接</label>
              <input type="text" className="input-field" placeholder="输入图片URL地址" value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1">文物描述 <span className="text-ink-400">(选填)</span></label>
              <textarea className="input-field resize-none" rows={3} placeholder="补充描述文物的历史背景、工艺特征等..." value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <button type="submit" disabled={parsing} className="btn-palace w-full flex items-center justify-center gap-2">
              <Upload size={16} /> {parsing ? "AI 解析中..." : "开始解析"}
            </button>
          </form>
        </div>

        {/* Artifact List */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-ink-800 mb-4 font-serif">已录入藏品 ({artifacts.length})</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {artifacts.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 bg-ink-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-ink-800">{a.name}</h4>
                  <p className="text-xs text-ink-500">{a.dynasty} · {a.createdAt}</p>
                </div>
                <button className="text-palace-600 hover:text-palace-800 text-sm flex items-center gap-1">
                  查看详情 <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
