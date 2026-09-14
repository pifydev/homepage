"use client";

import { useMemo, useState } from "react";
import type { WeeklyDownloads } from "@/lib/downloads";
import {
  bundles,
  NPM_ORG_URL,
  npmUrl,
  numberWord,
  packageCount,
  packageCountWord,
  packages,
  repoUrl,
  type BundleName,
  type PifyPackage,
} from "@/lib/packages";
import { CopyCommand } from "./copy-command";

/** Fixed locale so server and client render the same digits. */
const number = new Intl.NumberFormat("en-US");

type Chip = BundleName | "suite";

const chips: { id: Chip; count: number }[] = [
  { id: "suite", count: packages.length },
  { id: "core", count: packages.filter((p) => p.bundle === "core").length },
  { id: "agents", count: packages.filter((p) => p.bundle === "agents").length },
];

interface Group {
  id: string;
  title: string;
  description: string;
  items: PifyPackage[];
}

/**
 * The catalog as a ledger: three groups (the two real bundles, then the
 * rest by name), one row per package, next to a 4x4 grid of cells. The row
 * order is the cell order, so hovering or focusing a row lights its cell,
 * and pressing a bundle chip lights the bundle and rewrites the install
 * line beneath the grid.
 */
export function PackagesCatalog({ downloads }: { downloads: WeeklyDownloads }) {
  const [active, setActive] = useState<Chip | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const groups = useMemo<Group[]>(() => {
    const byBundle = (b: BundleName) => packages.filter((p) => p.bundle === b);
    const rest = packages.filter((p) => !p.bundle);
    return [
      { id: "core", title: bundles.core.title, description: bundles.core.description, items: byBundle("core") },
      { id: "agents", title: bundles.agents.title, description: bundles.agents.description, items: byBundle("agents") },
      { id: "by-name", title: "by name", description: `The other ${numberWord(rest.length)}. Short names resolve to @pify/NAME.`, items: rest },
    ];
  }, []);

  const ordered = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const isLit = (i: number) => {
    if (hovered === i) return true;
    if (active === "suite") return true;
    if (active) return ordered[i]?.bundle === active;
    return false;
  };

  const command = `pify install ${active ?? "suite"}`;
  const toggle = (id: Chip) => setActive((cur) => (cur === id ? null : id));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Bundles">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={active === c.id}
            onClick={() => toggle(c.id)}
          >
            <span
              aria-hidden="true"
              className={`cell cell-sm ${active === c.id ? "" : "cell-hollow"}`}
            />
            {c.id}{" "}
            <span className="chip__count">{c.count}</span>
          </button>
        ))}
        <p className="basis-full text-sm text-muted sm:ml-2 sm:basis-auto">
          Pick a bundle to see which cells it lights.
        </p>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 lg:max-w-xs">
            <div
              className="cellgrid [--cellgrid-cell:1.25rem] sm:[--cellgrid-cell:1.5rem]"
              role="img"
              aria-label={`A grid of ${packageCountWord} cells, four to a row, one per package. ${
                active ? `${active} highlighted.` : "Hover or focus a row to light its cell."
              }`}
            >
              {ordered.map((p, i) => (
                <span key={p.name} data-on={isLit(i) ? "true" : "false"} />
              ))}
            </div>
            <p className="label mt-4">
              {packageCount === 16
                ? "The logo is a 4x4 grid. So is the catalog."
                : `The logo is a 4x4 grid. The catalog has outgrown it: ${packageCount} cells.`}
            </p>

            <div className="mt-6 border-t border-line pt-4">
              <p className="label">Last 7 days on npm</p>
              {downloads.total !== null ? (
                <>
                  <p className="mt-1 text-[28px] font-semibold tracking-[-0.02em] tabular-nums">
                    {number.format(downloads.total)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    downloads across all {packageCountWord} packages
                    {downloads.range ? `, ${downloads.range}` : ""}. Counted by{" "}
                    <a href={NPM_ORG_URL} className="link text-fg">
                      npm
                    </a>
                    , refreshed hourly.
                    {downloads.newCount > 0
                      ? " Packages marked new have no counts yet."
                      : ""}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Download counts from npm are unavailable right now.
                </p>
              )}
            </div>

            <div className="mt-6">
              <p className="label mb-2" id="bundle-command-label">
                {active ? `Install ${active}` : "Install everything"}
              </p>
              <CopyCommand key={command} command={command} labelledBy="bundle-command-label" />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:col-span-8 lg:mt-0">
          {groups.map((g, gi) => {
            const offset = groups.slice(0, gi).reduce((n, x) => n + x.items.length, 0);
            return (
              <div key={g.id} className={gi === 0 ? "" : "mt-10"}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pb-3">
                  <h3 className="label text-fg">{g.title}</h3>
                  <p className="text-sm text-muted">{g.description}</p>
                </div>
                <ul className="border-b border-line">
                  {g.items.map((p, j) => {
                    const i = offset + j;
                    return (
                      <li
                        key={p.name}
                        className="ledger-row"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(i)}
                        onBlur={() => setHovered(null)}
                      >
                        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 py-3 sm:grid-cols-[auto_9rem_1fr_auto] sm:gap-x-5">
                          <span
                            aria-hidden="true"
                            className={`cell cell-sm ${isLit(i) ? "" : "cell-hollow"}`}
                          />
                          <a
                            href={repoUrl(p.name)}
                            className="link -my-3 inline-flex min-h-11 items-center self-center justify-self-start font-mono text-sm font-medium text-fg"
                          >
                            {p.name}
                          </a>
                          <p className="col-span-2 col-start-2 row-start-2 text-sm leading-relaxed text-muted sm:col-span-1 sm:col-start-3 sm:row-start-1">
                            {p.description}
                          </p>
                          <div className="col-start-3 row-start-1 flex items-center justify-end gap-3 self-center sm:col-start-4">
                            {typeof downloads.perPackage[p.name] === "number" ? (
                              <span className="label whitespace-nowrap tabular-nums">
                                {number.format(downloads.perPackage[p.name] as number)} / wk
                              </span>
                            ) : downloads.perPackage[p.name] === "new" ? (
                              <span className="label whitespace-nowrap text-fg">new</span>
                            ) : null}
                            <a
                              href={npmUrl(p.npm)}
                              className="label -my-3 -mr-2 inline-flex min-h-11 items-center px-2 text-muted transition-colors hover:text-fg"
                              aria-label={`${p.npm} on npm`}
                            >
                              npm
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
