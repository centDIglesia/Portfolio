"use client";

import { AnimatedProjects } from "@/components/ui/AnimatedProjects";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { sub } from "@/font/font";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/portfolio.data";

import { WidgetIcon } from "@solar-icons/react/bold-duotone/widget";

export default function AnimatedTestimonialsDemo() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div
        className={`flex items-center justify-center gap-1 sm:gap-2 rounded-2xl bg-white p-1 w-fit max-w-full mx-auto mb-12 ${sub.className}`}
      >
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "relative py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-center whitespace-nowrap",
              cat === "All"
                ? "px-2.5 sm:px-4"
                : "px-3 sm:px-4",
              activeCategory === cat
                ? "text-primary-foreground font-semibold"
                : "text-primary/60 hover:text-primary"
            )}
          >
            {activeCategory === cat && (
              <motion.span
                layoutId="project-tab-indicator"
                className="absolute inset-0 bg-primary rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {cat === "All" ? (
                <>
                  <WidgetIcon
                    size={18}
                    className="size-4.5 sm:hidden inline-block"
                  />
                  <span className="hidden sm:inline">All</span>
                </>
              ) : (
                cat
              )}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <AnimatedProjects key={p.title} projects={[p]} className="mb-16" />
            ))
          ) : (
            <p className={`text-white/60 ${sub.className}`}>
              No projects in this category yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
