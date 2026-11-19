import { Eyebrow } from "@/components/ui/Eyebrow";
import { OrderCard } from "./order/OrderCard";

const steps = [
  { title: "Quote in 2 hours", text: "We review your brief and send a fixed price." },
  { title: "Upload your footage", text: "Share files via link or drag & drop." },
  { title: "Draft in 48 hours", text: "Review, request changes, approve." },
];

const guarantees = [
  { label: "Secure payment", icon: "/assets/order/icon-lock.svg" },
  { label: "100% satisfaction", icon: "/assets/order/icon-shield.svg" },
  { label: "On-time delivery", icon: "/assets/order/icon-clock.svg" },
];

/** Figma: Order Form (24:595) — intro column + order card. */
export function OrderForm() {
  return (
    <section
      id="order"
      className="relative scroll-mt-20 overflow-x-clip pt-20 pb-10 leading-[normal] md:pt-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-6 xl:flex-row xl:items-start xl:gap-14 xl:px-0">
        {/* Intro (24:597) */}
        <div className="flex w-full flex-col items-start gap-[22px] xl:w-[400px] xl:shrink-0">
          <Eyebrow>Order now</Eyebrow>
          <h2 className="text-chrome font-display text-[51px] leading-[0.96] md:text-[75px]">
            Start your
            <br />
            order
          </h2>
          <p className="max-w-[400px] text-[16px] leading-[1.55] text-muted md:text-[18px]">
            Tell us what you need. You’ll get a quote and timeline within 2 hours — no
            payment until you approve.
          </p>

          <div className="flex flex-col items-start gap-5 pt-4">
            <h3 className="text-[13px] font-semibold tracking-[0.14em] text-white/70 uppercase">
              What happens next
            </h3>
            <ol className="relative flex flex-col gap-6">
              <span
                aria-hidden
                className="absolute top-6 bottom-6 left-[21.5px] w-px bg-linear-to-b from-brand-pink/80 via-brand-blue/60 to-brand-mint/50"
              />
              {steps.map((s, i) => (
                <li key={s.title} className="group relative flex items-start gap-4">
                  <span className="icon-tile relative size-11 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-brand font-display text-[18px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="flex flex-col gap-1 pt-0.5">
                    <span className="text-[16px] font-semibold text-white">{s.title}</span>
                    <span className="text-[14px] leading-[1.5] text-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="flex w-full flex-wrap items-start gap-2.5 pt-3">
            {guarantees.map((g) => (
              <li
                key={g.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] py-1.5 pr-3.5 pl-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-colors duration-300 hover:border-brand-pink/40"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,43,43,0.28),rgba(209,15,15,0.14))] ring-1 ring-brand-pink/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.icon} alt="" width={16} height={16} className="size-3.5" />
                </span>
                <span className="text-[13px] font-medium whitespace-nowrap text-white/85">
                  {g.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Card (24:638) */}
        <div className="relative w-full min-w-0 xl:w-[744px] xl:shrink-0">
          <OrderCard />
        </div>
      </div>
    </section>
  );
}
