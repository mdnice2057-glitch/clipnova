/** Figma: Tag (2:19) — pill with glowing dot. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-subtle bg-surface py-2.5 pr-4 pl-3.5 text-left text-[13px] leading-[1.21] sm:gap-2.5 sm:py-[11px] sm:pr-5 sm:pl-[18px] sm:text-[15px] font-medium text-white">
      <span className="relative size-2 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/ui/tag-dot.svg"
          alt=""
          className="animate-pulse-dot absolute -inset-full size-[300%] max-w-none"
        />
      </span>
      {children}
    </span>
  );
}
