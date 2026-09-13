import { DOCS_URL, ORG_URL } from "@/lib/packages";
import { Mark } from "./mark";
import { ThemeToggle } from "./theme-toggle";

const anchors = [
  { label: "Why", href: "#why" },
  { label: "Install", href: "#install" },
  { label: "Packages", href: "#packages" },
];

const external = [
  { label: "Book", href: DOCS_URL },
  { label: "GitHub", href: ORG_URL },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="container-x flex h-16 items-center justify-between gap-2 sm:gap-4">
        <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="Pify, back to top">
          <Mark size={22} snap />
          <span className="hidden text-[15px] font-medium tracking-[-0.01em] sm:inline">pify</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center md:flex">
            {anchors.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="label inline-flex min-h-11 items-center px-3 text-muted transition-colors hover:text-fg"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex items-center">
            {external.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="label inline-flex min-h-11 items-center px-1.5 text-fg transition-colors hover:text-muted sm:px-3"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle className="ml-1 sm:ml-2" />
        </nav>
      </div>
    </header>
  );
}
