"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { A, tabs, type Tab } from "./data";

/** Figma: Toolbar (41:1073) — tabs + search with ⌘K hint. */
export function Toolbar({
  tab,
  onTab,
  query,
  onQuery,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  query: string;
  onQuery: (q: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5 pb-2">
      <div className="card max-w-full min-w-0 rounded-full">
        <div
          role="tablist"
          aria-label="Filter threads"
          className="flex max-w-full [scrollbar-width:none] items-start gap-1 overflow-x-auto rounded-full p-1.5"
        >
          {tabs.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTab(t)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink ${
                  active
                    ? "bg-white text-[#0a0a0a] shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]"
                    : "text-muted hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
      <span className="hidden h-px min-w-px flex-1 sm:block" />
      <label className="flex w-full cursor-text items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-[11px] pr-2 pl-4 transition-[border-color,background-color,box-shadow] duration-200 hover:border-white/20 focus-within:border-brand-pink/70 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_4px_rgba(167,116,255,0.12)] sm:w-auto">
        <img
          src={`${A}/icon-search.svg`}
          alt=""
          width={15}
          height={15}
          className="size-[15px] shrink-0"
        />
        <span className="sr-only">Search questions and orders</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onQuery("");
          }}
          placeholder="Search questions & orders…"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/40 sm:w-[190px] sm:flex-none [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-sans text-[11px] font-medium text-muted shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]">
          ⌘K
        </kbd>
      </label>
    </div>
  );
}
