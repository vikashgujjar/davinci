import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "DaVinci terms and conditions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SimplePage eyebrow="Legal" title="Terms & Conditions">
      <p className="rounded-2xl border border-electric/20 bg-sky/60 p-5 text-deep">
        <strong>Placeholder.</strong> DaVinci&apos;s official terms and conditions will be published here. This page must be replaced
        with client-approved legal text before launch.
      </p>
      <p>
        For questions in the meantime, please contact us at <span className="font-medium text-deep">{site.contact.email}</span>.
      </p>
    </SimplePage>
  );
}
