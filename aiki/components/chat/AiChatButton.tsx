"use client";

import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiChatModal } from "./AiChatModal";

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-sky-400 hover:bg-sky-500 transition-all duration-200 hover:scale-105"
        aria-label="Open AI chat"
      >
        <MessageSquarePlus className="h-6 w-6 text-white" />
      </Button>

      <AiChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
