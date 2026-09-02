import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { BlueprintInsight, InsightCategory } from "@/types/domain";
import type { LucideIcon } from "lucide-react";

export function KeyAreaCard({
  icon: Icon,
  title,
  insights,
}: {
  icon: LucideIcon;
  title: string;
  insights: BlueprintInsight[];
}) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
        <Icon size={18} />
      </div>
      <p className="mb-2 text-sm font-semibold text-slate-900">{title}</p>
      {insights.length === 0 ? (
        <p className="text-xs text-muted">Nothing here yet — keep journaling.</p>
      ) : (
        <ul className="mb-3 space-y-1">
          {insights.slice(0, 3).map((i) => (
            <li key={i.id} className="text-xs text-muted">
              • {i.title}
            </li>
          ))}
        </ul>
      )}
      <Link href="/insights" className="text-xs font-medium text-brand-600">
        View details →
      </Link>
    </Card>
  );
}

export function groupByCategory(
  insights: BlueprintInsight[],
  category: InsightCategory
): BlueprintInsight[] {
  return insights.filter((i) => i.category === category);
}
