"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChoiceChip";
import { FEED_FILTERS, FEED_ITEMS, type FeedFilter, type FeedItem } from "./data";

const glass =
  "border border-white/[0.14] bg-[rgba(10,10,10,0.45)] backdrop-blur-[8px]";

function MatchRing({ value, size }: { value: number; size: "sm" | "lg" }) {
  const lg = size === "lg";
  const px = lg ? 36 : 22;
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center ${lg ? "size-9" : "size-[22px]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/feed/ring-track-${size}.svg`}
        alt=""
        width={px}
        height={px}
        className="absolute inset-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/feed/ring-progress-${size}.svg`}
        alt=""
        width={px}
        height={px}
        className="absolute inset-0"
      />
      <span
        className={`relative font-bold leading-none text-white ${lg ? "text-[10.8px]" : "text-[6.6px]"}`}
      >
        {value}
      </span>
    </span>
  );
}

/** Figma: Top Pick (40:1077) — large featured recommendation card. */
function TopPick({ item }: { item: FeedItem }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[26px] border-[1.5px] border-[rgba(228,110,255,0.8)] p-4 pt-[180px] sm:p-[21px] sm:pt-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.05) 25%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.9) 70%, rgba(10,10,10,0.98) 100%)",
        }}
      />

      {/* Top pick chip */}
      <span className="bg-brand-gradient absolute top-4 left-4 flex items-center gap-2 rounded-full py-[7px] pr-3.5 pl-3 sm:top-[21px] sm:left-[21px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-top-pick.svg" alt="" width={13} height={13} />
        <span className="text-xs font-bold tracking-[0.48px] whitespace-nowrap text-white uppercase">
          Top pick for you
        </span>
      </span>

      {/* Match */}
      <span
        className={`absolute top-[60px] left-4 flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 sm:top-[17px] sm:right-[21px] sm:left-auto ${glass}`}
      >
        <MatchRing value={item.match} size="lg" />
        <span className="flex flex-col whitespace-nowrap">
          <span className="text-[13px] font-semibold text-white">
            {item.match}% match
          </span>
          <span className="text-[11px] text-muted">with your style</span>
        </span>
      </span>

      {/* Play */}
      <button
        type="button"
        aria-label={`Play preview: ${item.title}`}
        className="absolute top-[95px] left-1/2 hidden size-[72px] -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.16] backdrop-blur-[8px] transition-transform hover:scale-105 sm:flex"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-play.svg" alt="" width={26} height={26} />
      </button>

      {/* Body */}
      <div className="relative flex flex-col gap-3.5">
        <ul className="flex flex-wrap items-center gap-2">
          {item.chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/[0.14] bg-[rgba(10,10,10,0.35)] px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white backdrop-blur-[8px]"
            >
              {c}
            </li>
          ))}
        </ul>
        <h3 className="text-chrome font-display text-[36px] leading-none sm:text-[46px]">
          {item.title}
        </h3>
        <p className="text-[15px] leading-[1.5] text-muted">{item.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.12] pt-4">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <div className="flex flex-col gap-px">
              <span className="text-[13px] font-semibold whitespace-nowrap text-white">
                Edited by {item.editor}
              </span>
              <span className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/feed/icon-star.svg" alt="" width={11} height={11} />
                <span className="text-xs whitespace-nowrap text-muted">
                  {item.rating} · {item.delivery}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end whitespace-nowrap">
              <span className="text-[11px] text-muted">From</span>
              <span className="font-display text-[28px] leading-none text-white">
                {item.price}
              </span>
            </div>
            <Button href="#order" className="!py-3 !pr-4 !pl-5 !text-base">
              Order similar
            </Button>
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save sample"}
              onClick={() => setSaved((s) => !s)}
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-[8px] transition-colors ${
                saved
                  ? "border-brand-pink bg-brand-pink/25"
                  : "border-white/[0.14] bg-[rgba(10,10,10,0.4)] hover:bg-white/10"
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

/** Figma: Feed Tile (40:1055) — compact image-forward recommendation tile. */
function FeedTile({ item }: { item: FeedItem }) {
  return (
    <a
      href="#order"
      aria-label={`${item.title} — ${item.price}, order similar`}
      className="group relative block h-[252px] overflow-hidden rounded-[20px] border border-white/[0.08] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.05) 30%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.96) 100%)",
        }}
      />
      <span
        className={`absolute top-3 left-3 rounded-full px-2.5 py-[5px] text-[10px] font-bold tracking-[0.8px] whitespace-nowrap text-white ${glass}`}
      >
        {item.category}
      </span>
      <span
        className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 ${glass}`}
      >
        <MatchRing value={item.match} size="sm" />
        <span className="text-[11px] font-medium text-white">match</span>
      </span>
      <div className="absolute right-3 bottom-3 left-3 flex flex-col gap-2.5">
        <h3 className="text-base leading-[1.32] font-semibold text-white">
          {item.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-full"
            />
            <span className="text-xs whitespace-nowrap text-muted">
              {item.editor} · {item.turnaround}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-display text-[22px] leading-none text-white">
              {item.price}
            </span>
            <span className="flex size-[30px] items-center justify-center rounded-full bg-white transition-transform group-hover:scale-110">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/feed/icon-go.svg" alt="" width={13} height={13} />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

function MoreTile({ filter, fill }: { filter: FeedFilter; fill: boolean }) {
  return (
    <a
      href="#work"
      className={`flex h-[252px] flex-col ${fill ? "sm:col-span-2 lg:h-full" : ""} items-center justify-center gap-3 rounded-[20px] border border-dashed border-subtle bg-surface p-6 text-center transition-colors hover:border-white/25`}
    >
      <span className="font-display text-[28px] leading-none text-white uppercase">
        More {filter.toLowerCase()} coming
      </span>
      <span className="text-sm text-muted">
        Browse the full library for more samples in this style.
      </span>
    </a>
  );
}

export function FeedBrowser() {
  const [filter, setFilter] = useState<FeedFilter>("For you");

  const items = useMemo(
    () =>
      filter === "For you"
        ? FEED_ITEMS
        : FEED_ITEMS.filter((i) => i.filters.includes(filter)),
    [filter],
  );
  const [top, ...rest] = items;
  const tiles = rest.slice(0, 4);

  return (
    <>
      {/* Figma: Filters (26:735) */}
      <div className="flex w-full flex-wrap items-center gap-x-2.5 gap-y-4">
        <ChipGroup
          options={[...FEED_FILTERS]}
          value={filter}
          onChange={(v) => setFilter(v as FeedFilter)}
        />
        <p className="flex items-center gap-2 lg:ml-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-sparkle.svg" alt="" width={14} height={14} />
          <span className="text-[13px] font-medium text-muted">
            Because you ordered a SaaS promo last month
          </span>
        </p>
      </div>

      {/* Figma: Feed Grid (40:1076) */}
      <div
        aria-live="polite"
        className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {top && <TopPick key={top.id} item={top} />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map((item) => (
            <FeedTile key={item.id} item={item} />
          ))}
          {tiles.length < 4 && filter !== "For you" && <MoreTile filter={filter} fill={tiles.length === 0} />}
        </div>
      </div>
    </>
  );
}
