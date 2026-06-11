/** @type {import('next').NextConfig} */
const nextConfig = {
    
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '',
  distDir: 'out'
}

module.exports = nextConfig