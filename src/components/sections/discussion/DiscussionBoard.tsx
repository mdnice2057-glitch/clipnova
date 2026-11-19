"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { Composer } from "./Composer";
import { PINNED_TITLE, PinnedThread } from "./PinnedThread";
import { CommunityStats, TopEditors, TrendingTopics } from "./SidebarCards";
import { ThreadCard } from "./ThreadCard";
import { Toolbar } from "./Toolbar";
import {
  A,
  TOTAL_MORE,
  composerTypes,
  initialThreads,
  moreThreads,
  type Tab,
  type Thread,
  type ThreadKind,
} from "./data";

const PINNED_SEARCH = `${PINNED_TITLE} #saas-video ordered the standard package 60fps`;

/** Figma: Discussion Layout (41:1071) — threads column + sidebar. */
export function DiscussionBoard() {
  const [tab, setTab] = useState<Tab>("Latest");
  const [query, setQuery] = useState("");
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [loaded, setLoaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState(0);
  const postCount = useRef(0);

  const q = query.trim().toLowerCase();
  const matches = (text: string) => !q || text.toLowerCase().includes(q);

  let visible = threads.filter((t) =>
    matches(`${t.title} ${t.excerpt} ${t.topic}`),
  );
  if (tab === "Popular") visible = [...visible].sort((a, b) => b.votes - a.votes);
  if (tab === "Unanswered")
    visible = visible.filter((t) => t.status !== "answered");
  if (tab === "My orders")
    visible = visible.filter((t) => t.mine || t.kind === "order");

  const showPinned = matches(PINNED_SEARCH);
  const remaining = TOTAL_MORE - loaded;
  const poolLeft = loaded < moreThreads.length;

  const loadMore = () => {
    if (loading || !poolLeft) return;
    setLoading(true);
    window.setTimeout(() => {
      const next = moreThreads.slice(loaded, loaded + 2);
      setThreads((ts) => [...ts, ...next]);
      setLoaded((n) => n + next.length);
      setLoading(false);
    }, 700);
  };

  const post = (text: string, kind: ThreadKind) => {
    postCount.current += 1;
    const [first, ...rest] = text.split("\n");
    const title = first.length > 90 ? `${first.slice(0, 88).trimEnd()}…` : first;
    const thread: Thread = {
      id: `mine-${postCount.current}`,
      author: "You",
      avatar: `${A}/avatar-me.png`,
      time: "just now",
      status: "new",
      kind,
      mine: true,
      title,
      excerpt:
        rest.join(" ").trim() ||
        (first.length > 90 ? first : "Waiting for an editor to reply…"),
      topic: composerTypes.find((t) => t.kind === kind)?.topic ?? "#questions",
      votes: 0,
      repliers: [],
      replies: 0,
      lastReply: "editors usually reply within 1 hour",
    };
    setThreads((ts) => [thread, ...ts]);
    setQuery("");
    if (tab === "Popular") setTab("Latest");
  };

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-4">
      {/* Threads (41:1072) */}
      <div
        id="client-hub-threads"
        className="flex min-w-0 flex-col gap-3 xl:w-[776px] xl:shrink-0"
      >
        <Toolbar tab={tab} onTab={setTab} query={query} onQuery={setQuery} />

        {showPinned && <PinnedThread />}

        <ul className="flex flex-col gap-3" aria-live="polite">
          {visible.map((t) => (
            <li key={t.id}>
              <ThreadCard thread={t} />
            </li>
          ))}
        </ul>

        {visible.length === 0 && !showPinned && (
          <div className="card rounded-[20px] px-6 py-10 text-center">
            <p className="text-[14px] font-semibold text-white">
              No questions match “{query}”
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTab("Latest");
              }}
              className="mt-2 text-[12px] font-semibold text-[#f2b9ff] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
        {visible.length === 0 && showPinned && tab !== "Latest" && (
          <p className="card rounded-[20px] px-6 py-6 text-center text-[14px] text-muted">
            {tab === "My orders"
              ? "No order threads yet — ask about your order in the composer."
              : "Nothing here yet."}
          </p>
        )}

        {/* Load more (41:1263) */}
        <button
          type="button"
          onClick={loadMore}
          disabled={loading || !poolLeft}
          aria-busy={loading}
          className="group flex items-center justify-center gap-2 rounded-[20px] border border-dashed border-white/15 bg-white/[0.015] py-4 transition-[background-color,border-color] duration-200 enabled:hover:border-[rgba(242,185,255,0.45)] enabled:hover:bg-[rgba(242,185,255,0.04)] disabled:cursor-default"
        >
          <span className="text-[14px] font-semibold whitespace-nowrap text-muted transition-colors group-enabled:group-hover:text-white">
            {loading
              ? "Loading questions…"
              : poolLeft
                ? `Load ${remaining} more questions`
                : "Open the client hub to see all questions"}
          </span>
          {loading ? (
            <span className="size-3.5 animate-spin rounded-full border-2 border-muted border-t-transparent" />
          ) : (
            poolLeft && (
              <img
                src={`${A}/icon-chevron-down.svg`}
                alt=""
                width={14}
                height={14}
                className="size-3.5 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5"
              />
            )
          )}
        </button>
      </div>

      {/* Sidebar (41:1267) */}
      <aside className="grid min-w-0 grid-cols-1 content-start gap-4 md:grid-cols-2 xl:flex xl:w-[408px] xl:shrink-0 xl:flex-col">
        <Composer onPost={post} />
        <div className="flex flex-col gap-4">
          <CommunityStats />
          <TrendingTopics
            active={activeTopic}
            onSelect={(i, tag) => {
              setActiveTopic(i);
              setQuery(query === tag ? "" : tag);
            }}
          />
        </div>
        <TopEditors />
      </aside>
    </div>
  );
}
