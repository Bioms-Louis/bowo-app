import type { SupabaseClient } from "@supabase/supabase-js";
import { anthropic, AI_MODEL } from "./client";
import { buildChatContext } from "./context";
import { buildChatSystemPrompt } from "./prompts";

export interface ChatTurnResult {
  reply: string;
  conversationId: string;
}

/**
 * Handles one turn of the floating AI companion: loads/creates the
 * conversation, builds bounded context, calls Claude, and persists
 * both the user and assistant messages with a record of exactly what
 * context was used (context_used) for auditability.
 */
export async function sendChatMessage(
  supabase: SupabaseClient,
  userId: string,
  userMessage: string,
  conversationId?: string
): Promise<ChatTurnResult> {
  let convoId = conversationId;

  if (!convoId) {
    const { data: newConvo, error } = await supabase
      .from("ai_conversations")
      .insert({ user_id: userId, title: userMessage.slice(0, 60) })
      .select()
      .single();
    if (error || !newConvo) throw new Error("Could not start conversation.");
    convoId = newConvo.id;

    await supabase.from("activity_events").insert({
      user_id: userId,
      event_type: "ai_conversation_started",
    });
  }

  const ctx = await buildChatContext(supabase, userId, convoId!);
  const system = buildChatSystemPrompt(ctx);

  await supabase.from("ai_messages").insert({
    conversation_id: convoId,
    user_id: userId,
    role: "user",
    content: userMessage,
    context_used: { entryIds: Array.from(ctx.allowedEntryIds) },
  });

  const messages = [
    ...ctx.recentMessages.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userMessage },
  ];

  let replyText: string;
  try {
    const response = await anthropic.messages.create({
      model: AI_MODEL,
      max_tokens: 800,
      system,
      messages,
    });
    const textBlock = response.content.find((b) => b.type === "text");
    replyText =
      textBlock && textBlock.type === "text"
        ? textBlock.text
        : "I wasn't able to put together a reply just now — could you try rephrasing?";
  } catch {
    replyText =
      "Something went wrong reaching your companion just now. Please try again in a moment.";
  }

  await supabase.from("ai_messages").insert({
    conversation_id: convoId,
    user_id: userId,
    role: "assistant",
    content: replyText,
    context_used: { entryIds: Array.from(ctx.allowedEntryIds) },
  });

  return { reply: replyText, conversationId: convoId! };
}
