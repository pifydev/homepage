/**
 * The Pify catalog, mirrored from catalog.json in github.com/pifydev/cli (v28).
 * Descriptions are the catalog's own words, with any em dash replaced by a
 * colon (the site's copy rule). Versions are deliberately omitted: they change
 * several times a week and would go stale on a static page.
 *
 * Every count on the page (hero, headings, the cell grid, metadata, the social
 * card) derives from this list, so adding a package here is the whole change.
 */

export type BundleName = "core" | "agents";

export interface PifyPackage {
  /** short name, as used by `pify install <name>` */
  name: string;
  /** full npm name */
  npm: string;
  description: string;
  /** which curated bundle the package belongs to, if any */
  bundle?: BundleName;
}

export const ORG_URL = "https://github.com/pifydev";
export const NPM_ORG_URL = "https://www.npmjs.com/org/pify";
export const DOCS_URL = "https://docs.pify.dev";
export const PI_URL = "https://pi.dev";
export const SITE_URL = "https://pify.dev";

export const repoUrl = (name: string) => `${ORG_URL}/${name}`;
export const npmUrl = (npm: string) => `https://www.npmjs.com/package/${npm}`;

export const packages: PifyPackage[] = [
  {
    name: "ask-question",
    npm: "@pify/ask-question",
    description:
      "Structured questions on built-in dialogs: 1-4 questions, options with trade-offs, multi-select, Other free-text",
  },
  {
    name: "autopilot",
    npm: "@pify/autopilot",
    description:
      "Let the main agent keep going on its own between turns: opt-in, hard-capped, never over your head",
  },
  {
    name: "btw",
    npm: "@pify/btw",
    description:
      "By-the-way side conversations: a read-only, codebase-aware side agent in a widget, out of the main context",
  },
  {
    name: "compact",
    npm: "@pify/compact",
    description:
      "Proactive auto-compaction: compact between turns when the context window crosses a threshold",
  },
  {
    name: "goal",
    npm: "@pify/goal",
    description:
      "Pin a session goal and keep the agent anchored: ordered steps, evidence-gated completion, cost-weighted budget",
  },
  {
    name: "memory",
    npm: "@pify/memory",
    description:
      "Persistent memory across sessions: two-tier markdown, FTS5 search, secret-scanned writes, consent-gated project tier",
    bundle: "core",
  },
  {
    name: "plan-mode",
    npm: "@pify/plan-mode",
    description:
      "Read-only planning with an approve-then-execute gate: enforced tool policy, tracked steps, plans as files",
    bundle: "core",
  },
  {
    name: "pretty",
    npm: "@pify/pretty",
    description:
      "Compact theme-aware rendering for built-in tools: summaries, highlighted reads, word-level diff emphasis",
  },
  {
    name: "recall",
    npm: "@pify/recall",
    description:
      "Full-text search across your past pi sessions: a session_search tool over the local session logs",
  },
  {
    name: "search",
    npm: "@pify/search",
    description:
      "Fuzzy file finding and indexed content search: fffind and ffgrep, with a pure-TypeScript fallback",
  },
  {
    name: "shell-background",
    npm: "@pify/shell-background",
    description:
      "Long-running bash goes async: background:true launches detached, and commands still running after 30s auto-background",
  },
  {
    name: "skills",
    npm: "@pify/skills",
    description:
      "See the skills pi has loaded, what they cost in every request, and which ones ever fire",
  },
  {
    name: "subagent",
    npm: "@pify/subagent",
    description:
      "Spawn scoped subagents: agent_run/agent_result, @agent mentions, custom agent types, ask_supervisor, results delivered not polled",
    bundle: "agents",
  },
  {
    name: "swarm",
    npm: "@pify/swarm",
    description:
      "Run many pi agents in parallel: fan-out with per-item routing, concurrency queue, shared mailbox, results delivered not polled",
    bundle: "agents",
  },
  {
    name: "task",
    npm: "@pify/task",
    description:
      "Task tracking with a dependency graph, evidence-gated completion, live widget, and a sweep when the list finishes",
  },
  {
    name: "todo",
    npm: "@pify/todo",
    description:
      "Agent working-memory checklist: complete-replacement writes, next-item surfacing, live widget",
    bundle: "core",
  },
  {
    name: "usage",
    npm: "@pify/usage",
    description:
      "Token and cost reporting: live footer, local-history dashboard with per-project totals, context breakdown",
  },
  {
    name: "workflow",
    npm: "@pify/workflow",
    description:
      "Deterministic agent orchestration through JavaScript scripts: agent()/parallel()/pipeline(), gates, resume",
    bundle: "agents",
  },
  {
    name: "worktree",
    npm: "@pify/worktree",
    description:
      "Safe git-worktree management: create/list/merge/remove with safety rails, plus /worktree enter to take the session along",
    bundle: "agents",
  },
  {
    name: "yolo",
    npm: "@pify/yolo",
    description:
      "A safety gradient from auto-approve-everything to ask-about-anything: four modes, read-before-write, undo trail, rewind to before a prompt",
    bundle: "core",
  },
];

export const bundles: Record<
  BundleName,
  { title: string; description: string; command: string }
> = {
  core: {
    title: "core",
    description:
      "The everyday four: task tracking, planning, memory, and a safety gate",
    command: "pify install core",
  },
  agents: {
    title: "agents",
    description:
      "The agent stack: subagents, parallel fan-out, scripted workflows, worktrees",
    command: "pify install agents",
  },
};

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
  "nineteen", "twenty",
];

/** "sixteen", "twenty-three"; falls back to digits past thirty-nine. */
export function numberWord(n: number): string {
  if (n >= 0 && n <= 20) return WORDS[n];
  if (n > 20 && n < 30) return `twenty-${WORDS[n - 20]}`;
  if (n >= 30 && n < 40) return n === 30 ? "thirty" : `thirty-${WORDS[n - 30]}`;
  return String(n);
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const packageCount = packages.length;
export const packageCountWord = numberWord(packageCount);
export const PackageCountWord = capitalize(packageCountWord);
