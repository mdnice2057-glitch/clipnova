"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { A, composerTypes, type ThreadKind } from "./data";

const tools = [
  { icon: "icon-image.svg", label: "Attach image", snippet: "[image]" },
  { icon: "icon-video.svg", label: "Attach video", snippet: "[video]" },
  { icon: "icon-link.svg", label: "Add link", snippet: "https://" },
];

/** Figma: Composer (41:1268) — "Ask our editors". */
export function Composer({
  onPost,
}: {
  onPost: (text: string, kind: ThreadKind) => void;
}) {
  const [kind, setKind] = useState<ThreadKind>("question");
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onPost(value, kind);
    setText("");
    setPosted(true);
    window.setTimeout(() => setPosted(false), 2500);
  };

  return (
    <form
      onSubmit={submit}
      className="card flex flex-col items-start gap-4 overflow-hidden p-5 sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(228,110,255,0.12),transparent)]"
      />
      <div className="flex items-center gap-3">
        <span className="bg-brand-gradient shrink-0 rounded-full p-[1.5px] shadow-[0_6px_18px_-6px_rgba(228,110,255,0.6)]">
          <img
            src={`${A}/avatar-daniel.png`}
            alt=""
            width={40}
            height={40}
            className="block size-10 rounded-full border-2 border-[#141416]"
          />
        </span>
        <div className="flex flex-col items-start gap-px">
          <h3 className="font-display text-[26px] leading-none text-white">
            Ask our editors
          </h3>
          <p className="text-[12px] text-[#8e8e8e]">
            Ask before ordering — editors reply within 1 hour
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Post type"
        className="flex flex-wrap items-start gap-2"
      >
        {composerTypes.map((t) => {
          const selected = t.kind === kind;
          return (
            <button
              key={t.kind}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setKind(t.kind)}
              className={`rounded-full px-3.5 py-2 text-[12px] font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 ${
                selected
                  ? "bg-brand-gradient text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_8px_20px_-6px_rgba(228,110,255,0.5)]"
                  : "border border-white/10 bg-white/[0.04] text-white/75 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <label htmlFor="composer-text" className="sr-only">
        Your question
      </label>
      <textarea
        id="composer-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e);
        }}
        placeholder="Ask about an order, a brief, file formats or pricing…"
        className="h-[104px] w-full resize-none rounded-[14px] border border-white/10 bg-black/40 px-4 py-3.5 text-[14px] leading-[1.55] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/40 hover:border-white/20 focus:border-brand-pink/70 focus:shadow-[0_0_0_4px_rgba(228,110,255,0.12)]"
      />

      <div className="flex w-full items-center gap-2">
        {tools.map((t) => (
          <button
            key={t.icon}
            type="button"
            aria-label={t.label}
            title={t.label}
            onClick={() =>
              setText((v) => (v ? `${v.trimEnd()} ${t.snippet}` : t.snippet))
            }
            className="flex size-8 shrink-0 items-center justify-center rounded-xl sm:size-9 border border-white/10 bg-white/[0.04] transition-[background-color,border-color] duration-200 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <img
              src={`${A}/${t.icon}`}
              alt=""
              width={18}
              height={18}
              className="block size-[18px]"
            />
          </button>
        ))}
        <span
          aria-live="polite"
          className="min-w-px flex-1 truncate text-right text-[12px] text-[#3ddc84]"
        >
          {posted ? "Posted to the hub ✓" : ""}
        </span>
        <Button type="submit" className="!py-2.5 !pr-4 !pl-5">
          Post
        </Button>
      </div>
    </form>
  );
}
