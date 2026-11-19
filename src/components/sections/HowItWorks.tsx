import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessTimeline, type Step } from "./how/ProcessTimeline";

const STEPS: Step[] = [
  {
    title: "Place your order",
    short: "Place order",
    meta: "Takes ~2 minutes",
    description: "Pick a service, share your brief and references, and confirm your package.",
    points: ["Choose a service & length", "Add references and notes", "Pay securely, no calls"],
    image: "/assets/feed/tile-vlog.jpg",
    tint: "255,43,43",
  },
  {
    title: "Upload footage",
    short: "Upload clips",
    meta: "Any format · any size",
    description: "Send your raw clips, music and logos through a secure upload link — any format, any size.",
    points: ["4K, RAW, phone footage — all fine", "Resumable uploads up to 200 GB", "Files stay private & encrypted"],
    image: "/assets/services/cinematic-vlog.jpg",
    tint: "209,15,15",
  },
  {
    title: "We edit, you review",
    short: "Edit & review",
    meta: "First draft in 48h",
    description: "Your editor cuts the first draft. Leave timestamped notes and get revisions until it feels right.",
    points: ["Dedicated editor for your project", "Comment right on the frame", "Unlimited revisions"],
    image: "/assets/feed/tile-color.jpg",
    tint: "205,205,205",
  },
  {
    title: "Receive final files",
    short: "Delivery",
    meta: "4K · every aspect ratio",
    description: "Download your final cut in every format and aspect ratio you need, ready to post anywhere.",
    points: ["9:16, 16:9 and 1:1 exports", "Captions & thumbnails on request", "Project files kept for 90 days"],
    image: "/assets/services/wedding-film.jpg",
    tint: "255,255,255",
  },
];

/** Figma: How It Works (5:225) — reimagined as an editing workspace. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-x-clip py-20 md:py-[120px]">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-4 md:gap-14 md:px-6 xl:px-0">
        <SectionHeader
          eyebrow="How to order"
          title="How ordering works"
          subtitle="Place an order in minutes. We handle everything from the first cut to final delivery."
        />
        <ProcessTimeline steps={STEPS} />
      </div>
    </section>
  );
}
