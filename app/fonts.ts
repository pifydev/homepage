import localFont from "next/font/local";

/**
 * Brand fonts supplied by the owner. Only the weights the page uses are
 * declared so that next/font does not preload nine TTF files.
 */
export const geist = localFont({
  src: [
    { path: "./fonts/Geist-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Geist-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Geist-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = localFont({
  src: [
    { path: "./fonts/GeistMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/GeistMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});
