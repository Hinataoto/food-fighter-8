/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Azure App Serviceでのデプロイに必要
  images: {
    domains: ['furiirakun.com', 'ugokawaii.com'], // 外部画像のドメインを許可
  }
};

module.exports = nextConfig;