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
    <div className="card flex items-stretch justify-between p-5">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex min-w-0 flex-1 flex-col items-center gap-1.5 ${i > 0 ? "border-l border-white/[0.07]" : ""}`}
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
            <span className="text-brand font-display text-[29px] leading-none whitespace-nowrap">
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

const maxPosts = Math.max(...trendingTopics.map((t) => t.posts));

/** Figma: Trending Topics (41:1311). Clicking a topic filters the threads. */
export function TrendingTopics({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number, tag: string) => void;
}) {
  return (
    <div className="card flex flex-col items-start gap-1.5 p-[22px]">
      <div className="flex w-full items-center justify-between pb-2 whitespace-nowrap">
        <h3 className="font-display text-[19px] leading-none text-white">
          Trending topics
        </h3>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#8e8e8e]">
          This week
        </span>
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
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-[background-color,border-color] duration-200 ${
                  on
                    ? "border-[rgba(255,154,154,0.22)] bg-[linear-gradient(100deg,rgba(255,154,154,0.1),rgba(209,15,15,0.04))]"
                    : "border-transparent hover:bg-white/[0.04]"
                }`}
              >
                {on && (
                  <span
                    aria-hidden
                    className="bg-brand-gradient absolute inset-y-2 left-0 w-[3px] rounded-r-full"
                  />
                )}
                <span
                  className={`w-5 shrink-0 text-center font-display text-[18px] leading-none whitespace-nowrap ${on ? "text-brand" : "text-[#6b6b6b]"}`}
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-1 flex-col items-start gap-1 whitespace-nowrap">
                  <span className="text-[14px] font-semibold text-white">
                    {t.tag}
                  </span>
                  <span className="flex w-full items-center gap-2">
                    <span className="text-[12px] text-[#8e8e8e]">
                      {t.posts} posts
                    </span>
                    <span
                      aria-hidden
                      className="relative h-1 min-w-px flex-1 overflow-hidden rounded-full bg-white/[0.06]"
                    >
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full ${on ? "bg-brand-gradient" : "bg-white/20"}`}
                        style={{ width: `${(t.posts / maxPosts) * 100}%` }}
                      />
                    </span>
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
    <div className="card flex flex-col items-start gap-3 p-[22px]">
      <div className="flex w-full items-center justify-between pb-1 whitespace-nowrap">
        <h3 className="font-display text-[19px] leading-none text-white">
          Top editors this week
        </h3>
        <a
          href="#client-hub"
          className="group inline-flex items-center gap-1 text-[12px] font-semibold text-[#ff9a9a] hover:underline"
        >
          View all
          <span
            aria-hidden
            className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
      <ul className="flex w-full flex-col gap-1">
        {topEditors.map((e, i) => (
          <li
            key={e.name}
            className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-white/[0.04]"
          >
            <span className="relative size-10 shrink-0">
              <img
                src={e.avatar}
                alt=""
                width={40}
                height={40}
                className="absolute inset-0 size-10 max-w-none rounded-full ring-2 ring-white/10"
              />
              <span
                className={`absolute top-[26px] left-[26px] flex size-[18px] items-center justify-center rounded-full border-2 border-[#121214] text-[10px] font-bold text-[#0a0a0a] ${e.badge}`}
              >
                {i + 1}
              </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-px">
              <span className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold whitespace-nowrap text-white">
                  {e.name}
                </span>
                <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[9px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  Editor
                </span>
              </span>
              <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
                {e.role}
              </span>
            </span>
            <span className="flex shrink-0 flex-col items-end">
              <span className="text-brand font-display text-[16px] leading-none">
                {e.answers}
              </span>
              <span className="text-[11px] whitespace-nowrap text-[#8e8e8e]">
                answers
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
