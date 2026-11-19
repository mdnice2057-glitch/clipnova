import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";
type Size = "md" | "sm";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow icon (primary/light only). */
  arrow?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

const sizes: Record<Size, string> = {
  md: "pl-7 pr-6 py-4 text-base",
  sm: "pl-[22px] pr-[18px] py-3 text-base",
};

/**
 * Figma: Button/Primary (2:13) — gradient pill with glow,
 * Button/Secondary (2:17) — dark outlined pill,
 * and the white "Order now" override used in the navbar.
 */
export function Button({
  variant = "primary",
  size = "md",
  arrow = variant !== "secondary",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold leading-[1.21] whitespace-nowrap transition-[transform,filter,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink";

  const variants: Record<Variant, string> = {
    primary:
      "bg-brand-gradient text-white drop-shadow-[0_10px_18px_rgba(228,110,255,0.32)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] hover:brightness-110",
    secondary:
      "bg-elevated border border-subtle text-white px-7 py-4 hover:bg-[#242424]",
    light: "bg-white text-black hover:bg-white/90",
  };

  const cls = `${base} ${variant === "secondary" ? "" : sizes[size]} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {arrow && variant !== "secondary" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={
            variant === "light"
              ? "/assets/ui/arrow-right-black.svg"
              : "/assets/ui/arrow-right-white.svg"
          }
          alt=""
          width={18}
          height={18}
          className="size-[18px]"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
