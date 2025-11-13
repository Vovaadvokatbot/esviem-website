/** @type {import('next').NextConfig} */
const nextConfig = {
  // Примусово вмикаємо Webpack
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Явно вимикаємо turbopack
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
