import { SectionHeader } from "@/components/ui/SectionHeader";
import { MessageForm } from "./contact/MessageForm";

const channels = [
  {
    icon: "/assets/contact/icon-mail.svg",
    title: "Email us",
    value: "hello@clipnova.studio",
    note: "Replies within 2 hours",
    action: "Send email",
    href: "mailto:hello@clipnova.studio",
  },
  {
    icon: "/assets/contact/icon-chat.svg",
    title: "WhatsApp",
    value: "+880 1700-000000",
    note: "Fastest — chat with an editor",
    action: "Open chat",
    href: "https://wa.me/8801700000000",
    external: true,
  },
  {
    icon: "/assets/contact/icon-phone.svg",
    title: "Book a call",
    value: "Free 20-min consultation",
    note: "Pick a time that suits you",
    action: "Schedule call",
    href: "#contact-form",
  },
  {
    icon: "/assets/contact/icon-pin.svg",
    title: "Studio",
    value: "Dhaka, Bangladesh",
    note: "Sat–Thu · 10am–8pm (GMT+6)",
    action: "Get directions",
    href: "https://maps.google.com/?q=Dhaka%2C%20Bangladesh",
    external: true,
  },
];

const socials = [
  { label: "Instagram", icon: "/assets/contact/social-instagram.svg" },
  { label: "YouTube", icon: "/assets/contact/social-youtube.svg" },
  { label: "TikTok", icon: "/assets/contact/social-tiktok.svg" },
  { label: "Facebook", icon: "/assets/contact/social-facebook.svg" },
  { label: "LinkedIn", icon: "/assets/contact/social-linkedin.svg" },
];

/** Figma: Contact (29:956) — header, contact channels and message form. */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-x-clip pt-20 pb-20 leading-[normal] md:pt-[120px]"
    >
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[640px]" />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s talk about your project"
          subtitle="Questions before ordering? Reach us on your favourite channel — we reply within 15 minutes during office hours."
        />

        {/* Contact Layout (29:962) */}
        <div className="flex w-full flex-col items-stretch gap-4 xl:flex-row xl:items-stretch">
          {/* Channels (29:963) */}
          <div className="flex w-full flex-col gap-4 xl:w-[600px] xl:shrink-0">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((c) => (
                <li key={c.title}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group card card-hover flex h-full flex-col items-start gap-3.5 rounded-[22px] p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                  >
                    <span className="flex w-full items-start justify-between gap-3">
                      <span className="icon-tile size-12 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.icon} alt="" width={22} height={22} className="size-[22px]" />
                      </span>
                      <span
                        aria-hidden
                        className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] opacity-60 transition-all duration-300 group-hover:border-brand-pink/40 group-hover:opacity-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/assets/contact/arrow-pink.svg"
                          alt=""
                          width={14}
                          height={14}
                          className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                        />
                      </span>
                    </span>
                    <h3 className="font-display text-[25px] leading-[normal] text-white uppercase">
                      {c.title}
                    </h3>
                    <span className="w-full text-[16px] font-semibold break-words text-white">
                      {c.value}
                    </span>
                    <span className="text-[13px] text-muted">{c.note}</span>
                    <span className="mt-auto flex items-center gap-1.5 pt-2 text-[14px] font-semibold text-[#f2b9ff]">
                      {c.action}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/contact/arrow-pink.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social (29:1029) */}
            <div className="card flex w-full flex-wrap items-center justify-between gap-3 rounded-[22px] py-4 pr-4 pl-6">
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
                <span aria-hidden className="bg-brand-gradient size-1.5 rounded-full shadow-[0_0_10px_2px_rgba(228,110,255,0.5)]" />
                Follow our latest work
              </p>
              <ul className="flex items-center gap-2">
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
          </div>

          {/* Message Form (29:1051) */}
          <MessageForm />
        </div>
      </div>
    </section>
  );
}
