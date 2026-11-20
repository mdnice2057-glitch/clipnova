import { SectionTitle } from "@/components/ui/SectionHeader";
import { CountUp } from "./stats/CountUp";

type Stat = {
  label: string;
  icon: string;
  value: number;
  suffix?: string;
  trend: string;
};

const stats: Stat[] = [
  { label: "Total deliveries", icon: "/assets/stats/icon-delivered.svg", value: 12480, trend: "+128 this week" },
  { label: "Active clients", icon: "/assets/stats/icon-clients.svg", value: 342, trend: "+18 this month" },
  { label: "Orders in production", icon: "/assets/stats/icon-film.svg", value: 57, trend: "Across 14 editors" },
  { label: "On-time delivery", icon: "/assets/stats/icon-star.svg", value: 98, suffix: "%", trend: "Last 90 days" },
];

const sparkline = [8, 12, 10, 16, 14, 20, 18];

/** Figma: Live Stat Card (25:630) */
function LiveStatCard({ stat }: { stat: Stat }) {
  return (
    <li className="flex min-w-0 flex-col items-start gap-3.5 rounded-[20px] border border-subtle bg-surface p-4 transition-colors sm:gap-[18px] sm:rounded-[24px] sm:p-6 duration-200 hover:border-[rgba(255,154,154,0.25)]">
      <div className="flex w-full flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex size-9 shrink-0 sm:size-[42px] items-center justify-center rounded-[12px] border border-[rgba(255,154,154,0.25)] bg-[rgba(255,154,154,0.1)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stat.icon} alt="" width={22} height={22} className="size-[18px] sm:size-[22px]" />
        </div>
        <h3 className="text-[13px] leading-[1.25] font-medium text-muted sm:text-[15px] sm:whitespace-nowrap">
          {stat.label}
        </h3>
      </div>

      <p className="text-chrome font-display text-[38px] leading-none whitespace-nowrap sm:text-[52px]">
        <CountUp value={stat.value} suffix={stat.suffix} />
      </p>

      <div className="flex w-full items-end justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5 rounded-full bg-[rgba(255,154,154,0.1)] px-2 py-[5px] sm:shrink-0 sm:px-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/stats/trend-up.svg" alt="" width={11} height={11} className="size-[11px]" />
          <span className="truncate text-[11px] leading-[1.21] font-semibold text-[#ff9a9a] sm:text-xs">
            {stat.trend}
          </span>
        </span>
        <div className="hidden shrink-0 items-end gap-[3px] sm:flex" aria-hidden="true">
          {sparkline.map((h, i) => (
            <span
              key={i}
              className="w-[5px] rounded-[2px] bg-[rgba(245,245,240,0.14)]"
              style={{ height: h }}
            />
          ))}
          <span className="h-[26px] w-[5px] rounded-[2px] bg-[linear-gradient(180deg,#ff2b2b_0%,#d10f0f_53%,#ff8a8a_100%)]" />
        </div>
      </div>
    </li>
  );
}

/** Figma: Stats (5:288) */
export function Stats() {
  return (
    <section id="stats" className="pt-6 pb-[110px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-4 md:px-6 xl:px-0">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Delivery stats" title="Orders in motion, right now" />
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-subtle bg-surface py-2 pr-4 pl-3.5">
            <span className="relative size-2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/ui/live-dot.svg"
                alt=""
                className="animate-pulse-dot absolute -inset-full size-[300%] max-w-none"
              />
            </span>
            <span className="text-[13px] leading-[1.21] font-medium whitespace-nowrap text-muted">
              Live · updated just now
            </span>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <LiveStatCard key={stat.label} stat={stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}
