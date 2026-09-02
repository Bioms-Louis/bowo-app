"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createJournalEntryAction } from "@/app/(app)/journal/actions";
import { updateJournalEntryAction } from "@/app/(app)/journal/edit-actions";
import { deleteJournalEntryAction } from "@/app/(app)/journal/actions";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";
import { EmptyState } from "@/components/ui/states";
import { Sparkles, Plus } from "lucide-react";
import type { JournalEntry } from "@/types/domain";

export function JournalWorkspace({ entries }: { entries: JournalEntry[] }) {
  const [selected, setSelected] = useState<JournalEntry | "new" | null>(null);

  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-[1fr_420px]">
      <div className="overflow-y-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your Journal</h1>
            <p className="text-sm text-muted">Capture your thoughts, experiences and lessons.</p>
          </div>
          <Button onClick={() => setSelected("new")}>
            <Plus size={16} /> New Entry
          </Button>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            title="Your journey starts here."
            description="Write your first entry and BOWO will begin noticing patterns as you go."
            actionLabel="Write New Entry"
            onAction={() => setSelected("new")}
          />
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                active={selected !== "new" && selected?.id === entry.id}
                onClick={() => setSelected(entry)}
              />
            ))}
          </div>
        )}
      </div>

      <aside className="hidden border-l border-border-subtle bg-white lg:block">
        {selected === "new" ? (
          <EntryForm mode="create" onDone={() => setSelected(null)} />
        ) : selected ? (
          <EntryForm mode="edit" entry={selected} onDone={() => setSelected(null)} />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted">
            Select an entry to view or edit, or start a new one.
          </div>
        )}
      </aside>
    </div>
  );
}

function EntryForm({
  mode,
  entry,
  onDone,
}: {
  mode: "create" | "edit";
  entry?: JournalEntry;
  onDone: () => void;
}) {
  const [title, setTitle] = useState(entry?.title ?? "");
  const [content, setContent] = useState(entry?.content ?? "");
  const [category, setCategory] = useState(entry?.category ?? "reflection");
  const [aiPrompt, setAiPrompt] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const action = mode === "create" ? createJournalEntryAction : updateJournalEntryAction;
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      onDone();
    });
  }

  function handleDelete() {
    if (!entry) return;
    if (!confirm("Delete this journal entry? This can't be undone.")) return;
    startTransition(async () => {
      await deleteJournalEntryAction(entry.id);
      onDone();
    });
  }

  return (
    <form action={handleSubmit} className="flex h-full flex-col p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        {mode === "create" ? "New Journal Entry" : "Edit Entry"}
      </h3>

      {entry && <input type="hidden" name="id" value={entry.id} />}

      <label className="mb-1 text-sm font-medium text-slate-700">Title</label>
      <Input
        name="title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What's on your mind?"
        className="mb-4"
      />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as JournalEntry["category"])}
            className="h-11 w-full rounded-lg border border-border-subtle bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="reflection">Reflection</option>
            <option value="goals">Goals</option>
            <option value="gratitude">Gratitude</option>
            <option value="lesson">Lesson</option>
          </select>
        </div>
        {mode === "create" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
            <Input
              type="date"
              name="entry_date"
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </div>
        )}
      </div>

      <label className="mb-1 text-sm font-medium text-slate-700">Content</label>
      <textarea
        name="content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts, experiences, lessons or goals..."
        className="mb-4 min-h-[220px] flex-1 resize-none rounded-lg border border-border-subtle p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
      />

      {mode === "create" && (
        <label className="mb-4 flex items-center justify-between rounded-lg border border-border-subtle p-3">
          <span className="flex items-center gap-2 text-sm text-slate-700">
            <Sparkles size={16} className="text-brand-500" />
            Get AI insights on this entry
          </span>
          <input
            type="checkbox"
            name="ai_prompt_requested"
            checked={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.checked)}
            className="h-5 w-9 accent-brand-500"
          />
        </label>
      )}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        {mode === "edit" && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={pending}>
            Delete
          </Button>
        )}
        <Button type="submit" size="lg" className="flex-1" disabled={pending}>
          {pending ? "Saving..." : mode === "create" ? "Save Entry" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
