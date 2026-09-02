import { createClient } from "@/lib/supabase/server";
import { listJournalEntries } from "@/lib/db/journal";
import { JournalWorkspace } from "@/components/journal/JournalWorkspace";

export default async function JournalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = user ? await listJournalEntries(supabase, user.id) : [];

  return <JournalWorkspace entries={entries} />;
}
