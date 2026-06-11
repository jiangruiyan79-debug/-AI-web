"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavButtons() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <button className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            👤 {user.username || user.email?.split("@")[0]}
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <button className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          登录
        </button>
      </Link>
      <Link href="/chat">
        <button className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
          开始规划 →
        </button>
      </Link>
    </div>
  );
}