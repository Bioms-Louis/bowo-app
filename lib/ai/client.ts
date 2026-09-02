import Anthropic from "@anthropic-ai/sdk";

// Server-only module. Never import this from a Client Component —
// ANTHROPIC_API_KEY has no NEXT_PUBLIC_ prefix on purpose.
if (typeof window !== "undefined") {
  throw new Error("lib/ai/client.ts must never be imported client-side.");
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const AI_MODEL = "claude-sonnet-4-6";
