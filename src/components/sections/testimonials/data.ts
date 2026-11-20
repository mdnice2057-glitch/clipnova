export type Review = {
  id: string;
  rating: number;
  quote: string;
  name: string;
  meta: string;
  avatar: string;
};

export const reviews: Review[] = [
  {
    id: "nadia-arif",
    rating: 5,
    quote:
      "We cried watching our wedding film. The henna night, the vows, the dance — every moment was cut so beautifully. Our families still rewatch it.",
    name: "Nadia & Arif",
    meta: "Wedding film · Dhaka",
    avatar: "/assets/reviews/avatar-nadia-arif.png",
  },
  {
    id: "marcus-lee",
    rating: 5,
    quote:
      "My vlogs finally look like the creators I grew up watching. The pacing, color and sound keep viewers watching till the very end.",
    name: "Marcus Lee",
    meta: "Travel vlogger · YouTube",
    avatar: "/assets/reviews/avatar-marcus-lee.png",
  },
  {
    id: "daniel-okafor",
    rating: 5,
    quote:
      "Our launch video explained the product better than our whole landing page. It drove 1,400 signups in the first week.",
    name: "Daniel Okafor",
    meta: "Founder · Stackline (SaaS)",
    avatar: "/assets/reviews/avatar-daniel-okafor.png",
  },
  {
    id: "sofia-alvarez",
    rating: 5,
    quote:
      "We get a fresh batch of reels every week and haven’t missed a posting day in four months. Consistency is finally the easy part.",
    name: "Sofia Alvarez",
    meta: "Founder · Bloom Skincare",
    avatar: "/assets/reviews/avatar-sofia-alvarez.png",
  },
  {
    id: "hana-kim",
    rating: 5,
    quote:
      "They understood my style from day one. The cuts, captions and music feel like me — just sharper. One reel hit 2.1M views.",
    name: "Hana Kim",
    meta: "Food creator · 260K followers",
    avatar: "/assets/reviews/avatar-hana-kim.png",
  },
  {
    id: "tom-becker",
    rating: 5,
    quote:
      "We send raw event footage and get polished, color-graded videos back in days. Clean audio, perfect cuts, zero chasing.",
    name: "Tom Becker",
    meta: "Marketing lead · Northwave",
    avatar: "/assets/reviews/avatar-tom-becker.png",
  },
];
