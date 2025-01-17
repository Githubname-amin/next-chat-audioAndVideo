import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // WebSocket 支持
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false
      };
    }
    return config;
  },
  // 允许 WebSocket 连接的域名
  async headers() {
    return [
      {
        source: "/api/socketio",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
