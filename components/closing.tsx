import { DOCS_URL, NPM_ORG_URL, ORG_URL, PI_URL } from "@/lib/packages";
import { CopyCommand } from "./copy-command";
import { SectionRule } from "./section-rule";

const links = [
  { label: "docs.pify.dev", href: DOCS_URL },
  { label: "github.com/pifydev", href: ORG_URL },
  { label: "npmjs.com/org/pify", href: NPM_ORG_URL },
  { label: "pi.dev", href: PI_URL },
];

export function Closing() {
  return (
    <section id="start" className="container-x py-20 md:py-28">
      <SectionRule index="06" label="Start" />
      <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <h2 className="h1">Install one, or all sixteen.</h2>
          <p className="prose-x mt-6 text-muted">
            pi is at pi.dev. Pify is on npm under @pify and on GitHub under
            pifydev. Every package and the CLI are MIT. If something is still
            missing,{" "}
            <code>pify init my-extension</code> scaffolds a new Pi Package and
            you can publish the seventeenth.
          </p>
          <CopyCommand command="pify install suite" size="lg" className="mt-8 max-w-xl" />
          <ul className="mt-4 flex flex-wrap gap-x-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link inline-flex min-h-11 items-center font-mono text-sm text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:justify-end">
          <div
            className="grid16 [--grid16-cell:2.25rem] [--grid16-gap:0.375rem] sm:[--grid16-cell:2.75rem]"
            role="img"
            aria-label="The four by four grid with all sixteen cells lit: the whole suite."
          >
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} data-on="true" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
