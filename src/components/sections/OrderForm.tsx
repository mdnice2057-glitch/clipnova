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
    <section id="order" className="scroll-mt-20 pt-20 pb-10 leading-[normal] md:pt-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-6 xl:flex-row xl:items-start xl:gap-14 xl:px-0">
        {/* Intro (24:597) */}
        <div className="flex w-full flex-col items-start gap-[22px] xl:w-[400px] xl:shrink-0">
          <Eyebrow>Order now</Eyebrow>
          <h2 className="text-chrome font-display text-[64px] leading-[0.96] uppercase md:text-[94px]">
            Start your
            <br />
            order
          </h2>
          <p className="max-w-[400px] text-[16px] leading-[1.55] text-muted md:text-[18px]">
            Tell us what you need. You’ll get a quote and timeline within 2 hours — no
            payment until you approve.
          </p>

          <div className="flex flex-col items-start gap-4 pt-3">
            <h3 className="text-[15px] font-semibold text-white">What happens next</h3>
            <ol className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5">
                  <span className="font-display flex size-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(242,185,255,0.3)] bg-[rgba(242,185,255,0.1)] text-[18px] text-[#f2b9ff]">
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-white">{s.title}</span>
                    <span className="text-[14px] text-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="flex w-full flex-wrap items-start gap-2.5 pt-2">
            {guarantees.map((g) => (
              <li
                key={g.label}
                className="flex items-center gap-2 rounded-full border border-subtle bg-surface py-2 pr-3.5 pl-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.icon} alt="" width={16} height={16} className="size-4" />
                <span className="text-[13px] font-medium whitespace-nowrap text-muted">
                  {g.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Card (24:638) */}
        <OrderCard />
      </div>
    </section>
  );
}
