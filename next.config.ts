import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sportmonks.com",
      },
    ],
  },
};

export default nextConfig;
