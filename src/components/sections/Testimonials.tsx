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

function Divider() {
  return <div aria-hidden className="h-px w-full shrink-0 bg-subtle xl:h-[170px] xl:w-px" />;
}

/** Figma: Rating Summary (27:816) */
function RatingSummary() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-[28px] border border-subtle bg-surface px-6 py-8 md:px-10 md:py-9 xl:flex-row xl:items-center xl:gap-0">
      {/* Score (27:817) */}
      <div className="flex shrink-0 flex-col items-start gap-2.5 xl:w-[250px]">
        <p className="flex items-baseline gap-1.5 font-display whitespace-nowrap">
          <span className="text-chrome text-[108px] leading-none">4.9</span>
          <span className="text-[31px] leading-[normal] text-muted">/ 5</span>
        </p>
        <Stars count={5} size={20} gap={4} />
        <p className="text-sm leading-[normal] text-muted">Based on 2,148 verified reviews</p>
      </div>

      <Divider />

      {/* Distribution (27:834) */}
      <div className="flex w-full shrink-0 flex-col gap-3 xl:w-[470px] xl:px-10">
        <ul className="flex flex-col gap-3" aria-label="Rating distribution">
          {distribution.map((row) => (
            <li key={row.stars} className="flex w-full items-center gap-3">
              <span className="flex shrink-0 items-center gap-1 text-sm leading-[normal] font-semibold text-white">
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
              <span className="relative h-2 min-w-px flex-1 overflow-hidden rounded-[99px] bg-elevated">
                <span
                  className="bg-brand-gradient absolute top-0 left-0 h-2 rounded-[99px]"
                  style={{ width: `max(6px, ${row.pct}%)` }}
                />
              </span>
              <span className="w-[34px] shrink-0 text-right text-[13px] leading-[normal] font-medium text-muted">
                {row.label}
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-start gap-2 pt-1.5 text-xs leading-[normal] whitespace-nowrap">
          {categoryRatings.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-1.5 rounded-full bg-elevated px-2.5 py-[5px]"
            >
              <span className="text-muted">{c.label}</span>
              <span className="font-bold text-[#f2b9ff]">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      {/* Feedback Form (27:886) */}
      <div className="flex min-w-0 flex-1 xl:pl-10">
        <FeedbackForm />
      </div>
    </div>
  );
}

/** Figma: Testimonials (7:387) */
export function Testimonials() {
  return (
    <section id="reviews" className="py-20 md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Client reviews"
          title="Reviews & feedback"
          subtitle="Real ratings from verified clients. Every review comes from a completed order."
        />
        <RatingSummary />
        <ReviewBoard />
      </div>
    </section>
  );
}
