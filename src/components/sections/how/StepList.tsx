"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { title: string; short: string; description: string };

const AUTO_ADVANCE_MS = 5000;

/**
 * Figma: Step List (16:533) + Step Chip (16:586).
 * Accordion stepper — click a step to expand it; auto-advances every 5s while
 * the section is on screen and the user isn't interacting with it.
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

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearTimeout(t);
  }, [active, paused, inView, steps.length]);

  const chip = (
    <span
      aria-live="polite"
      className="flex items-center gap-2 rounded-full border border-subtle bg-elevated py-[7px] pr-3.5 pl-3"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/how/step-dot.svg" alt="" width={7} height={7} />
      <span className="text-[13px] font-medium whitespace-nowrap text-muted">
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
              className={`relative overflow-hidden rounded-[20px] border transition-[border-color,box-shadow,background-color] duration-300 ${
                isActive
                  ? "border-transparent shadow-[0_12px_40px_-8px_rgba(228,110,255,0.28)]"
                  : "border-subtle bg-surface hover:border-white/20"
              }`}
            >
              <div
                aria-hidden
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage:
                    "linear-gradient(167.4deg, #e46eff 14.286%, #0091ff 52.143%, #b4daab 85.714%)",
                }}
              />
              <h3 className="relative">
                <button
                  type="button"
                  id={`how-step-${i}`}
                  aria-expanded={isActive}
                  aria-controls={`how-step-panel-${i}`}
                  onClick={() => setActive(i)}
                  className={`font-display block w-full px-6 pt-6 text-left text-[28px] leading-[1.2] uppercase transition-colors sm:px-7 sm:text-[34px] ${
                    isActive
                      ? "pb-0 text-white"
                      : "pb-6 text-[rgba(245,245,240,0.42)] hover:text-white/70"
                  }`}
                >
                  {i + 1}. {step.title}
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
                  <p
                    className={`px-6 pt-2.5 pb-6 text-base leading-[1.55] text-white sm:px-7 ${
                      isActive ? "" : "invisible"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div data-step={active} className="group/how relative min-w-0">
        {children}
        <div className="absolute top-3 left-3 origin-top-left scale-90 sm:top-[27px] sm:left-[27px] sm:scale-100">{chip}</div>
      </div>
    </div>
  );
}
