import { packages } from "./packages";

/**
 * Weekly download counts from the npm registry, one request per package
 * (the bulk endpoint does not support scoped names). Fetched on the server
 * and revalidated hourly, so the page stays static between refreshes.
 */
export interface WeeklyDownloads {
  /** short package name -> downloads in the last 7 days, or null if the lookup failed */
  perPackage: Record<string, number | null>;
  /** sum over all packages, or null if any lookup failed (no partial totals) */
  total: number | null;
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

async function fetchPoint(npmName: string): Promise<PointResponse> {
  const res = await fetch(API + npmName, {
    headers: { accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
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

  const perPackage: Record<string, number | null> = {};
  let total = 0;
  let complete = true;
  let range: string | null = null;

  results.forEach((r, i) => {
    const name = packages[i].name;
    if (r.status === "fulfilled") {
      perPackage[name] = r.value.downloads;
      total += r.value.downloads;
      range ??= formatRange(r.value.start, r.value.end);
    } else {
      perPackage[name] = null;
      complete = false;
    }
  });

  return { perPackage, total: complete ? total : null, range };
}
