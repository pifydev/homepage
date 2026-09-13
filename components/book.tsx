import { DOCS_URL } from "@/lib/packages";
import { SectionRule } from "./section-rule";

/** Chapter slugs come from the docs sitemap; titles from the book's index. */
const chapters = [
  { slug: "ch01-overview", title: "Why Pi is worth studying" },
  { slug: "ch02-three-layer-arch", title: "The three-layer architecture" },
  { slug: "ch03-agent-loop", title: "The agent loop" },
  { slug: "ch04-model-invocation", title: "Model invocation: one line, many providers" },
  { slug: "ch05-tool-system", title: "The Tool system" },
  { slug: "ch06-messages", title: "Messages across the model, Agent, and session boundaries" },
  { slug: "ch07-event-driven", title: "Event-driven runtime" },
  { slug: "ch08-context-engineering", title: "Context engineering" },
  { slug: "ch09-compaction", title: "Context compaction when the conversation gets too long" },
  { slug: "ch10-session", title: "Session management: storing, resuming, and branching conversations" },
  { slug: "ch11-testing-evaluation", title: "Testing and Agent evaluation" },
];

const extras = [
  { label: "Quickstart", href: `${DOCS_URL}/en/quickstart` },
  { label: "8 how-to guides", href: `${DOCS_URL}/en/how-to/add-custom-tool` },
  { label: "Reference", href: `${DOCS_URL}/en/reference/api` },
  { label: "Glossary", href: `${DOCS_URL}/en/glossary` },
  { label: "FAQ", href: `${DOCS_URL}/en/help/faq` },
  { label: "Changelog", href: `${DOCS_URL}/en/changelog` },
];

export function Book() {
  return (
    <section id="book" className="container-x py-20 md:py-28">
      <SectionRule index="05" label="Book" />
      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:order-2 lg:col-span-7 lg:col-start-6">
          <h2 className="h2">A book about how pi works, in two languages.</h2>
          <div className="prose-x mt-6">
            <p>
              The Pify Agent Book is source-code reading notes for the Pi Agent
              SDK, written in English and Vietnamese and following pi 0.85.0.
              Eleven chapters go from why pi is worth studying to testing and
              evaluation. Around them sit a Quickstart, eight how-to guides, a
              Reference, a Glossary, an FAQ and a Changelog.
            </p>
            <p>
              It also carries a course,{" "}
              <span className="font-medium text-fg">Build Your Own Pi-style Agent</span>:
              fifteen checkpoints that build a complete offline TypeScript agent
              with deterministic tests, and no provider account or API key.
            </p>
          </div>
          <p className="label mt-6">EN · VI · follows pi 0.85.0</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${DOCS_URL}/en`} className="btn btn-primary">
              Open the Agent Book
            </a>
            <a href={`${DOCS_URL}/en/course`} className="btn btn-secondary">
              Start the course
            </a>
          </div>
        </div>

        <div className="mt-12 lg:order-1 lg:col-span-5 lg:mt-0">
          <p className="label">Chapters</p>
          <ol className="mt-3 border-t border-line">
            {chapters.map((c, i) => (
              <li key={c.slug} className="border-b border-line">
                <a
                  href={`${DOCS_URL}/en/${c.slug}`}
                  className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-2 py-3 text-[15px] leading-snug transition-colors hover:bg-surface"
                >
                  <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-fg">{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-1">
            {extras.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="label inline-flex min-h-11 items-center px-2 text-muted transition-colors hover:text-fg"
                >
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
