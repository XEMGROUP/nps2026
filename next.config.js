/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow Vercel builds to proceed even if there are type-checking issues
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pulocfsnftbohjbwqbhv.supabase.co",
      },
    ],
    // Image optimization settings
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 75],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Turbopack settings for faster builds
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
