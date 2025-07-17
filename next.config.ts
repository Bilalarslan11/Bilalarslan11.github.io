import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export", // Temporarily commented out to test API routes
    trailingSlash: true,
    images: {
        unoptimized: true, // Disables the Image Optimization API for static export
    },
    //assetPrefix: '/Bilalarslan11.github.io/', // Use the full GitHub Pages URL
    //basePath: '/Bilalarslan11.github.io',
};

export default nextConfig;
