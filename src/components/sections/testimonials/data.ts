export const reviewCategories = [
  "All reviews",
  "Wedding",
  "SaaS promo",
  "Vlog",
  "Reels",
  "Post production",
] as const;

export type ReviewCategory = Exclude<(typeof reviewCategories)[number], "All reviews">;

export type Review = {
  id: string;
  rating: number;
  metric: string;
  quote: string;
  name: string;
  meta: string;
  avatar: string;
  category: ReviewCategory;
  /** ISO date — used by the sort control. */
  date: string;
};

/**
 * Figma: Masonry (7:393) — listed newest first. Cards are dealt round-robin
 * into 3 columns, so this order reproduces the Figma columns exactly.
 */
export const reviews: Review[] = [
  {
    id: "nadia-arif",
    rating: 5,
    metric: "Wedding film",
    quote:
      "“We cried watching our wedding film. The henna night, the vows, the dance — every moment was cut so beautifully. Our families still rewatch it.”",
    name: "Nadia & Arif",
    meta: "Wedding film · Dhaka",
    avatar: "/assets/reviews/avatar-nadia-arif.png",
    category: "Wedding",
    date: "2026-11-12",
  },
  {
    id: "marcus-lee",
    rating: 5,
    metric: "3× watch time",
    quote:
      "“My vlogs finally look like the creators I grew up watching. The pacing, color and sound keep viewers watching till the very end.”",
    name: "Marcus Lee",
    meta: "Travel vlogger · YouTube",
    avatar: "/assets/reviews/avatar-marcus-lee.png",
    category: "Vlog",
    date: "2026-11-05",
  },
  {
    id: "daniel-okafor",
    rating: 5,
    metric: "1,400 signups",
    quote:
      "“Our launch video explained the product better than our whole landing page. It drove 1,400 signups in the first week.”",
    name: "Daniel Okafor",
    meta: "Founder · Stackline (SaaS)",
    avatar: "/assets/reviews/avatar-daniel-okafor.png",
    category: "SaaS promo",
    date: "2026-10-28",
  },
  {
    id: "sofia-alvarez",
    rating: 5,
    metric: "Daily reels",
    quote:
      "“We get a fresh batch of reels every week and haven’t missed a posting day in four months. Consistency is finally the easy part.”",
    name: "Sofia Alvarez",
    meta: "Founder · Bloom Skincare",
    avatar: "/assets/reviews/avatar-sofia-alvarez.png",
    category: "Reels",
    date: "2026-10-19",
  },
  {
    id: "hana-kim",
    rating: 5,
    metric: "2.1M views",
    quote:
      "“They understood my style from day one. The cuts, captions and music feel like me — just sharper. One reel hit 2.1M views.”",
    name: "Hana Kim",
    meta: "Food creator · 260K followers",
    avatar: "/assets/reviews/avatar-hana-kim.png",
    category: "Reels",
    date: "2026-10-07",
  },
  {
    id: "tom-becker",
    rating: 5,
    metric: "Always on time",
    quote:
      "“We send raw event footage and get polished, color-graded videos back in days. Clean audio, perfect cuts, zero chasing.”",
    name: "Tom Becker",
    meta: "Marketing lead · Northwave",
    avatar: "/assets/reviews/avatar-tom-becker.png",
    category: "Post production",
    date: "2026-09-24",
  },
];
