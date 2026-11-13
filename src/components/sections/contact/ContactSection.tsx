import { Mail, MapPin, Phone } from "lucide-react";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

const details = [
  { icon: Mail, label: "Email", value: site.contact.email },
  { icon: Phone, label: "Phone", value: site.contact.phone },
  { icon: MapPin, label: "Office", value: site.contact.address },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative isolate overflow-hidden bg-white">
      <TopographicBackground className="-z-10 opacity-60" animated={false} />
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            index="10"
            eyebrow="Contact"
            title={"Let's Talk About Smarter\nSurvey Drafting."}
            highlight={["Smarter"]}
            description="Book a demo or ask us anything. Tell us about your team and workflow, and we'll show you how DaVinci can help."
          />

          <Reveal as="dl" className="mt-12 space-y-px overflow-hidden rounded-2xl border border-deep/[0.07] bg-deep/[0.07]">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 bg-white px-5 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky text-electric">
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</dt>
                  <dd className="mt-0.5 truncate text-[15px] font-medium text-deep">{value}</dd>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Follow</span>
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${s.label} (link coming soon)`}
                className="rounded-full border border-deep/10 px-3.5 py-1.5 text-xs font-medium text-deep/70 transition hover:border-electric/50 hover:text-electric"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
