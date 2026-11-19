"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChipGroup } from "@/components/ui/ChoiceChip";
import { Stars } from "@/components/ui/Stars";
import { reviewCategories, reviews, type Review } from "./data";

const sortOptions = ["Most recent", "Oldest first"] as const;
type SortOption = (typeof sortOptions)[number];

/** Figma: Testimonial Card (7:366) */
function TestimonialCard({ review, order }: { review: Review; order: number }) {
  return (
    <article
      style={{ order }}
      className="flex w-full flex-col items-start gap-[22px] rounded-3xl border border-subtle bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <Stars count={review.rating} size={16} gap={3} />
        <span className="rounded-full bg-[rgba(242,185,255,0.1)] px-2.5 py-[5px] text-[13px] leading-[normal] font-semibold whitespace-nowrap text-[#f2b9ff]">
          {review.metric}
        </span>
      </div>
      <blockquote className="w-full text-[17px] leading-[1.58] text-white">
        {review.quote}
      </blockquote>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.avatar}
          alt=""
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <p className="text-base leading-[normal] font-semibold text-white">{review.name}</p>
          <p className="text-sm leading-[normal] text-muted">{review.meta}</p>
        </div>
      </div>
    </article>
  );
}

/** Figma: Sort (27:928) — pill that opens a small sort menu. */
function SortMenu({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-subtle bg-surface py-[9px] pr-3 pl-3.5 text-[13px] leading-[normal] font-medium whitespace-nowrap text-muted transition-colors hover:border-white/25 hover:text-white"
      >
        Sort: {value}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/reviews/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Sort reviews"
          className="absolute top-full right-0 z-20 mt-2 min-w-full rounded-2xl border border-subtle bg-elevated p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
        >
          {sortOptions.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-[13px] font-medium whitespace-nowrap transition-colors hover:bg-white/5 ${
                  option === value ? "text-[#f2b9ff]" : "text-muted"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const COLUMNS = 3;

/** Figma: Review Filters (27:912) + Masonry (7:393) */
export function ReviewBoard() {
  const [category, setCategory] = useState<string>(reviewCategories[0]);
  const [sort, setSort] = useState<SortOption>("Most recent");

  const visible = useMemo(() => {
    const filtered =
      category === reviewCategories[0]
        ? reviews
        : reviews.filter((r) => r.category === category);
    return [...filtered].sort((a, b) =>
      sort === "Most recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [category, sort]);

  // Deal cards round-robin into columns (desktop masonry). Below lg the column
  // wrappers use `display: contents`, and each card's `order` keeps the sorted order.
  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    visible
      .map((review, index) => ({ review, index }))
      .filter(({ index }) => index % COLUMNS === c),
  );

  return (
    <>
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <ChipGroup
          options={[...reviewCategories]}
          value={category}
          onChange={setCategory}
        />
        <SortMenu value={sort} onChange={setSort} />
      </div>

      {visible.length === 0 ? (
        <p className="w-full rounded-3xl border border-subtle bg-surface p-10 text-center text-muted">
          No reviews in this category yet.
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:items-start">
          {columns.map((col, c) => (
            <div key={c} className="contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-4">
              {col.map(({ review, index }) => (
                <TestimonialCard key={review.id} review={review} order={index} />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
