// Hand-authored domain types mirroring supabase/001_init_schema.sql.
// Once the project is linked to a real Supabase instance, replace/augment
// with generated types via:
//   npx supabase gen types typescript --project-id <id> > types/database.ts

export type JournalCategory = "reflection" | "goals" | "gratitude" | "lesson";

export type InsightCategory =
  | "theme"
  | "strength"
  | "growth_area"
  | "current_focus"
  | "core_value"
  | "identity";

export type InsightStatus =
  | "observation"
  | "developing_pattern"
  | "strong_recurring_pattern";

export type Confidence = "low" | "medium" | "high";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  onboarding_completed: boolean;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: JournalCategory;
  entry_date: string;
  ai_prompt_requested: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blueprint {
  id: string;
  user_id: string;
  version: number;
  is_current: boolean;
  who_you_are: string | null;
  what_drives_you: string | null;
  your_strengths: string | null;
  your_impact: string | null;
  core_purpose_statement: string | null;
  maturity_percent: number;
  identity_clarity_percent: number;
  purpose_alignment_percent: number;
  impact_understanding_percent: number;
  calling_activation_percent: number;
  created_at: string;
  updated_at: string;
}

export interface BlueprintInsight {
  id: string;
  blueprint_id: string;
  user_id: string;
  title: string;
  description: string;
  category: InsightCategory;
  status: InsightStatus;
  confidence: Confidence;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Evidence {
  id: string;
  user_id: string;
  insight_id: string;
  journal_entry_id: string | null;
  source_type: "journal_entry" | "ai_conversation";
  ai_message_id: string | null;
  excerpt: string;
  relevance_note: string | null;
  created_at: string;
}

export interface AiConversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface AiMessage {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  context_used: Record<string, unknown> | null;
  created_at: string;
}
