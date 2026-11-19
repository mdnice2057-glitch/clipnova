import { SectionTitle } from "@/components/ui/SectionHeader";
import { FeedBrowser } from "./feed/FeedBrowser";

/** Figma: Recommended For You (26:726) */
export function RecommendedFeed() {
  return (
    <section id="work" className="relative scroll-mt-24 overflow-x-clip pt-10 pb-20 md:pb-[120px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-grid opacity-70" />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-7 px-4 md:px-6 xl:px-0">
        {/* Feed Head (26:727) */}
        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-3.5">
            <SectionTitle eyebrow="✦ Recommended" title="Picked for your next order" />
            <p className="max-w-[560px] text-base leading-[1.5] text-muted md:text-[17px]">
              Work samples matched to your past orders — tap “Order similar” to
              get the same style.
            </p>
          </div>

          {/* Personal Chip (40:1045) */}
          <div className="card flex shrink-0 items-center gap-3 rounded-full py-1.5 pr-2 pl-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/feed/avatar-daniel.png"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full ring-2 ring-brand-pink/40 ring-offset-2 ring-offset-[#141416]"
            />
            <div className="flex flex-col gap-px pr-1 whitespace-nowrap">
              <span className="text-sm font-semibold text-white">Hi Daniel 👋</span>
              <span className="text-xs text-muted">Based on your 3 past orders</span>
            </div>
            <button
              type="button"
              aria-label="Tune your recommendations"
              className="flex size-[34px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-[background-color,border-color] duration-200 hover:border-white/25 hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/feed/icon-personal.svg" alt="" width={15} height={15} />
            </button>
          </div>
        </div>

        <FeedBrowser />

        {/* Browse link (26:868) */}
        <a
          href="#work"
          className="group mt-3 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-1.5 pl-6 text-[15px] leading-normal font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-pink/40 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Browse all work samples
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-pink/15 ring-1 ring-brand-pink/30 transition-colors duration-300 group-hover:bg-brand-pink/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/feed/icon-arrow-link.svg"
              alt=""
              width={16}
              height={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
