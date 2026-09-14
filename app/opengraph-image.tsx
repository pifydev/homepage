import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PackageCountWord } from "@/lib/packages";

/**
 * Social card (Open Graph and X). Built from the brand only: the pixel-grid
 * P with its indigo cell, Geist, and the page's headline. Generated at build
 * time, served as a static PNG at /opengraph-image.
 */
export const alt = "Pify: Pi packages for the parts pi left out";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#6366f1";
const INK = "#09090b";
const MUTED = "#52525b";

/** The P on a 4x4 grid, as (row, col) cells. The accent cell sits at (2, 3). */
const FILLED = new Set(["0,0", "0,1", "0,2", "1,0", "1,2", "2,0", "2,1", "3,0"]);
const ACCENT_CELL = "2,3";

function Mark({ cell }: { cell: number }) {
  const rows = [0, 1, 2, 3];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((r) => (
        <div key={r} style={{ display: "flex" }}>
          {rows.map((c) => {
            const key = `${r},${c}`;
            const fill = key === ACCENT_CELL ? ACCENT : FILLED.has(key) ? INK : "transparent";
            return <div key={c} style={{ width: cell, height: cell, background: fill }} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default async function Image() {
  const fontsDir = path.join(process.cwd(), "app", "fonts");
  const [semibold, regular, mono] = await Promise.all([
    readFile(path.join(fontsDir, "Geist-SemiBold.ttf")),
    readFile(path.join(fontsDir, "Geist-Regular.ttf")),
    readFile(path.join(fontsDir, "GeistMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: INK,
          padding: 72,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Mark cell={16} />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>pify</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1000 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 84,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: -2.5,
              }}
            >
              <div style={{ display: "flex" }}>Pi packages for the parts</div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span>pi left out</span>
                {/* The cell as the full stop, sitting on the baseline (above the descender space). */}
                <div style={{ width: 46, height: 46, background: ACCENT, marginLeft: 12, marginBottom: 16 }} />
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 32, lineHeight: 1.35, color: MUTED, fontWeight: 400, maxWidth: 960 }}>
              {PackageCountWord} open-source extensions for the pi coding agent, one CLI, and the Pify Agent Book.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: 1.5,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex" }}>PIFY.DEV</div>
            <div style={{ display: "flex" }}>PI PACKAGES · @PIFY ON NPM · MIT</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
