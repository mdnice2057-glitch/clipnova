"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { A, composerSurface, composerTypes, type ThreadKind } from "./data";

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
      className="flex flex-col items-start gap-4 overflow-hidden rounded-[22px] border-[1.2px] border-transparent p-6"
      style={composerSurface}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={`${A}/avatar-daniel.png`}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full"
        />
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
              className={`rounded-full px-3 py-[7px] text-[12px] font-semibold whitespace-nowrap transition-colors ${
                selected
                  ? "bg-white text-[#0a0a0a]"
                  : "border border-subtle bg-elevated text-muted hover:border-white/25 hover:text-white"
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
        className="h-[92px] w-full resize-none rounded-[14px] border border-subtle bg-[#0a0a0a] px-3.5 py-3 text-[14px] leading-[1.5] text-white outline-none transition-colors placeholder:text-[#8e8e8e] focus:border-white/25"
      />

      <div className="flex w-full items-center gap-3.5">
        {tools.map((t) => (
          <button
            key={t.icon}
            type="button"
            aria-label={t.label}
            title={t.label}
            onClick={() =>
              setText((v) => (v ? `${v.trimEnd()} ${t.snippet}` : t.snippet))
            }
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
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
