import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sportmonks.com",
      },
    ],
  },
};

export default nextConfig;
