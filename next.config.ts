import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/canvas.html", destination: "/canvas", permanent: false },
      {
        source: "/framework-:slug.html",
        destination: "/framework-:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
