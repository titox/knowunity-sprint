import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets a real phone on the LAN load the dev server's hot-reload
  // websocket -- without this, Next blocks it as cross-origin, which
  // can surface as an unstable/dropped connection on-device.
  allowedDevOrigins: ['192.168.68.107'],
};

export default nextConfig;
