export const FEED_FILTERS = [
  "For you",
  "SaaS promos",
  "Wedding films",
  "Vlogs",
  "Reels",
  "Post production",
] as const;

export type FeedFilter = (typeof FEED_FILTERS)[number];

export type FeedItem = {
  id: string;
  /** Filters (other than "For you") this sample appears under. */
  filters: FeedFilter[];
  /** Uppercase label shown on compact tiles. */
  category: string;
  title: string;
  match: number;
  image: string;
  price: string;
  editor: string;
  avatar: string;
  /** Short turnaround used on tiles, e.g. "48 hrs". */
  turnaround: string;
  /** Large-card details. */
  chips: string[];
  description: string;
  rating: string;
  delivery: string;
};

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "saas-launch",
    filters: ["SaaS promos", "Post production"],
    category: "SAAS PROMO",
    title: "SaaS launch film with 3D motion graphics",
    match: 98,
    image: "/assets/feed/top-pick.jpg",
    price: "$199",
    editor: "Rafi",
    avatar: "/assets/feed/avatar-rafi.png",
    turnaround: "5 days",
    chips: ["SaaS promo", "1:24", "4K · 60fps"],
    description:
      "Delivered to Stackline last month — product walkthrough, animated UI and voiceover. Order the same style for your launch.",
    rating: "4.9",
    delivery: "5-day delivery",
  },
  {
    id: "restaurant-reel",
    filters: ["Reels"],
    category: "REELS",
    title: "Restaurant promo reel with trending audio",
    match: 95,
    image: "/assets/feed/tile-reels.jpg",
    price: "$49",
    editor: "Mim",
    avatar: "/assets/feed/avatar-mim.png",
    turnaround: "48 hrs",
    chips: ["Reel", "0:30", "9:16 vertical"],
    description:
      "Fast-cut vertical promo synced to a trending sound, with captions and menu close-ups. Ready to post on Instagram and TikTok.",
    rating: "4.8",
    delivery: "48-hr delivery",
  },
  {
    id: "sunset-vlog",
    filters: ["Vlogs", "Post production"],
    category: "VLOG",
    title: "Sunset travel vlog with cinematic color",
    match: 91,
    image: "/assets/feed/tile-vlog.jpg",
    price: "$199",
    editor: "Tanvir",
    avatar: "/assets/feed/avatar-tanvir.png",
    turnaround: "3 days",
    chips: ["Vlog", "8:12", "4K · 24fps"],
    description:
      "Story-driven travel edit with warm cinematic grading, sound design and smooth speed ramps. Send your raw clips and get the same look.",
    rating: "4.9",
    delivery: "3-day delivery",
  },
  {
    id: "mehendi-night",
    filters: ["Wedding films", "Reels"],
    category: "WEDDING",
    title: "Mehendi night highlight with live music",
    match: 88,
    image: "/assets/feed/tile-wedding.jpg",
    price: "$499",
    editor: "Nusrat",
    avatar: "/assets/feed/avatar-nusrat.png",
    turnaround: "2 weeks",
    chips: ["Wedding film", "4:30", "4K · 30fps"],
    description:
      "Emotional highlight film cut to the live band, with multi-camera sync and a 60-second teaser for socials.",
    rating: "5.0",
    delivery: "2-week delivery",
  },
  {
    id: "music-video-grade",
    filters: ["Post production"],
    category: "COLOR GRADE",
    title: "Music video color grade — before & after",
    match: 84,
    image: "/assets/feed/tile-color.jpg",
    price: "$149",
    editor: "Arif",
    avatar: "/assets/feed/avatar-arif.png",
    turnaround: "4 days",
    chips: ["Color grade", "3:45", "HDR"],
    description:
      "Full scene-by-scene grade with skin-tone matching and a custom film LUT. Upload your edit and we match this look.",
    rating: "4.8",
    delivery: "4-day delivery",
  },
];
