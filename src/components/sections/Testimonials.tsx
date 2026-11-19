import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stars } from "@/components/ui/Stars";
import { FeedbackForm } from "./testimonials/FeedbackForm";
import { ReviewBoard } from "./testimonials/ReviewBoard";

const distribution = [
  { stars: 5, pct: 92, label: "92%" },
  { stars: 4, pct: 6, label: "6%" },
  { stars: 3, pct: 1, label: "1%" },
  { stars: 2, pct: 0.5, label: "<1%" },
  { stars: 1, pct: 0.5, label: "<1%" },
];

const categoryRatings = [
  { label: "Quality", value: "4.9" },
  { label: "Communication", value: "5.0" },
  { label: "On-time", value: "4.8" },
];

/** Figma: Score (27:817) */
function ScoreCard() {
  return (
    <div className="card card-lit flex flex-col items-start justify-between gap-6 overflow-hidden p-6 md:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-3 pl-2 text-xs leading-[normal] font-semibold text-white/85">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/reviews/shield-check.svg"
          alt=""
          width={14}
          height={14}
          className="size-3.5"
        />
        Verified rating
      </span>
      <div className="flex flex-col items-start gap-3">
        <p className="flex items-baseline gap-2 font-display whitespace-nowrap">
          <span className="text-brand text-[112px] leading-[0.85] md:text-[132px]">
            4.9
          </span>
          <span className="text-[32px] leading-none text-muted">/ 5</span>
        </p>
        <Stars count={5} size={20} gap={4} />
        <p className="text-sm leading-[normal] text-muted">Based on 2,148 verified reviews</p>
      </div>
    </div>
  );
}

/** Figma: Distribution (27:834) */
function DistributionCard() {
  return (
    <div className="card flex flex-col gap-6 p-6 md:p-8">
      <p className="text-xs leading-[normal] font-semibold tracking-[0.14em] text-muted uppercase">
        Rating breakdown
      </p>
      <ul className="flex flex-col gap-3.5" aria-label="Rating distribution">
        {distribution.map((row) => (
          <li key={row.stars} className="flex w-full items-center gap-3">
            <span className="flex w-7 shrink-0 items-center gap-1 text-sm leading-[normal] font-semibold text-white">
              {row.stars}
              <span className="sr-only"> stars</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/reviews/star-12.svg"
                alt=""
                width={12}
                height={12}
                className="size-3"
              />
            </span>
            <span className="relative h-2.5 min-w-px flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <span
                className="bg-brand-gradient absolute inset-y-0 left-0 rounded-full"
                style={{ width: `max(8px, ${row.pct}%)` }}
              />
            </span>
            <span
              className={`w-[38px] shrink-0 text-right text-[13px] leading-[normal] font-semibold ${
                row.stars === 5 ? "text-white" : "text-muted"
              }`}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-wrap gap-2">
        {categoryRatings.map((c) => (
          <li
            key={c.label}
            className="flex flex-auto flex-col items-start gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
          >
            <span className="text-brand font-display text-[26px] leading-none">{c.value}</span>
            <span className="text-[11px] leading-[normal] whitespace-nowrap text-muted">
              {c.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figma: Rating Summary (27:816) */
function RatingSummary() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.05fr)_minmax(0,1.45fr)]">
      <ScoreCard />
      <DistributionCard />
      {/* Feedback Form (27:886) */}
      <div className="card flex min-w-0 p-6 md:col-span-2 md:p-8 xl:col-span-1">
        <FeedbackForm />
      </div>
    </div>
  );
}

/** Figma: Testimonials (7:387) */
export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-x-clip py-20 md:py-[120px]">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Client reviews"
          title="Reviews & feedback"
          subtitle="Real ratings from verified clients. Every review comes from a completed order."
          className="mb-2 md:mb-4"
        />
        <RatingSummary />
        <ReviewBoard />
      </div>
    </section>
  );
}
