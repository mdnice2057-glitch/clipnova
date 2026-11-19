"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

/** Figma: Navbar (2:33) */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-6 z-50 mx-auto w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
      <nav className="relative flex h-[68px] items-center justify-between rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(28,28,32,0.62),rgba(0,0,0,0.72))] py-2.5 pr-2.5 pl-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-linear-to-r from-transparent via-brand-pink/50 to-transparent"
        />
        <Logo />

        <ul className="hidden items-center gap-9 text-[15px] font-medium text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-1.5 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-brand-gradient after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 focus-visible:text-white focus-visible:outline-none focus-visible:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="light" size="sm" href="#order" className="max-sm:hidden">
            Order now
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`flex size-11 items-center justify-center rounded-full border text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink lg:hidden ${
              open ? "border-white/25 bg-white/[0.08]" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="relative mt-2 overflow-hidden rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(24,24,28,0.92),rgba(0,0,0,0.96))] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150 motion-safe:transition-[opacity,translate] motion-safe:duration-300 motion-safe:starting:-translate-y-2 motion-safe:starting:opacity-0 lg:hidden"
        >
          <ul className="relative flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-medium text-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/contact/arrow-pink.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-3.5 opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="relative px-2 pb-2 sm:hidden" onClick={() => setOpen(false)}>
            <Button href="#order" className="mt-2 w-full sm:hidden">
              Order now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
