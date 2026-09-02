"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import * as journalDb from "@/lib/db/journal";

const UpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  category: z.enum(["reflection", "goals", "gratitude", "lesson"]),
});

export async function updateJournalEntryAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const parsed = UpdateSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid entry." };
  }

  const { id, ...rest } = parsed.data;
  await journalDb.updateJournalEntry(supabase, user.id, id, rest);
  revalidatePath("/journal");
  return { success: true };
}
