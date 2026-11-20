"use client";

import { useEffect, useRef } from "react";
import { ReelCard, type Reel } from "./ReelCard";

const SPEED = 38; // px of arc per second

/**
 * Places every `[data-reel]` child of `stage` on the inside of a cylinder for the given
 * arc `offset`. Self-contained (no outer references) so it can also be inlined as a
 * pre-hydration script — otherwise the cards stay hidden until the JS bundle loads.
 */
function layoutReels(stage: HTMLElement, offset: number, width: number) {
  const MAX_ANGLE = 1.25; // rad — cards past this angle are hidden
  const FADE = 0.18; // rad — fade-out band before MAX_ANGLE

  // Card size + curvature for the current stage width.
  const mobile = width < 640;
  const pitch = mobile ? 190 + 12 : 236 + 18;
  const radius = mobile ? Math.max(width * 0.95, 340) : Math.min(Math.max(width * 0.5, 520), 760);
  const depth = radius * 0.45;

  const els = stage.querySelectorAll<HTMLElement>("[data-reel]");
  const loop = els.length * pitch;
  stage.style.perspective = `${radius * 0.95}px`;

  els.forEach((el, i) => {
    let s = (((i * pitch - offset) % loop) + loop) % loop;
    if (s > loop / 2) s -= loop;
    const angle = s / radius;
    const abs = Math.abs(angle);

    if (abs > MAX_ANGLE) {
      el.style.visibility = "hidden";
      return;
    }
    const x = radius * Math.sin(angle);
    const z = radius * (1 - Math.cos(angle)) - depth;
    el.style.visibility = "visible";
    el.style.opacity = String(Math.min(1, (MAX_ANGLE - abs) / FADE));
    el.style.zIndex = String(Math.round(1000 + z));
    el.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}rad)`;
  });
}

const preHydrationLayout = `(function(){var s=document.currentScript.previousElementSibling;(${layoutReels.toString()})(s,0,s.clientWidth)})()`;

/**
 * Reels laid out on the inside of a cylinder: center cards recede, edge cards swing
 * toward the viewer. Auto-rotates, pauses on hover and can be dragged.
 */
export function ReelCarousel({ reels }: { reels: Reel[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const items = [...reels, ...reels];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = stage.clientWidth;
    let offset = 0;
    let hovered = false;
    let visible = true;
    let drag: { x: number; offset: number } | null = null;
    let last = performance.now();
    let raf = 0;

    const layout = () => layoutReels(stage, offset, width);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      if (!reduceMotion && !hovered && !drag && visible) offset += SPEED * dt;
      layout();
      raf = requestAnimationFrame(tick);
    };

    const resize = new ResizeObserver(() => {
      width = stage.clientWidth;
      layout();
    });
    resize.observe(stage);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(stage);

    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, offset };
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (drag) offset = drag.offset - (e.clientX - drag.x) * 1.4;
    };
    const onUp = () => (drag = null);

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    layout();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      io.disconnect();
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [items.length]);

  // Positions/visibility are written straight to the DOM (inline script, then the effect),
  // so React owns no inline styles here; suppressHydrationWarning covers the script's writes.
  return (
    <>
      <div
        ref={stageRef}
        suppressHydrationWarning
        onDragStart={(e) => e.preventDefault()}
        className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
      >
        {items.map((reel, i) => (
          <div
            key={`${reel.handle}-${i}`}
            data-reel=""
            suppressHydrationWarning
            aria-hidden={i >= reels.length || undefined}
            className="invisible absolute top-1/2 left-1/2 -mt-[169px] -ml-[95px] will-change-transform sm:-mt-[210px] sm:-ml-[118px]"
          >
            <ReelCard reel={reel} priority={i < reels.length} />
          </div>
        ))}
      </div>
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: preHydrationLayout }} />
    </>
  );
}
