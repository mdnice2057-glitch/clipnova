"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { A, type Thread } from "./data";

/** Figma: Thread Card (41:1035) — votes, author/role/status, title, excerpt, reply meta. */
export function ThreadCard({ thread }: { thread: Thread }) {
  const [vote, setVote] = useState<0 | 1 | -1>(0);
  const count = thread.votes + vote;

  return (
    <article className="card card-hover flex items-start gap-3 rounded-[20px] py-[22px] pr-4 pl-3 sm:gap-[18px] sm:pr-6 sm:pl-4">
      {/* Vote */}
      <div
        className={`flex w-[52px] shrink-0 flex-col items-center gap-0.5 rounded-[14px] border py-1.5 transition-[background-color,border-color,box-shadow] duration-300 ${
          vote === 1
            ? "border-[rgba(255,154,154,0.35)] bg-[rgba(255,154,154,0.08)]"
            : "border-white/[0.07] bg-white/[0.03]"
        }`}
      >
        <button
          type="button"
          aria-label="Upvote"
          aria-pressed={vote === 1}
          onClick={() => setVote(vote === 1 ? 0 : 1)}
          className="rounded-full transition-[opacity,transform] duration-200 hover:opacity-80 motion-safe:active:scale-90"
        >
          <img
            src={`${A}/icon-vote-up.svg`}
            alt=""
            width={18}
            height={18}
            className="block size-[18px]"
          />
        </button>
        <span
          className={`font-display text-[18px] whitespace-nowrap ${
            vote === 1
              ? "text-brand"
              : vote === -1
                ? "text-muted"
                : "text-white"
          }`}
        >
          {count}
        </span>
        <button
          type="button"
          aria-label="Downvote"
          aria-pressed={vote === -1}
          onClick={() => setVote(vote === -1 ? 0 : -1)}
          className={`rounded-full transition-[opacity,transform] duration-200 hover:opacity-100 motion-safe:active:scale-90 ${vote === -1 ? "opacity-100 brightness-200" : "opacity-90"}`}
        >
          <img
            src={`${A}/icon-vote-down.svg`}
            alt=""
            width={16}
            height={16}
            className="block size-4"
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 overflow-hidden">
        <div className="flex w-full items-center gap-2">
          <img
            src={thread.avatar}
            alt=""
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-full ring-2 ring-white/10"
          />
          <span className="min-w-0 truncate text-[14px] font-semibold whitespace-nowrap text-white">
            {thread.author}
          </span>
          <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted sm:block">
            {thread.mine ? "You" : "Client"}
          </span>
          <span className="hidden shrink-0 text-[13px] whitespace-nowrap text-[#8e8e8e] sm:inline">
            · {thread.time}
          </span>
          <span className="h-px min-w-px flex-1" />
          <StatusBadge status={thread.status} />
        </div>

        <h3 className="w-full text-[17px] leading-[1.35] font-semibold text-white sm:text-[18px]">
          <a
            href="#client-hub"
            className="decoration-[#ff9a9a]/60 underline-offset-4 transition-colors hover:text-[#f8dcff] hover:underline"
          >
            {thread.title}
          </a>
        </h3>
        <p className="w-full truncate text-[15px] leading-[1.5] text-muted">
          {thread.excerpt}
        </p>

        <div className="flex w-full items-center gap-2.5 pt-1">
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-white/75">
            {thread.topic}
          </span>
          <span className="h-px min-w-px flex-1" />
          {thread.repliers.length > 0 && (
            <div className="hidden shrink-0 items-start sm:flex">
              {thread.repliers.map((src, i) => (
                <span
                  key={i}
                  className={`relative size-[22px] shrink-0 ${i < thread.repliers.length - 1 ? "-mr-[7px]" : ""}`}
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
          )}
          <span className="flex shrink-0 items-center gap-1.5">
            <img
              src={`${A}/icon-comment.svg`}
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
            <span className="text-[13px] font-medium whitespace-nowrap text-muted">
              {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
            </span>
          </span>
          <span className="hidden shrink-0 text-[13px] whitespace-nowrap text-[#6b6b6b] md:inline">
            · {thread.replies > 0 ? `last reply ${thread.lastReply}` : thread.lastReply}
          </span>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: Thread["status"] }) {
  if (status === "answered") {
    return (
      <span className="flex shrink-0 items-center gap-[5px] rounded-full border border-[rgba(61,220,132,0.3)] bg-[rgba(61,220,132,0.12)] py-1 pr-2.5 pl-[9px]">
        <img
          src={`${A}/icon-check-green.svg`}
          alt=""
          width={11}
          height={11}
          className="size-[11px]"
        />
        <span className="text-[12px] font-semibold whitespace-nowrap text-[#3ddc84]">
          Answered
        </span>
      </span>
    );
  }
  if (status === "hot") {
    return (
      <span className="shrink-0 rounded-full border border-[rgba(255,154,154,0.35)] bg-[rgba(255,154,154,0.12)] py-1 pr-2.5 pl-[9px] text-[12px] font-semibold whitespace-nowrap text-[#ff9a9a]">
        🔥 Hot
      </span>
    );
  }
  if (status === "new") {
    return (
      <span className="shrink-0 rounded-full border border-white/12 bg-white/[0.06] py-1 pr-2.5 pl-[9px] text-[12px] font-semibold whitespace-nowrap text-white">
        ✨ New
      </span>
    );
  }
  return null;
}
