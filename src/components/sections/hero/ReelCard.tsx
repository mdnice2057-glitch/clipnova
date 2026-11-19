import Image from "next/image";

export type Reel = {
  image: string;
  avatar: string;
  handle: string;
  caption: string;
  stats: [likes: string, comments: string, reposts: string, shares: string];
};

// Each action icon's SVG includes a drop shadow, so Figma offsets it outside the 20px box.
const actions = [
  { icon: "/assets/hero/icon-like.svg", inset: "0 -2.84% -9.92% -2.84%" },
  { icon: "/assets/hero/icon-comment.svg", inset: "-3.11% -4.93% -9.92% -4.92%" },
  { icon: "/assets/hero/icon-repost.svg", inset: "-2% -2.83% -12% -2.83%" },
  { icon: "/assets/hero/icon-send.svg", inset: "-2% -7% -12% -7%" },
];

/** Figma: Reel Card (35:996) — short-form preview with TikTok-style action rail. */
export function ReelCard({ reel }: { reel: Reel }) {
  return (
    <article className="card card-hover group relative h-[338px] w-[190px] shrink-0 overflow-hidden rounded-[18px] sm:h-[420px] sm:w-[236px]">
      <Image
        src={reel.image}
        alt=""
        fill
        sizes="(max-width: 639px) 190px, 236px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute -inset-x-px -top-px h-[120px] bg-gradient-to-b from-black/45 to-transparent" />
      <div className="absolute -inset-x-px -bottom-px h-[220px] bg-gradient-to-b from-transparent to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(228,110,255,0.28)] via-[rgba(0,145,255,0.08)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div aria-hidden className="absolute inset-x-3 top-3 h-[2px] overflow-hidden rounded-full bg-white/25">
        <div className="bg-brand-gradient h-full w-1/4 rounded-full transition-[width] duration-[2400ms] ease-linear group-hover:w-full motion-reduce:transition-none" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 scale-75 items-center justify-center rounded-full bg-white/15 opacity-0 shadow-[0_12px_40px_-6px_rgba(228,110,255,0.7)] ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/feed/icon-play.svg" alt="" width={26} height={26} className="size-[26px] translate-x-px" />
        </span>
      </div>

      <div className="absolute right-[11.5px] bottom-10 flex flex-col items-center gap-3">
        {actions.map((a, i) => (
          <div key={a.icon} className="flex flex-col items-center gap-[3px]">
            <div className="relative size-5">
              <div className="absolute" style={{ inset: a.inset }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.icon} alt="" className="block size-full max-w-none" />
              </div>
            </div>
            <span className="text-[8px] font-medium text-white/80">{reel.stats[i]}</span>
          </div>
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/hero/icon-more.svg" alt="" width={13} height={3} className="h-[3px] w-[13px]" />
      </div>

      <div className="absolute bottom-[15px] left-[13px] flex flex-col items-start gap-2">
        <div className="flex items-center gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={reel.avatar} alt="" width={20} height={20} className="size-5" />
          <span className="text-[11px] font-semibold text-white">{reel.handle}</span>
          <span className="flex size-[11px] items-center justify-center rounded-full bg-brand-blue">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/hero/icon-verified.svg" alt="" width={7} height={7} className="size-[7px]" />
          </span>
          <span className="rounded-full border border-white/45 px-[7px] py-0.5 text-[8.5px] font-medium text-white/90">
            Follow
          </span>
        </div>
        <p className="w-[132px] truncate sm:w-[176px] text-[10.5px] text-white/90">{reel.caption}</p>
      </div>

      <div className="absolute right-[13px] bottom-[15px] size-[22px] overflow-hidden rounded-[6px] border-[1.5px] border-white/70">
        <Image src={reel.image} alt="" fill sizes="22px" className="object-cover" />
      </div>
    </article>
  );
}
