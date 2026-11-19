/** Figma: Logo Strip (3:157) */
const brands = [
  { name: "Northwave", icon: "/assets/brands/northwave.svg", opacity: "opacity-45" },
  { name: "Lumen", icon: "/assets/brands/lumen.svg", opacity: "" },
  { name: "Kinetic", icon: "/assets/brands/kinetic.svg", opacity: "" },
  { name: "Peakform", icon: "/assets/brands/peakform.svg", opacity: "" },
  { name: "HALO", icon: "/assets/brands/halo.svg", opacity: "opacity-60" },
];

// Two passes per marquee half keep the track wider than the container, so the loop never shows a gap.
const track = [...brands, ...brands, ...brands, ...brands];

export function LogoStrip() {
  return (
    <section id="brands" className="pt-6 pb-[72px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-7 px-4 md:px-6 xl:px-0">
        <p className="text-center text-base leading-[1.21] font-medium text-muted">
          Brands that order their videos from us:
        </p>

        <div className="relative w-full">
          <div aria-hidden className="glow-line absolute inset-x-0 top-0 opacity-40" />
          <div aria-hidden className="glow-line absolute inset-x-0 bottom-0 opacity-40" />
          <div className="overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] motion-reduce:[mask-image:none]">
            <ul className="animate-marquee flex w-max items-center hover:[animation-play-state:paused]! motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-5">
              {track.map((brand, i) => {
                const duplicate = i >= brands.length;
                return (
                  <li
                    key={`${brand.name}-${i}`}
                    aria-hidden={duplicate || undefined}
                    className={`flex shrink-0 items-center gap-2 px-5 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 md:px-7 ${brand.opacity} ${duplicate ? "motion-reduce:hidden" : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 shrink-0"
                    />
                    <span className="text-[22px] leading-[1.21] font-bold tracking-[-0.66px] whitespace-nowrap text-white">
                      {brand.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
