/* eslint-disable @next/next/no-img-element */
import { A, topEditors, trendingTopics } from "./data";

/** Figma: Community Stats (41:1297). */
export function CommunityStats() {
  const stats = [
    { value: "1,240", label: "Clients" },
    { value: "86", label: "Online now", dot: true },
    { value: "4.2K", label: "Answers" },
  ];
  return (
    <div className="flex items-start justify-between rounded-[22px] border border-subtle bg-surface p-5 xl:h-[100px]">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 xl:w-[118px] xl:flex-none ${i > 0 ? "border-l border-subtle" : ""}`}
        >
          <div className="flex items-center gap-1.5">
            {s.dot && (
              <img
                src={`${A}/online-dot.svg`}
                alt=""
                width={7}
                height={7}
                className="animate-pulse-dot size-[7px]"
              />
            )}
            <span className="font-display text-[30px] leading-none whitespace-nowrap text-white">
              {s.value}
            </span>
          </div>
          <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Figma: Trending Topics (41:1311). Clicking a topic filters the threads. */
export function TrendingTopics({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number, tag: string) => void;
}) {
  return (
    <div className="flex flex-col items-start gap-1.5 rounded-[22px] border border-subtle bg-surface p-[22px]">
      <div className="flex w-full items-center justify-between pb-2 whitespace-nowrap">
        <h3 className="font-display text-[22px] leading-none text-white">
          Trending topics
        </h3>
        <span className="text-[12px] text-[#8e8e8e]">This week</span>
      </div>
      <ul className="flex w-full flex-col gap-1.5">
        {trendingTopics.map((t, i) => {
          const on = i === active;
          return (
            <li key={t.tag}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(i, t.tag)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  on
                    ? "bg-[rgba(242,185,255,0.08)]"
                    : "hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`font-display text-[18px] whitespace-nowrap ${on ? "text-[#f2b9ff]" : "text-[#6b6b6b]"}`}
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-1 flex-col items-start gap-px whitespace-nowrap">
                  <span className="text-[14px] font-semibold text-white">
                    {t.tag}
                  </span>
                  <span className="text-[12px] text-[#8e8e8e]">
                    {t.posts} posts
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-[3px]">
                  <img
                    src={`${A}/icon-trend-up.svg`}
                    alt=""
                    width={10}
                    height={10}
                    className="size-2.5"
                  />
                  <span className="text-[12px] font-semibold whitespace-nowrap text-[#3ddc84]">
                    {t.growth}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Figma: Top Editors (41:1351). */
export function TopEditors() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[22px] border border-subtle bg-surface p-[22px]">
      <div className="flex w-full items-center justify-between pb-1 whitespace-nowrap">
        <h3 className="font-display text-[22px] leading-none text-white">
          Top editors this week
        </h3>
        <a
          href="#client-hub"
          className="text-[12px] font-semibold text-[#f2b9ff] hover:underline"
        >
          View all
        </a>
      </div>
      <ul className="flex w-full flex-col gap-3">
        {topEditors.map((e, i) => (
          <li key={e.name} className="flex w-full items-center gap-3">
            <span className="relative size-10 shrink-0">
              <img
                src={e.avatar}
                alt=""
                width={40}
                height={40}
                className="absolute inset-0 size-10 max-w-none"
              />
              <span
                className={`absolute top-[26px] left-[26px] flex size-[18px] items-center justify-center rounded-full border-2 border-surface text-[10px] font-bold text-[#0a0a0a] ${e.badge}`}
              >
                {i + 1}
              </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-px">
              <span className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold whitespace-nowrap text-white">
                  {e.name}
                </span>
                <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[9px] font-bold text-white">
                  Editor
                </span>
              </span>
              <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
                {e.role}
              </span>
            </span>
            <span className="shrink-0 text-[12px] font-medium whitespace-nowrap text-muted">
              {e.answers} answers
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
