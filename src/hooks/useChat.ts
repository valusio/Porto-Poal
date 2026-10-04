"use client";

import { useCallback, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

export type ChatRole = "user" | "assistant" | "error";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm an assistant grounded on Poalca's public portfolio. Ask about projects, experience, or skills.",
};

export const SUGGESTED_QUESTIONS = [
  "What production systems has Poalca shipped?",
  "Summarize the BPS chatbot architecture.",
  "What awards has he won?",
];

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, 500);
    if (!text) return;

    const userMsg: ChatMessage = { id: nextId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      if (!API_BASE_URL) {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content:
              "The Ask API is not configured yet. Set NEXT_PUBLIC_API_URL after deploying ApiStack. Until then, browse the case studies on this site.",
          },
        ]);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = (await res.json()) as { response?: string; message?: string };
      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: data.response ?? "I could not generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "error",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, I encountered an error connecting to the server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, input, setInput, isLoading, send };
}
