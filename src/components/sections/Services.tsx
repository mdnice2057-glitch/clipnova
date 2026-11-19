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

const services: Service[] = [
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
  "linear-gradient(124.8deg, rgb(255,110,110) 3.6%, rgb(255,43,43) 45%, rgb(184,10,10) 90%)";

type Variant = "feature" | "default";

const glass = "border border-white/[0.16] bg-black/40 backdrop-blur-[8px]";

function NumberBadge({ number, large }: { number: string; large?: boolean }) {
  return (
    <span
      className={`absolute top-4 left-4 z-[2] flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2 sm:top-5 sm:left-5 ${glass}`}
    >
      <span aria-hidden="true" className="bg-brand-gradient size-1.5 rounded-full" />
      <span
        className={`text-brand font-display leading-none tracking-[0.04em] ${
          large ? "text-[16px]" : "text-[14px]"
        }`}
      >
        {number}
      </span>
    </span>
  );
}

function PlayBadge({ large }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-4 right-4 z-[2] flex items-center justify-center rounded-full border border-white/30 bg-white/[0.14] backdrop-blur-[8px] transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:bg-white/25 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:top-5 sm:right-5 ${
        large ? "size-[64px] md:size-[72px]" : "size-[52px]"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/services/play.svg" alt="" width={20} height={20} className={large ? "size-6" : "size-5"} />
    </span>
  );
}

function Tags({ tags, onImage }: { tags: Service["tags"]; onImage?: boolean }) {
  return (
    <ul className="flex w-full flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full px-3 py-1.5 text-[13px] leading-[1.21] font-medium whitespace-nowrap ${
            onImage
              ? "border border-white/[0.14] bg-white/[0.06] text-white/90 backdrop-blur-[8px]"
              : "border border-white/[0.08] bg-white/[0.04] text-muted"
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function PriceRow({ service, large }: { service: Service; large?: boolean }) {
  return (
    <div className="mt-auto flex w-full items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
      <p className="flex flex-col gap-1 leading-none whitespace-nowrap">
        <span className="text-xs font-medium tracking-[0.06em] text-muted uppercase">
          {service.priceLabel}
        </span>
        <span
          className={`text-brand font-display leading-none ${
            large ? "text-[32px] md:text-[38px]" : "text-[27px]"
          }`}
        >
          {service.price}
        </span>
      </p>
      <a
        href="#order"
        aria-label={`Order ${service.title}`}
        className={`relative flex shrink-0 items-center justify-center rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] transition-[transform,filter,box-shadow] duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink motion-reduce:transition-none ${
          large ? "size-14" : "size-12"
        }`}
        style={{ backgroundImage: arrowGradient }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/services/arrow-up-right.svg"
          alt=""
          width={18}
          height={18}
          className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none ${
            large ? "size-5" : "size-[18px]"
          }`}
        />
      </a>
    </div>
  );
}

/** Figma: Service Card (20:673) — Size=Large (20:648) / Size=Default (20:495). */
function ServiceCard({
  service,
  variant,
  className = "",
}: {
  service: Service;
  variant: Variant;
  className?: string;
}) {
  if (variant === "feature") {
    return (
      <li
        className={`group card card-hover flex min-h-[540px] flex-col justify-end overflow-hidden rounded-[28px] sm:min-h-[520px] lg:min-h-[560px] ${className}`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 790px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_28%,rgba(0,0,0,0.55)_52%,rgba(0,0,0,0.94)_78%,#000000_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(90%_60%_at_0%_100%,rgba(255,43,43,0.22),transparent_60%),radial-gradient(70%_50%_at_100%_100%,rgba(209,15,15,0.16),transparent_60%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        <NumberBadge number={service.number} large />
        <PlayBadge large />

        <div className="relative z-[1] flex flex-col items-start gap-4 p-6 pt-[220px] sm:p-8 sm:pt-[200px] md:p-10">
          <h3 className="w-full max-w-[560px] font-display text-[32px] leading-[0.95] text-white sm:text-[42px] lg:text-[48px]">
            {service.title}
          </h3>
          <p className="w-full max-w-[520px] text-base leading-[1.55] text-white/75 md:text-[17px]">
            {service.description}
          </p>
          <Tags tags={service.tags} onImage />
          <PriceRow service={service} large />
        </div>
      </li>
    );
  }

  return (
    <li
      className={`group card card-hover flex flex-col overflow-hidden rounded-[28px] ${className}`}
    >
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden md:h-[230px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 389px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_40%,rgba(15,15,17,0.85)_88%,#121214_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,43,43,0.25),rgba(209,15,15,0.18)_55%,transparent)] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        />
        <NumberBadge number={service.number} />
        <PlayBadge />
      </div>

      <div className="relative z-[1] flex flex-1 flex-col items-start gap-3.5 px-6 pt-5 pb-6 md:px-7 md:pb-7">
        <h3 className="w-full font-display text-[26px] leading-[1.02] text-white md:text-[27px]">
          {service.title}
        </h3>
        <p className="w-full text-[15px] leading-[1.55] text-muted md:text-base">
          {service.description}
        </p>
        <Tags tags={service.tags} />
        <PriceRow service={service} />
      </div>
    </li>
  );
}

/** Figma: Services (4:244) */
export function Services() {
  const [feature, ...rest] = services;

  return (
    <section
      id="services"
      className="relative overflow-x-clip pt-[72px] pb-20 md:pt-[100px] md:pb-[120px]"
    >
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Services"
          title="What we edit"
          subtitle="Five services, one dedicated editing team. Order a single video or a full campaign — we deliver ready-to-publish files."
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          <ServiceCard service={feature} variant="feature" className="sm:col-span-2" />
          {rest.map((service) => (
            <ServiceCard key={service.number} service={service} variant="default" />
          ))}
        </ul>
      </div>
    </section>
  );
}
