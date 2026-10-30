"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { BotIcon } from "@solar-icons/react/bold-duotone/bot";
import { Plane2Icon } from "@solar-icons/react/bold-duotone/plane-2";
import { CloseCircleIcon } from "@solar-icons/react/bold-duotone/close-circle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/lib/use-is-client";
import { sub } from "@/font/font";
import { AnimatePresence, motion } from "framer-motion";

// react-markdown is only needed once the chat is opened, so keep it out of the initial bundle
const ChatMarkdown = lazy(() => import("@/components/ChatMarkdown"));

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  // Failed turns stay visible but are left out of the history sent to the API
  failed?: boolean;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Vincent's AI assistant. Ask me anything about his projects, skills, or experience!",
};

const SUGGESTIONS = [
  "What projects has he built?",
  "What's his tech stack?",
  "How can I contact him?",
];

const ERROR_TEXT = "Sorry, I couldn't answer that just now.";
const MAX_INPUT_LENGTH = 500;

let idCounter = 0;
const nextId = () => `${Date.now()}-${idCounter++}`;

// Only autofocus with a mouse or trackpad, so phones don't cover the chat with the keyboard
const canAutoFocus = () => window.matchMedia("(pointer: fine)").matches;

// Below Tailwind's `sm` breakpoint the chat is full screen
const isFullScreenLayout = () => window.matchMedia("(width < 40rem)").matches;

