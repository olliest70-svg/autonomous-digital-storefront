import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Bundle the private zips with the download function (they're read via fs at runtime).
  outputFileTracingIncludes: {
    "/api/download": ["./private-downloads/**/*"],
  },
};

export default nextConfig;
