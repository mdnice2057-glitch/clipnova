import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { Tag } from "@/components/ui/Tag";
import { Navbar } from "./Navbar";
import { type Reel } from "./hero/ReelCard";
import { ReelCarousel } from "./hero/ReelCarousel";

const reels: Reel[] = [
  { image: "/assets/hero/reel-0.png", avatar: "/assets/hero/avatar-0.png", handle: "nadia.arif", caption: "Our mehendi film — delivered in 6 days ✨", stats: ["12K", "640", "210", "3.1K"] },
  { image: "/assets/hero/reel-1.png", avatar: "/assets/hero/avatar-1.png", handle: "sara.travels", caption: "Sent raw clips, got this vlog back in 72 hrs 🌊", stats: ["837K", "25K", "15.5K", "100.5K"] },
  { image: "/assets/hero/reel-2.jpg", avatar: "/assets/hero/avatar-2.png", handle: "rafi.weds", caption: "Clipnova edited our wedding film. We cried.", stats: ["105K", "12.5K", "5.2K", "24K"] },
  { image: "/assets/hero/reel-3.png", avatar: "/assets/hero/avatar-3.png", handle: "brewhouse.co", caption: "Café launch reel — ordered Monday, live Wednesday ☕", stats: ["5,948", "46", "35", "10.6K"] },
  { image: "/assets/hero/reel-4.png", avatar: "/assets/hero/avatar-4.png", handle: "marcus.travels", caption: "Sajek Valley vlog — edited & graded by Clipnova", stats: ["5,242", "102", "350", "10.6K"] },
  { image: "/assets/hero/reel-5.png", avatar: "/assets/hero/avatar-5.png", handle: "mim.creates", caption: "I just film. They deliver 12 reels a month.", stats: ["937K", "25K", "15.5K", "100.5K"] },
  { image: "/assets/hero/reel-6.png", avatar: "/assets/hero/avatar-6.png", handle: "dhaka.vlogs", caption: "Golden hour, color graded by Clipnova", stats: ["2,941", "88", "21", "4.2K"] },
];

const clients = [0, 1, 2, 3, 4].map((i) => `/assets/hero/client-${i}.png`);

const tileBg =
  "linear-gradient(141.52deg, rgb(201,168,255) 14.286%, rgb(160,123,255) 37.143%, rgb(124,85,245) 62.857%, rgb(93,59,224) 85.714%)";

/** Glossy app-icon tile floating around the hero headline (Figma: Float Tile / *). */
function FloatTile({
  size,
  radius,
  rotate,
  icon,
  iconSize,
  iconInset,
  className = "",
  delay = "0s",
}: {
  size: number;
  radius: number;
  rotate: number;
  icon: string;
  iconSize: number;
  iconInset: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`animate-float ${className}`}
      style={
        {
          "--r": `${rotate}deg`,
          transform: `rotate(${rotate}deg)`,
          animationDelay: delay,
        } as React.CSSProperties
      }
    >
      <div
        className="relative flex items-center justify-center overflow-hidden border-[1.5px] border-white/45 shadow-[0_0_0_6px_rgba(255,255,255,0.04)]"
        style={{ width: size, height: size, borderRadius: radius, backgroundImage: tileBg }}
      >
        <div className="absolute inset-x-[10%] top-[5%] h-[42%] rounded-[inherit] bg-gradient-to-b from-white/50 to-white/0" />
        <div className="relative" style={{ width: iconSize, height: iconSize }}>
          <div className="absolute" style={{ inset: iconInset }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt="" className="block size-full max-w-none" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]"
          style={{ borderRadius: "inherit" }}
        />
      </div>
    </div>
  );
}

