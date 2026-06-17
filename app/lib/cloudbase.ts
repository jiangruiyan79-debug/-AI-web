import cloudbase from "@cloudbase/node-sdk";

const app = cloudbase.init({
  env: process.env.CLOUDBASE_ENV_ID!,
  secretId: process.env.CLOUDBASE_SECRET_ID!,
  secretKey: process.env.CLOUDBASE_SECRET_KEY!,
  region: "ap-guangzhou",  // ← 修改这里！
});

export default app;