import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

const COLOR_MAP: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-sky-50 text-sky-600",
  slate: "bg-slate-100 text-slate-600",
};

export function Badge({
  className,
  color = "brand",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { color?: keyof typeof COLOR_MAP }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        COLOR_MAP[color],
        className
      )}
      {...props}
    />
  );
}
