"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sub } from "@/font/font";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Tech Stack" },
  { id: "projects", label: "Work" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Get in Touch" },
];

export function OnThisPage() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 300;
      if (bottom) {
        setActiveId("contact");
        return;
      }

      let current = "hero";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:block ${sub.className}`}>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 pl-3">
          WHAT'S INSIDE?
        </p>
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={cn(
              "relative text-left text-xs px-3 py-1 rounded-md transition-all duration-200",
              activeId === id
                ? "text-white font-medium"
                : "text-white/40 hover:text-white/70"
            )}
          >
            {activeId === id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-white" />
            )}
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
