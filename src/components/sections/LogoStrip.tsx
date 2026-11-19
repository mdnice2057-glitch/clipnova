/** Figma: Logo Strip (3:157) */
const brands = [
  { name: "Northwave", icon: "/assets/brands/northwave.svg", opacity: "opacity-45" },
  { name: "Lumen", icon: "/assets/brands/lumen.svg", opacity: "" },
  { name: "Kinetic", icon: "/assets/brands/kinetic.svg", opacity: "" },
  { name: "Peakform", icon: "/assets/brands/peakform.svg", opacity: "" },
  { name: "HALO", icon: "/assets/brands/halo.svg", opacity: "opacity-60" },
];

export function LogoStrip() {
  return (
    <section id="brands" className="pt-6 pb-[72px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-7 px-4 md:px-6 xl:px-0">
        <p className="text-center text-base leading-[1.21] font-medium text-muted">
          Brands that order their videos from us:
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {brands.map((brand) => (
            <li
              key={brand.name}
              className={`flex items-center gap-2 transition-opacity duration-200 hover:opacity-100 ${brand.opacity}`}
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
          ))}
        </ul>
      </div>
    </section>
  );
}
