/** Brand logo — red play mark with the "jonshar Visuals" wordmark set in Urbanist. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Jonshar Visuals — home" className={`flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/brand/jonshar-mark.png" alt="" width={63} height={71} className="h-9 w-auto" />
      <span aria-hidden className="flex items-baseline gap-1.5 leading-none whitespace-nowrap">
        <span className="text-[26px] font-bold tracking-[-0.02em] text-white">jonshar</span>
        <span className="text-[18px] font-medium tracking-[-0.01em] text-white/60">Visuals</span>
      </span>
    </a>
  );
}
