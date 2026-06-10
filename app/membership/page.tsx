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

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">我的会员中心</h1>

        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                {userInfo.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  欢迎回来，{userInfo.name} 👋
                </h2>
                <p className="text-gray-600">
                  当前会员等级：
                  <span className="text-yellow-600 font-medium ml-1">
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

        {/* 数据统计卡片 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-500 mb-1">已生成路线数</p>
            <p className="text-3xl font-bold text-blue-600">{userInfo.usageCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-500 mb-1">已收藏路线数</p>
            <p className="text-3xl font-bold text-blue-600">{userInfo.savedRoutes}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-500 mb-1">会员权益</p>
            <p className="text-lg font-medium">全部解锁 ✅</p>
          </div>
        </div>

        {/* 历史路线列表 */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">我的历史路线</h3>
            <Link href="/chat">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + 生成新路线
              </button>
            </Link>
          </div>

          {recentPlans.length > 0 ? (
            <div className="space-y-4">
              {recentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full md:w-32 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-500 mt-1">创建时间：{plan.date}</p>
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
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
                  <button className="text-blue-600 hover:underline text-sm self-center md:self-auto">
                    查看详情
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">你还没有生成过路线，快去试试吧！</p>
              <Link href="/chat">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
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