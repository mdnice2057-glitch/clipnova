import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stars } from "@/components/ui/Stars";
import { reviews, type Review } from "./testimonials/data";

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex w-[85%] shrink-0 snap-start flex-col gap-5 p-6 sm:w-[60%] md:w-auto">
      <Stars count={review.rating} size={14} gap={3} />
      <blockquote className="flex-1 text-[15px] leading-[1.65] text-white/80">
        {review.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.avatar}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full object-cover"
        />
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-white">{review.name}</span>
          <span className="truncate text-xs text-muted">{review.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Figma: Testimonials (7:387) */
export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-x-clip py-20 md:py-[120px]">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-4 md:gap-12 md:px-6 xl:px-0">
        <div className="flex flex-col items-center gap-6">
          <SectionHeader eyebrow="Client reviews" title="Reviews & feedback" />
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="font-display text-[22px] leading-none text-white">4.9</span>
            <Stars count={5} size={15} gap={3} />
            <span>from 2,148 verified clients</span>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:w-full md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
