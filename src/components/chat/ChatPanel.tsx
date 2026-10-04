"use client";

import { useEffect, useRef } from "react";
import { Bot, Send, X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { SUGGESTED_QUESTIONS, useChat } from "@/hooks/useChat";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, input, setInput, isLoading, send } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex h-[500px] max-h-[80vh] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
            <Bot className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Ask about me</h3>
            <p className="text-xs text-muted-foreground">Grounded on public portfolio data</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Thinking…
          </p>
        )}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {SUGGESTED_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              className="rounded-full border border-border px-3 py-1 text-left text-xs text-muted-foreground hover:border-accent hover:text-foreground"
              onClick={() => send(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <p className="px-4 pb-2 text-[11px] text-muted-foreground">
        Answers can be incomplete. Confirm important details in the case studies.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="border-t border-border p-4"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full rounded-full border border-border bg-muted/50 py-2 pl-4 pr-10 text-sm focus-visible:border-accent focus-visible:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
