"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChoiceChip";
import { FEED_FILTERS, FEED_ITEMS, type FeedFilter, type FeedItem } from "./data";

const glass =
  "border border-white/[0.14] bg-[rgba(10,10,10,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]";

const zoom =
  "transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100";

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
    <article className="group card card-lit card-hover flex min-h-[540px] flex-col justify-end overflow-hidden rounded-[28px] p-4 pt-[180px] sm:min-h-[520px] sm:p-6 sm:pt-[220px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        className={`absolute inset-0 size-full object-cover group-hover:scale-105 ${zoom}`}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.05) 24%, rgba(10,10,10,0.5) 44%, rgba(10,10,10,0.92) 68%, rgba(10,10,10,0.98) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_55%_at_0%_100%,rgba(255,43,43,0.24),transparent_65%),radial-gradient(60%_45%_at_100%_100%,rgba(209,15,15,0.18),transparent_65%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top pick chip */}
      <span className="bg-brand-gradient absolute top-4 left-4 z-[2] flex items-center gap-2 rounded-full py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] sm:top-6 sm:left-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-top-pick.svg" alt="" width={13} height={13} />
        <span className="text-xs font-bold tracking-[0.48px] whitespace-nowrap text-white uppercase">
          Top pick for you
        </span>
      </span>

      {/* Match */}
      <span
        className={`absolute top-[60px] left-4 z-[2] flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 sm:top-[19px] sm:right-6 sm:left-auto ${glass}`}
      >
        <MatchRing value={item.match} size="lg" />
        <span className="flex flex-col whitespace-nowrap">
          <span className="text-[13px] font-semibold text-white">
            <span className="text-brand">{item.match}%</span> match
          </span>
          <span className="text-[11px] text-muted">with your style</span>
        </span>
      </span>

      {/* Play */}
      <button
        type="button"
        aria-label={`Play preview: ${item.title}`}
        className="absolute top-[104px] left-1/2 z-[2] hidden size-[76px] -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-white/[0.14] shadow-[0_0_0_10px_rgba(255,255,255,0.06)] backdrop-blur-[10px] transition-[transform,background-color,box-shadow] duration-300 hover:scale-110 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink motion-reduce:transition-none motion-reduce:hover:scale-100 sm:flex"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-play.svg" alt="" width={26} height={26} className="translate-x-px" />
      </button>

      {/* Body */}
      <div className="relative z-[1] flex flex-col gap-3.5">
        <ul className="flex flex-wrap items-center gap-2">
          {item.chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white backdrop-blur-[8px]"
            >
              {c}
            </li>
          ))}
        </ul>
        <h3 className="text-chrome font-display text-[30px] leading-[0.95] sm:text-[40px]">
          {item.title}
        </h3>
        <p className="max-w-[520px] text-[15px] leading-[1.55] text-white/70">
          {item.description}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-white/[0.1] pt-4">
          <div className="mr-auto flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              width={34}
              height={34}
              className="size-[34px] rounded-full object-cover ring-2 ring-white/15"
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

          <div className="flex flex-col items-end whitespace-nowrap">
            <span className="text-[11px] font-medium tracking-[0.06em] text-muted uppercase">
              From
            </span>
            <span className="text-brand font-display text-[27px] leading-none">
              {item.price}
            </span>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <Button href="#order" className="!py-3 !pr-4 !pl-5 !text-base max-sm:flex-1">
              Order similar
            </Button>
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save sample"}
              onClick={() => setSaved((s) => !s)}
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-[8px] transition-[background-color,border-color,transform] duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink ${
                saved
                  ? "border-brand-pink bg-brand-pink/25"
                  : "border-white/[0.14] bg-[rgba(10,10,10,0.4)] hover:border-white/30 hover:bg-white/10"
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
      className="group card card-hover block h-[252px] overflow-hidden rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink lg:h-auto lg:min-h-[252px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        className={`absolute inset-0 size-full object-cover group-hover:scale-[1.07] ${zoom}`}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.05) 28%, rgba(10,10,10,0.4) 52%, rgba(10,10,10,0.97) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,43,43,0.22),rgba(209,15,15,0.14)_50%,transparent_80%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
      <div className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-2.5">
        <h3 className="text-base leading-[1.32] font-semibold text-white">
          {item.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatar}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0 rounded-full ring-1 ring-white/20"
            />
            <span className="truncate text-xs text-muted">
              {item.editor} · {item.turnaround}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="text-brand font-display text-[19px] leading-none">
              {item.price}
            </span>
            <span className="flex size-[30px] items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/feed/icon-go.svg"
                alt=""
                width={13}
                height={13}
                className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
              />
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
      className={`group card card-hover flex h-[252px] flex-col ${fill ? "sm:col-span-2 lg:h-full" : "lg:h-auto lg:min-h-[252px]"} items-center justify-center gap-3 overflow-hidden rounded-[20px] p-6 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <span className="icon-tile relative size-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/feed/icon-sparkle.svg" alt="" width={16} height={16} />
      </span>
      <span className="relative font-display text-[22px] leading-none text-white ">
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
        <p className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-2 pr-4 pl-3 lg:ml-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-sparkle.svg" alt="" width={14} height={14} className="shrink-0" />
          <span className="text-[13px] font-medium text-muted">
            Because you ordered a SaaS promo last month
          </span>
        </p>
      </div>

      {/* Figma: Feed Grid (40:1076) */}
      <div
        aria-live="polite"
        className="grid w-full grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2"
      >
        {top && <TopPick key={top.id} item={top} />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {tiles.map((item) => (
            <FeedTile key={item.id} item={item} />
          ))}
          {tiles.length < 4 && filter !== "For you" && <MoreTile filter={filter} fill={tiles.length === 0} />}
        </div>
      </div>
    </>
  );
}
