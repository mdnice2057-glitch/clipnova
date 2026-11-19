import { Eyebrow } from "./Eyebrow";

/** Figma: Section Header (2:24) — centered eyebrow, title, subtitle. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex max-w-[900px] flex-col items-center gap-5 text-center ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-chrome font-display text-[42px] leading-none md:text-[61px]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[640px] text-base leading-[1.55] text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Left-aligned variant used by Stats / Feed / Discussion heads. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-3.5 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-chrome font-display text-[35px] leading-none md:text-[50px]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[560px] text-base leading-[1.6] text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
