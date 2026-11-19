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
      className="flex items-start gap-1"
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
          className="size-[18px] shrink-0 transition-transform hover:scale-115 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              n <= shown
                ? "/assets/reviews/picker-star-filled.svg"
                : "/assets/reviews/picker-star-empty.svg"
            }
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
        </button>
      ))}
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
      <div className="flex w-full flex-col items-start gap-3" role="status" aria-live="polite">
        <h3 className="font-display text-[27px] leading-[normal] text-white uppercase">Thanks for your feedback!</h3>
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
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
              width={18}
              height={18}
              className="size-[18px]"
            />
          ))}
        </div>
        <p className="text-sm leading-[1.5] text-muted">
          Your {rating}-star review was received. It will appear here once we match it to your
          completed order.
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-[#f2b9ff] underline-offset-4 hover:underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col items-start gap-3">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-[27px] leading-[normal] text-white uppercase">Share your feedback</h3>
        <StarPicker value={rating} onChange={setRating} />
      </div>

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
        className="h-[76px] w-full resize-none rounded-[14px] border border-subtle bg-elevated px-3.5 py-3 text-sm leading-[1.5] text-white outline-none transition-colors placeholder:text-muted focus:border-brand-pink/70"
      />
      {error && (
        <p id="review-error" className="-mt-1 text-xs text-[#ff8a8a]">
          {error}
        </p>
      )}

      <div className="flex w-full flex-wrap items-center justify-between gap-3">
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
