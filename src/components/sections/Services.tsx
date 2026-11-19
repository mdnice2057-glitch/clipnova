import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: [string, string, string];
  priceLabel: string;
  price: string;
  image: string;
};

const featured: Service[] = [
  {
    number: "01",
    title: "SaaS Promotional Videos",
    description:
      "Launch films, explainers and ad creatives that make your product click in seconds — built to convert on landing pages and paid social.",
    tags: ["Motion graphics", "Voiceover", "UI animation"],
    priceLabel: "Starting at",
    price: "$499",
    image: "/assets/services/saas-promo.jpg",
  },
  {
    number: "02",
    title: "Wedding Film Editing",
    description:
      "Emotional highlight reels and full-length films — color graded, scored to music and delivered ready to share with family.",
    tags: ["Highlight film", "Full ceremony", "Same-day teaser"],
    priceLabel: "Starting at",
    price: "$349",
    image: "/assets/services/wedding-film.jpg",
  },
];

const more: Service[] = [
  {
    number: "03",
    title: "Cinematic Vlog Editing",
    description:
      "Story-driven travel and lifestyle vlogs with cinematic pacing, sound and color.",
    tags: ["Storytelling", "Sound design", "B-roll"],
    priceLabel: "Starting at",
    price: "$199",
    image: "/assets/services/cinematic-vlog.jpg",
  },
  {
    number: "04",
    title: "Social Media Reels",
    description:
      "Facebook, Instagram & TikTok Reels with strong hooks, captions and trending audio.",
    tags: ["Hooks", "Captions", "Trending audio"],
    priceLabel: "Per reel from",
    price: "$49",
    image: "/assets/services/social-reels.jpg",
  },
  {
    number: "05",
    title: "Post Production",
    description:
      "Cutting, color grading, sound mixing and final 4K mastering — all after the shoot.",
    tags: ["Color grading", "Sound mix", "4K master"],
    priceLabel: "Starting at",
    price: "$149",
    image: "/assets/services/post-production.jpg",
  },
];

const arrowGradient =
  "linear-gradient(124.8deg, rgb(228,110,255) 3.6%, rgb(0,145,255) 41.73%, rgb(180,218,171) 75.54%)";

/** Figma: Service Card (20:673) — Size=Large (20:648) / Size=Default (20:495). */
function ServiceCard({
  service,
  size,
}: {
  service: Service;
  size: "large" | "default";
}) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-[28px] border border-subtle bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#3a3a3a]">
      <div
        className={`relative w-full shrink-0 overflow-hidden ${
          size === "large" ? "h-[240px] md:h-[320px]" : "h-[230px]"
        }`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={
            size === "large"
              ? "(min-width: 1024px) 592px, 100vw"
              : "(min-width: 1024px) 389px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-y-0 left-0 -right-0.5 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_45%,rgba(18,18,20,0.95)_100%)]" />
        <span className="absolute top-[18px] left-[18px] rounded-full border border-white/[0.18] bg-black/45 px-3 py-1.5 font-display text-[17px] leading-[1.2] text-white backdrop-blur-[6px]">
          {service.number}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-[18px] right-4 flex size-[58px] items-center justify-center rounded-full border border-white/35 bg-white/16 backdrop-blur-[8px] transition-transform duration-300 group-hover:scale-110"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/services/play.svg" alt="" width={20} height={20} className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start gap-3.5 px-6 pt-6 pb-7 md:px-7">
        <h3 className="w-full font-display text-[32px] leading-[1.05] text-white uppercase md:text-[36px]">
          {service.title}
        </h3>
        <p className="w-full text-base leading-[1.55] text-muted">
          {service.description}
        </p>
        <ul className="flex w-full flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-subtle bg-elevated px-3 py-1.5 text-[13px] leading-[1.21] font-medium whitespace-nowrap text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex w-full items-center justify-between border-t border-subtle pt-4">
          <p className="flex items-baseline gap-1.5 leading-[1.21] whitespace-nowrap">
            <span className="text-sm text-muted">{service.priceLabel}</span>
            <span className="font-display text-[27px] text-white">{service.price}</span>
          </p>
          <a
            href="#order"
            aria-label={`Order ${service.title}`}
            className="flex size-11 shrink-0 items-center justify-center rounded-full transition-[transform,filter] duration-200 hover:scale-110 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
            style={{ backgroundImage: arrowGradient }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/services/arrow-up-right.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
          </a>
        </div>
      </div>
    </li>
  );
}

/** Figma: Services (4:244) */
export function Services() {
  return (
    <section id="services" className="pt-[72px] pb-20 md:pt-[100px] md:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Services"
          title="What we edit"
          subtitle="Five services, one dedicated editing team. Order a single video or a full campaign — we deliver ready-to-publish files."
        />
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {featured.map((service) => (
              <ServiceCard key={service.number} service={service} size="large" />
            ))}
          </ul>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((service) => (
              <ServiceCard key={service.number} service={service} size="default" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
