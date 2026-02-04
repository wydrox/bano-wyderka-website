import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // @ts-ignore - Turbopack root is a new property in Next.js 16
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
};

export default nextConfig;
