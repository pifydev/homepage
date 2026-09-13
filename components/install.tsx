import { CopyCommand } from "./copy-command";
import { SectionRule } from "./section-rule";

const steps: { command: string; text: React.ReactNode }[] = [
  {
    command: "npm install -g @pify/cli",
    text: "Installs the pify CLI from npm. Needs Node 22.19 or newer, the same floor as pi.",
  },
  {
    command: "pify setup",
    text: (
      <>
        Installs the pi coding agent if it is missing. Safe to re-run. Pin a
        version your team has tested with{" "}
        <code className="code-inline whitespace-nowrap">--pi-version</code>.
      </>
    ),
  },
  {
    command: "pify install core",
    text: (
      <>
        Adds todo, plan-mode, memory and yolo. Swap core for agents or suite, or
        name packages:{" "}
        <code className="code-inline whitespace-nowrap">pify install goal task</code>.
      </>
    ),
  },
];

/** Commands and comments are the ones in the @pify/cli README. */
const everyday = [
  { cmd: "pify list", note: "show the @pify catalog with install state" },
  { cmd: "pify install goal task", note: "short names resolve to @pify/goal, @pify/task" },
  { cmd: "pify install suite", note: "the whole suite in one go (also: core, agents)" },
  { cmd: "pify update --check", note: "what is out of date, changing nothing" },
  { cmd: "pify update", note: "update pi + every installed @pify package" },
  { cmd: "pify doctor", note: "diagnose node / npm / pi / settings" },
  { cmd: "pify profile save", note: "write the installed suite + versions to a file" },
  { cmd: "pify profile apply f.json", note: "diff it against this machine; --yes to apply" },
  { cmd: "pify init my-extension", note: "scaffold a new Pi Package" },
];

const adds = [
  {
    lead: "Bootstrap.",
    text: "pify setup uses the same invocation as pi's official installers, falls back to bun when npm is absent, and never runs sudo.",
  },
  {
    lead: "Short names and bundles.",
    text: "goal means @pify/goal. suite, core and agents are names too.",
  },
  {
    lead: "A doctor.",
    text: "Checks node, npm, pi and settings, and warns when two extensions register the same command or tool.",
  },
  {
    lead: "Profiles.",
    text: "The suite you actually run, written to a file so a second machine can reproduce it. Apply shows the diff first.",
  },
  {
    lead: "Scaffolding.",
    text: "pify init emits a correctly shaped Pi Package: raw TypeScript entry, no build step.",
  },
  {
    lead: "Tab completion.",
    text: "Generated from the live command registry for bash, zsh, fish and PowerShell.",
  },
  {
    lead: "Hands off pi's settings.",
    text: "Every package operation delegates to pi install, pi remove or pi update. No interactive prompts, so it behaves the same in CI.",
  },
];

export function Install() {
  return (
    <section id="install" className="container-x py-20 md:py-28">
      <SectionRule index="02" label="Install" />
      <h2 className="h2 mt-8 max-w-[24ch]">Three commands to a working pi.</h2>

      <ol className="mt-10 grid gap-x-8 gap-y-10 xl:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.command} className="border-t border-line pt-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="cell" />
              <span className="label text-fg">Step {String(i + 1).padStart(2, "0")}</span>
            </div>
            <CopyCommand command={s.command} className="mt-4" />
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <p className="label">Everyday commands</p>
          <div className="mt-4 border border-line bg-surface p-5 font-mono text-[13px] leading-6">
            <ul className="grid gap-y-1.5 sm:grid-cols-[auto_1fr] sm:gap-x-5">
              {everyday.map((row) => (
                <li key={row.cmd} className="contents">
                  <span className="text-fg">{row.cmd}</span>
                  <span className="mb-1.5 text-muted sm:mb-0"># {row.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <p className="label">What the CLI adds</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {adds.map((a) => (
              <li key={a.lead} className="py-3 text-sm leading-relaxed">
                <span className="font-medium text-fg">{a.lead}</span>{" "}
                <span className="text-muted">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <p className="label lg:col-span-3">Without the CLI</p>
        <div className="mt-4 lg:col-span-7 lg:mt-0">
          <CopyCommand command="pi install npm:@pify/memory" />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Every package is a plain Pi Package. pi installs it on its own; the
            pify CLI is optional.
          </p>
        </div>
      </div>
    </section>
  );
}
