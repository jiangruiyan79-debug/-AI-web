import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { departure, destination, days, budget, modes, driving } = body;
let finalDestination = destination;

if (
  destination.includes("随机") ||
  destination.includes("推荐")
) {
  const randomCities = [
    "长沙",
    "重庆",
    "成都",
    "厦门",
    "珠海",
    "桂林",
    "大理",
    "青岛",
    "苏州",
    "西安"
  ];

  finalDestination =
    randomCities[
      Math.floor(Math.random() * randomCities.length)
    ];
}
    const prompt = `
你是智行AI旅游规划师。

用户信息：
出发地：${departure}
目的地：${finalDestination}
旅行天数：${days}
预算：${budget}
偏好模式：${modes}
是否自驾：${driving}

请生成详细旅游规划，控制在预算范围内。

必须返回如下JSON格式，只返回JSON，不要解释，不要Markdown：

{
  "destination": "${finalDestination}",
  "transport": {
    "train": "车次号",
    "depart": "出发时间",
    "arrive": "到达时间",
    "cost": "费用"
  },
  "hotel": {
    "name": "酒店名称",
    "price": "每晚价格"
  },
  "itinerary": [
    {
      "day": 1,
      "place": "景点1（09:00-11:00）→ 步行15分钟 → 景点2（11:30-13:00）→ 打车10分钟约15元 → 景点3（14:00-17:00）",
      "meals": {
        "breakfast": "餐厅名 + 推荐菜",
        "lunch": "餐厅名 + 推荐菜",
        "dinner": "餐厅名 + 推荐菜"
      },
      "outfit": "根据天气和当天行程的穿搭建议，例如：轻便运动鞋+防晒外套+浅色T恤",
      "photo": "当天最佳拍照地点、最佳拍摄时间和机位建议"
    }
  ]
}

如果是自驾，transport改为：
{
  "type": "自驾",
  "time": "预计行驶时间",
  "cost": "预计油费"
}
`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content || "{}";
    const cleaned = content.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "AI生成失败" },
      { status: 500 }
    );
  }
}