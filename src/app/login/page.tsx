"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        setError("用户名或密码错误");
      }
    } catch {
      setError("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-50 via-palace-50 to-ink-100">
      <div className="w-full max-w-md mx-4">
        <div className="card p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-palace-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">宫</div>
            <h1 className="text-2xl font-bold text-ink-900 font-serif">故宫 AI 造办局</h1>
            <p className="text-sm text-ink-500 mt-2">内部演示系统 · 请登录后继续</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">用户名</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">密码</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-palace w-full text-center">
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-ink-400 mt-6">故宫文化 × 人工智能 · 让文物活起来，让文化走出去</p>
      </div>
    </div>
  );
}
