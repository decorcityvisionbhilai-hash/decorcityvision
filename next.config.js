/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cartodb-basemaps-a.global.ssl.fastly.net",
      },
      {
        protocol: "https",
        hostname: "tile.openstreetmap.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "https://www.youtube.com/@decorcityvision",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
