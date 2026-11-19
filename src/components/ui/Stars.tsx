/** Row of filled rating stars (Figma star icon). */
export function Stars({
  count = 5,
  size = 15,
  gap = 2,
}: {
  count?: number;
  size?: number;
  gap?: number;
}) {
  return (
    <div className="flex items-center" style={{ gap }} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/assets/ui/star.svg"
          alt=""
          width={size}
          height={size}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
