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
    <article className="group relative h-[420px] w-[236px] shrink-0 overflow-hidden rounded-[14px] border border-white/[0.08]">
      <Image
        src={reel.image}
        alt=""
        fill
        sizes="236px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute -inset-x-px -top-px h-[120px] bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute -inset-x-px -bottom-px h-[220px] bg-gradient-to-b from-transparent to-black/80" />

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
        <p className="w-[176px] truncate text-[10.5px] text-white/90">{reel.caption}</p>
      </div>

      <div className="absolute right-[13px] bottom-[15px] size-[22px] overflow-hidden rounded-[6px] border-[1.5px] border-white/70">
        <Image src={reel.image} alt="" fill sizes="22px" className="object-cover" />
      </div>
    </article>
  );
}
