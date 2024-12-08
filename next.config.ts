import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bilalarslan11.github.io',
  trailingSlash: true, 
  images: {
    unoptimized: true,
  }, //
  reactStrictMode: true,
};

export default nextConfig;
