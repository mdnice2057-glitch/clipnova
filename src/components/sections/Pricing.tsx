import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Plan = {
  name: string;
  description: string;
  price: string;
  unit: string;
  cta: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic",
    description: "Reels, TikToks and Shorts up to 60 seconds.",
    price: "$49",
    unit: "/ video",
    cta: "Order Basic",
    features: [
      "Up to 60-second video",
      "Captions & trending audio",
      "48-hour delivery",
      "2 free revisions",
      "Vertical + square formats",
    ],
  },
  {
    name: "Standard",
    description: "Vlogs, YouTube videos and SaaS explainers up to 10 minutes.",
    price: "$199",
    unit: "/ video",
    cta: "Order Standard",
    featured: true,
    features: [
      "Up to 10-minute video",
      "Color grading & sound design",
      "Motion graphics & titles",
      "3–5 day delivery",
      "Unlimited revisions",
    ],
  },
  {
    name: "Premium",
    description: "Wedding films, SaaS launch films and full post production.",
    price: "From $499",
    unit: "/ project",
    cta: "Get a custom quote",
    features: [
      "Wedding highlight + full film",
      "Cinematic 4K color grade",
      "Licensed music & voiceover",
      "Dedicated senior editor",
      "Priority delivery",
    ],
  },
];

/** Figma: Pricing Card (5:302) */
function PricingCard({ plan }: { plan: Plan }) {
  const { featured } = plan;
  return (
    <article
      className={`card flex w-full max-w-[389px] flex-col items-start gap-6 rounded-[28px] px-6 sm:px-8 lg:min-w-0 lg:flex-1 ${
        featured
          ? "card-spin pt-10 pb-11 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-transform duration-300 motion-safe:hover:-translate-y-1 lg:z-10 lg:-my-6 lg:max-w-[410px] lg:flex-[1.08] lg:pt-12 lg:pb-14"
          : "card-hover pt-8 pb-9"
      }`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
          style={{
            backgroundImage:
              "radial-gradient(110% 55% at 50% 0%, rgba(167,116,255,0.2) 0%, rgba(124,77,255,0.08) 45%, transparent 75%)",
          }}
        />
      )}

      <div className="flex w-full items-center justify-between gap-3">
        <h3 className="font-display text-[27px] leading-[normal] text-white uppercase">{plan.name}</h3>
        {featured && (
          <span className="bg-brand-gradient rounded-full px-3 py-1.5 text-xs leading-[normal] font-bold tracking-[0.48px] whitespace-nowrap text-white uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]">
            Most popular
          </span>
        )}
      </div>

      <p className="w-full text-[15px] leading-[1.5] text-muted">{plan.description}</p>

      <p className="flex flex-wrap items-baseline gap-x-2 whitespace-nowrap">
        <span
          className={`font-display leading-none uppercase ${
            featured
              ? "text-brand text-[64px] xl:text-[76px]"
              : "text-[52px] text-white xl:text-[60px]"
          }`}
        >
          {plan.price}
        </span>
        <span className="text-base leading-[normal] text-muted">{plan.unit}</span>
      </p>

      {featured ? (
        <Button href="#order" variant="primary" className="w-full leading-[normal]">
          {plan.cta}
        </Button>
      ) : (
        <Button href="#order" variant="secondary" className="w-full leading-[normal]">
          {plan.cta}
        </Button>
      )}

      <div
        className={featured ? "glow-line w-full" : "h-px w-full bg-white/[0.08]"}
        aria-hidden
      />

      <ul className="flex flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span
              className={`flex size-[22px] shrink-0 items-center justify-center rounded-full ${
                featured
                  ? "bg-brand-gradient"
                  : "bg-[rgba(214,194,255,0.12)] shadow-[inset_0_0_0_1px_rgba(214,194,255,0.22)]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured ? "/assets/how/icon-check.svg" : "/assets/pricing/check.svg"}
                alt=""
                width={12}
                height={12}
                className="size-3"
              />
            </span>
            <span className="text-[15px] leading-[normal] text-white">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Figma: Pricing (5:340) */
export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-x-clip py-20 md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="Packages"
          title="Simple per-video pricing"
          subtitle="No subscriptions. Pay per order, with free revisions until you’re happy with the final cut."
        />

        <div className="relative flex w-full flex-col items-center gap-5 lg:flex-row lg:items-stretch lg:justify-center lg:gap-5 lg:py-6">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
