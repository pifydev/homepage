import { Book } from "@/components/book";
import { Closing } from "@/components/closing";
import { Hero } from "@/components/hero";
import { Install } from "@/components/install";
import { Packages } from "@/components/packages";
import { Principles } from "@/components/principles";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Why } from "@/components/why";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Why />
        <Install />
        <Packages />
        <Principles />
        <Book />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
