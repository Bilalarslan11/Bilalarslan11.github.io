import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static site export
  basePath: '/Bilalarslan11.github.io',
  trailingSlash: true, 
  images: {
    unoptimized: true,
  }, //
  reactStrictMode: true,
};

export default nextConfig;
