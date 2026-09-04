const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isPages
    ? {
        basePath: "/bnb-agent-marketplace",
        assetPrefix: "/bnb-agent-marketplace/",
      }
    : {}),
};

export default nextConfig;
