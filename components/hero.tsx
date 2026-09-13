import { DOCS_URL, ORG_URL } from "@/lib/packages";
import { InstallBlock } from "./install-block";

const tabs = [
  { label: "npm", command: "npm install -g @pify/cli", note: "Node 22.19 or newer" },
  { label: "npx", command: "npx @pify/cli setup", note: "Nothing installed permanently" },
  { label: "plain pi", command: "pi install npm:@pify/memory", note: "No pify CLI needed" },
];

/**
 * pi.dev's own list of what it deliberately did not build, mapped to the
 * packages that cover each item. Hollow cells are the honest part: two
 * items have no package.
 */
const notBuilt: { item: string; answer: string; covered: boolean }[] = [
  { item: "sub-agents", answer: "subagent, swarm", covered: true },
  { item: "plan mode", answer: "plan-mode", covered: true },
  { item: "to-dos", answer: "todo, task", covered: true },
  { item: "permission popups", answer: "yolo", covered: true },
  { item: "background bash", answer: "not covered", covered: false },
  { item: "MCP", answer: "not covered", covered: false },
];

export function Hero() {
  return (
    <section className="container-x pt-14 pb-20 md:pt-20 md:pb-28 lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <p className="label">Pi Packages · @pify on npm · MIT</p>
        <h1 className="h1 mt-6">
          Pi packages for the parts pi left out
          <span className="sr-only">.</span>
          <span aria-hidden="true" className="cell-stop snap" />
        </h1>
        <p className="lede mt-6 max-w-[34em] text-muted">
          Pify is sixteen open-source extensions for the pi coding agent: plan
          mode, subagents, persistent memory, task tracking, a safety gate with
          an undo trail, and more. Each one is an ordinary Pi Package. Install
          one or all sixteen; pi itself stays as small as it shipped.
        </p>

        <InstallBlock tabs={tabs} className="mt-10" />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          No pi yet? <code className="code-inline">pify setup</code> installs it
          and is safe to re-run. Then{" "}
          <code className="code-inline">pify install core</code> adds the
          everyday four.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={DOCS_URL} className="btn btn-primary">
            Read the Agent Book
          </a>
          <a href={ORG_URL} className="btn btn-secondary">
            Source on GitHub
          </a>
        </div>
      </div>

      <aside
        aria-labelledby="not-built-heading"
        className="mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0"
      >
        <p id="not-built-heading" className="label">
          From pi.dev: what we didn&apos;t build
        </p>
        <ul className="mt-4 border-t border-line font-mono text-[13px] leading-5">
          {notBuilt.map((row) => (
            <li
              key={row.item}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 border-b border-line py-2.5"
            >
              <span
                aria-hidden="true"
                className={`cell cell-sm ${row.covered ? "" : "cell-hollow"}`}
              />
              <span className="text-muted">no {row.item}</span>
              <span className={row.covered ? "text-fg" : "text-muted"}>
                {row.answer}
                <span className="sr-only">
                  {row.covered ? " (covered by a Pify package)" : " (no Pify package)"}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-5 text-muted">
          Filled cells have a Pify package. Hollow cells do not.
        </p>
      </aside>
    </section>
  );
}
