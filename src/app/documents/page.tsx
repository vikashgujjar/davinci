import { ArrowRight, ArrowUpRight, Clock, Download, FileText, Lock, Building2, Boxes, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SurveyGridBackground } from "@/components/backgrounds/SurveyGridBackground";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buttonClass } from "@/components/ui/Button";
import { Reveal, RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { documentCategories, documents, type DocumentCategory, type EssentialDocument } from "@/lib/documents";

export const metadata: Metadata = {
  title: "Essential Documents",
  description: "DaVinci company, product, security and legal documents in one place.",
  alternates: { canonical: "/documents" },
};

const categoryIcons: Record<DocumentCategory, LucideIcon> = {
  Company: Building2,
  Product: Boxes,
  Security: Lock,
  Legal: Scale,
};

export default function DocumentsPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Intro */}
        <section aria-labelledby="documents-title" className="relative isolate overflow-hidden bg-white pb-16 pt-36 md:pb-20 md:pt-44">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_20%,#eaf2ff_0%,transparent_60%)]" />
          <SurveyGridBackground className="-z-10" markers={false} />
          <TopographicBackground className="-z-10" animated={false} />
          <div className="container-x">
            <SectionHeading
              id="documents-title"
              eyebrow="Resources"
              title={"Essential\nDocuments."}
              highlight={["Documents"]}
              description="Company, product, security and legal documents for DaVinci, all in one place. Need something you can't find here? Our team is happy to help."
            />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2">
              {documentCategories.map(({ name }) => (
                <a
                  key={name}
                  href={`#${name.toLowerCase()}`}
                  className="rounded-full border border-deep/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-deep/80 backdrop-blur transition hover:border-electric/50 hover:text-electric"
                >
                  {name}
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Document groups */}
        <section aria-label="Document library" className="relative bg-mist py-20 md:py-24">
          <div className="container-x space-y-16 md:space-y-20">
            {documentCategories.map(({ name, blurb }) => {
              const items = documents.filter((d) => d.category === name);
              if (items.length === 0) return null;
              const Icon = categoryIcons[name];
              return (
                <div key={name} id={name.toLowerCase()} className="scroll-mt-28 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
                  <Reveal className="lg:sticky lg:top-28 lg:self-start">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-electric text-white shadow-glow">
                      <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-deep">{name}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{blurb}</p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-deep/35">
                      {items.length} {items.length === 1 ? "document" : "documents"}
                    </p>
                  </Reveal>

                  <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
                    {items.map((doc) => (
                      <RevealItem as="li" key={doc.title}>
                        <DocumentCard doc={doc} />
                      </RevealItem>
                    ))}
                  </Stagger>
                </div>
              );
            })}
          </div>
        </section>

        {/* Request */}
        <section aria-labelledby="request-title" className="bg-white py-20 md:py-24">
          <div className="container-x">
            <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-deep px-8 py-12 text-white sm:px-12 md:flex md:items-center md:justify-between md:gap-10">
              <TopographicBackground tone="dark" animated={false} className="-z-10 opacity-70" />
              <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-electric/40 blur-[100px]" />
              <div className="max-w-xl">
                <h2 id="request-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Need a specific document?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Request a document that isn&apos;t available yet, or ask us for anything your procurement or compliance team needs.
                </p>
              </div>
              <Link href="/#contact" className={buttonClass("light", "lg", "mt-8 shrink-0 md:mt-0")}>
                Request a document
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DocumentCard({ doc }: { doc: EssentialDocument }) {
  const available = Boolean(doc.href);
  const isPage = doc.format === "Page";

  return (
    <article
      className={`group relative flex h-full flex-col rounded-[22px] border bg-white p-6 transition-all duration-500 ${
        available ? "border-deep/[0.07] hover:-translate-y-1 hover:border-electric/30 hover:shadow-float" : "border-dashed border-deep/15"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-11 items-center justify-center rounded-xl transition-colors duration-500 ${
            available ? "bg-sky text-electric group-hover:bg-electric group-hover:text-white" : "bg-mist text-deep/35"
          }`}
        >
          <FileText className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="rounded-md bg-mist px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-deep/60">{doc.format}</span>
      </div>

      <h3 className={`mt-5 text-lg font-semibold leading-snug tracking-tight ${available ? "text-deep" : "text-deep/70"}`}>{doc.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{doc.description}</p>

      <div className="mt-6 border-t border-deep/[0.06] pt-4">
        {!available ? (
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
            <Clock className="size-4" aria-hidden /> Coming soon
          </span>
        ) : isPage ? (
          <Link href={doc.href!} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-electric transition hover:text-deep">
            Read online
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            <span className="absolute inset-0 rounded-[22px]" aria-hidden />
          </Link>
        ) : (
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-electric transition hover:text-deep"
          >
            <Download className="size-4" aria-hidden />
            View / download {doc.format}
            <span className="sr-only"> (opens in a new tab)</span>
            <span className="absolute inset-0 rounded-[22px]" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
