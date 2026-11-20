"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FEED_FILTERS, FEED_ITEMS, type FeedFilter, type FeedItem } from "./data";

const glass =
  "border border-white/[0.14] bg-[rgba(10,10,10,0.55)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]";

const zoom =
  "transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink";

/** Mobile: fixed-width carousel slide. sm+: a regular grid cell. */
const slide = "w-[78%] shrink-0 snap-start sm:w-auto";

function itemsFor(filter: FeedFilter) {
  return filter === "For you"
    ? FEED_ITEMS
    : FEED_ITEMS.filter((i) => i.filters.includes(filter));
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.75V8l2.25 1.5" />
    </svg>
  );
}

function MatchBadge({ value }: { value: number }) {
  return (
    <span
      className={`flex items-center gap-1 rounded-full py-1 pr-2.5 pl-2 text-[11px] font-semibold whitespace-nowrap text-white ${glass}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/feed/icon-sparkle.svg" alt="" width={11} height={11} />
      {value}% match
    </span>
  );
}

function Duration({ value }: { value: string }) {
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white ${glass}`}
    >
      {value}
    </span>
  );
}

/** Figma: Filters (26:735) — pills with result counts; scrolls sideways on mobile. */
function FilterBar({
  value,
  onChange,
}: {
  value: FeedFilter;
  onChange: (v: FeedFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter work samples"
      className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 md:mx-0 md:w-full md:flex-wrap md:px-0"
    >
      {FEED_FILTERS.map((f) => {
        const selected = f === value;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(f)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full py-2 pr-2 pl-4 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-200 ${focusRing} ${
              selected
                ? "bg-white text-black"
                : "border border-white/10 bg-white/[0.04] text-white/75 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {f}
            <span
              className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-[11px] leading-none tabular-nums ${
                selected ? "bg-black/10 text-black/70" : "bg-white/[0.08] text-white/60"
              }`}
            >
              {itemsFor(f).length}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Figma: Top Pick (40:1077) — featured recommendation: preview left, details right. */
function TopPick({ item }: { item: FeedItem }) {
  const [saved, setSaved] = useState(false);
  const [type, duration, format] = item.chips;

  const specs = [
    {
      label: "Rating",
      value: item.rating,
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/assets/feed/icon-star.svg" alt="" width={12} height={12} />
      ),
    },
    {
      label: "Delivery",
      value: item.turnaround,
      icon: <ClockIcon className="size-3 text-white/60" />,
    },
    { label: "Format", value: format, icon: null },
  ];

  return (
    <article className="card card-lit grid overflow-hidden rounded-[28px] lg:grid-cols-[1.15fr_1fr]">
      {/* Preview */}
      <div className="group relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          className={`absolute inset-0 size-full object-cover group-hover:scale-105 ${zoom}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.45)_0%,transparent_30%,transparent_65%,rgba(10,10,10,0.6)_100%)]"
        />
        <span className="bg-brand-gradient absolute top-4 left-4 flex items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] sm:top-5 sm:left-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-top-pick.svg" alt="" width={12} height={12} />
          <span className="text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-white uppercase">
            Top pick for you
          </span>
        </span>
        <button
          type="button"
          aria-label={`Play preview: ${item.title}`}
          className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/[0.16] shadow-[0_0_0_8px_rgba(255,255,255,0.06)] backdrop-blur-[10px] transition-[transform,background-color] duration-300 hover:scale-110 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-[72px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-play.svg" alt="" width={24} height={24} className="translate-x-px" />
        </button>
        <span className="absolute right-4 bottom-4 sm:right-5 sm:bottom-5">
          <Duration value={duration} />
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6 p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="font-semibold text-white">{item.match}% match</span>
            <span className="text-muted">with your past orders</span>
          </div>
          <div
            role="meter"
            aria-label="Style match"
            aria-valuenow={item.match}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
          >
            <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${item.match}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#ff9a9a] uppercase">
            {type}
          </span>
          <h3 className="text-chrome font-display text-[30px] leading-[0.95] sm:text-[38px]">
            {item.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-white/65">{item.description}</p>
          <span className="mt-1 flex items-center gap-2 text-[13px] text-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-full object-cover ring-1 ring-white/15"
            />
            Edited by <span className="font-semibold text-white">{item.editor}</span>
          </span>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
            >
              <dt className="text-[11px] text-muted">{s.label}</dt>
              <dd className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-white">
                {s.icon}
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-5">
          <div className="mr-auto flex flex-col whitespace-nowrap">
            <span className="text-[11px] font-medium tracking-[0.06em] text-muted uppercase">
              From
            </span>
            <span className="text-brand font-display text-[30px] leading-none">{item.price}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Button href="#order" size="sm" className="!py-3 !pr-4 !pl-5">
              Order similar
            </Button>
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save sample"}
              onClick={() => setSaved((s) => !s)}
              className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-200 active:scale-95 ${focusRing} ${
                saved
                  ? "border-brand-pink bg-brand-pink/25"
                  : "border-white/[0.14] bg-white/[0.04] hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/feed/icon-bookmark.svg" alt="" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Figma: Feed Tile (40:1055) — thumbnail on top, readable details below. */
function FeedTile({ item }: { item: FeedItem }) {
  const [, duration] = item.chips;

  return (
    <a
      href="#order"
      aria-label={`${item.title} — from ${item.price}, order similar`}
      className={`group card card-hover flex flex-col overflow-hidden rounded-[22px] p-2 ${slide} ${focusRing}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          className={`absolute inset-0 size-full object-cover group-hover:scale-[1.06] ${zoom}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.4)_0%,transparent_35%,transparent_70%,rgba(10,10,10,0.45)_100%)]"
        />
        <span
          className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] whitespace-nowrap text-white ${glass}`}
        >
          {item.category}
        </span>
        <span className="absolute top-2.5 right-2.5">
          <MatchBadge value={item.match} />
        </span>
        <span className="absolute right-2.5 bottom-2.5">
          <Duration value={duration} />
        </span>
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full border border-white/25 bg-white/[0.16] opacity-0 backdrop-blur-[10px] transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-play.svg" alt="" width={20} height={20} className="translate-x-px" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-2 pt-3.5 pb-1.5">
        <h3 className="line-clamp-2 text-[15px] leading-[1.35] font-semibold text-white">
          {item.title}
        </h3>
        <p className="flex items-center gap-1.5 text-xs whitespace-nowrap text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.avatar}
            alt=""
            width={18}
            height={18}
            className="size-[18px] shrink-0 rounded-full object-cover ring-1 ring-white/20"
          />
          <span className="truncate text-white/80">{item.editor}</span>
          <span aria-hidden>·</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-star.svg" alt="" width={11} height={11} />
          {item.rating}
          <span aria-hidden>·</span>
          <ClockIcon className="size-3 shrink-0" />
          {item.turnaround}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-[11px] text-muted">From</span>
            <span className="text-brand font-display text-[22px] leading-none">{item.price}</span>
          </span>
          <span className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-white">
            Order similar
            <span className="flex size-7 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/feed/icon-go.svg" alt="" width={12} height={12} />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

/** Columns the "more coming" tile spans so the last row is always full. */
const moreSpan: Record<number, string> = {
  0: "sm:col-span-2 lg:col-span-4",
  1: "lg:col-span-3",
  2: "sm:col-span-2 lg:col-span-2",
  3: "",
};

function MoreTile({ filter, tileCount }: { filter: FeedFilter; tileCount: number }) {
  return (
    <a
      href="#work"
      className={`group card card-hover flex min-h-[220px] flex-col items-center justify-center gap-3 overflow-hidden rounded-[22px] p-6 text-center ${slide} ${moreSpan[tileCount]} ${focusRing}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <span className="icon-tile relative size-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-sparkle.svg" alt="" width={16} height={16} />
      </span>
      <span className="relative font-display text-[22px] leading-none text-white">
        More {filter.toLowerCase()} coming
      </span>
      <span className="relative max-w-[300px] text-sm text-muted">
        Browse the full library for more samples in this style.
      </span>
    </a>
  );
}

export function FeedBrowser() {
  const [filter, setFilter] = useState<FeedFilter>("For you");

  const items = useMemo(() => itemsFor(filter), [filter]);
  const [top, ...rest] = items;
  const tiles = rest.slice(0, 4);
  const showMore = tiles.length < 4 && filter !== "For you";

  return (
    <>
      <FilterBar value={filter} onChange={setFilter} />

      {/* Figma: Feed Grid (40:1076) */}
      <div key={filter} aria-live="polite" className="animate-fade-up flex w-full flex-col gap-4 md:gap-5">
        {top && <TopPick key={top.id} item={top} />}
        {(tiles.length > 0 || showMore) && (
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0 md:gap-5 lg:grid-cols-4">
            {tiles.map((item) => (
              <FeedTile key={item.id} item={item} />
            ))}
            {showMore && <MoreTile filter={filter} tileCount={tiles.length} />}
          </div>
        )}
      </div>
    </>
  );
}
