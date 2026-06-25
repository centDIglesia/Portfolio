"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sub } from "@/font/font";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Vincent's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage.content += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: assistantMessage.content }
                : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        type="button"
        size="icon"
        className="rounded-xl ml-2  bg-primary shadow-2xl"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle chatbot"
      >
        <Bot className="size-5 text-foreground" />
      </Button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed z-[10000] flex flex-col rounded-2xl border border-white/10 bg-white shadow-2xl",
              "bottom-20 left-1/2 -translate-x-1/2 w-125 h-125",
              "max-sm:w-[calc(100%-2rem)] max-sm:bottom-20 max-sm:h-[calc(100vh-8rem)] overflow-clip",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold text-primary ${sub.className}`}
                  >
                    Vincent&apos;s Assistant
                  </p>
                  <p className="text-[10px] text-primary/50">Ask me anything</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 pb-20 space-y-3"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-slate-100 text-primary rounded-bl-sm",
                    )}
                  >
                    {msg.content ? (
                      msg.role === "assistant" ? (
                        <ReactMarkdown
                          components={{
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 space-y-1">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            code: ({ children }) => <code className="bg-black/5 px-1 rounded text-xs">{children}</code>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:0ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:150ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 from-bg-white/5 to-transparent bg-linear-to-t  backdrop-blur-md absolute bottom-0 w-full"
            >
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full rounded-2xl  bg-white text-sm text-primary pr-11 py-6"
                  disabled={isLoading}
                  aria-label="Chat message input"
                />
                <Button
                  type="submit"
                  
                  className="absolute right-2 top-1/2 -translate-y-1/2  rounded-xl flex items-center justify-center"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
