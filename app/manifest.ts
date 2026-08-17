import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Decorcity Vision — Interior Designer, Bhilai",
    short_name: "Decorcity Vision",
    description:
      "Interior designer, furniture manufacturer and painting studio serving Bhilai, Durg, Rajnandgaon and Raipur.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F6F2",
    theme_color: "#1F1F1F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
