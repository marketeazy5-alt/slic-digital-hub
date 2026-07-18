import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatPKR, compactPKR } from "@/lib/format";

export function StatCard({
  label,
  value,
  format = "number",
  hint,
  icon,
  accent,
  compact,
}: {
  label: string;
  value: number | string;
  format?: "number" | "pkr" | "text";
  hint?: ReactNode;
  icon?: ReactNode;
  accent?: "primary" | "gold" | "info" | "warning";
  compact?: boolean;
}) {
  const numeric = typeof value === "number";
  const [displayed, setDisplayed] = useState(numeric ? 0 : value);

  useEffect(() => {
    if (!numeric) { setDisplayed(value); return; }
    const target = value as number;
    let raf = 0;
    const start = performance.now();
    const duration = 700;
    const from = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, numeric]);

  const rendered = numeric
    ? format === "pkr"
      ? compact ? compactPKR(displayed as number) : formatPKR(displayed as number)
      : (displayed as number).toLocaleString()
    : displayed;

  return (
    <div
      className={cn(
        "surface-elevated p-5 md:p-6 relative overflow-hidden group transition-all duration-300 card-spotlight",
        accent === "gold" && "premium-glow",
      )}
    >
      {accent && (
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-0.5",
            accent === "primary" && "bg-primary",
            accent === "gold" && "gradient-gold-bg",
            accent === "info" && "bg-info",
            accent === "warning" && "bg-warning",
          )}
        />
      )}
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
          <p className="mt-2 text-2xl md:text-3xl font-semibold font-display tabular-nums tracking-tight">
            {rendered}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {icon && (
          <div className="h-9 w-9 rounded-md bg-accent/60 text-accent-foreground flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
