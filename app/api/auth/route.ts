import { NextResponse } from "next/server";
import cloudbase from "@cloudbase/node-sdk";

const app = cloudbase.init({
  env: process.env.CLOUDBASE_ENV_ID!,
  secretId: process.env.CLOUDBASE_SECRET_ID || "",
  secretKey: process.env.CLOUDBASE_SECRET_KEY || "",
  token: process.env.CLOUDBASE_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { action, email, password, username } = await req.json();

    if (action === "register") {
      const db = app.database();
      // 检查邮箱是否已注册
      const existing = await db.collection("users").where({ email }).get();
      if (existing.data && existing.data.length > 0) {
        return NextResponse.json({ success: false, error: "该邮箱已注册" }, { status: 400 });
      }
      // 创建用户
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.collection("users").add({
        email,
        username: username || email.split("@")[0],
        password: hashedPassword,
        isMember: false,
        memberExpiry: null,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, userId: result.id });
    }

    if (action === "login") {
      const db = app.database();
      const result = await db.collection("users").where({ email }).get();
      if (!result.data || result.data.length === 0) {
        return NextResponse.json({ success: false, error: "邮箱或密码错误" }, { status: 401 });
      }
      const user = result.data[0];
      const bcrypt = await import("bcryptjs");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ success: false, error: "邮箱或密码错误" }, { status: 401 });
      }
      const { password: _, ...safeUser } = user;
      return NextResponse.json({ success: true, user: safeUser });
    }

    return NextResponse.json({ success: false, error: "未知操作" }, { status: 400 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message || "操作失败" }, { status: 500 });
  }
}