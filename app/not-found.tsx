import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-x py-24 md:py-32">
        <p className="label">404</p>
        <h1 className="h1 mt-6">There is no page here.</h1>
        <p className="prose-x mt-6 text-muted">
          pify.dev is a single page. Everything lives at the root, and the
          docs live at docs.pify.dev.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn btn-primary">
            Back to pify.dev
          </a>
          <a href="https://docs.pify.dev" className="btn btn-secondary">
            Open the Agent Book
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
