import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList, type Step } from "./how/StepList";

const STEPS: Step[] = [
  {
    title: "Place your order",
    short: "Place order",
    description:
      "Pick a service, share your brief and references, and confirm your package.",
  },
  {
    title: "Upload footage",
    short: "Upload footage",
    description:
      "Send your raw clips, music and logos through a secure upload link — any format, any size.",
  },
  {
    title: "We edit, you review",
    short: "Review edit",
    description:
      "Your editor cuts the first draft. Leave timestamped notes and get revisions until it feels right.",
  },
  {
    title: "Receive final files",
    short: "Receive files",
    description:
      "Download your final cut in every format and aspect ratio you need, ready to post anywhere.",
  },
];

const BARS = [6, 12, 18, 10, 22, 14, 8, 16, 20, 9, 13, 6];

/** Figma: Process Visual (16:543) — 684×560 composition, scaled down on small screens. */
function ProcessVisual() {
  return (
    <div className="relative h-[280px] overflow-hidden rounded-[28px] border border-subtle bg-surface min-[480px]:h-[392px] sm:h-[476px] md:h-[560px]">
      <div className="absolute top-0 left-1/2 h-[560px] w-[684px] origin-top -translate-x-1/2 scale-50 min-[480px]:scale-70 sm:scale-85 md:scale-100">
        {/* Glows (16:544, 16:545) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/how/glow-right.svg"
          alt=""
          width={800}
          height={700}
          className="pointer-events-none absolute top-[-22px] left-[89px] max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/how/glow-left.svg"
          alt=""
          width={660}
          height={600}
          className="pointer-events-none absolute top-[158px] left-[-201px] max-w-none"
        />

        {/* Phone Mockup (16:547) */}
        <div className="absolute top-[60px] left-[216px] h-[510px] w-[250px] overflow-hidden rounded-[46px] border-5 border-[#8a8a92] bg-[#0e0e10] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]">
          <div className="absolute top-[5px] left-[5px] h-[490px] w-[230px] overflow-hidden rounded-[38px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/how/phone-screen.jpg"
              alt="Creator recording a video on her phone"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.75) 100%)",
              }}
            />
            <div className="absolute top-2.5 left-[75px] h-6 w-20 rounded-xl bg-black" />
            <div className="absolute top-[46px] left-3.5 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/how/rec-dot.svg"
                alt=""
                width={7}
                height={7}
                className="animate-pulse-dot"
              />
              <span className="text-[11px] font-semibold text-white">REC 00:48</span>
            </div>
            <div className="absolute top-[400px] left-1/2 flex -translate-x-1/2 gap-3.5 text-[9px] font-bold tracking-[0.54px] whitespace-nowrap">
              <span className="text-[rgba(245,245,240,0.7)]">PHOTO</span>
              <span className="text-[#f2b9ff]">VIDEO</span>
              <span className="text-[rgba(245,245,240,0.7)]">PORTRAIT</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/how/shutter-outer.svg"
              alt=""
              width={52}
              height={52}
              className="absolute top-[424px] left-[89px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/how/shutter-inner.svg"
              alt=""
              width={40}
              height={40}
              className="absolute top-[430px] left-[95px]"
            />
          </div>
        </div>

        {/* Voice Pill (16:560) */}
        <div className="bg-brand-gradient absolute top-[248px] left-[399px] flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2 shadow-[0_10px_30px_-4px_rgba(228,110,255,0.45)]">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-base">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/how/icon-play.svg" alt="" width={13} height={13} />
          </span>
          <span className="flex items-center gap-[3px]" aria-hidden>
            {BARS.map((h, i) => (
              <span
                key={i}
                className="animate-pulse-dot w-[3px] rounded-[2px] bg-white"
                style={{ height: h, animationDelay: `${(i % 6) * 0.18}s` }}
              />
            ))}
          </span>
          <span className="text-[13px] font-bold text-white">0:48</span>
        </div>

        {/* Clip Ready Toast (16:578) */}
        <div className="absolute top-[378px] left-[35px] flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(26,26,30,0.92)] py-2.5 pr-[18px] pl-3 shadow-[0_16px_40px_-6px_rgba(0,0,0,0.5)] backdrop-blur-[8px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/how/toast-thumb.jpg"
            alt=""
            width={34}
            height={46}
            className="h-[46px] w-[34px] rounded-lg object-cover"
          />
          <span className="flex flex-col gap-0.5 whitespace-nowrap">
            <span className="text-sm font-semibold text-white">
              Order #1042 delivered
            </span>
            <span className="text-xs text-muted">Final cut · 68 hrs</span>
          </span>
          <span
            className="flex size-[22px] items-center justify-center rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(124.8deg, #e46eff 3.6%, #0091ff 41.7%, #b4daab 75.5%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/how/icon-check.svg" alt="" width={12} height={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Figma: How It Works (5:225) */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="How to order"
          title="How ordering works"
          subtitle="Place an order in minutes. We handle everything from the first cut to final delivery."
        />
        <StepList steps={STEPS}>
          <ProcessVisual />
        </StepList>
      </div>
    </section>
  );
}
