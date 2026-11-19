"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, type FormEvent } from "react";
import { A } from "./data";

type Reaction = { emoji: string; count: number; active: boolean };

const repliers = [
  `${A}/replier-a.png`,
  `${A}/replier-b.png`,
  `${A}/replier-c.png`,
  `${A}/replier-d.png`,
];

export const PINNED_TITLE =
  "Before I upload: 30 or 60fps for my SaaS promo order?";

/** Figma: Pinned Thread (41:1091). */
export function PinnedThread() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "👍", count: 24, active: true },
    { emoji: "🔥", count: 12, active: false },
    { emoji: "💜", count: 8, active: false },
  ]);
  const [editorLiked, setEditorLiked] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (emoji: string) =>
    setReactions((rs) =>
      rs.map((r) =>
        r.emoji === emoji
          ? { ...r, active: !r.active, count: r.count + (r.active ? -1 : 1) }
          : r,
      ),
    );

  const addReaction = () => {
    if (reactions.some((r) => r.emoji === "🎉")) return toggle("🎉");
    setReactions((rs) => [...rs, { emoji: "🎉", count: 1, active: true }]);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setReplies((r) => [...r, text]);
    setDraft("");
  };

  return (
    <article className="card card-lit flex flex-col items-start gap-4 overflow-hidden px-4 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:px-7 sm:py-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(136deg,rgba(167,116,255,0.14)_0%,rgba(124,77,255,0.04)_30%,transparent_55%)]"
      />
      {/* Pinned label */}
      <div className="flex w-full items-center gap-2">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-gradient py-[5px] pr-3 pl-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <img
            src={`${A}/icon-pin.svg`}
            alt=""
            width={12}
            height={12}
            className="size-3"
          />
          <span className="text-[11px] font-bold tracking-[0.44px] whitespace-nowrap text-white uppercase">
            Pinned by editors
          </span>
        </span>
        <span className="h-px min-w-px flex-1" />
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] whitespace-nowrap text-muted">
          1,284 views
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <img
          src={`${A}/avatar-daniel.png`}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full ring-2 ring-white/10"
        />
        <div className="flex flex-col items-start gap-px">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold whitespace-nowrap text-white">
              Daniel Okafor
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted">
              Client
            </span>
          </div>
          <span className="text-[12px] text-[#8e8e8e]">
            SaaS founder · Stackline · 2h ago
          </span>
        </div>
      </div>

      <h3 className="text-chrome font-display text-[28px] leading-none sm:text-[34px] md:whitespace-nowrap">
        {PINNED_TITLE}
      </h3>

      {/* Body + attachment */}
      <div className="flex w-full flex-col gap-[18px] sm:flex-row sm:items-center">
        <p className="min-w-0 flex-1 text-[15px] leading-[1.55] text-muted">
          Ordered the Standard package for our launch promo. We’re recording
          screen + webcam — here’s a test clip. Should we re-record at 60fps
          before sending footage?
        </p>
        <button
          type="button"
          aria-label="Play test_clip.mp4"
          className="group relative h-[136px] w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/12 transition-shadow duration-300 hover:ring-[rgba(214,194,255,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink sm:w-[232px]"
        >
          <img
            src={`${A}/attachment-thumb.jpg`}
            alt="Test clip preview: SaaS screen recording"
            className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/80" />
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-[60%] items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-[background-color,transform] duration-300 group-hover:bg-white/25 motion-safe:group-hover:scale-110">
            <img
              src={`${A}/icon-play.svg`}
              alt=""
              width={14}
              height={14}
              className="size-3.5 translate-x-px"
            />
          </span>
          <span className="absolute bottom-2.5 left-3 text-[11px] font-medium whitespace-nowrap text-white">
            test_clip.mp4 · 0:48
          </span>
        </button>
      </div>

      {/* Reactions + meta */}
      <div className="flex w-full flex-wrap items-center gap-2">
        {reactions.map((r) => (
          <button
            key={r.emoji}
            type="button"
            aria-pressed={r.active}
            aria-label={`React ${r.emoji}`}
            onClick={() => toggle(r.emoji)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border py-[5px] pr-3 pl-2.5 whitespace-nowrap transition-[background-color,border-color,transform] duration-200 motion-safe:active:scale-95 ${
              r.active
                ? "border-[rgba(214,194,255,0.45)] bg-[rgba(214,194,255,0.14)]"
                : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
            }`}
          >
            <span className="text-[13px] text-white">{r.emoji}</span>
            <span
              className={`text-[12px] font-semibold ${r.active ? "text-[#d6c2ff]" : "text-muted"}`}
            >
              {r.count}
            </span>
          </button>
        ))}
        <button
          type="button"
          aria-label="Add reaction"
          onClick={addReaction}
          className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25 hover:bg-white/[0.07]"
        >
          <img
            src={`${A}/icon-emoji-add.svg`}
            alt=""
            width={15}
            height={15}
            className="size-[15px]"
          />
        </button>
        <span className="h-px min-w-px flex-1" />
        <div className="flex items-start">
          {repliers.map((src, i) => (
            <span
              key={src}
              className={`relative size-[22px] shrink-0 ${i < repliers.length - 1 ? "-mr-[7px]" : ""}`}
            >
              <img
                src={src}
                alt=""
                width={26}
                height={26}
                className="absolute -inset-0.5 block size-[26px] max-w-none"
              />
            </span>
          ))}
        </div>
        <span className="text-[13px] font-medium whitespace-nowrap text-muted">
          {12 + replies.length} replies
        </span>
      </div>

      {/* Editor reply */}
      <div className="relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-[rgba(214,194,255,0.22)] bg-[linear-gradient(100deg,rgba(214,194,255,0.09),rgba(124,77,255,0.04)_60%,rgba(255,255,255,0.01))] py-4 pr-[18px] pl-5">
        <span aria-hidden className="bg-brand-gradient absolute inset-y-0 left-0 w-[3px]" />
        <span className="bg-brand-gradient shrink-0 rounded-full p-[1.5px]">
          <img
            src={`${A}/avatar-rafi-reply.png`}
            alt=""
            width={32}
            height={32}
            className="block size-8 rounded-full border-2 border-[#151517]"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-white">Rafi</span>
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              Editor
            </span>
            <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
              · 1h ago
            </span>
          </div>
          <p className="text-[14px] leading-[1.55] text-white">
            Record at 60fps — UI motion looks much crisper. Upload whenever
            you’re ready; your first draft will be in your inbox within 3 days
            👌
          </p>
          <div className="flex items-start gap-3.5 text-[12px] whitespace-nowrap">
            <button
              type="button"
              aria-pressed={editorLiked}
              onClick={() => setEditorLiked((v) => !v)}
              className={`font-medium transition-colors ${editorLiked ? "text-[#d6c2ff]" : "text-muted hover:text-white"}`}
            >
              👍 {18 + (editorLiked ? 1 : 0)}
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.focus()}
              className="font-semibold text-[#d6c2ff] hover:underline"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Replies added in this session */}
      {replies.map((text, i) => (
        <div
          key={i}
          className="flex w-full items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3.5 pr-[18px] pl-4"
        >
          <img
            src={`${A}/avatar-me.png`}
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-full"
          />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-white">You</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-muted">
                Client
              </span>
              <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
                · just now
              </span>
            </div>
            <p className="text-[14px] leading-[1.55] break-words text-white">
              {text}
            </p>
          </div>
        </div>
      ))}

      {/* Reply input */}
      <form
        onSubmit={submit}
        className="flex w-full items-center gap-2.5 rounded-full border border-white/10 bg-black/40 p-1.5 transition-[border-color,box-shadow] duration-200 hover:border-white/20 focus-within:border-brand-pink/70 focus-within:shadow-[0_0_0_4px_rgba(167,116,255,0.12)]"
      >
        <img
          src={`${A}/avatar-me.png`}
          alt=""
          width={30}
          height={30}
          className="size-[30px] shrink-0 rounded-full"
        />
        <label htmlFor="pinned-reply" className="sr-only">
          Write a reply
        </label>
        <input
          ref={inputRef}
          id="pinned-reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a reply…"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          aria-label="Send reply"
          disabled={!draft.trim()}
          className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-brand-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-[filter,transform,opacity] hover:brightness-110 active:scale-95 disabled:cursor-default disabled:opacity-60 disabled:shadow-none"
        >
          <img
            src={`${A}/icon-send.svg`}
            alt=""
            width={15}
            height={15}
            className="size-[15px]"
          />
        </button>
      </form>
    </article>
  );
}
