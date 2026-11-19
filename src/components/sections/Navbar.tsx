"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Client hub", href: "#client-hub" },
  { label: "Contact", href: "#contact" },
];

/** Figma: Navbar (2:33) */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-6 z-50 mx-auto w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
      <nav className="relative flex h-[68px] items-center justify-between rounded-[20px] border border-white/10 bg-[rgba(10,10,11,0.82)] py-2.5 pr-2.5 pl-5 backdrop-blur-[12px]">
        <Logo />

        <ul className="hidden items-center gap-9 text-[15px] font-medium text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="light" size="sm" href="#order" className="hidden sm:inline-flex">
            Order now
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
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
        <div className="mt-2 rounded-[20px] border border-white/10 bg-[rgba(10,10,11,0.95)] p-3 backdrop-blur-[12px] lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-muted hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#order" className="mt-2 w-full sm:hidden" onClick={() => setOpen(false)}>
            Order now
          </Button>
        </div>
      )}
    </header>
  );
}
