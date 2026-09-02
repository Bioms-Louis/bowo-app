"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-700">
        Thanks — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm font-medium text-slate-700">Full Name</label>
      <Input name="name" required placeholder="Your name" />

      <label className="text-sm font-medium text-slate-700">Email</label>
      <Input name="email" type="email" required placeholder="you@example.com" />

      <label className="text-sm font-medium text-slate-700">Message</label>
      <textarea
        name="message"
        required
        placeholder="How can we help?"
        className="min-h-[100px] w-full rounded-lg border border-border-subtle p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
      />
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
