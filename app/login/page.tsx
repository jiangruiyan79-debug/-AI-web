"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isRegister ? "register" : "login",
          email,
          password,
          username,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "操作失败");
      } else {
        if (isRegister) {
          // 注册成功后自动登录
          const loginRes = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "login", email, password }),
          });
          const loginData = await loginRes.json();
          if (loginData.success) {
            localStorage.setItem("user", JSON.stringify(loginData.user));
            router.push("/dashboard");
          } else {
            setSuccess("注册成功！请登录");
            setIsRegister(false);
          }
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/dashboard");
        }
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl text-gray-900">智行AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? "创建账号" : "欢迎回来"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {isRegister ? "注册后即可使用AI规划功能" : "登录你的智行AI账号"}
          </p>
        </div>

        <div className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm text-gray-600 mb-1 block">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="你的昵称"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "处理中..." : isRegister ? "注册" : "登录"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isRegister ? "已有账号？" : "还没有账号？"}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess(""); }}
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              {isRegister ? "去登录" : "立即注册"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}