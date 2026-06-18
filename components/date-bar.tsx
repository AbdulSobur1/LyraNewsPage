export function DateBar() {
  const now = new Date();
  const dateStr = now
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-hairline border-[var(--border)] pb-4">
      <span className="text-[11px] tracking-[0.04em] text-text-tertiary sm:text-[12px]">
        {dateStr}
      </span>
      <span className="rounded-[4px] border border-hairline border-[rgba(200,169,110,0.3)] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.08em] text-gold">
        Global Edition
      </span>
    </div>
  );
}
