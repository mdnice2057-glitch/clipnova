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
    <div className="flex flex-wrap items-center gap-2 pb-1.5">
      <div
        role="tablist"
        aria-label="Filter threads"
        className="flex max-w-full [scrollbar-width:none] items-start gap-0.5 overflow-x-auto rounded-full border border-subtle bg-surface p-1"
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
              className={`shrink-0 rounded-full px-3.5 py-[7px] text-[13px] font-semibold whitespace-nowrap transition-colors ${
                active
                  ? "bg-white text-[#0a0a0a]"
                  : "text-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <span className="hidden h-px min-w-px flex-1 sm:block" />
      <label className="flex w-full cursor-text items-center gap-2 rounded-full border border-subtle bg-surface py-2.5 pr-4 pl-3.5 transition-colors focus-within:border-white/25 sm:w-auto">
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
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#8e8e8e] sm:w-[173px] sm:flex-none [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="shrink-0 rounded-full border border-subtle bg-elevated px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
          ⌘K
        </kbd>
      </label>
    </div>
  );
}
