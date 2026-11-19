"use client";

import { useId, useRef, useState, type DragEvent } from "react";

export const MAX_FILE_BYTES = 5 * 1024 ** 3; // 5 GB

const VIDEO_EXT = /\.(mp4|mov|m4v|avi|mkv|mxf|webm|r3d|braw|ari|crm|dng|raw|mts|m2ts)$/i;

function isAccepted(f: File) {
  return f.type.startsWith("video/") || VIDEO_EXT.test(f.name);
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let v = bytes / 1024;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u++;
  }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${units[u]}`;
}

function extOf(name: string) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1, i + 5) : "vid";
}

/** Figma: Drop Zone (24:717) — drag & drop or click-to-browse footage uploader. */
export function DropZone({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputId = useId();
  const gradId = `dz-${inputId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState("");

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const accepted: File[] = [];
    let skipped = 0;
    for (const f of incoming) {
      if (!isAccepted(f) || f.size > MAX_FILE_BYTES) {
        skipped++;
        continue;
      }
      const dup = files.some((x) => x.name === f.name && x.size === f.size);
      if (!dup) accepted.push(f);
    }
    setNotice(
      skipped
        ? `${skipped} file${skipped > 1 ? "s" : ""} skipped — only video files up to 5 GB are accepted.`
        : "",
    );
    if (accepted.length) onChange([...files, ...accepted]);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <label
        htmlFor={inputId}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={onDrop}
        className={`group relative flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-5 transition-[background-color,box-shadow] duration-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-pink sm:px-5 ${
          dragging
            ? "bg-[rgba(167,116,255,0.1)]"
            : "bg-[radial-gradient(100%_140%_at_0%_50%,rgba(167,116,255,0.07),transparent_60%),rgba(255,255,255,0.015)] hover:bg-[rgba(167,116,255,0.06)]"
        }`}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a774ff" />
              <stop offset="55%" stopColor="#7c4dff" />
              <stop offset="100%" stopColor="#cdb8ff" />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            rx="16"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            strokeDasharray={dragging ? "10 5" : "7 6"}
            className={`transition-opacity duration-300 ${
              dragging ? "opacity-100" : "opacity-55 group-hover:opacity-100"
            }`}
          />
        </svg>
        <span className="icon-tile size-12 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/order/icon-upload.svg"
            alt=""
            width={20}
            height={20}
            className={`size-5 transition-transform duration-300 ${dragging ? "-translate-y-0.5" : ""}`}
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[15px] font-semibold text-white">
            {dragging ? (
              "Drop files to upload"
            ) : (
              <>
                Drag &amp; drop footage or{" "}
                <span className="text-[#d6c2ff] underline decoration-[#d6c2ff]/40 underline-offset-4 transition-colors group-hover:decoration-[#d6c2ff]">
                  browse
                </span>{" "}
                files
              </>
            )}
          </span>
          <span className="text-[13px] text-muted">MP4, MOV, RAW · up to 5 GB per file</span>
        </span>
        <span
          aria-hidden
          className="shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-300 group-hover:border-brand-pink/50 group-hover:bg-white/[0.08] max-sm:hidden"
        >
          Browse
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept="video/*,.mp4,.mov,.m4v,.mxf,.r3d,.braw,.ari,.crm,.dng,.raw"
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {notice && (
        <p role="status" className="text-[13px] text-[#ff8a8a]">
          {notice}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Selected files">
          {files.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2 pr-2 pl-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 min-w-11 shrink-0 items-center justify-center rounded-lg bg-[rgba(167,116,255,0.1)] px-1.5 ring-1 ring-brand-pink/25">
                  <span className="text-brand font-display text-[15px] leading-none uppercase">
                    {extOf(f.name)}
                  </span>
                </span>
                <span className="min-w-0 truncate text-[14px] text-white">{f.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-[13px] text-muted">{formatBytes(f.size)}</span>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => {
                    onChange(files.filter((x) => x !== f));
                    inputRef.current?.focus();
                  }}
                  className="flex size-7 items-center justify-center rounded-lg text-lg leading-none text-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
