"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, type FormEvent } from "react";
import { A, pinnedSurface } from "./data";

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
    <article
      className="flex flex-col items-start gap-4 overflow-hidden rounded-[22px] border-[1.2px] border-transparent px-4 py-[22px] sm:px-6"
      style={pinnedSurface}
    >
      {/* Pinned label */}
      <div className="flex w-full items-center gap-2">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-gradient py-[5px] pr-3 pl-2.5">
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
        <span className="text-[12px] whitespace-nowrap text-[#8e8e8e]">
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
          className="size-9 shrink-0 rounded-full"
        />
        <div className="flex flex-col items-start gap-px">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold whitespace-nowrap text-white">
              Daniel Okafor
            </span>
            <span className="rounded-full border border-subtle bg-elevated px-2.5 py-1 text-[11px] font-medium text-muted">
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
          className="group relative h-[124px] w-full shrink-0 overflow-hidden rounded-[14px] sm:w-[220px]"
        >
          <img
            src={`${A}/attachment-thumb.jpg`}
            alt="Test clip preview: SaaS screen recording"
            className="absolute inset-0 size-full max-w-none rounded-[14px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/75" />
          <span className="absolute top-[34px] left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-[5px] transition-colors group-hover:bg-white/30">
            <img
              src={`${A}/icon-play.svg`}
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
          </span>
          <span className="absolute top-[102px] left-2.5 text-[11px] font-medium whitespace-nowrap text-white">
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
            className={`flex shrink-0 items-center gap-1.5 rounded-full border py-[5px] pr-3 pl-2.5 whitespace-nowrap transition-colors ${
              r.active
                ? "border-[rgba(242,185,255,0.4)] bg-[rgba(242,185,255,0.14)]"
                : "border-subtle bg-elevated hover:border-white/25"
            }`}
          >
            <span className="text-[13px] text-white">{r.emoji}</span>
            <span
              className={`text-[12px] font-semibold ${r.active ? "text-[#f2b9ff]" : "text-muted"}`}
            >
              {r.count}
            </span>
          </button>
        ))}
        <button
          type="button"
          aria-label="Add reaction"
          onClick={addReaction}
          className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-subtle bg-elevated transition-colors hover:border-white/25"
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
      <div className="flex w-full items-start gap-3 rounded-2xl border border-[rgba(242,185,255,0.25)] bg-[rgba(242,185,255,0.06)] py-3.5 pr-[18px] pl-4">
        <img
          src={`${A}/avatar-rafi-reply.png`}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full"
        />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-white">Rafi</span>
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold text-white">
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
              className={`font-medium transition-colors ${editorLiked ? "text-[#f2b9ff]" : "text-muted hover:text-white"}`}
            >
              👍 {18 + (editorLiked ? 1 : 0)}
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.focus()}
              className="font-semibold text-[#f2b9ff] hover:underline"
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
          className="flex w-full items-start gap-3 rounded-2xl border border-subtle bg-white/[0.02] py-3.5 pr-[18px] pl-4"
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
              <span className="rounded-full border border-subtle bg-elevated px-2.5 py-1 text-[10px] font-medium text-muted">
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
        className="flex w-full items-center gap-2.5 rounded-full border border-subtle bg-[#0a0a0a] p-1.5 transition-colors focus-within:border-white/25"
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
          className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
        />
        <button
          type="submit"
          aria-label="Send reply"
          disabled={!draft.trim()}
          className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-brand-gradient transition-[filter,transform] hover:brightness-110 active:scale-95 disabled:cursor-default"
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
