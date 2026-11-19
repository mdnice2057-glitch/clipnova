/** Figma: Eyebrow (2:22) — small uppercase section label. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand-pink bg-white/[0.04] px-4 py-2 text-[13px] font-semibold uppercase tracking-[1.56px] leading-[1.21] whitespace-nowrap text-white/90 ${className}`}
    >
      {children}
    </span>
  );
}
