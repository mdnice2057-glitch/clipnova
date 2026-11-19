"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { title: string; short: string; description: string };

const AUTO_ADVANCE_MS = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Figma: Step List (16:533) + Step Chip (16:586).
 * Accordion stepper — click a step to expand it; auto-advances every 5s while
 * the section is on screen and the user isn't interacting with it. The active
 * step's progress bar animation doubles as the auto-advance timer, so the bar
 * and the step change always stay in sync (and pause together).
 */
export function StepList({
  steps,
  children,
}: {
  steps: Step[];
  /** The Process Visual; the live Step Chip is overlaid at its top-left. */
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<Animation | null>(null);
  const running = inView && !paused;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // New step → fresh 5s progress animation; advancing happens when it finishes.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || window.matchMedia(REDUCED_MOTION).matches) return;
    const anim = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: AUTO_ADVANCE_MS, easing: "linear", fill: "forwards" },
    );
    anim.pause();
    anim.onfinish = () => setActive((a) => (a + 1) % steps.length);
    animRef.current = anim;
    return () => {
      anim.onfinish = null;
      anim.cancel();
      animRef.current = null;
    };
  }, [active, steps.length]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (running) anim.play();
    else anim.pause();
  }, [running, active]);

  const chip = (
    <span
      aria-live="polite"
      className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/how/step-dot.svg"
        alt=""
        width={7}
        height={7}
        className="animate-pulse-dot"
      />
      <span className="text-[13px] font-medium whitespace-nowrap text-white/80">
        Step {active + 1} of {steps.length} · {steps[active].short}
      </span>
    </span>
  );

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[500px_684px]"
    >
      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <li
              key={step.title}
              className={`card overflow-hidden rounded-[22px] transition-[box-shadow,transform] duration-300 ${
                isActive
                  ? "card-lit shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-24px_rgba(228,110,255,0.45),0_16px_40px_-24px_rgba(0,145,255,0.4)]"
                  : "motion-safe:hover:-translate-y-0.5"
              }`}
            >
              {/* Brand wash behind the active step */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(120% 90% at 0% 0%, rgba(228,110,255,0.22) 0%, transparent 55%), radial-gradient(90% 80% at 100% 100%, rgba(0,145,255,0.18) 0%, transparent 60%)",
                }}
              />
              <h3 className="relative">
                <button
                  type="button"
                  id={`how-step-${i}`}
                  aria-expanded={isActive}
                  aria-controls={`how-step-panel-${i}`}
                  onClick={() => setActive(i)}
                  className={`group/step flex w-full items-center gap-4 px-5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-pink sm:gap-5 sm:px-6 ${
                    isActive ? "pt-5 pb-0 sm:pt-6" : "py-5 sm:py-6"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-display flex size-11 shrink-0 items-center justify-center rounded-[14px] text-[22px] leading-none transition-[background-color,box-shadow,color] duration-300 sm:size-12 sm:text-2xl ${
                      isActive
                        ? "bg-brand-gradient text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_10px_28px_-8px_rgba(228,110,255,0.65)]"
                        : "bg-white/[0.04] text-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] group-hover/step:text-white/75"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display min-w-0 flex-1 text-[26px] leading-[1.1] uppercase transition-colors sm:text-[32px] ${
                      isActive
                        ? "text-white"
                        : "text-[rgba(245,245,240,0.42)] group-hover/step:text-white/70"
                    }`}
                  >
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className={`size-4 shrink-0 transition-[transform,color] duration-300 ${
                      isActive
                        ? "rotate-180 text-white"
                        : "text-white/35 group-hover/step:text-white/70"
                    }`}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h3>
              <div
                id={`how-step-panel-${i}`}
                role="region"
                aria-labelledby={`how-step-${i}`}
                className={`relative grid transition-[grid-template-rows] duration-300 ease-out ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`pt-2 pr-5 pb-5 pl-5 sm:pr-6 sm:pb-6 sm:pl-[92px] ${
                      isActive ? "" : "invisible"
                    }`}
                  >
                    <p className="text-[15px] leading-[1.6] text-white/85 sm:text-base">
                      {step.description}
                    </p>
                    {isActive && (
                      <span
                        aria-hidden
                        className="mt-5 block h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08] motion-reduce:hidden"
                      >
                        <span
                          ref={barRef}
                          className="bg-brand-gradient block h-full w-full origin-left rounded-full shadow-[0_0_12px_rgba(228,110,255,0.6)]"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div data-step={active} className="group/how relative min-w-0">
        {children}
        <div className="absolute top-3 left-3 z-10 origin-top-left scale-90 sm:top-[27px] sm:left-[27px] sm:scale-100">
          {chip}
        </div>
      </div>
    </div>
  );
}
