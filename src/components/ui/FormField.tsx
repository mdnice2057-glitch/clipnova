import type { ComponentPropsWithoutRef } from "react";

const control =
  "w-full rounded-[14px] border border-subtle bg-elevated px-4 text-[15px] text-white placeholder:text-muted outline-none transition-colors focus:border-brand-pink/70";

/** Figma: Form Field (24:580) — label + 52px input. */
export function FormField({
  label,
  id,
  className = "",
  ...input
}: { label: string; id: string; className?: string } & ComponentPropsWithoutRef<"input">) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm leading-[1.21] font-medium text-white">
        {label}
      </label>
      <input id={id} className={`${control} h-[52px]`} {...input} />
    </div>
  );
}

/** Labelled textarea matching the Form Field style. */
export function TextAreaField({
  label,
  id,
  className = "",
  rows = 4,
  ...textarea
}: { label: string; id: string; className?: string } & ComponentPropsWithoutRef<"textarea">) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm leading-[1.21] font-medium text-white">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={`${control} resize-none py-[15px]`}
        {...textarea}
      />
    </div>
  );
}
