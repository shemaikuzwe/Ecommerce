import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental:{
    dynamicIO:true
  },
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
};

export default nextConfig;