export function Chatbot() {
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);
  // Follow new messages only while the reader is already at the bottom
  const stickToBottomRef = useRef(true);

  // Show the hint once, and not at all if the chat was opened first
  useEffect(() => {
    const show = setTimeout(() => {
      if (!hasOpenedRef.current) setShowHint(true);
    }, 3000);
    const hide = setTimeout(() => setShowHint(false), 7000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    stickToBottomRef.current = true;
    if (canAutoFocus()) inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    // Close on any press outside the chat; the trigger button toggles it by itself
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    // When the chat covers the screen, keep the page behind it from scrolling
    const root = document.documentElement;
    const lockScroll = isFullScreenLayout();
    if (lockScroll) root.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      if (lockScroll) root.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen]);

  const toggleChat = () => {
    hasOpenedRef.current = true;
    setShowHint(false);
    setIsOpen((prev) => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const sendMessage = async (text: string) => {
    const question = text.trim();
    if (!question || isLoading) return;

    const userMessage: Message = { id: nextId(), role: "user", content: question };
    const replyId = nextId();
    const history = [...messages, userMessage]
      .filter((m) => m.id !== WELCOME.id && !m.failed)
      .map(({ role, content }) => ({ role, content }));

    const updateReply = (content: string) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { ...m, content } : m)),
      );

    stickToBottomRef.current = true;
    // Add the empty reply right away so the typing dots show while the request is in flight
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: replyId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error(`Chat request failed (${res.status})`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        updateReply(reply);
      }
      reply += decoder.decode();
      updateReply(reply);

      // The text stream just ends when the model errors, so an empty reply means it failed
      if (!reply.trim()) throw new Error("Empty reply");
    } catch {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === userMessage.id) return { ...m, failed: true };
          if (m.id === replyId) return { ...m, content: ERROR_TEXT, failed: true };
          return m;
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const retry = (failedReplyId: string) => {
    const index = messages.findIndex((m) => m.id === failedReplyId);
    const question = messages[index - 1];
    setMessages((prev) =>
      prev.filter((m) => m.id !== failedReplyId && m.id !== question.id),
    );
    void sendMessage(question.content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {/* Hint popup */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 z-[10001] pointer-events-none"
          >
            <div className={`rounded-xl bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-primary dark:text-foreground shadow-lg border border-black/5 dark:border-white/10 whitespace-nowrap ${sub.className}`}>
              Got questions? Ask my AI assistant!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        type="button"
        size="icon"
        className="relative rounded-xl ml-2 bg-primary shadow-2xl overflow-hidden "
        onClick={toggleChat}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <span className="absolute inset-0 animate-shine bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <BotIcon className="relative text-primary-foreground animate-wiggle" size={20} />
      </Button>

      {/* Chat Window: portaled to <body> because the navbar's transform and backdrop blur
          would otherwise make `fixed` position relative to the navbar instead of the screen */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                role="dialog"
                aria-label="Chat with Vincent's assistant"
                className={cn(
                  "fixed z-[10000] flex flex-col overflow-clip bg-white dark:bg-zinc-900",
                  // Full screen on phones
                  "inset-0",
                  // Floating panel above the navbar from sm up
                  "sm:inset-auto sm:bottom-25 sm:left-1/2 sm:-translate-x-1/2 sm:w-125 sm:h-125 sm:rounded-2xl sm:border sm:border-black/10 sm:dark:border-white/10 sm:shadow-2xl",
                )}
              >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-black/5 dark:border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                      <BotIcon className="text-primary-foreground" size={16} />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold text-primary dark:text-foreground ${sub.className}`}
                      >
                        Vincent&apos;s Assistant
                      </p>
                      <p className="text-[10px] text-primary/50 dark:text-foreground/50">Ask me anything</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    // Bigger tap target on phones, where this is the main way out
                    className="size-10 sm:size-7 rounded-lg"
                    onClick={closeChat}
                    aria-label="Close chatbot"
                  >
                    {/* Sized by class: the size prop sets an inline style that would override it */}
                    <CloseCircleIcon className="size-6 sm:size-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  aria-live="polite"
                  aria-busy={isLoading}
                  className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:pb-20 space-y-3"
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
                          "max-w-[85%] sm:max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed wrap-break-word",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-slate-100 dark:bg-zinc-800 text-primary dark:text-foreground rounded-bl-sm",
                        )}
                      >
                        {msg.role === "user" ? (
                          msg.content
                        ) : msg.failed ? (
                          <div className="flex flex-col items-start gap-1.5">
                            <span>{msg.content}</span>
                            <button
                              type="button"
                              onClick={() => retry(msg.id)}
                              disabled={isLoading}
                              className="text-xs font-semibold underline underline-offset-2 disabled:opacity-50"
                            >
                              Try again
                            </button>
                          </div>
                        ) : msg.content ? (
                          <Suspense fallback={<p className="mb-1 last:mb-0">{msg.content}</p>}>
                            <ChatMarkdown>{msg.content}</ChatMarkdown>
                          </Suspense>
                        ) : (
                          <span className="inline-flex gap-1" aria-label="Assistant is typing">
                            <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:0ms]" />
                            <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:150ms]" />
                            <span className="h-1 w-1 animate-bounce rounded-full bg-primary/40 [animation-delay:300ms]" />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Starter questions until the visitor asks something */}
                  {messages.length === 1 && (
                    <div className={`flex flex-wrap gap-2 ${sub.className}`}>
                      {SUGGESTIONS.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => void sendMessage(suggestion)}
                          className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 sm:py-1.5 text-xs text-primary dark:text-foreground transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className={cn(
                    // Phones: a solid bar below the messages. Blurring the list behind it would
                    // re-render the blur on every scroll frame, which is what makes phones lag.
                    "shrink-0 border-t border-black/5 dark:border-white/10 px-3 py-3",
                    "sm:absolute sm:bottom-0 sm:w-full sm:border-t-0 sm:bg-linear-to-t sm:from-white/80 sm:dark:from-zinc-900/80 sm:to-transparent sm:backdrop-blur-md",
                  )}
                >
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      // 16px on phones so iOS Safari doesn't zoom in when the input is focused
                      className="w-full rounded-2xl  bg-white dark:bg-zinc-800 text-base sm:text-sm text-primary dark:text-foreground pr-11 py-6"
                      maxLength={MAX_INPUT_LENGTH}
                      autoComplete="off"
                      enterKeyHint="send"
                      aria-label="Chat message input"
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center text-primary hover:text-primary dark:text-foreground dark:hover:text-foreground"
                      disabled={isLoading || !input.trim()}
                      aria-label="Send message"
                    >
                      <Plane2Icon size={20} />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
