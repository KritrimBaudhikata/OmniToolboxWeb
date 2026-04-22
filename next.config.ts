import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com"
  : "'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value:
              `default-src 'self'; img-src 'self' data: blob: https:; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.ipify.org https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://oauth2.googleapis.com https://firebase.googleapis.com; font-src 'self' data:; frame-src 'self' https://accounts.google.com https://*.firebaseapp.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
