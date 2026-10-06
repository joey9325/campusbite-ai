import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  outputFileTracingIncludes: {
    "/api/chat": ["./data/menu-kantin.csv", "./public/menu-images/**/*"],
  },
};

export default nextConfig;
