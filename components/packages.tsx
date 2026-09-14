import { getWeeklyDownloads } from "@/lib/downloads";
import { NPM_ORG_URL } from "@/lib/packages";
import { PackagesCatalog } from "./packages-catalog";
import { SectionRule } from "./section-rule";

export async function Packages() {
  const downloads = await getWeeklyDownloads();

  return (
    <section id="packages" className="container-x py-20 md:py-28">
      <SectionRule index="03" label="Packages" />
      <div className="mt-8 md:flex md:items-end md:justify-between md:gap-8">
        <h2 className="h2 max-w-[20ch]">Sixteen packages. Sixteen cells.</h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted md:mt-0 md:text-right">
          Every package is MIT, published under{" "}
          <a href={NPM_ORG_URL} className="link font-mono text-fg">
            @pify
          </a>{" "}
          on npm, and installable on its own. Names link to source. Descriptions
          are the catalog&apos;s own.
        </p>
      </div>
      <div className="mt-10">
        <PackagesCatalog downloads={downloads} />
      </div>
    </section>
  );
}
