"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChoiceChip";
import { FormField, TextAreaField } from "@/components/ui/FormField";
import { DropZone } from "./DropZone";

const SERVICES = [
  "SaaS promo",
  "Wedding film",
  "Cinematic vlog",
  "Social media reels",
  "Post production",
];
const BUDGETS = ["$49 – $199", "$200 – $499", "$500 – $1,500", "$1,500+"];

type Values = {
  service: string;
  name: string;
  email: string;
  link: string;
  deadline: string;
  budget: string;
  details: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  service: SERVICES[0],
  name: "",
  email: "",
  link: "",
  deadline: "",
  budget: BUDGETS[1],
  details: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.link.trim()) {
    try {
      const u = new URL(v.link.trim());
      if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
      e.link = "Enter a valid link (https://…).";
    }
  }
  if (v.details.trim().length < 10) e.details = "Tell us a little more (at least 10 characters).";
  return e;
}

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** Wraps a shared field to add an error message + invalid border. */
function Field({ error, id, children }: { error?: string; id: string; children: ReactNode }) {
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

/** Figma: Order Card (24:638) — controlled order form with validation + success state. */
export function OrderCard() {
  const [values, setValues] = useState<Values>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [dateFocused, setDateFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const fieldProps = (key: "name" | "email" | "link" | "deadline") => ({
    id: `order-${key}`,
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => set(key)(e.target.value),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `order-${key}-error` : undefined,
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`order-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  }

  function reset() {
    setValues(initial);
    setFiles([]);
    setErrors({});
    setStatus("idle");
  }

  const card =
    "card flex w-full min-w-0 flex-col gap-7 rounded-[28px] p-5 sm:p-9 xl:w-[744px] xl:shrink-0";
  const topLine = <span aria-hidden className="glow-line absolute inset-x-12 top-0 opacity-80" />;

  if (status === "done") {
    return (
      <div className={`${card} items-center py-16 text-center sm:py-20`} role="status" aria-live="polite">
        {topLine}
        <span className="bg-brand-gradient flex size-16 items-center justify-center rounded-full shadow-[0_0_0_8px_rgba(228,110,255,0.1),0_0_0_16px_rgba(228,110,255,0.05),0_14px_30px_-6px_rgba(228,110,255,0.55)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ui/chip-check.svg" alt="" width={14} height={14} className="size-7" />
        </span>
        <h3 className="font-display text-[44px] leading-none text-white uppercase">Order received</h3>
        <p className="max-w-[460px] text-[16px] leading-[1.55] text-muted">
          Thanks, {values.name.trim().split(" ")[0]}! We’ll send a fixed quote for your{" "}
          <span className="text-white">{values.service.toLowerCase()}</span> project ({values.budget}) to{" "}
          <span className="text-white">{values.email.trim()}</span> within 2 hours.
          {files.length > 0 &&
            ` ${files.length} file${files.length > 1 ? "s" : ""} attached.`}
        </p>
        <Button variant="secondary" onClick={reset}>
          Place another order
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={card} aria-label="New order">
      {topLine}
      {/* Card Head (24:639) */}
      <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-white/[0.07] pb-6">
        <h3 className="font-display text-[34px] leading-[normal] text-white uppercase">New order</h3>
        <div className="flex items-center gap-2.5 rounded-full border border-[rgba(61,220,132,0.25)] bg-[rgba(61,220,132,0.07)] py-1.5 pr-3.5 pl-3">
          <span className="relative size-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/order/online-dot.svg"
              alt=""
              width={24}
              height={24}
              className="animate-pulse-dot absolute -inset-full size-[300%] max-w-none"
            />
          </span>
          <span className="text-[13px] text-white/80">Editors online · replies in ~15 min</span>
        </div>
      </div>

      {/* Choose a service (24:656) */}
      <fieldset className="flex w-full flex-col gap-3">
        <legend className="mb-3 text-[14px] font-medium text-white">Choose a service</legend>
        <ChipGroup options={SERVICES} value={values.service} onChange={set("service")} />
      </fieldset>

      {/* Field Row (24:659) */}
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <Field id="order-name" error={errors.name}>
          <FormField label="Full name" placeholder="Your name" autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field id="order-email" error={errors.email}>
          <FormField
            label="Email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            {...fieldProps("email")}
          />
        </Field>
      </div>

      {/* Field Row (24:680) */}
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <Field id="order-link" error={errors.link}>
          <FormField
            label="Footage link"
            type="url"
            inputMode="url"
            placeholder="Google Drive, Dropbox or WeTransfer link"
            {...fieldProps("link")}
          />
        </Field>
        <Field id="order-deadline" error={errors.deadline}>
          <FormField
            label="Deadline"
            type={dateFocused || values.deadline ? "date" : "text"}
            placeholder="Select a date"
            min={today()}
            onFocus={() => setDateFocused(true)}
            onBlur={() => setDateFocused(false)}
            className="[&_input]:[color-scheme:dark]"
            {...fieldProps("deadline")}
          />
        </Field>
      </div>

      {/* Budget (24:710) */}
      <fieldset className="flex w-full flex-col gap-3">
        <legend className="mb-3 text-[14px] font-medium text-white">Budget</legend>
        <ChipGroup options={BUDGETS} value={values.budget} onChange={set("budget")} />
      </fieldset>

      {/* Project details (24:713) */}
      <Field id="order-details" error={errors.details}>
        <TextAreaField
          id="order-details"
          name="details"
          label="Project details"
          placeholder="Tell us about the video — length, style, references, platforms…"
          value={values.details}
          onChange={(e) => set("details")(e.target.value)}
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={errors.details ? "order-details-error" : undefined}
          className="[&_textarea]:h-[110px] [&_textarea]:py-3.5 [&_textarea]:leading-[1.5]"
        />
      </Field>

      {/* Drop Zone (24:717) */}
      <DropZone files={files} onChange={setFiles} />

      {/* Submit (24:725) */}
      <div className="flex w-full flex-col items-stretch gap-4 rounded-[20px] border border-white/[0.08] bg-[radial-gradient(120%_140%_at_50%_0%,rgba(228,110,255,0.12),transparent_60%),rgba(255,255,255,0.02)] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-5">
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
          <div className="flex min-w-0 items-center gap-2">
            <dt className="text-muted">Service</dt>
            <dd className="font-semibold text-white">{values.service}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <dt className="text-muted">Budget</dt>
            <dd className="text-brand font-semibold">{values.budget}</dd>
          </div>
          {files.length > 0 && (
            <div className="flex min-w-0 items-center gap-2">
              <dt className="text-muted">Files</dt>
              <dd className="font-semibold text-white">{files.length}</dd>
            </div>
          )}
        </dl>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full !py-[18px] leading-[normal] disabled:cursor-wait disabled:opacity-80"
        >
          {status === "sending" ? (
            "Sending your order…"
          ) : (
            <>
              <span className="sm:hidden">Get my free quote</span>
              <span className="max-sm:hidden">Place order — get a free quote</span>
            </>
          )}
        </Button>
        <p className="flex items-center justify-center gap-2 text-center text-[13px] text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/order/icon-lock.svg" alt="" width={14} height={14} className="size-3.5 shrink-0" />
          No payment now. You only pay after approving the quote.
        </p>
      </div>
    </form>
  );
}
