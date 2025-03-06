import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table", 'rc-input' ],

  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during the build process
  },
  typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during the build process
  },
  //for GitHub Pages
  // output: "export",
  // basePath: "/inventoryapp",
};

export default nextConfig;
