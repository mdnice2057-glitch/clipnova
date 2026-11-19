export const A = "/assets/discussion";

export type ThreadStatus = "answered" | "hot" | "new" | null;
export type ThreadKind = "question" | "order" | "tip";

export type Thread = {
  id: string;
  author: string;
  avatar: string;
  time: string;
  status: ThreadStatus;
  kind: ThreadKind;
  /** Posted by the current visitor (via the composer). */
  mine?: boolean;
  title: string;
  excerpt: string;
  topic: string;
  votes: number;
  repliers: string[];
  replies: number;
  lastReply: string;
};

export const initialThreads: Thread[] = [
  {
    id: "t-1187",
    author: "Nadia Rahman",
    avatar: `${A}/avatar-nadia.png`,
    time: "5h ago",
    status: "answered",
    kind: "order",
    title: "How long should our wedding highlight be? (Order #1187)",
    excerpt:
      "Our full film is 40 minutes. Is 3–4 minutes right for the highlight our editor is cutting for Facebook?",
    topic: "#wedding-films",
    votes: 36,
    repliers: [`${A}/replier-b.png`, `${A}/replier-a.png`, `${A}/replier-d.png`],
    replies: 24,
    lastReply: "12m ago",
  },
  {
    id: "t-reels-brief",
    author: "Sofia Alvarez",
    avatar: `${A}/avatar-sofia.png`,
    time: "1d ago",
    status: "hot",
    kind: "order",
    title: "What should I put in my brief for monthly reels?",
    excerpt:
      "Ordering 12 reels a month for our skincare brand — which references and hooks help the editors most?",
    topic: "#order-briefs",
    votes: 29,
    repliers: [`${A}/replier-e.png`, `${A}/replier-f.png`, `${A}/replier-c.png`],
    replies: 18,
    lastReply: "1h ago",
  },
  {
    id: "t-color-grade",
    author: "Marcus Lee",
    avatar: `${A}/avatar-marcus.png`,
    time: "2d ago",
    status: "hot",
    kind: "tip",
    title: "Before / after: the color grade on my delivered vlog 🎨",
    excerpt:
      "Sharing the grade Clipnova delivered for my Sajek Valley vlog — happy to answer questions about ordering.",
    topic: "#color-grading",
    votes: 52,
    repliers: [`${A}/replier-a.png`, `${A}/replier-d.png`, `${A}/replier-g.png`],
    replies: 31,
    lastReply: "3h ago",
  },
];

/** Extra threads revealed by "Load more" (two per click). */
export const moreThreads: Thread[] = [
  {
    id: "t-4k-delivery",
    author: "Priya Nair",
    avatar: `${A}/avatar-sofia.png`,
    time: "3d ago",
    status: "answered",
    kind: "question",
    title: "Can I get both 4K and a compressed 1080p file in one order?",
    excerpt:
      "We publish to YouTube and Instagram — would love a master file plus a lighter export for socials.",
    topic: "#delivery-formats",
    votes: 21,
    repliers: [`${A}/replier-c.png`, `${A}/replier-b.png`, `${A}/replier-e.png`],
    replies: 9,
    lastReply: "5h ago",
  },
  {
    id: "t-saas-demo",
    author: "Tom Becker",
    avatar: `${A}/avatar-marcus.png`,
    time: "3d ago",
    status: null,
    kind: "question",
    title: "Best length for a SaaS product demo on our landing page?",
    excerpt:
      "Thinking 90 seconds with captions. Is that too long for a hero video, or should we split it up?",
    topic: "#saas-video",
    votes: 14,
    repliers: [`${A}/replier-g.png`, `${A}/replier-a.png`, `${A}/replier-f.png`],
    replies: 6,
    lastReply: "8h ago",
  },
  {
    id: "t-revisions",
    author: "Aisha Karim",
    avatar: `${A}/avatar-nadia.png`,
    time: "4d ago",
    status: "answered",
    kind: "order",
    title: "How do revisions work after my first draft arrives? (Order #1142)",
    excerpt:
      "Do I leave timestamped notes on the draft, or send everything in one message to my editor?",
    topic: "#order-briefs",
    votes: 18,
    repliers: [`${A}/replier-d.png`, `${A}/replier-c.png`, `${A}/replier-b.png`],
    replies: 11,
    lastReply: "1d ago",
  },
  {
    id: "t-music",
    author: "Leo Martins",
    avatar: `${A}/avatar-marcus.png`,
    time: "5d ago",
    status: null,
    kind: "tip",
    title: "Tip: send a reference track — it made my wedding film 10× better",
    excerpt:
      "Our editor matched cuts to the beat of the song we picked. Licensed music options are listed in the brief.",
    topic: "#wedding-films",
    votes: 27,
    repliers: [`${A}/replier-e.png`, `${A}/replier-g.png`, `${A}/replier-a.png`],
    replies: 7,
    lastReply: "2d ago",
  },
];

export const TOTAL_MORE = 48;

export const trendingTopics = [
  { tag: "#order-briefs", posts: 128, growth: "+24%" },
  { tag: "#wedding-films", posts: 96, growth: "+18%" },
  { tag: "#saas-video", posts: 74, growth: "+12%" },
  { tag: "#delivery-formats", posts: 63, growth: "+9%" },
];

export const topEditors = [
  {
    name: "Rafi",
    role: "Senior editor",
    answers: 212,
    avatar: `${A}/editor-rafi.png`,
    badge: "bg-[#f8cb58]",
  },
  {
    name: "Nusrat",
    role: "Wedding editor",
    answers: 148,
    avatar: `${A}/editor-nusrat.png`,
    badge: "bg-[#d9d9e0]",
  },
  {
    name: "Arif",
    role: "Colorist",
    answers: 97,
    avatar: `${A}/editor-arif.png`,
    badge: "bg-[#e3a06b]",
  },
];

export const composerTypes: { kind: ThreadKind; label: string; topic: string }[] =
  [
    { kind: "question", label: "❓ Question", topic: "#questions" },
    { kind: "order", label: "📦 My order", topic: "#my-orders" },
    { kind: "tip", label: "💡 Tip", topic: "#tips" },
  ];

export const tabs = ["Latest", "Popular", "Unanswered", "My orders"] as const;
export type Tab = (typeof tabs)[number];

/** Gradient-stroked card surfaces (Pinned Thread 41:1091, Composer 41:1268). */
const strokeGradient =
  "linear-gradient(to bottom right, rgba(228,110,255,0.85) 0%, rgba(0,145,255,0.28) 36%, rgba(180,218,171,0.7) 73%) border-box";

export const pinnedSurface = {
  background: `linear-gradient(136.03deg, rgba(228,110,255,0.1) 0%, #141414 32.143%, #141414 71.429%) padding-box, linear-gradient(#0a0a0b, #0a0a0b) padding-box, ${strokeGradient}`,
};

export const composerSurface = {
  background: `linear-gradient(180deg, rgba(228,110,255,0.1) 0%, #141414 50%, #141414 100%) padding-box, linear-gradient(#0a0a0b, #0a0a0b) padding-box, ${strokeGradient}`,
};
