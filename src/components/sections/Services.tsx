"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoDialog } from "./services/VideoDialog";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: [string, string, string];
  image: string;
  /** Showreel played full-screen. Services without one show no play control. */
  video?: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Cinematic Vlog Editing",
    description:
      "Story-driven travel and lifestyle vlogs with cinematic pacing, sound and color.",
    tags: ["Storytelling", "Sound design", "B-roll"],
    image: "/assets/services/thumbs/cinematic-vlog.jpg",
    video: "/assets/services/videos/cinematic-vlog.mp4",
  },
  {
    number: "02",
    title: "SaaS Promotional Videos",
    description:
      "Launch films, explainers and ad creatives that make your product click in seconds — built to convert on landing pages and paid social.",
    tags: ["Motion graphics", "Voiceover", "UI animation"],
    image: "/assets/services/thumbs/saas-promo.jpg",
    video: "/assets/services/videos/saas-promo.mp4",
  },
  {
    number: "03",
    title: "Wedding Film Editing",
    description:
      "Emotional highlight reels and full-length films — color graded, scored to music and delivered ready to share with family.",
    tags: ["Highlight film", "Full ceremony", "Same-day teaser"],
    image: "/assets/services/thumbs/wedding-film.jpg",
    video: "/assets/services/videos/wedding-film.mp4",
  },
  {
    number: "04",
    title: "Social Media Reels",
    description:
      "Facebook, Instagram & TikTok Reels with strong hooks, captions and trending audio.",
    tags: ["Hooks", "Captions", "Trending audio"],
    image: "/assets/services/thumbs/social-reels.jpg",
    video: "/assets/services/videos/social-reels.mp4",
  },
  {
    number: "05",
    title: "Post Production",
    description:
      "Cutting, color grading, sound mixing and final 4K mastering — all after the shoot.",
    tags: ["Color grading", "Sound mix", "4K master"],
    image: "/assets/services/thumbs/post-production.jpg",
    video: "/assets/services/videos/post-production.mp4",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-pink";

/**
 * Media frame of a card. With a showreel it is a button that opens the
 * full-screen player; without one it is plain, so nothing looks clickable
 * that isn't.
 */
function Media({
  service,
  onPlay,
  className,
  children,
}: {
  service: Service;
  onPlay: (service: Service) => void;
  className: string;
  children: ReactNode;
}) {
  if (!service.video) return <div className={className}>{children}</div>;

  return (
    <button
      type="button"
      onClick={() => onPlay(service)}
      aria-label={`Play showreel: ${service.title}`}
      className={`cursor-pointer ${focusRing} ${className}`}
    >
      {children}
    </button>
  );
}

/** Plain white play button, the usual video-thumbnail treatment. */
function PlayButton({ large }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none ${
        large ? "size-16 md:size-20" : "size-14"
      }`}
    >
      <svg
        width={large ? 22 : 18}
        height={large ? 22 : 18}
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="translate-x-px"
      >
        <path d="M3 1.8v12.4a.6.6 0 0 0 .9.5l9.8-6.2a.6.6 0 0 0 0-1L3.9 1.3A.6.6 0 0 0 3 1.8Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function Tags({ tags }: { tags: Service["tags"] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
      {tags.map((tag, i) => (
        <li key={tag} className="flex items-center gap-4">
          {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-white/20" />}
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Footer row: no pricing, just a plain route to the contact form. */
function ContactLink({ service }: { service: Service }) {
  return (
    <a
      href="#contact"
      aria-label={`Contact us about ${service.title}`}
      className={`group/link mt-auto inline-flex items-center gap-2 self-start rounded text-[15px] font-semibold text-white transition-colors duration-200 hover:text-brand-pink ${focusRing}`}
    >
      Ask about this service
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/** Figma: Service Card (20:673) — Size=Large (20:648) / Size=Default (20:495). */
function ServiceCard({
  service,
  variant,
  onPlay,
  className = "",
}: {
  service: Service;
  variant: Variant;
  onPlay: (service: Service) => void;
  className?: string;
}) {
  const image = (
    <>
      <Image
        src={service.image}
        alt=""
        fill
        sizes={variant === "feature" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {service.video && <PlayButton large={variant === "feature"} />}
    </>
  );

  if (variant === "feature") {
    return (
      <li
        className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface lg:flex-row ${className}`}
      >
        <Media
          service={service}
          onPlay={onPlay}
          className="relative block aspect-video w-full shrink-0 overflow-hidden bg-elevated lg:aspect-auto lg:min-h-[420px] lg:flex-[1.4]"
        >
          {image}
          <span className="absolute top-4 left-4 rounded-md bg-black/60 px-2 py-1 font-mono text-[12px] text-white/80 backdrop-blur-sm">
            {service.number}
          </span>
        </Media>

        <div className="flex flex-1 flex-col items-start gap-5 p-6 sm:p-8 lg:p-10">
          <span className="text-xs font-semibold tracking-[0.14em] text-brand-pink uppercase">
            Featured showreel
          </span>
          <h3 className="font-display text-[30px] leading-[1.02] text-white sm:text-[38px]">
            {service.title}
          </h3>
          <p className="text-[16px] leading-[1.6] text-muted">{service.description}</p>
          <Tags tags={service.tags} />
          <div className="mt-auto pt-2">
            <ContactLink service={service} />
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface ${className}`}
    >
      <Media
        service={service}
        onPlay={onPlay}
        className="relative block aspect-video w-full overflow-hidden bg-elevated"
      >
        {image}
        <span className="absolute top-3 left-3 rounded-md bg-black/60 px-2 py-1 font-mono text-[12px] text-white/80 backdrop-blur-sm">
          {service.number}
        </span>
      </Media>

      <div className="flex flex-1 flex-col items-start gap-3.5 p-5 md:p-6">
        <h3 className="font-display text-[24px] leading-[1.05] text-white">{service.title}</h3>
        <p className="text-[15px] leading-[1.55] text-muted">{service.description}</p>
        <Tags tags={service.tags} />
        <div className="mt-auto pt-2">
          <ContactLink service={service} />
        </div>
      </div>
    </li>
  );
}

type Variant = "feature" | "default";

/** Figma: Services (4:244) */
export function Services() {
  const [feature, ...rest] = services;
  const [playing, setPlaying] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-x-clip pt-[72px] pb-20 md:pt-[100px] md:pb-[120px]"
    >
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Services"
          title="What we edit"
          subtitle="Five services, one dedicated editing team. Play a showreel to watch it full screen, then get in touch about your project."
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          <ServiceCard
            service={feature}
            variant="feature"
            onPlay={setPlaying}
            className="sm:col-span-2 lg:col-span-4"
          />
          {rest.map((service) => (
            <ServiceCard
              key={service.number}
              service={service}
              variant="default"
              onPlay={setPlaying}
            />
          ))}
        </ul>
      </div>

      <VideoDialog
        open={playing !== null}
        onClose={() => setPlaying(null)}
        src={playing?.video ?? ""}
        poster={playing?.image ?? ""}
        title={playing?.title ?? ""}
      />
    </section>
  );
}
