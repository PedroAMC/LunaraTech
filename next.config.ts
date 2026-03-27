import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Permitimos imágenes externas (R2 + Google profile pics)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-9d2027c7e384234a65493a310ac26bd2.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // i18n: { locales: ["es"], defaultLocale: "es" },
};

export default nextConfig;