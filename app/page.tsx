"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePlanClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      router.push("/chat");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="pt-32 pb-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
            ✨ AI 智能旅行规划 · Beta 版本
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            智行<span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            AI驱动的个性化旅游规划平台
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            结合天气、人流量、预算、交通与旅行偏好，一键生成完整、可落地的专属旅游路线
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handlePlanClick}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200"
            >
              立即规划
            </button>
            <button
              onClick={handlePlanClick}
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              体验演示
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">六大旅行偏好模式</h2>
          <p className="text-gray-500">匹配你的出行风格，定制专属旅途</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📸", title: "拍照打卡", desc: "自动规划最佳拍摄机位与黄金出片时间" },
            { icon: "🍜", title: "美食体验", desc: "优先推荐本地特色美食与小众宝藏店铺" },
            { icon: "🌿", title: "自然风景", desc: "聚焦自然风光，沉浸式户外旅行体验" },
            { icon: "☕", title: "轻松休闲", desc: "慢节奏行程，舒适放松的度假之旅" },
            { icon: "⚡", title: "特种兵旅游", desc: "短时高效，打卡更多热门景点" },
            { icon: "💰", title: "低预算出行", desc: "精打细算，打造高性价比旅行方案" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.icon} {item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">智行AI 核心能力</h2>
            <p className="text-gray-500">多项智能技术，全方位优化你的出行体验</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🌦", title: "实时天气规划", desc: "同步实时天气数据，动态调整当日游玩路线" },
              { icon: "👥", title: "人流量预测", desc: "预判景区客流，主动避开拥堵高峰" },
              { icon: "🚇", title: "智能交通推荐", desc: "综合多种出行方式，计算最优通勤方案" },
              { icon: "🤖", title: "AI一键路线生成", desc: "根据需求快速生成完整、可执行旅行计划" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <h3 className="font-bold text-xl mb-4 text-gray-900">{item.icon} {item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-10 md:p-12 text-white shadow-lg">
          <div className="md:w-3/4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">智行AI VIP 会员</h2>
            <p className="text-lg md:text-xl opacity-95 mb-8 leading-relaxed">
              解锁专属摄影规划、小众秘境路线、一对一旅行顾问等全部高级权益，享受更极致的出行服务
            </p>
            <Link href="/membership">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow">
                立即开通会员
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}