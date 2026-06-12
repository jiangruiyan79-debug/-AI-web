"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveRoute } from "@/app/lib/storage";

type UserData = {
  departure?: string;
  destination?: string;
  days?: string;
  budget?: string;
  modes?: string;
  driving?: string;
};

function getBingImageUrl(query: string) {
  return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(query)}&w=400&h=220&c=7`;
}

function ItineraryCard({ dayInfo, destination }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative mb-6">
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
      <div className="ml-6 bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <h4 className="text-lg font-bold">Day {dayInfo.day}</h4>
          <span className="text-gray-500">{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <div className="px-4 pb-4 space-y-3 text-gray-700 text-sm">
            {destination && (
              <img
                src={getBingImageUrl(`${destination} 景点 Day${dayInfo.day}`)}
                alt={`Day ${dayInfo.day} 景点`}
                className="w-full h-44 object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            {dayInfo.place && (
              <div>
                <p className="font-semibold mb-1">📍 行程路线</p>
                <p className="text-gray-600">{dayInfo.place}</p>
              </div>
            )}
            {dayInfo.meals && (
              <div>
                <p className="font-semibold mb-1">🍽️ 餐饮推荐</p>
                {dayInfo.meals.breakfast && <p>早：{dayInfo.meals.breakfast}</p>}
                {dayInfo.meals.lunch && <p>午：{dayInfo.meals.lunch}</p>}
                {dayInfo.meals.dinner && <p>晚：{dayInfo.meals.dinner}</p>}
              </div>
            )}
            {dayInfo.outfit && (
              <div>
                <p className="font-semibold mb-1">👗 穿搭建议</p>
                <p>{dayInfo.outfit}</p>
              </div>
            )}
            {dayInfo.photo && (
              <div>
                <p className="font-semibold mb-1">📸 拍照打卡</p>
                <p>{dayInfo.photo}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "您好👋 我是智行AI旅行规划师。\n\n首先请告诉我：📍 您从哪里出发？",
    },
  ]);

  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [finalRoute, setFinalRoute] = useState<any>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, finalRoute, loadingRoute]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    let newMessages = [...messages, userMessage];

    switch (step) {
      case 0:
        setUserData({ ...userData, departure: input });
        newMessages.push({
          role: "ai",
          content: "好的👌\n\n请告诉我：🌍 您想去哪里旅行？\n也可以输入：🎲 随机推荐",
        });
        break;
      case 1:
        setUserData({ ...userData, destination: input });
        newMessages.push({
          role: "ai",
          content: "请问本次计划旅行几天？\n例如：2天1晚 / 3天2晚 / 5天4晚",
        });
        break;
      case 2:
        setUserData({ ...userData, days: input });
        newMessages.push({
          role: "ai",
          content: "请填写本次旅行总预算（包含交通、住宿、门票、餐饮）。\n例如：3000元",
        });
        break;
      case 3:
        setUserData({ ...userData, budget: input });
        newMessages.push({
          role: "ai",
          content:
            "请选择旅行偏好（可多选），例如：拍照打卡、美食体验\n\n📸 拍照打卡：喜欢摄影、拍照和出片\n🍜 美食体验：优先推荐当地特色餐厅和隐藏美食\n🌿 自然风景：优先推荐自然景观\n☕ 轻松休闲：慢节奏旅行\n⚡ 特种兵旅游：有限时间打卡更多景点\n💰 低预算出行：优先规划高性价比路线",
        });
        break;
      case 4:
        setUserData({ ...userData, modes: input });
        newMessages.push({
          role: "ai",
          content: "最后一个问题：本次旅行是否自驾？\n请输入：是 或 否",
        });
        break;
case 5:
  const finalData = { ...userData, driving: input };

  setUserData(finalData);
  setLoadingRoute(true);
  setRouteError(null);

  newMessages.push({
    role: "ai",
    content: "正在分析用户偏好、交通、预算等...",
  });

  setMessages(newMessages);
  setStep(step + 1);
  setInput("");

  try {
    const res = await fetch("/api/planner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await res.json();

    if (data) {
      const routeData = {
        ...data,

        departure: finalData.departure,

        days: finalData.days,
        budget: finalData.budget,
        modes: finalData.modes,
        driving: finalData.driving,

        createTime: new Date().toISOString(),
      };

      setFinalRoute(routeData);

      saveRoute(routeData);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "✅ 已生成完整路线并保存到个人中心！",
        },
      ]);
    } else {
      setRouteError("生成路线失败，请稍后重试。");
    }
  } catch (err) {
    console.error(err);

    setRouteError("生成路线失败，请稍后重试。");

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "生成路线失败，请稍后重试。",
      },
    ]);
  } finally {
    setLoadingRoute(false);
  }

  return;

      default:
        break;
    }

    setMessages(newMessages);
    setStep(step + 1);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <div className="bg-blue-600 text-white p-5 text-2xl font-bold">
          智行AI旅行规划师
        </div>

        <div
          className="h-[70vh] overflow-y-auto p-6 space-y-4 border-b border-gray-100"
          ref={scrollRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] whitespace-pre-line rounded-2xl p-4 ${
                msg.role === "ai"
                  ? "bg-white shadow"
                  : "bg-blue-600 text-white ml-auto"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {step > 5 && (
            <div className="bg-green-50 p-6 rounded-2xl mt-4">
              {loadingRoute ? (
                <p className="animate-pulse text-gray-500">正在生成路线，请稍等...</p>
              ) : routeError ?
              (
  <p className="text-red-500">{routeError}</p>
) : finalRoute ? (
  <>
    {finalRoute.destination && (
      <img
        src={getBingImageUrl(finalRoute.destination)}
        alt={finalRoute.destination}
        className="w-full h-48 object-cover rounded-xl mb-4"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    )}

    <h3 className="font-bold text-lg mb-3">
      🚄 出发交通推荐
    </h3>

    {finalRoute.transport && (
      <div className="bg-white p-4 rounded-xl mb-4 shadow text-sm space-y-1">
        {finalRoute.transport.type === "自驾" ? (
          <>
            <p>
              <strong>方式：</strong>
              自驾
            </p>
            <p>
              <strong>耗时：</strong>
              {finalRoute.transport.time}
            </p>
            <p>
              <strong>费用：</strong>
              {finalRoute.transport.cost}
            </p>
          </>
        ) : finalRoute.transport.train ? (
          <>
            <p>
              <strong>车次：</strong>
              {finalRoute.transport.train}
            </p>
            <p>
              <strong>发车：</strong>
              {finalRoute.transport.depart}
            </p>
            <p>
              <strong>到达：</strong>
              {finalRoute.transport.arrive}
            </p>
            <p>
              <strong>费用：</strong>
              {finalRoute.transport.cost}
            </p>
          </>
        ) : (
          <p>暂无交通方案</p>
        )}
      </div>
    )}

    <h3 className="font-bold text-lg mb-3">
      🏨 酒店推荐
    </h3>

    {finalRoute.hotel && (
      <div className="bg-white p-4 rounded-xl mb-4 shadow text-sm space-y-1">
        <p>
          <strong>名称：</strong>
          {finalRoute.hotel.name}
        </p>
        <p>
          <strong>价格：</strong>
          {finalRoute.hotel.price}
        </p>
      </div>
    )}

    <h3 className="font-bold text-lg mb-3">
      🗓 每日行程
    </h3>

    <div className="relative border-l-2 border-blue-100 ml-1 pl-2">
      {finalRoute.itinerary?.map((day: any) => (
        <ItineraryCard
          key={day.day}
          dayInfo={day}
          destination={
            finalRoute.destination ||
            userData.destination
          }
        />
      ))}
    </div>
  </>
) : null}
</div>
)}
</div>

<div className="p-4 bg-white border-t flex gap-3">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="请输入..."
    className="flex-1 border rounded-xl px-4 py-3"
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSend();
    }}
    disabled={loadingRoute}
  />

  <button
    onClick={handleSend}
    disabled={loadingRoute}
    className="bg-blue-600 text-white px-6 rounded-xl disabled:opacity-50"
  >
    发送
  </button>
</div>
</div>
</main>
);
}