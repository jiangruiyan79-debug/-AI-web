/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '',
  // 强制指定构建输出目录，和腾讯云配置保持一致
  distDir: 'out'
}

module.exports = nextConfig