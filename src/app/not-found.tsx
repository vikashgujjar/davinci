import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SimplePage } from "@/components/layout/SimplePage";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SimplePage eyebrow="Error 404 · Off the map" title="This point isn't on the survey.">
      <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <Link href="/" className={buttonClass("primary", "lg", "mt-4")}>
        Return home <ArrowRight className="size-4" aria-hidden />
      </Link>
    </SimplePage>
  );
}
