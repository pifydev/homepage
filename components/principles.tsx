import { SectionRule } from "./section-rule";

/**
 * Rules that recur across the READMEs. Each gloss names the package whose
 * README states it, so every line is checkable against the source.
 */
const rules = [
  {
    title: "Plain markdown you can read and commit.",
    gloss: "memory keeps two tiers of markdown files. plan-mode writes plans to .pi/plans so a plan can be reviewed tomorrow.",
  },
  {
    title: "Enforced at the tool level, not just prompted.",
    gloss: "plan-mode blocks edit and write through a tool hook. A prompt asking the model to hold off is a request; a hook that refuses the write is an answer.",
  },
  {
    title: "Consent before reading repo-shipped files.",
    gloss: "memory asks once per project before a repository's MEMORY.md goes in front of the model. Headless, the answer is no unless PIFY_TRUST_PROJECT=1.",
  },
  {
    title: "No surprise model calls.",
    gloss: "memory re-attaches itself after compaction without calling a model. usage reports cost without spending tokens to ask about tokens.",
  },
  {
    title: "Measured, not assumed.",
    gloss: "skills takes its numbers from pi's own prompt builder. memory's compaction survival is a live test in the repo, not a claim.",
  },
  {
    title: "Undo trails.",
    gloss: "yolo keeps an undo trail so auto-approve never means unrecoverable. memory_forget writes a recovery record before it deletes.",
  },
  {
    title: "The same in a terminal and in CI.",
    gloss: "The CLI has no interactive prompts; behaviour is identical in TTY and CI except colour. yolo denies instead of asking when there is no UI.",
  },
  {
    title: "Windows-first.",
    gloss: "worktree calls itself Windows-first: no tmux, no daemons, no shell interpolation. pify setup hands off to install.ps1 on Windows.",
  },
];

export function Principles() {
  return (
    <section id="principles" className="container-x py-20 md:py-28">
      <SectionRule index="04" label="Principles" />
      <h2 className="h2 mt-8 max-w-[26ch]">Rules that recur across the READMEs.</h2>
      <p className="lede mt-5 max-w-[46ch] text-muted">
        Constraints the code enforces, not slogans. Each line names the package
        whose README states it.
      </p>

      <ol className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12">
        {rules.map((r, i) => (
          <li
            key={r.title}
            className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-line py-6"
          >
            <span className="label pt-1 text-fg">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-[17px] font-medium leading-snug">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.gloss}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
