import { PI_URL } from "@/lib/packages";
import { SectionRule } from "./section-rule";

export function Why() {
  return (
    <section id="why" className="container-x py-20 md:py-28">
      <SectionRule index="01" label="Why" />
      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="h2 lg:sticky lg:top-24">pi stays small on purpose.</h2>
        </div>
        <div className="prose-x mt-6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <p>
            <a href={PI_URL}>pi.dev</a> keeps a list of things it deliberately
            did not build: sub-agents, plan mode, to-dos, permission popups,
            background bash, MCP. Its advice is to ask pi to build what you
            want, or install a package that does it your way.
          </p>
          <p>
            Pify takes the second path. Five of the six items on that list ship
            as packages today: <code>subagent</code> and <code>swarm</code> for
            delegation, <code>plan-mode</code> for a read-only planning gate,{" "}
            <code>todo</code> and <code>task</code> for tracking,{" "}
            <code>yolo</code> for a permission gate you tune instead of a dialog
            you dismiss, <code>shell-background</code> for commands that outlive
            a turn. MCP is not covered yet. The rest of the catalog, memory,
            recall, usage, search, worktree and the others, follows the same
            rule: a separate package, installed on its own.
          </p>
          <p>
            Nothing is patched into pi. The CLI hands every install to{" "}
            <code>pi install</code> and never edits pi&apos;s settings, so
            anything pify does you could have typed yourself. Install what you
            want, remove what you do not, and the harness underneath stays as
            minimal as its authors intended.
          </p>
        </div>
      </div>
    </section>
  );
}
