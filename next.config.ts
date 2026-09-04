import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery ships with the app — the campaign photography is cropped from
    // the client's own key-visual artwork. No remote hosts are required, which
    // keeps image rendering reliable offline and in CI.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
