"use client";

import { useState, useRef, useEffect } from "react";
import { X, SendHorizontal, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiChatModal({ isOpen, onClose }: AiChatModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, you would call your AI service here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated AI response. In a real app, you would call your AI service API here.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Sorry, there was an error processing your request.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Match animation duration
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible overlay that allows closing by clicking outside */}
      <div className="fixed inset-0 z-40" onClick={handleClose} />

      {/* Chat modal */}
      <div className="fixed bottom-20 right-4 z-50 w-[calc(100%-2rem)] max-w-md sm:max-w-lg">
        <div
          className={cn(
            "overflow-hidden rounded-xl shadow-xl bg-card border h-[500px] flex flex-col",
            isClosing
              ? "animate-out fade-out-0 slide-out-to-bottom-10 duration-200"
              : "animate-in fade-in-0 slide-in-from-bottom-10 duration-200"
          )}
        >
          {/* Triangle pointer connecting to button */}
          <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-card border-r border-b transform rotate-45"></div>

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-sky-400" />
              <h2 className="font-semibold">AI Assistant</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages area */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-lg p-3",
                    message.role === "user"
                      ? "bg-sky-400 text-white ml-auto"
                      : "bg-muted mr-auto"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="bg-muted max-w-[80%] rounded-lg p-3 mr-auto">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t flex gap-2 items-center"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="bg-sky-400 hover:bg-sky-500 text-white"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
