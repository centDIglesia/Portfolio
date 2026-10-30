"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

import { TECH_LOGOS, TECH_LOGOS2, TECH_LOGOS3 } from "@/data/portfolio.data";
import { main, sub } from "@/font/font";
import { WidgetIcon } from "@solar-icons/react/bold-duotone/widget";
import { TextSquareIcon } from "@solar-icons/react/bold-duotone/text-square";

type TechLogo = { slug: string; name: string };
type MarqueeRow = { id: string; speed: number; logos: readonly TechLogo[] };

const MARQUEE_ROWS: readonly MarqueeRow[] = [
  { id: "row-1", speed: 30, logos: TECH_LOGOS as readonly TechLogo[] },
  { id: "row-2", speed: 24, logos: TECH_LOGOS2 as readonly TechLogo[] },
  { id: "row-3", speed: 32, logos: TECH_LOGOS3 as readonly TechLogo[] },
];

type BadgeMode = "logo" | "text";

const MODES = [
  { value: "logo", label: "Show logo", Icon: WidgetIcon },
  { value: "text", label: "Show text", Icon: TextSquareIcon },
] as const;

const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

// Logos whose brand color is near-black and disappears on dark tiles
const DARK_LOGOS = new Set(["nextdotjs", "github", "prisma"]);

function LogoTile({ logo }: { logo: TechLogo }) {
  return (
    <div
      className={`flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/10 border-b border-slate-200 dark:border-white/15 shadow-xs hover:shadow-md transition-all ${sub.className}`}
      aria-label={logo.name}
      title={logo.name}
    >
      <Image
        alt={logo.name}
        src={`/logos/${logo.slug}.svg`}
        width={30}
        height={30}
        className={`opacity-90 hover:opacity-100 transition-opacity ${DARK_LOGOS.has(logo.slug) ? "dark:invert" : ""}`}
        unoptimized
      />
    </div>
  );
}

function TextPill({ label }: { label: string }) {
  return (
    <Badge
      className={`${sub.className} h-9 rounded-xl px-3 sm:h-10 sm:px-4 sm:text-sm`}
    >
      {label}
    </Badge>
  );
}

export default function Skills() {
  const [mode, setMode] = React.useState<BadgeMode>("logo");
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [logosInView, setLogosInView] = React.useState(true);

  // Pause the marquees while they're scrolled out of view. Watches the card, which stays
  // mounted, because the logos themselves mount late when switching back from text mode.
  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setLogosInView(entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // grid-cols-1 caps the column at the section width; without it the auto-filling marquees
    // widen the column, which makes them add more logos, which widens it again (a freeze on phones)
    <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <div>
        <div
          className={`flex justify-center lg:justify-end ${sub.className}`}
        >
          <Badge variant={"custom"} className="shadow-lg font-bold">
            Tech Stack &amp; Tools
          </Badge>
        </div>

        <h2
          className={`mt-4 text-3xl sm:text-4xl ${main.className} text-white text-center lg:text-right`}
        >
          Key Technologies &amp; Platforms
        </h2>

        <p
          className={`${sub.className} mx-auto mt-3 max-w-xl text-sm leading-6 text-white sm:text-base text-center lg:mr-0 lg:text-right`}
        >
          The tools I use most often to build clean UIs, scalable features, and
          polished experiences.
        </p>
      </div>
      <div>
        <div
          ref={cardRef}
          className="
            relative ml-auto w-full
            rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/90
            h-80 sm:h-90 lg:h-95
            p-4 sm:p-6
            shadow-xl
            overflow-hidden
            flex flex-col justify-between
          "
        >
          <AnimatePresence mode="wait" initial={false}>
          {mode === "logo" ? (
            <motion.div
              key="logo"
              {...FADE}
              className="relative flex-1 flex flex-col justify-center gap-3 overflow-hidden py-1"
            >
              <TooltipProvider delayDuration={150}>
                {MARQUEE_ROWS.map((row, idx) => (
                  <Marquee key={row.id} className="relative">
                    <MarqueeFade side="left" className="z-10 w-12 sm:w-16 pointer-events-none" />
                    <MarqueeFade side="right" className="z-10 w-12 sm:w-16 pointer-events-none" />

                    <MarqueeContent
                      speed={row.speed}
                      direction={idx === 1 ? "right" : "left"}
                      pauseOnHover
                      play={logosInView}
                      gradient={false}
                    >
                      {row.logos.map((logo) => (
                        <MarqueeItem key={logo.slug} className="mx-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                                aria-label={logo.name}
                              >
                                <LogoTile logo={logo} />
                              </div>
                            </TooltipTrigger>

                            <TooltipContent
                              side="top"
                              sideOffset={8}
                              className={`${sub.className} bg-primary text-primary-foreground font-medium shadow-md`}
                            >
                              {logo.name}
                            </TooltipContent>
                          </Tooltip>
                        </MarqueeItem>
                      ))}
                    </MarqueeContent>
                  </Marquee>
                ))}
              </TooltipProvider>
            </motion.div>
          ) : (
            // min-h-0 lets this shrink to the card so the toggle below stays visible; my-auto
            // centers the pills but drops to 0 if they overflow, so the first row stays reachable
            <motion.div
              key="text"
              {...FADE}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto py-1"
            >
              <ul className="my-auto flex flex-wrap justify-center gap-2 sm:gap-3">
                {TECH_LOGOS.map((logo) => (
                  <li key={logo.slug}>
                    <TextPill label={logo.name} />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Bottom switch: the green thumb slides to the active view */}
          <div className="pt-3 flex justify-center z-20 shrink-0">
            <div
              role="group"
              aria-label="Tech stack view"
              className="flex rounded-xl bg-slate-100 p-1 dark:bg-white/10"
            >
              {MODES.map(({ value, label, Icon }) => {
                const active = mode === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-label={label}
                    aria-pressed={active}
                    onClick={() => setMode(value)}
                    className={cn(
                      "relative flex h-8 w-11 items-center justify-center rounded-lg transition-colors duration-300",
                      active
                        ? "text-primary-foreground"
                        : "text-primary/50 hover:text-primary dark:text-foreground/50 dark:hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="skills-view-thumb"
                        className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon size={18} className="relative" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
