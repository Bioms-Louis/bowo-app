"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import * as journalDb from "@/lib/db/journal";
import { runAnalysis } from "@/lib/ai/analysis";

const EntrySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Write something before saving").max(10000),
  category: z.enum(["reflection", "goals", "gratitude", "lesson"]),
  entry_date: z.string(),
  ai_prompt_requested: z.boolean().default(false),
});

export async function createJournalEntryAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const parsed = EntrySchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category"),
    entry_date: formData.get("entry_date"),
    ai_prompt_requested: formData.get("ai_prompt_requested") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid entry." };
  }

  const entry = await journalDb.createJournalEntry(supabase, user.id, parsed.data);

  if (parsed.data.ai_prompt_requested) {
    // Run in-process (same authenticated Supabase client) rather than a
    // self-fetch, which wouldn't carry the session cookie. Failures here
    // shouldn't block the entry save — runAnalysis handles its own
    // failure bookkeeping in ai_analysis_runs.
    runAnalysis(supabase, user.id, entry.id).catch(() => {});
  }

  revalidatePath("/journal");
  revalidatePath("/dashboard");
  return { success: true, entry };
}

export async function deleteJournalEntryAction(entryId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  await journalDb.deleteJournalEntry(supabase, user.id, entryId);
  revalidatePath("/journal");
}
