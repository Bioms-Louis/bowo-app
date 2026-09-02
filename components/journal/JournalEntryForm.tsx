"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createJournalEntryAction } from "@/app/(app)/journal/actions";
import { Sparkles } from "lucide-react";

export function JournalEntryForm({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("reflection");
  const [aiPrompt, setAiPrompt] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createJournalEntryAction(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setTitle("");
      setContent("");
      onSaved?.();
    });
  }

  return (
    <form action={handleSubmit} className="flex h-full flex-col p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">New Journal Entry</h3>

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
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full rounded-lg border border-border-subtle bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="reflection">Reflection</option>
            <option value="goals">Goals</option>
            <option value="gratitude">Gratitude</option>
            <option value="lesson">Lesson</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
          <Input type="date" name="entry_date" defaultValue={new Date().toISOString().slice(0, 10)} />
        </div>
      </div>

      <label className="mb-1 text-sm font-medium text-slate-700">Content</label>
      <textarea
        name="content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts, experiences, lessons or goals..."
        className="mb-4 flex-1 min-h-[220px] resize-none rounded-lg border border-border-subtle p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
      />

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

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving..." : "Save Entry"}
      </Button>
    </form>
  );
}
