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
    <section id="contact" className="scroll-mt-20 pt-20 pb-20 leading-[normal] md:pt-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 md:px-6 xl:px-0">
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
                    className="group flex h-full flex-col items-start gap-3.5 rounded-[22px] border border-subtle bg-surface p-6 transition-colors hover:border-[rgba(242,185,255,0.35)] hover:bg-[#171717]"
                  >
                    <span className="flex size-12 items-center justify-center rounded-[14px] border border-[rgba(242,185,255,0.25)] bg-[rgba(242,185,255,0.1)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.icon} alt="" width={22} height={22} className="size-[22px]" />
                    </span>
                    <h3 className="font-display text-[25px] leading-[normal] text-white uppercase">
                      {c.title}
                    </h3>
                    <span className="w-full text-[16px] font-semibold break-words text-white">
                      {c.value}
                    </span>
                    <span className="text-[13px] text-muted">{c.note}</span>
                    <span className="flex items-center gap-1.5 pt-1 text-[14px] font-semibold text-[#f2b9ff]">
                      {c.action}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/contact/arrow-pink.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social (29:1029) */}
            <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-[22px] border border-subtle bg-surface py-4 pr-4 pl-6">
              <p className="text-[15px] font-semibold text-white">Follow our latest work</p>
              <ul className="flex items-center gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href="#"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-xl border border-subtle bg-elevated transition-colors hover:border-white/25 hover:bg-[#242424]"
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
