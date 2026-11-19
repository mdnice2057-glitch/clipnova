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
      className="card card-hover group flex w-full flex-col items-start gap-5 overflow-hidden p-6 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 -z-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(228,110,255,0.16),transparent_70%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex w-full items-start justify-between gap-3">
        <span
          aria-hidden
          className="text-brand -mb-3 block h-10 font-display text-[76px] leading-[0.9] select-none"
        >
          “
        </span>
        <span className="rounded-full border border-[rgba(242,185,255,0.22)] bg-[rgba(242,185,255,0.08)] px-3 py-[5px] text-[12px] leading-[normal] font-semibold whitespace-nowrap text-[#f2b9ff]">
          {review.metric}
        </span>
      </div>
      <blockquote className="w-full text-[17px] leading-[1.6] text-white/90">
        {review.quote}
      </blockquote>
      <Stars count={review.rating} size={15} gap={3} />
      <div className="flex w-full items-center gap-3 border-t border-white/[0.07] pt-5">
        <span className="bg-brand-gradient shrink-0 rounded-full p-[1.5px] shadow-[0_6px_18px_-6px_rgba(228,110,255,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.avatar}
            alt=""
            width={44}
            height={44}
            className="block size-11 rounded-full border-2 border-[#111113]"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-base leading-[normal] font-semibold text-white">{review.name}</p>
          <p className="text-sm leading-[normal] text-muted">{review.meta}</p>
        </div>
        <span
          title="Verified client"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/reviews/shield-check.svg"
            alt=""
            width={14}
            height={14}
            className="size-3.5"
          />
          <span className="sr-only">Verified client</span>
        </span>
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
        className={`flex items-center gap-2 rounded-full border py-2.5 pr-3.5 pl-4 text-sm leading-[1.21] font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white ${
          open ? "border-white/25 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.04] text-white/80"
        }`}
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
          className="absolute top-full right-0 z-20 mt-2 min-w-full rounded-2xl border border-white/10 bg-[#161618]/95 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
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
                className={`w-full rounded-xl px-3 py-2 text-left text-[13px] font-medium whitespace-nowrap transition-colors hover:bg-white/[0.06] ${
                  option === value ? "bg-white/[0.04] text-[#f2b9ff]" : "text-muted hover:text-white"
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
      <div className="mt-6 flex w-full flex-col gap-4 md:mt-10 md:flex-row md:items-start md:justify-between">
        <ChipGroup
          options={[...reviewCategories]}
          value={category}
          onChange={setCategory}
        />
        <SortMenu value={sort} onChange={setSort} />
      </div>

      {visible.length === 0 ? (
        <p className="card w-full p-10 text-center text-muted">
          No reviews in this category yet.
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:items-start lg:gap-5">
          {columns.map((col, c) => (
            <div
              key={c}
              className={`contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-5 ${c === 1 ? "lg:pt-10" : ""}`}
            >
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
