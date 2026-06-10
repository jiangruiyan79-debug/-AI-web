"use client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  // 模拟用户数据，后续可接入真实接口
  const [userInfo] = useState({
    name: "旅行爱好者",
    avatar: "✈️",
    membershipLevel: "VIP 季卡",
    remainingDays: 68,
    joinDate: "2026-04-10",
    usageCount: 12,
    savedRoutes: 3,
  });

  const [recentPlans] = useState([
    {
      id: 1,
      title: "长沙3日美食打卡之旅",
      date: "2026-06-08",
      status: "已完成",
      image: "https://tse1.mm.bing.net/th?q=长沙美食打卡&w=400&h=220&c=7",
    },
    {
      id: 2,
      title: "珠海2日休闲游",
      date: "2026-05-20",
      status: "已收藏",
      image: "https://tse1.mm.bing.net/th?q=珠海情侣路&w=400&h=220&c=7",
    },
    {
      id: 3,
      title: "广州4日特种兵之旅",
      date: "2026-06-01",
      status: "规划中",
      image: "https://tse1.mm.bing.net/th?q=广州地标&w=400&h=220&c=7",
    },
  ]);

  // 退出登录模拟函数（后续可接入真实登出逻辑）
  const handleLogout = () => {
    alert("已退出登录，将跳转到首页");
    // 这里后续可以加清除本地存储、token的逻辑
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的会员中心</h1>
          {/* 新增退出登录按钮 */}
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <span>退出登录</span>
            <span>🚪</span>
          </button>
        </div>

        {/* 用户信息卡片 - 优化配色，增加会员标识 */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 shadow-md mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl shadow-sm">
                {userInfo.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1 text-gray-900">
                  欢迎回来，{userInfo.name} 👋
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  当前会员等级：
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-sm font-medium">
                    {userInfo.membershipLevel}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  剩余有效天数：{userInfo.remainingDays} 天 | 开通时间：{userInfo.joinDate}
                </p>
              </div>
            </div>
            <Link href="/membership">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow">
                续费/升级会员
              </button>
            </Link>
          </div>
        </div>

        {/* 数据统计卡片 - 优化配色和图标 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">已生成路线数</p>
              <span className="text-blue-600 text-xl">🗺️</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{userInfo.usageCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">已收藏路线数</p>
              <span className="text-blue-600 text-xl">❤️</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{userInfo.savedRoutes}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">会员权益</p>
              <span className="text-yellow-500 text-xl">⭐</span>
            </div>
            <p className="text-lg font-medium text-gray-900">全部解锁 ✅</p>
          </div>
        </div>

        {/* 历史路线列表 - 优化状态标签和交互 */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">我的历史路线</h3>
            <Link href="/chat">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                + 生成新路线
              </button>
            </Link>
          </div>

          {recentPlans.length > 0 ? (
            <div className="space-y-4">
              {recentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full md:w-32 h-20 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-500 mt-1">创建时间：{plan.date}</p>
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
                        plan.status === "已完成"
                          ? "bg-green-100 text-green-700"
                          : plan.status === "规划中"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 hover:underline text-sm self-center md:self-auto font-medium">
                    查看详情 →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">你还没有生成过路线，快去试试吧！</p>
              <Link href="/chat">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow">
                  生成新路线
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}