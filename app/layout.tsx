import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Link from "next/link";
// @ts-ignore
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "智行AI · 个性化旅游规划平台",
  description: "AI驱动的个性化旅游规划，一键生成完整可执行路线",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              <span className="font-bold text-xl text-gray-900">智行AI</span>
              <span className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 font-medium">Beta</span>
            </Link>

            {/* 主导航 */}
            <nav className="hidden md:flex items-center gap-1 text-sm text-gray-600">
              <Link href="/" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">首页</Link>
              <Link href="/chat" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">AI规划</Link>
              {/* 会员中心 指向 /dashboard */}
              <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">会员中心</Link>
            </nav>

            {/* 右侧按钮区 */}
            <div className="flex items-center gap-3">
              {/* 开通会员 指向 /membership */}
              <Link href="/membership">
                <button className="text-sm px-4 py-2 rounded-lg border border-yellow-400 text-yellow-600 font-medium hover:bg-yellow-50 transition-colors">
                  👑 开通会员
                </button>
              </Link>
              <Link href="/chat">
                <button className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                  开始规划 →
                </button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-[72px]">
          {children}
        </main>

        {/* 全局页脚 */}
        <footer className="bg-gray-950 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">✈️</span>
                  <span className="font-bold text-white text-lg">智行AI</span>
                </div>
                <p className="text-sm leading-relaxed">基于用户偏好的个性化旅游规划平台，AI驱动千人千面出行体验。</p>
              </div>

              <div>
                <p className="text-white font-medium mb-3">产品功能</p>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/chat" className="hover:text-white transition-colors">AI路线规划</Link></li>
                  <li><Link href="/chat" className="hover:text-white transition-colors">六大偏好模式</Link></li>
                  <li><Link href="/chat" className="hover:text-white transition-colors">拍照打卡规划</Link></li>
                  <li><Link href="/chat" className="hover:text-white transition-colors">美食推荐</Link></li>
                </ul>
              </div>

            <div>
  <p className="text-white font-medium mb-3">会员服务</p>
  <ul className="space-y-2 text-sm">
    <li><Link href="/membership" className="hover:text-white transition-colors">智行VIP</Link></li>
    <li><Link href="/dashboard" className="hover:text-white transition-colors">会员权益</Link></li>
    <li><Link href="/membership" className="hover:text-white transition-colors">定价方案</Link></li>
  </ul>
</div>

              <div>
                <p className="text-white font-medium mb-3">关于我们</p>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">项目介绍</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
              <p>© 2026 智行AI · Smart Travel Planner · </p>
              <div className="flex gap-4">
                <span>📸 拍照打卡</span>
                <span>🍜 美食推荐</span>
                <span>👗 穿搭建议</span>
                <span>🗺️ 智能路线</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}