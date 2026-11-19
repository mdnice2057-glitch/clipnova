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

/** Figma: Drop Zone (24:717) — drag & drop or click-to-browse footage uploader. */
export function DropZone({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputId = useId();
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
        className={`flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border-[1.5px] border-dashed px-5 py-[18px] transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-pink ${
          dragging
            ? "border-[#f2b9ff] bg-[rgba(242,185,255,0.1)]"
            : "border-[rgba(242,185,255,0.45)] bg-[rgba(242,185,255,0.04)] hover:bg-[rgba(242,185,255,0.07)]"
        }`}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(242,185,255,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/order/icon-upload.svg" alt="" width={20} height={20} className="size-5" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[15px] font-semibold text-white">
            {dragging ? (
              "Drop files to upload"
            ) : (
              <>
                Drag &amp; drop footage or <span className="text-[#f2b9ff]">browse</span> files
              </>
            )}
          </span>
          <span className="text-[13px] text-muted">MP4, MOV, RAW · up to 5 GB per file</span>
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
              className="flex items-center justify-between gap-3 rounded-xl border border-subtle bg-elevated py-2.5 pr-2.5 pl-4"
            >
              <span className="min-w-0 truncate text-[14px] text-white">{f.name}</span>
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
