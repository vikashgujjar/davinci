# DaVinci — AI-Powered Land Survey Drafting

Marketing website built with **Next.js 16 (App Router, Cache Components)**, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start
```

## Before launch: replace these placeholders

| What | Where |
| --- | --- |
| Production domain (canonical, sitemap, OG, JSON-LD) | `NEXT_PUBLIC_SITE_URL` env var, or `src/lib/site.ts` |
| Company email, phone, office address | `src/lib/site.ts` → `contact` |
| Social media links | `src/lib/site.ts` → `social` |
| Contact form delivery (email/CRM) | `src/app/actions/contact.ts` (currently validates and logs on the server only) |
| Privacy Policy and Terms text | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Structure

```
src/
  app/                 layout, page, SEO routes (sitemap, robots, OG image), legal pages, error/404/loading
  app/actions/         server action for the contact form
  components/
    backgrounds/       TopographicBackground, SurveyGridBackground, BlueprintBackground,
                       AINetworkBackground, DigitalTerrainBackground (server-rendered SVG/CSS)
    brand/Logo.tsx     approved logo (unmodified; surrounding whitespace trimmed only)
    layout/            Header, MobileNavigation, IntroLoader, Footer, SimplePage
    sections/          one folder/file per homepage section
    ui/                Button, Reveal/Stagger/SplitHeading, Counter, Parallax, SectionHeading, SectionDivider
  lib/                 site config, company claims, FAQ content, motion tokens, SVG geometry helpers
```

## Notes

- **Logo:** the supplied file has an opaque light background, so it always sits on a light surface. In the dark footer it's on a white plate. The original is kept at `public/davinci-logo-original.png`.
- **Claims:** the only performance figures used are the company-provided ones (up to 75% cost savings, about 1 hour to about 7 minutes), centralised in `src/lib/site.ts`.
- **Product showcase:** the dashboard is a conceptual mockup with sample data and is labelled that way on the page.
- **Motion:** respects `prefers-reduced-motion`. The intro is skipped and the looping and parallax effects are disabled.
# davinci
