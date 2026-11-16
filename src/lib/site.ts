/**
 * Central site configuration.
 *
 * PLACEHOLDERS: values wrapped in [brackets] must be replaced with real,
 * client-approved information before launch. Nothing here is invented.
 */
export const site = {
  name: "DaVinci",
  tagline: "AI-Powered Land Survey Drafting",
  // TODO(client): replace with the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  description:
    "DaVinci combines artificial intelligence with surveying workflows to make land survey drafting faster, smarter and more efficient — turning an approximately one-hour drafting workflow into around seven minutes.",
  contact: {
    email: "[company-email@yourdomain.com]",
    phone: "[+00 000 000 0000]",
    address: "[Office address — to be provided]",
  },
  social: [
    { label: "LinkedIn", href: "#", placeholder: true },
    { label: "X (Twitter)", href: "#", placeholder: true },
    { label: "YouTube", href: "#", placeholder: true },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology" },
  { label: "Benefits", href: "#benefits" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Essential Documents", href: "/documents" },
  { label: "Contact", href: "#contact" },
] as const;

/** Homepage section links ("#faq") must point back to "/" when used on other pages. */
export function resolveHref(href: string, onHome: boolean) {
  return href.startsWith("#") && !onHome ? `/${href}` : href;
}

/** Company-provided performance claims. Do not add to these. */
export const claims = {
  costSavings: 75, // "up to 75%" drafting overhead reduction
  traditionalMinutes: 60, // "approximately one hour"
  davinciMinutes: 7, // "approximately seven minutes"
} as const;
