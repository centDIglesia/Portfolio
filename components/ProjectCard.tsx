"use client";

import { AnimatedProjects } from "@/components/ui/AnimatedProjects";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { sub } from "@/font/font";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/portfolio.data";

export default function AnimatedTestimonialsDemo() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className={`flex flex-wrap gap-2 justify-center border border-white/10 rounded-2xl bg-white/10 p-2 w-fit mx-auto mb-12 ${sub.className}`}>
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
              activeCategory === cat
                ? "text-primary"
                : "text-white/60 hover:text-white"
            )}
          >
            {activeCategory === cat && (
              <motion.span
                layoutId="project-tab-indicator"
                className="absolute inset-0 bg-white rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
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
