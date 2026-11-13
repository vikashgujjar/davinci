import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-dark" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[var(--ease-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white shadow-[0_8px_24px_-8px_rgb(8_123_238/0.6)] hover:-translate-y-0.5 hover:bg-electric-600 hover:shadow-glow",
  secondary:
    "border border-deep/15 bg-white/70 text-deep backdrop-blur hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric hover:shadow-soft",
  "ghost-dark":
    "border border-white/20 text-white hover:-translate-y-0.5 hover:border-electric-300/70 hover:bg-white/5 hover:shadow-[0_0_0_1px_rgb(111_179_247/0.3),0_10px_30px_-12px_rgb(8_123_238/0.6)]",
  light: "bg-white text-deep hover:-translate-y-0.5 hover:shadow-glow",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Sheen that sweeps across primary buttons on hover. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-[var(--ease-expo)] group-hover:left-[120%] group-hover:opacity-100"
    />
  );
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size; icon?: ReactNode };

export function ButtonLink({ variant = "primary", size = "md", icon, className = "", children, ...rest }: LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      {variant === "primary" && <Sheen />}
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </Link>
  );
}
