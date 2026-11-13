import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DaVinci privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Privacy Policy">
      <p className="rounded-2xl border border-electric/20 bg-sky/60 p-5 text-deep">
        <strong>Placeholder.</strong> DaVinci&apos;s official privacy policy will be published here. This page must be replaced with
        client-approved legal text before launch.
      </p>
      <p>
        For privacy questions in the meantime, please contact us at <span className="font-medium text-deep">{site.contact.email}</span>.
      </p>
    </SimplePage>
  );
}
