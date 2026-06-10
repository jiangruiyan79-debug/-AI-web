export const sampleTrips = [
  {
    city: "杭州",
    mode: "拍照打卡",
    days: 3,
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "08:00", place: "西湖", transport: "步行", note: "最佳拍照时间" },
          { time: "10:30", place: "雷峰塔", transport: "步行", note: "景观最佳角度" },
          { time: "12:00", place: "午餐：楼外楼", transport: "步行" },
        ]
      },
      {
        day: 2,
        activities: [
          { time: "08:30", place: "灵隐寺", transport: "打车" },
          { time: "10:30", place: "龙井村", transport: "步行" },
        ]
      },
      {
        day: 3,
        activities: [
          { time: "08:00", place: "河坊街", transport: "地铁" },
          { time: "12:00", place: "返程", transport: "地铁" },
        ]
      }
    ],
    budget: 2900
  },
  {
    city: "杭州",
    mode: "美食体验",
    days: 2,
    itinerary: [
      { day: 1, activities: [{ time: "08:00", place: "早餐：知味观", transport: "步行" }, { time: "10:00", place: "河坊街小吃", transport: "步行" }] },
      { day: 2, activities: [{ time: "08:30", place: "南宋御街美食", transport: "步行" }] },
    ],
    budget: 1800
  }
];