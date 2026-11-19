/** Figma: Logo (2:34 / 7:593) — gradient mark + Bebas wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`}>
      <span className="bg-brand-gradient flex size-[34px] items-center justify-center rounded-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/ui/logo-mark.svg" alt="" width={18} height={18} />
      </span>
      <span className="font-display text-[25px] leading-none uppercase text-white">
        Clipnova
      </span>
    </a>
  );
}
