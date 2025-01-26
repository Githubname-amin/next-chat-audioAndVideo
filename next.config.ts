import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // swcMinify: true,
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
  },
  // ... 其他配置
  server:
    process.env.NODE_ENV === "development"
      ? {
          allowedHosts: "all", // 允许所有主机访问
          https: true,
          port: 3000,
          host: "0.0.0.0" // 允许外部访问
        }
      : {}
};

export default nextConfig;
