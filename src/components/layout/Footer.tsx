import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { Logo } from "@/components/brand/Logo";
import { navLinks, site } from "@/lib/site";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

const productLinks = [
  { label: "Technology", href: "/#technology" },
  { label: "Benefits", href: "/#benefits" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Product Showcase", href: "/#showcase" },
  { label: "Book a Demo", href: "/#contact" },
];

export async function Footer() {
  const year = await getYear();
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <TopographicBackground tone="dark" animated={false} className="opacity-60" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />

      <div className="container-x relative pb-10 pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* The approved logo has a light background; present it on a white plate. */}
            <Link href="/#home" className="inline-block rounded-2xl bg-white px-5 py-4 shadow-[0_20px_50px_-20px_rgb(8_123_238/0.5)]">
              <Logo height={44} />
            </Link>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-white/65">
              DaVinci combines artificial intelligence with surveying workflows to make land survey drafting faster, smarter and more efficient.
            </p>
            <p className="mt-8 font-display text-lg font-semibold tracking-tight text-white">
              The future of survey drafting is <span className="text-gradient-light">intelligent.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Navigate">
              {navLinks.map((l) => (
                <FooterLink key={l.href} href={`/${l.href}`}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Product">
              {productLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Contact" className="col-span-2 sm:col-span-1">
              <li className="flex gap-3 text-sm text-white/60">
                <Mail className="mt-0.5 size-4 shrink-0 text-electric-300" aria-hidden />
                <span className="break-all">{site.contact.email}</span>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Phone className="mt-0.5 size-4 shrink-0 text-electric-300" aria-hidden />
                {site.contact.phone}
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 size-4 shrink-0 text-electric-300" aria-hidden />
                {site.contact.address}
              </li>
              <li className="flex flex-wrap gap-2 pt-2">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`${s.label} (link coming soon)`}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-electric-300/60 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            </FooterCol>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} DaVinci. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-electric-300">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center gap-1 text-sm text-white/65 transition hover:text-white">
        {children}
        <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
      </Link>
    </li>
  );
}
