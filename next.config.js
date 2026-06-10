/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态导出，构建时会在根目录生成 out/ 文件夹
  output: 'export',
  // 关闭图片优化（静态导出必需，否则图片会报错）
  images: { unoptimized: true },
  // 确保路由路径正确，避免 404
  trailingSlash: true,
  basePath: ''
}

module.exports = nextConfig