import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { AboutCompany } from "@/components/sections/AboutCompany";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AboutDaVinci } from "@/components/sections/meet/AboutDaVinci";
import { ProblemSection } from "@/components/sections/problem/ProblemSection";
import { ProductShowcase } from "@/components/sections/showcase/ProductShowcase";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "DaVinci",
      url: site.url,
      logo: `${site.url}/davinci-logo.png`,
      description: site.description,
    },
    {
      "@type": "SoftwareApplication",
      name: "DaVinci",
      applicationCategory: "BusinessApplication",
      description:
        "AI-powered land survey drafting software that helps transform survey information into organized drafting deliverables.",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <IntroProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <IntroLoader />
      <Header />
      <main id="main">
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <AboutDaVinci />
        <BenefitsSection />
        <HowItWorks />
        <ProductShowcase />
        <ComparisonSection />
        <WhyChooseUs />
        <AboutCompany />
        <SectionDivider />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </IntroProvider>
  );
}
