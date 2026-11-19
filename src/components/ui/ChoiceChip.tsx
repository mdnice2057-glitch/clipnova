"use client";

/** Figma: Choice Chip (24:594) — selectable pill for filters, service and budget choices. */
export function ChoiceChip({
  label,
  selected = false,
  onClick,
  className = "",
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full py-2.5 pr-[18px] pl-4 text-sm leading-[1.21] font-semibold whitespace-nowrap text-white transition-colors ${
        selected
          ? "bg-brand-gradient drop-shadow-[0_6px_10px_rgba(228,110,255,0.3)]"
          : "border border-subtle bg-elevated hover:border-white/25"
      } ${className}`}
    >
      {selected && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/ui/chip-check.svg"
          alt=""
          width={14}
          height={14}
          className="size-3.5"
        />
      )}
      {label}
    </button>
  );
}

/** Single-select chip group with local state. */
export function ChipGroup({
  options,
  value,
  onChange,
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {options.map((o) => (
        <ChoiceChip
          key={o}
          label={o}
          selected={o === value}
          onClick={() => onChange(o)}
        />
      ))}
    </div>
  );
}