/** Figma: Hero (2:30) — navbar, headline, CTAs, social proof and reel showcase. */
export function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center pt-6 pb-16">
      {/* Background: color wash → fluted glass → sheen → fade to base → edge vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1409px]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(30,63,134) 0%, rgb(47,99,198) 22%, rgb(79,103,201) 50%, rgb(148,121,207) 75%, rgb(141,115,196) 90%, rgb(74,61,110) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.12) 12%, rgba(0,0,0,0.02) 55%, rgba(255,255,255,0.05) 90%, rgba(255,255,255,0.13) 100%)",
              backgroundSize: "96px 100%",
              backgroundPosition: "center top",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-white/10 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(10,10,11,0.05) 0%, rgba(10,10,11,0.18) 22%, rgba(10,10,11,0.62) 42%, rgba(10,10,11,0.88) 58%, rgba(10,10,11,0.94) 75%, rgb(10,10,11) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 12%, rgba(10,10,11,0) 88%, rgba(10,10,11,0.55) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-[980px] bg-grid opacity-80" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.16),transparent_70%)]" />
      </div>

      {/* Floating platform tiles, positioned on the 1440 design canvas */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-[700px] max-w-[1440px] lg:block">
        <div className="absolute top-[239.47px] left-[76px] flex size-[139.955px] items-center justify-center">
          <FloatTile size={118} radius={30.68} rotate={-12} icon="/assets/hero/icon-youtube.svg" iconSize={62} iconInset="0" className="relative" />
        </div>
        <div className="absolute top-[570px] left-[170px] flex size-[84px] items-center justify-center max-xl:left-[70px]">
          <FloatTile size={72} radius={20} rotate={12} icon="/assets/hero/icon-facebook.svg" iconSize={34} iconInset="0" className="relative opacity-85 blur-[2.5px]" delay="-3s" />
        </div>
        <div className="absolute top-[397.5px] right-[40px] flex size-[128.638px] items-center justify-center min-[1440px]:right-[126px]">
          <FloatTile size={104} radius={27.04} rotate={16} icon="/assets/hero/icon-instagram.svg" iconSize={52} iconInset="0" className="relative" delay="-2s" />
        </div>
        <div className="absolute top-[166px] right-[120px] flex size-[83.409px] items-center justify-center min-[1440px]:right-[209px]">
          <FloatTile size={72} radius={20} rotate={10} icon="/assets/hero/icon-shorts.svg" iconSize={34} iconInset="0" className="relative opacity-85 blur-[2.5px]" delay="-4s" />
        </div>
      </div>

      <Navbar />
      <div aria-hidden className="h-[68px] shrink-0" />

      {/* Hero content */}
      <div className="relative flex flex-col items-center gap-5 px-4 pt-10 pb-12 text-center sm:gap-7 sm:pt-16 sm:pb-20 md:pt-24">
        <Tag>
          <span className="sm:hidden">Accepting orders — first draft in 48h</span>
          <span className="max-sm:hidden">Now accepting new orders — first draft in 48 hours</span>
        </Tag>

        <h1 className="text-chrome font-display text-[length:min(64px,calc((100vw_-_2.5rem)/6.2))] leading-[0.98] uppercase sm:text-[96px] lg:text-[143px]">
          <span className="whitespace-nowrap">Every frame,</span>
          <br />
          <span className="whitespace-nowrap">perfectly crafted</span>
        </h1>

        <p className="max-w-[640px] text-[15px] leading-[1.55] text-muted sm:hidden">
          Upload your raw footage — our pro editors deliver polished, ready-to-publish videos for
          promos, weddings, vlogs and reels.
        </p>
        <p className="max-w-[640px] text-lg leading-[1.55] text-muted max-sm:hidden md:text-xl">
          Place an order, upload your raw footage, and our professional editors deliver a polished,
          ready-to-publish video — SaaS promos, wedding films, vlogs, reels and post production.
        </p>

        <div className="flex w-full max-w-[340px] flex-col gap-3 pt-1 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-3.5 sm:pt-2">
          <Button href="#order" className="max-sm:w-full">
            Place an order
          </Button>
          <Button variant="secondary" href="#work" className="max-sm:w-full">
            See our work
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="flex items-start">
            {clients.map((src, i) => (
              <div key={src} className={`relative size-[38px] shrink-0 ${i < clients.length - 1 ? "-mr-2.5" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={44} height={44} className="absolute -inset-[7.89%] block size-[115.78%] max-w-none" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Stars />
            <p className="text-sm font-medium text-muted">
              4.9/5 from 2,148 clients · 12,480 videos delivered
            </p>
          </div>
        </div>
      </div>

      {/* Showcase: reels curved around the inside of a cylinder */}
      <div className="relative -mt-14 h-[340px] w-full overflow-x-clip sm:-mt-24 sm:h-[480px]">
        <ReelCarousel reels={reels} />
        <div aria-hidden className="pointer-events-none absolute -inset-y-24 left-0 z-[2000] w-8 bg-gradient-to-r from-canvas to-transparent sm:w-[80px] md:w-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -inset-y-24 right-0 z-[2000] w-8 bg-gradient-to-l from-canvas to-transparent sm:w-[80px] md:w-[140px]" />
      </div>
    </section>
  );
}
