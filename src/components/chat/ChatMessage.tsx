import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/hooks/useChat";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  const isError = message.role === "error";

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-foreground text-background" : "bg-accent/20 text-accent"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          isUser && "rounded-tr-sm bg-foreground text-background",
          !isUser && !isError && "rounded-tl-sm bg-muted text-foreground",
          isError && "rounded-tl-sm bg-destructive/10 text-destructive"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
