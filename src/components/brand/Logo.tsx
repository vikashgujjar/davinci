import Image from "next/image";
import logo from "../../../public/davinci-logo.png";

type Props = {
  className?: string;
  priority?: boolean;
  /** Rendered height in px; width follows the approved logo's aspect ratio. */
  height?: number;
};

/**
 * The approved DaVinci logo, used unmodified (only surrounding whitespace was
 * trimmed from the supplied file). It has an opaque light background, so it
 * must always sit on a light surface.
 */
export function Logo({ className = "", priority = false, height = 40 }: Props) {
  const width = Math.round((logo.width / logo.height) * height);
  return (
    <Image
      src={logo}
      alt="DaVinci — AI-Powered Land Survey Drafting"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={`select-none mix-blend-multiply ${className}`}
      style={{ width, height: "auto" }}
    />
  );
}
