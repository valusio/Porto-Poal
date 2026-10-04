"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatPanel } from "./ChatPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-12 md:right-12">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
