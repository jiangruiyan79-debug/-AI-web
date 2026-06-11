"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <span>退出登录</span>
            <span>🚪</span>
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 shadow-md mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl shadow-sm">
                ✈️
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1 text-gray-900">
                  欢迎回来，{user?.username || user?.email} 👋
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  会员状态：
                  <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${user?.isMember ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}>
                    {user?.isMember ? "VIP会员" : "普通用户"}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  注册时间：{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
            {!user?.isMember && (
              <Link href="/membership">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow">
                  👑 开通会员
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-2">邮箱</p>
            <p className="font-medium text-gray-900 truncate">{user?.email}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-2">会员到期</p>
            <p className="font-medium text-gray-900">
              {user?.memberExpiry ? new Date(user.memberExpiry).toLocaleDateString() : "未开通"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-2">账号状态</p>
            <p className="font-medium text-green-600">✅ 正常</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center">
          <p className="text-gray-500 mb-4">还没有生成过路线，快去试试吧！</p>
          <Link href="/chat">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow">
              🗺️ 生成新路线
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}