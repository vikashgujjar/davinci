import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";

type Props = {
  image: SiteImage;
  /** Sizing/shape of the frame, e.g. "aspect-[4/3] rounded-2xl". */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Decorative background use: hides the image from assistive tech. */
  decorative?: boolean;
  imgClassName?: string;
  children?: ReactNode;
};

/** Responsive, optimized photo that covers its frame. Children render on top. */
export function Photo({ image, className = "", sizes = "100vw", priority, decorative, imgClassName = "", children }: Props) {
  // Animated GIFs have no blur preview, and optimizing them would drop the
  // animation, so they are served as-is.
  const animated = image.src.src.toLowerCase().endsWith(".gif");
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={animated}
        placeholder={animated || !image.src.blurDataURL ? "empty" : "blur"}
        className={`object-cover ${imgClassName}`}
      />
      {children}
    </div>
  );
}
