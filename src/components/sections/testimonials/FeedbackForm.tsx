"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const ratingLabels = ["Poor", "Fair", "Good", "Great", "Excellent"];

/** Figma: Star Picker (27:889) */
function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div
      role="radiogroup"
      aria-label="Your rating"
      className="flex items-center gap-1.5"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""} – ${ratingLabels[n - 1]}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="size-[22px] shrink-0 rounded-sm transition-transform duration-200 hover:scale-115 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              n <= shown
                ? "/assets/reviews/picker-star-filled.svg"
                : "/assets/reviews/picker-star-empty.svg"
            }
            alt=""
            width={22}
            height={22}
            className={`size-[22px] transition-[filter] duration-200 ${
              n <= shown ? "drop-shadow-[0_0_6px_rgba(242,185,255,0.55)]" : ""
            }`}
          />
        </button>
      ))}
      <span aria-hidden className="ml-1.5 w-[64px] text-xs font-semibold text-[#f2b9ff]">
        {shown ? ratingLabels[shown - 1] : ""}
      </span>
    </div>
  );
}

/** Figma: Feedback Form (27:886) */
export function FeedbackForm() {
  const [rating, setRating] = useState(4);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setError("Please write at least a few words about your order.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function reset() {
    setSubmitted(false);
    setMessage("");
    setRating(4);
  }

  if (submitted) {
    return (
      <div className="flex w-full flex-col items-start gap-4" role="status" aria-live="polite">
        <span aria-hidden className="icon-tile size-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/reviews/shield-check.svg"
            alt=""
            width={22}
            height={22}
            className="size-[22px]"
          />
        </span>
        <h3 className="font-display text-[27px] leading-[normal] text-white uppercase">Thanks for your feedback!</h3>
        <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={n}
              src={
                n <= rating
                  ? "/assets/reviews/picker-star-filled.svg"
                  : "/assets/reviews/picker-star-empty.svg"
              }
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          ))}
        </div>
        <p className="max-w-[420px] text-sm leading-[1.6] text-muted">
          Your {rating}-star review was received. It will appear here once we match it to your
          completed order.
        </p>
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#f2b9ff] underline-offset-4 hover:underline"
        >
          Write another review
          <span
            aria-hidden
            className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-1.5">
        <h3 className="font-display text-[30px] leading-none text-white uppercase">Share your feedback</h3>
        <p className="text-sm leading-[1.5] text-muted">
          Ordered from us? Rate your experience.
        </p>
      </div>
      <StarPicker value={rating} onChange={setRating} />

      <label htmlFor="review-message" className="sr-only">
        Your review
      </label>
      <textarea
        id="review-message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (error) setError("");
        }}
        aria-invalid={!!error}
        aria-describedby={error ? "review-error" : undefined}
        placeholder="How was your order? Tell other clients about the quality, speed and communication…"
        className="h-[104px] w-full resize-none rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm leading-[1.55] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/35 hover:border-white/20 focus:border-brand-pink/70 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(228,110,255,0.12)] aria-[invalid=true]:border-[#ff8a8a]/60"
      />
      {error && (
        <p id="review-error" className="-mt-1 text-xs text-[#ff8a8a]">
          {error}
        </p>
      )}

      <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-xs leading-[normal] text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/reviews/shield-check.svg"
            alt=""
            width={14}
            height={14}
            className="size-3.5"
          />
          Verified clients only
        </p>
        <Button type="submit" size="sm" className="!pr-4 !pl-5 leading-[normal]">
          Submit review
        </Button>
      </div>
    </form>
  );
}
