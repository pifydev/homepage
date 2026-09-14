import type { Metadata, Viewport } from "next";
import { geist, geistMono } from "./fonts";
import { SITE_URL } from "@/lib/packages";
import "./globals.css";

const title = "Pify: Pi packages for the parts pi left out";
const description =
  "Sixteen MIT-licensed Pi Packages for the pi coding agent: plan mode, subagents, persistent memory, task tracking, a safety gate with an undo trail, and more. Plus the @pify/cli front door and the Pify Agent Book.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Pify",
  },
  description,
  applicationName: "Pify",
  keywords: [
    "pi coding agent",
    "pi packages",
    "pi extension",
    "pify",
    "@pify",
    "coding agent",
    "Pi Agent SDK",
  ],
  authors: [{ name: "Pify", url: "https://github.com/pifydev" }],
  // Images and icons come from the file conventions in app/:
  // opengraph-image.tsx, twitter-image.tsx, icon.svg, favicon.ico, apple-icon.png.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pify",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint so the stored theme choice is applied without a
 * flash. Mirrors the logic in components/theme-toggle.tsx.
 */
const themeInit = `(function(){try{var t=localStorage.getItem('pify-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var k=t==='dark'||((t===null||t==='system')&&d);var r=document.documentElement;r.classList.toggle('dark',k);r.style.colorScheme=k?'dark':'light';var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].setAttribute('content',k?'#09090b':'#ffffff');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="top" />
        {children}
      </body>
    </html>
  );
}
