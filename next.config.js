/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      "assets.tina.io",
      "**.vercel.com",
      "content.tinajs.io",
      "valerievoigt.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "**.vercel.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "content.tinajs.io",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "valerievoigt.com",
        port: "",
        search: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
