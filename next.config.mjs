/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
    GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
