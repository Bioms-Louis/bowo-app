import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { runAnalysis } from "@/lib/ai/analysis";

const BodySchema = z.object({
  journalEntryId: z.string().uuid(),
});

/**
 * Triggered after a journal entry is saved with "AI Prompt" enabled
 * (see components/journal/JournalEntryForm.tsx), or manually from the
 * Blueprint/Insights UI. Not a public endpoint — auth required, and
 * the entry ownership is re-verified inside buildAnalysisContext via
 * the user's own RLS-scoped Supabase client.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await runAnalysis(supabase, user.id, parsed.data.journalEntryId);

  if (result.status === "failed") {
    return NextResponse.json(
      { error: "We couldn't update your Blueprint this time. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json(result);
}
