"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, TextAreaField } from "@/components/ui/FormField";

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.message.trim()) e.message = "Please write a short message.";
  return e;
}

function Field({ id, error, children }: { id: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 [&_input[aria-invalid=true]]:border-[#ff6b6b]/70 [&_textarea[aria-invalid=true]]:border-[#ff6b6b]/70">
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Figma: Message Form (29:1051) — controlled contact form with success state. */
export function MessageForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const bind = (key: keyof Values) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 800);
  }

  const card =
    "flex w-full min-w-0 flex-col gap-5 rounded-[28px] border border-[rgba(228,110,255,0.22)] bg-surface p-5 sm:p-8 xl:w-[584px] xl:shrink-0";

  if (status === "done") {
    return (
      <div
        id="contact-form"
        role="status"
        aria-live="polite"
        className={`${card} scroll-mt-24 items-center justify-center py-16 text-center`}
      >
        <span className="bg-brand-gradient flex size-16 items-center justify-center rounded-full drop-shadow-[0_10px_18px_rgba(228,110,255,0.32)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ui/chip-check.svg" alt="" width={14} height={14} className="size-7" />
        </span>
        <h3 className="font-display text-[40px] leading-none text-white uppercase">Message sent</h3>
        <p className="max-w-[400px] text-[16px] leading-[1.55] text-muted">
          Thanks, {values.name.trim().split(" ")[0]}! We’ll reply to{" "}
          <span className="text-white">{values.email.trim()}</span> within 15 minutes during office
          hours.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setValues(initial);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      noValidate
      onSubmit={onSubmit}
      aria-label="Send us a message"
      className={`${card} scroll-mt-24`}
    >
      <h3 className="font-display text-[31px] leading-[normal] text-white uppercase">
        Send us a message
      </h3>

      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <Field id="contact-name" error={errors.name}>
          <FormField label="Name" placeholder="Your name" autoComplete="name" {...bind("name")} />
        </Field>
        <Field id="contact-email" error={errors.email}>
          <FormField
            label="Email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            {...bind("email")}
          />
        </Field>
      </div>

      <Field id="contact-subject" error={errors.subject}>
        <FormField label="Subject" placeholder="e.g. Quote for a wedding film" {...bind("subject")} />
      </Field>

      <Field id="contact-message" error={errors.message}>
        <TextAreaField
          label="Message"
          placeholder="How can we help?"
          className="[&_textarea]:h-[130px] [&_textarea]:py-3.5"
          {...bind("message")}
        />
      </Field>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full leading-[normal] disabled:cursor-wait disabled:opacity-80"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      <p className="flex items-center gap-1.5 text-[13px] text-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/contact/icon-lock.svg" alt="" width={13} height={13} className="size-[13px]" />
        We never share your details.
      </p>
    </form>
  );
}
