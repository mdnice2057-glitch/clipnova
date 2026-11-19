import { SectionTitle } from "@/components/ui/SectionHeader";
import { FeedBrowser } from "./feed/FeedBrowser";

/** Figma: Recommended For You (26:726) */
export function RecommendedFeed() {
  return (
    <section id="work" className="scroll-mt-24 pt-10 pb-20 md:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-7 px-4 md:px-6 xl:px-0">
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
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-subtle bg-surface py-1.5 pr-[18px] pl-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/feed/avatar-daniel.png"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full"
            />
            <div className="flex flex-col gap-px whitespace-nowrap">
              <span className="text-sm font-semibold text-white">Hi Daniel 👋</span>
              <span className="text-xs text-muted">Based on your 3 past orders</span>
            </div>
            <button
              type="button"
              aria-label="Tune your recommendations"
              className="flex size-[30px] items-center justify-center rounded-full bg-elevated transition-colors hover:bg-[#2a2a2a]"
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
          className="group flex items-center gap-2 pt-2 text-[15px] leading-normal font-semibold text-[#f2b9ff] hover:text-white"
        >
          Browse all work samples
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/feed/icon-arrow-link.svg"
            alt=""
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
