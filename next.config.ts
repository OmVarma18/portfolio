import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
export const basePath = isProd ? "/portfolio" : "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
