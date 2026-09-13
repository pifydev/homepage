import { DOCS_URL, NPM_ORG_URL, ORG_URL, PI_URL } from "@/lib/packages";
import { Mark } from "./mark";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Docs", href: DOCS_URL },
  { label: "GitHub", href: ORG_URL },
  { label: "npm", href: NPM_ORG_URL },
  { label: "pi.dev", href: PI_URL },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-12">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div className="flex items-center gap-3">
            <Mark size={20} />
            <span className="text-[15px] font-medium">Pify</span>
            <span className="label hidden sm:inline">Pi Packages for the pi coding agent · MIT</span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="label inline-flex min-h-11 items-center px-3 text-fg transition-colors hover:text-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>

        <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-muted">
          pi is a separate project at pi.dev. Pify packages are ordinary Pi
          Packages, published under <span className="font-mono">@pify</span> on
          npm and maintained at github.com/pifydev.
        </p>
      </div>
    </footer>
  );
}
