"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";

function ChatMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
        code: ({ children }) => <code className="bg-black/5 dark:bg-white/10 px-1 rounded text-xs">{children}</code>,
        // Open links in a new tab so visitors don't leave the portfolio
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// Memoized so streaming one reply doesn't re-parse every earlier message on each chunk
export default memo(ChatMarkdown);
