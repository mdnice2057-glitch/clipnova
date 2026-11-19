/** Figma: Tag (2:19) — pill with glowing dot. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-subtle bg-surface py-[11px] pr-5 pl-[18px] text-[15px] leading-[1.21] font-medium text-white">
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
