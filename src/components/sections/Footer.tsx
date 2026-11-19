import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "SaaS promos", href: "#services" },
      { label: "Wedding films", href: "#services" },
      { label: "Vlogs & reels", href: "#services" },
      { label: "Post production", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Press kit", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

const legal = ["Privacy", "Terms", "Cookies"];

/** Figma: Footer (7:590) — brand, link columns, legal row and giant wordmark. */
export function Footer() {
  return (
    <footer id="footer" className="overflow-hidden border-t border-subtle pt-14 leading-[normal] md:pt-[72px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-4 md:px-6 xl:px-0">
        {/* Top (7:591) */}
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="max-w-[320px] text-[15px] leading-[1.55] text-muted">
              Order professional video editing — SaaS promos, wedding films, vlogs, reels and post
              production, delivered on time.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:flex sm:gap-20"
          >
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col items-start gap-3.5">
                <h3 className="text-[14px] font-semibold text-white">{col.title}</h3>
                <ul className="flex flex-col items-start gap-3.5 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[15px] whitespace-nowrap text-muted transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom (7:618) */}
        <div className="flex w-full flex-col gap-3 border-t border-subtle pt-6 text-[14px] text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>© 2026 Clipnova Studio. All rights reserved.</p>
          <ul className="flex items-center">
            {legal.map((item, i) => (
              <li key={item} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-3">
                    ·
                  </span>
                )}
                <a href="#" className="transition-colors hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wordmark (7:621) — 336px at 1440 (23.33vw), 7% warm white */}
      <p
        aria-hidden
        className="font-display mt-14 text-center text-[clamp(96px,23.333vw,336px)] leading-[0.8] whitespace-nowrap text-[rgba(245,245,240,0.07)] uppercase select-none"
      >
        clipnova
      </p>
    </footer>
  );
}
