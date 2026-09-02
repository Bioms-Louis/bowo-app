import { Badge } from "@/components/ui/badge";
import type { JournalEntry } from "@/types/domain";
import { BookOpen, Target, Heart, GraduationCap } from "lucide-react";

const CATEGORY_META: Record<
  JournalEntry["category"],
  { label: string; color: "brand" | "green" | "amber" | "blue"; icon: typeof BookOpen }
> = {
  reflection: { label: "Reflection", color: "brand", icon: BookOpen },
  goals: { label: "Goals", color: "green", icon: Target },
  gratitude: { label: "Gratitude", color: "amber", icon: Heart },
  lesson: { label: "Lesson", color: "blue", icon: GraduationCap },
};

export function JournalEntryCard({
  entry,
  active,
  onClick,
}: {
  entry: JournalEntry;
  active?: boolean;
  onClick?: () => void;
}) {
  const meta = CATEGORY_META[entry.category];
  const Icon = meta.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
        active ? "border-brand-300 bg-brand-50" : "border-border-subtle bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
          <Icon size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">{entry.title}</p>
            <span className="shrink-0 text-xs text-muted">
              {new Date(entry.entry_date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{entry.content}</p>
          <Badge color={meta.color} className="mt-2">
            {meta.label}
          </Badge>
        </div>
      </div>
    </button>
  );
}
