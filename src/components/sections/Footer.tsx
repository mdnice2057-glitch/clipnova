import { Button } from "@/components/ui/Button";
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

const socials = [
  { label: "Instagram", icon: "/assets/contact/social-instagram.svg" },
  { label: "YouTube", icon: "/assets/contact/social-youtube.svg" },
  { label: "TikTok", icon: "/assets/contact/social-tiktok.svg" },
  { label: "Facebook", icon: "/assets/contact/social-facebook.svg" },
  { label: "LinkedIn", icon: "/assets/contact/social-linkedin.svg" },
];

const linkHover =
  "relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-gradient after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 focus-visible:text-white focus-visible:after:scale-x-100 focus-visible:outline-none";

/** Figma: Footer (7:590) — brand, link columns, and legal row. */
export function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden pt-6 pb-10 leading-[normal] md:pt-10 md:pb-12"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-4 md:px-6 xl:px-0">
        {/* CTA band */}
        <div className="card overflow-hidden rounded-[28px] px-6 py-12 text-center sm:px-10 md:py-16">
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-chrome font-display max-w-[760px] text-[32px] leading-[0.98] sm:text-[42px] md:text-[51px]">
              Ready to turn your footage into something great?
            </h2>
            <p className="max-w-[520px] text-[15px] leading-[1.55] text-muted md:text-[17px]">
              Get a fixed quote within 2 hours. No payment until you approve.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
              <Button href="#order">Place an order</Button>
              <Button variant="secondary" href="#contact">
                Talk to us
              </Button>
            </div>
          </div>
        </div>

        <div aria-hidden className="glow-line w-full opacity-70" />

        {/* Top (7:591) */}
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="flex flex-col items-start gap-5">
            <Logo />
            <p className="max-w-[320px] text-[15px] leading-[1.55] text-muted">
              Order professional video editing — SaaS promos, wedding films, vlogs, reels and post
              production, delivered on time.
            </p>
            <ul className="flex items-center gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-pink/50 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" width={18} height={18} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:flex sm:gap-20"
          >
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col items-start gap-4">
                <h3 className="text-[12px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  {col.title}
                </h3>
                <ul className="flex flex-col items-start gap-3.5 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className={`text-[15px] whitespace-nowrap text-muted ${linkHover}`}
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
        <div className="flex w-full flex-col gap-3 border-t border-white/[0.07] pt-6 text-[14px] text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>© 2026 Clipnova Studio. All rights reserved.</p>
          <ul className="flex items-center">
            {legal.map((item, i) => (
              <li key={item} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-3">
                    ·
                  </span>
                )}
                <a href="#" className={linkHover}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
