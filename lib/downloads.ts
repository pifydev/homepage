import { packages } from "./packages";

/**
 * Weekly download counts from the npm registry, one request per package
 * (the bulk endpoint does not support scoped names). Fetched on the server
 * and revalidated hourly, so the page stays static between refreshes.
 */
/** A count, "new" when npm has no statistics for the package yet, or null when the lookup failed. */
export type DownloadCount = number | "new" | null;

export interface WeeklyDownloads {
  /** short package name -> downloads in the last 7 days */
  perPackage: Record<string, DownloadCount>;
  /** sum over all packages ("new" counts as 0), or null if any lookup failed (no partial totals) */
  total: number | null;
  /** how many packages npm has not counted yet */
  newCount: number;
  /** human-readable range such as "Sep 5 to Sep 11, 2026", when known */
  range: string | null;
}

export const REVALIDATE_SECONDS = 3600;

const API = "https://api.npmjs.org/downloads/point/last-week/";

interface PointResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

/**
 * npm answers 404 "package not found" for a package published within the last
 * day or so, before its first statistics exist. That is "new", not an error.
 */
async function fetchPoint(npmName: string): Promise<PointResponse | "new"> {
  const res = await fetch(API + npmName, {
    headers: { accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    if (body?.error && /not found/i.test(body.error)) return "new";
  }
  if (!res.ok) throw new Error(`npm downloads ${npmName}: HTTP ${res.status}`);
  const json = (await res.json()) as Partial<PointResponse>;
  if (typeof json.downloads !== "number" || !Number.isFinite(json.downloads)) {
    throw new Error(`npm downloads ${npmName}: malformed response`);
  }
  return json as PointResponse;
}

function formatRange(start: string, end: string): string {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "UTC" });
  const s = new Date(`${start}T00:00:00Z`);
  const e = new Date(`${end}T00:00:00Z`);
  return `${fmt.format(s)} to ${fmt.format(e)}, ${year.format(e)}`;
}

export async function getWeeklyDownloads(): Promise<WeeklyDownloads> {
  const results = await Promise.allSettled(packages.map((p) => fetchPoint(p.npm)));

  const perPackage: Record<string, DownloadCount> = {};
  let total = 0;
  let newCount = 0;
  let complete = true;
  let range: string | null = null;

  results.forEach((r, i) => {
    const name = packages[i].name;
    if (r.status !== "fulfilled") {
      perPackage[name] = null;
      complete = false;
      return;
    }
    const v = r.value;
    if (v === "new") {
      perPackage[name] = "new";
      newCount += 1;
      return;
    }
    perPackage[name] = v.downloads;
    total += v.downloads;
    range ??= formatRange(v.start, v.end);
  });

  return { perPackage, total: complete ? total : null, newCount, range };
}
