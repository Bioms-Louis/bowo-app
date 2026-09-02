import { Badge } from "@/components/ui/badge";
import type { InsightStatus } from "@/types/domain";

const STATUS_META: Record<InsightStatus, { label: string; color: "brand" | "green" | "amber" | "blue" }> = {
  observation: { label: "Observation", color: "amber" },
  developing_pattern: { label: "Developing Pattern", color: "blue" },
  strong_recurring_pattern: { label: "Strong Pattern", color: "green" },
};

export function InsightStatusBadge({ status }: { status: InsightStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.observation;
  return <Badge color={meta.color}>{meta.label}</Badge>;
}
