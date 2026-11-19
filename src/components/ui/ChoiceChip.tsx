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
      className={`inline-flex shrink-0 items-center gap-2 rounded-full py-2.5 pr-[18px] pl-4 text-sm leading-[1.21] font-semibold whitespace-nowrap text-white transition-[background-color,border-color,color,box-shadow] duration-200 ${
        selected
          ? "bg-brand-gradient shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]"
          : "border border-white/10 bg-white/[0.04] text-white/80 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
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
