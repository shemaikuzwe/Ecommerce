import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {hostname:"cloud.appwrite.io",
        protocol:"https"
      }
    ],
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
