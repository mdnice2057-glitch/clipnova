"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export type Step = {
  title: string;
  short: string;
  meta: string;
  description: string;
  points: string[];
  image: string;
  /** Clip colour on the timeline (r, g, b). */
  tint: string;
};

const STEP_MS = 5000;
const FPS = 24;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Deterministic waveform so server and client render the same bars.
const WAVE = Array.from({ length: 28 }, (_, i) =>
  Math.round(28 + 62 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))),
);

function timecode(ms: number) {
  const total = Math.floor((ms / 1000) * FPS);
  const ff = total % FPS;
  const ss = Math.floor(total / FPS) % 60;
  const mm = Math.floor(total / FPS / 60);
  return `00:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
}

/** Glass card that floats over the monitor, one per step. */
function MonitorOverlay({ step }: { step: number }) {
  const glass =
    "rounded-2xl border border-white/12 bg-[rgba(14,14,18,0.78)] p-3.5 backdrop-blur-xl";

  if (step === 0)
    return (
      <div className={`${glass} w-[230px]`}>
        <p className="text-[10px] font-semibold tracking-[0.12em] text-white/50 uppercase">New order</p>
        <dl className="mt-2.5 flex flex-col gap-1.5 text-[12px]">
          {[
            ["Service", "Travel vlog"],
            ["Length", "60–90 sec"],
            ["Revisions", "Unlimited"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-white/55">{k}</dt>
              <dd className="font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="bg-brand-gradient mt-3 rounded-full py-1.5 text-center text-[11px] font-bold text-white">
          Confirm order
        </div>
      </div>
    );

  if (step === 1)
    return (
      <div className={`${glass} w-[240px]`}>
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.12em] text-white/50 uppercase">
          <span>Uploading</span>
          <span className="text-[#ffb3b3]">5 of 8</span>
        </div>
        {[
          ["A001_sunrise.mov", "2.4 GB", "w-full"],
          ["A002_cliffs.mov", "1.8 GB", "animate-fill-bar"],
        ].map(([name, size, bar]) => (
          <div key={name} className="mt-2.5">
            <div className="flex justify-between text-[11.5px]">
              <span className="font-medium text-white">{name}</span>
              <span className="text-white/50">{size}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full bg-[#d10f0f] ${bar}`} />
            </div>
          </div>
        ))}
      </div>
    );

  if (step === 2)
    return (
      <div className={`${glass} w-[250px]`}>
        <div className="flex items-center gap-2">
          <span className="bg-brand-gradient size-5 shrink-0 rounded-full" />
          <span className="text-[12px] font-semibold text-white">You</span>
          <span className="ml-auto rounded-md bg-[#ff5c5c]/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#cbbaff]">
            00:12
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-[1.45] text-white/80">
          Warmer grade on this shot, and hold it a beat longer?
        </p>
        <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-white/80">
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Editor replied · v2 ready
        </div>
      </div>
    );

  return (
    <div className={`${glass} w-[230px]`}>
      <p className="text-[12.5px] font-semibold text-white">Final cut ready</p>
      <p className="text-[10.5px] text-white/50">MP4 · 4K · 3 formats</p>
      <div className="mt-2.5 flex gap-1.5">
        {["9:16", "16:9", "1:1"].map((r) => (
          <span key={r} className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-white/85">
            {r}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-white py-1.5 text-[11px] font-bold text-black">
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
          <path d="M8 2.5v8m0 0L4.5 7M8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Download all
      </div>
    </div>
  );
}

/**
 * How-it-works as an editing workspace: a program monitor, the step's details,
 * and a timeline where each step is a clip. The playhead sweeps each clip in 5s
 * and advances to the next; clicking a clip jumps to it.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<Animation | null>(null);
  const running = playing && inView;
  const n = steps.length;
  const step = steps[active];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Each step: sweep the playhead across its clip, then move on.
  useEffect(() => {
    const head = headRef.current;
    if (!head) return;
    const from = `${(active / n) * 100}%`;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      head.style.left = from;
      return;
    }
    const anim = head.animate([{ left: from }, { left: `${((active + 1) / n) * 100}%` }], {
      duration: STEP_MS,
      easing: "linear",
      fill: "forwards",
    });
    anim.pause();
    anim.onfinish = () => setActive((a) => (a + 1) % n);
    animRef.current = anim;
    return () => {
      anim.onfinish = null;
      anim.cancel();
      animRef.current = null;
    };
  }, [active, n]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (running) anim.play();
    else anim.pause();
  }, [running, active]);

  // Live timecode, written straight to the DOM.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = Number(animRef.current?.currentTime ?? 0);
      if (tcRef.current) tcRef.current.textContent = timecode(active * STEP_MS + t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div ref={rootRef} className="flex w-full flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Program monitor */}
        <div className="card relative aspect-[4/3] overflow-hidden rounded-[28px] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[440px]">
          {steps.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className={`object-cover transition-[opacity,transform] duration-700 ${
                i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,transparent_28%,transparent_55%,rgba(0,0,0,0.7)_100%)]" />

          {/* Safe-frame corners */}
          <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-5">
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
            ].map((c) => (
              <span key={c} className={`absolute size-5 border-white/60 ${c}`} />
            ))}
          </div>

          <div className="absolute inset-x-7 top-7 flex items-center justify-between gap-3 sm:inset-x-9 sm:top-8">
            <span className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-md">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-[#ff4d4d]" />
              Program
            </span>
            <span className="font-mono text-[11px] font-semibold text-white/75 max-sm:hidden">4K · 24 FPS</span>
          </div>

          <div className="absolute top-[34px] right-7 sm:top-auto sm:right-auto sm:bottom-8 sm:left-9">
            <span ref={tcRef} className="font-mono text-[13px] font-semibold tracking-wider text-white tabular-nums sm:text-[15px]">
              {timecode(0)}
            </span>
          </div>

          <div key={active} className="animate-fade-up absolute right-7 bottom-7 origin-bottom-right max-sm:scale-[0.82] sm:right-9 sm:bottom-8">
            <MonitorOverlay step={active} />
          </div>
        </div>

        {/* Step details */}
        <div
          role="tabpanel"
          id="how-panel"
          aria-labelledby={`how-clip-${active}`}
          className="card flex flex-col overflow-hidden rounded-[28px] p-6 sm:p-8"
        >
          <div className="relative flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">
              Step {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="flex gap-1">
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  className="h-1 w-5 rounded-full transition-colors duration-500"
                  style={{ background: i <= active ? `rgb(${steps[i].tint})` : "rgba(255,255,255,0.12)" }}
                />
              ))}
            </span>
          </div>

          <div key={active} className="animate-fade-up relative mt-5 flex flex-1 flex-col">
            <span
              aria-hidden
              className="font-display text-[70px] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)] sm:text-[88px]"
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-[32px] leading-none text-white sm:text-[37px]">
              {step.title}
            </h3>
            <span
              className="mt-2 text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: `rgb(${step.tint})` }}
            >
              {step.meta}
            </span>
            <p className="mt-4 text-[15px] leading-[1.6] text-white/75">{step.description}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {step.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] text-white/85">
                  <span
                    className="flex size-[18px] shrink-0 items-center justify-center rounded-full"
                    style={{ background: `rgba(${step.tint},0.18)`, color: `rgb(${step.tint})` }}
                  >
                    <svg viewBox="0 0 16 16" className="size-2.5" aria-hidden>
                      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5 max-sm:flex-col max-sm:items-stretch">
            <p className="text-[13px] leading-[1.45] text-muted">
              <span className="font-semibold text-white">No calls needed.</span> Order in minutes.
            </p>
            <Button href="#order" size="sm">
              Start your order
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card rounded-[24px] p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
              className="flex size-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
            >
              {playing ? (
                <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
                  <path d="M4.5 3h2.2v10H4.5zM9.3 3h2.2v10H9.3z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" className="size-3 translate-x-px" aria-hidden>
                  <path d="M4.5 2.8v10.4L13 8z" fill="currentColor" />
                </svg>
              )}
            </button>
            <span className="text-[13px] font-semibold text-white">Your order</span>
            <span className="text-[12px] text-white/40 max-sm:hidden">· 4 steps · first draft in 48h</span>
          </div>
          <span className="font-mono text-[11px] text-white/45">{timecode(n * STEP_MS).slice(3)}</span>
        </div>

        <div className="flex gap-3">
          <div aria-hidden className="flex w-6 shrink-0 flex-col font-mono text-[10px] font-semibold text-white/35 max-sm:hidden">
            <span className="h-6" />
            <span className="flex h-[76px] items-center">V1</span>
            <span className="mt-1.5 flex h-8 items-center">A1</span>
          </div>

          <div className="relative min-w-0 flex-1">
            {/* Ruler */}
            <div
              aria-hidden
              className="relative h-6 border-b border-white/[0.08]"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
                backgroundSize: "calc(100% / 20) 6px",
                backgroundPosition: "left bottom",
                backgroundRepeat: "repeat-x",
              }}
            >
              {Array.from({ length: n + 1 }, (_, i) => (
                <span
                  key={i}
                  className={`absolute top-0 font-mono text-[9.5px] text-white/40 ${
                    i === 0 ? "" : i === n ? "-translate-x-full" : "-translate-x-1/2"
                  }`}
                  style={{ left: `${(i / n) * 100}%` }}
                >
                  {timecode(i * STEP_MS).slice(6, 11)}
                </span>
              ))}
            </div>

            {/* V1: one clip per step */}
            <div role="tablist" aria-label="Ordering steps" className="mt-2 grid grid-cols-4 gap-1.5">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    id={`how-clip-${i}`}
                    aria-selected={isActive}
                    aria-controls="how-panel"
                    onClick={() => setActive(i)}
                    className={`group relative h-[76px] overflow-hidden rounded-xl text-left transition-[opacity,filter] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink ${
                      isActive ? "opacity-100" : i < active ? "opacity-75 hover:opacity-100" : "opacity-45 grayscale-[35%] hover:opacity-80"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(${s.tint},0.85), rgba(${s.tint},0.35)), url(${s.image})`,
                      backgroundSize: "100% 100%, auto 100%",
                      backgroundRepeat: "no-repeat, repeat-x",
                      boxShadow: isActive
                        ? "inset 0 0 0 1.5px rgba(255,255,255,0.85)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.12)",
                    }}
                  >
                    {/* Trim handles */}
                    <span aria-hidden className="absolute inset-y-2 left-1 w-[3px] rounded-full bg-white/50" />
                    <span aria-hidden className="absolute inset-y-2 right-1 w-[3px] rounded-full bg-white/50" />
                    <span className="relative flex h-full flex-col justify-between px-2.5 py-2 sm:px-3.5 sm:py-2.5">
                      <span className="font-mono text-[10px] font-bold text-white/80">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-[11.5px] leading-tight font-semibold text-white sm:text-[13px]">
                          <span className="sm:hidden">{s.short.split(" ")[0]}</span>
                          <span className="max-sm:hidden">{s.short}</span>
                        </span>
                        <span className="truncate text-[10.5px] text-white/70 max-sm:hidden">{s.meta}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* A1: waveform */}
            <div aria-hidden className="mt-1.5 grid grid-cols-4 gap-1.5">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`flex h-8 items-center justify-between gap-px rounded-lg px-2 transition-opacity duration-300 ${i <= active ? "opacity-100" : "opacity-40"}`}
                  style={{ background: `rgba(${s.tint},0.12)` }}
                >
                  {WAVE.map((h, j) => (
                    <span
                      key={j}
                      className={`w-[2px] rounded-full ${j % 2 ? "max-sm:hidden" : ""}`}
                      style={{ height: `${h}%`, background: `rgba(${s.tint},0.75)` }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Playhead */}
            <div ref={headRef} aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0">
              <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-[3px] bg-white [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0_60%)]" />
              <span className="absolute top-2.5 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
