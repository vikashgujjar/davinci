import { Eye, Target, Users } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealItem, SplitHeading, Stagger } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    body: "To transform the way survey drafting workflows are approached, by combining artificial intelligence with surveying processes.",
  },
  {
    icon: Eye,
    title: "Our vision",
    body: "Surveying professionals spending less time on repetitive drafting work, and more time on valuable engineering outcomes.",
  },
  {
    icon: Users,
    title: "Who we serve",
    body: "Land surveying teams who turn field information into drafting deliverables, and want to do it faster and more consistently.",
  },
];

/** Company story: who DaVinci is and why it exists. */
export function AboutCompany() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative isolate overflow-hidden bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Field photo with the company line */}
        <Reveal className="lg:col-span-5">
          <Photo image={images.surveyField} sizes="(min-width: 1024px) 480px, 100vw" className="aspect-[4/5] rounded-[28px] shadow-float lg:sticky lg:top-28">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
            <blockquote className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <span aria-hidden className="block h-px w-10 bg-electric-300" />
              <p className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-[1.75rem]">
                The future of survey drafting is <span className="text-gradient-light">intelligent.</span>
              </p>
            </blockquote>
          </Photo>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-4">
          <Reveal>
            <Eyebrow index="08">About DaVinci</Eyebrow>
          </Reveal>
          <SplitHeading
            id="about-title"
            text={"Bringing Intelligence\nto Surveying."}
            highlight={["Intelligence"]}
            className="mt-6 text-headline font-semibold text-deep"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              <span className="font-medium text-deep">DaVinci is focused on transforming the way survey drafting workflows are approached.</span> By combining
              artificial intelligence with surveying processes, DaVinci aims to make drafting faster, more efficient and more consistent.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-10 space-y-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <RevealItem
                as="li"
                key={title}
                className="group flex gap-5 rounded-2xl border border-deep/[0.07] bg-mist/60 p-6 transition-all duration-500 hover:border-electric/30 hover:bg-white hover:shadow-float"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-electric shadow-soft transition-colors duration-500 group-hover:bg-electric group-hover:text-white">
                  <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-deep">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{body}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
