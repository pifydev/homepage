import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pify",
    short_name: "Pify",
    description:
      "Pi Packages for the pi coding agent, the @pify/cli front door, and the Pify Agent Book.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#09090b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/pify-light-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
