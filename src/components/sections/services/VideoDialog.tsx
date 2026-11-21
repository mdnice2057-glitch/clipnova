"use client";

import { useEffect, useRef } from "react";

type VideoDialogProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster: string;
  title: string;
};

/**
 * Full-screen showreel player. The native <dialog> gives us the focus trap,
 * Esc-to-close and the top layer for free; the video only mounts while open
 * so playback stops as soon as it closes.
 */
export function VideoDialog({ open, onClose, src, poster, title }: VideoDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title ? `${title} showreel` : "Showreel"}
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 backdrop:bg-black/95 motion-safe:animate-fade-up"
    >
      {open && (
        <div
          className="relative flex size-full items-center justify-center p-4 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <video
            key={src}
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full rounded-2xl bg-black outline-none"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close showreel"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-white backdrop-blur-[8px] transition-colors duration-200 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink sm:top-6 sm:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
