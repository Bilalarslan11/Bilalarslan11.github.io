import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static site export
  basePath: '/Bilalarslan11/Bilalarslan11.github.io', // Replace with your GitHub repository name
  assetPrefix: '/Bilalarslan11/Bilalarslan11.github.io', // Same as basePath
  images: {
    unoptimized: true,
  }, //
  reactStrictMode: true,
};

export default nextConfig;
