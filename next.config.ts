import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide", "lucide-react"],
  },
};

export default nextConfig;
