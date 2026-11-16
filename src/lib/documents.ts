/**
 * Essential documents listed on /documents.
 *
 * TO ADD A FILE: put it in `public/documents/` and set `href` to its path,
 * e.g. href: "/documents/davinci-company-profile.pdf".
 * Entries without an `href` are shown as "Coming soon".
 */
export type DocumentCategory = "Company" | "Product" | "Security" | "Legal";

export type EssentialDocument = {
  title: string;
  description: string;
  category: DocumentCategory;
  /** File format shown on the card. "Page" = a page on this website. */
  format: "PDF" | "DOCX" | "Page";
  href?: string;
};

export const documentCategories: { name: DocumentCategory; blurb: string }[] = [
  { name: "Company", blurb: "Who we are and what DaVinci does." },
  { name: "Product", blurb: "How the DaVinci drafting workflow fits your process." },
  { name: "Security", blurb: "How survey information is handled." },
  { name: "Legal", blurb: "Policies that govern use of DaVinci." },
];

export const documents: EssentialDocument[] = [
  {
    title: "Company Profile",
    description: "An introduction to DaVinci, our mission and our approach to AI-powered survey drafting.",
    category: "Company",
    format: "PDF",
  },
  {
    title: "Product Brochure",
    description: "A concise overview of DaVinci's capabilities and the benefits for surveying teams.",
    category: "Company",
    format: "PDF",
  },
  {
    title: "Product Overview",
    description: "How survey information moves through the DaVinci workflow — from input to drafting deliverables.",
    category: "Product",
    format: "PDF",
  },
  {
    title: "Onboarding Guide",
    description: "What to expect when your team starts using DaVinci, and how to prepare your survey information.",
    category: "Product",
    format: "PDF",
  },
  {
    title: "Data Security & Confidentiality Overview",
    description: "How DaVinci approaches the protection and confidentiality of your project information.",
    category: "Security",
    format: "PDF",
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use and protect personal information.",
    category: "Legal",
    format: "Page",
    href: "/privacy",
  },
  {
    title: "Terms & Conditions",
    description: "The terms that apply to use of the DaVinci website and services.",
    category: "Legal",
    format: "Page",
    href: "/terms",
  },
];
