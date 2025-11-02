import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export", // For GitHub Pages static export
    trailingSlash: true,
    images: {
        unoptimized: true, // Disables the Image Optimization API for static export
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.igdb.com',
                pathname: '/igdb/image/upload/**',
            },
        ],
    },
    // SEO and Performance optimizations
    poweredByHeader: false, // Remove X-Powered-By header for security
    generateEtags: false, // Disable ETags for static export
    compress: true, // Enable gzip compression
};

export default nextConfig;
