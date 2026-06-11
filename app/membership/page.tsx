"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MembershipPage() {
  const router = useRouter();

  const plans = [
    {
      name: "月卡",
      price: "19.9",
      period: "月",
      features: ["无限次AI路线规划", "优先客服支持", "无广告体验"],
      popular: false,
    },
    {
      name: "季卡",
      price: "49.9",
      period: "3个月",
      features: ["无限次AI路线规划", "优先客服支持", "无广告体验", "小众路线推荐"],
      popular: true,
    },
    {
      name: "年卡",
      price: "149",
      period: "年",
      features: ["无限次AI路线规划", "专属旅行顾问", "无广告体验", "小众路线推荐", "定制化行程报告"],
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          升级为智行AI VIP
        </h1>
        <p className="text-lg text-gray-600 mb-16">
          解锁全部高级权益，享受更极致的旅行规划体验
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "border-2 border-yellow-400" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">¥{plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => alert("支付功能即将上线，敬请期待！")}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                立即开通
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/">
            <button className="text-gray-500 hover:text-gray-700 underline">
              暂时不需要，返回首页
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}