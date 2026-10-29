"use client";

import * as React from "react";
import Image from "next/image";

import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

import { TECH_LOGOS, TECH_LOGOS2, TECH_LOGOS3 } from "@/data/portfolio.data";
import { main, sub } from "@/font/font";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
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
        src={`https://cdn.simpleicons.org/${logo.slug}?viewbox=auto`}
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
      className={`
        ${sub.className}
        h-9 w-full justify-center
        rounded-xl 
        px-3
        whitespace-nowrap truncate
      `}
    >
      {label}
    </Badge>
  );
}

export default function Skills() {
  const [mode, setMode] = React.useState<BadgeMode>("logo");

  return (
    <section className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <div
          className={`flex justify-center sm:justify-end ${sub.className}`}
        >
          <Badge variant={"custom"} className="shadow-lg font-bold">
            Tech Stack &amp; Tools
          </Badge>
        </div>

        <h2
          className={`mt-4 text-3xl sm:text-4xl ${main.className} text-white text-center sm:text-right`}
        >
          Key Technologies &amp; Platforms
        </h2>

        <p
          className={`${sub.className} mt-3 max-w-xl text-sm leading-6 text-white sm:text-base text-center sm:text-right`}
        >
          The tools I use most often to build clean UIs, scalable features, and
          polished experiences.
        </p>
      </div>
      <div>
        <div
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
          {mode === "logo" ? (
            <div className="relative flex-1 flex flex-col justify-center gap-3 overflow-hidden py-1">
              <TooltipProvider delayDuration={150}>
                {MARQUEE_ROWS.map((row, idx) => (
                  <Marquee key={row.id} className="relative">
                    <MarqueeFade side="left" className="z-10 w-12 sm:w-16 pointer-events-none" />
                    <MarqueeFade side="right" className="z-10 w-12 sm:w-16 pointer-events-none" />

                    <MarqueeContent
                      speed={row.speed}
                      direction={idx === 1 ? "right" : "left"}
                      pauseOnHover
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
            </div>
          ) : (
            <ScrollArea className="flex-1 w-full relative">
              <div className="absolute bottom-0 z-10 w-full h-12 from-slate-50 dark:from-zinc-900 via-slate-50/50 dark:via-zinc-900/50 to-transparent left-0 right-0 bg-linear-to-t pointer-events-none" />
              <div
                className="
                  grid gap-2 sm:gap-3
                  grid-cols-[repeat(auto-fit,minmax(110px,1fr))]
                  sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]
                  items-stretch
                  pb-6
                "
              >
                {TECH_LOGOS.map((logo) => (
                  <button
                    key={logo.slug}
                    type="button"
                    aria-label={logo.name}
                    className="w-full text-left"
                  >
                    <TextPill label={logo.name} />
                  </button>
                ))}
              </div>

              <ScrollBar />
            </ScrollArea>
          )}

          {/* Bottom Toggle Bar */}
          <div className="pt-3 flex justify-center z-20 shrink-0">
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(v) => {
                if (v === "logo" || v === "text") setMode(v);
              }}
              size="sm"
              className={`${sub.className} bg-white shadow-sm rounded-xl p-0.5`}
            >
              <ToggleGroupItem
                value="logo"
                aria-label="Show logo"
                className="rounded-lg px-3 transition-colors text-primary/60 hover:bg-primary/10 hover:text-primary data-[state=on]:bg-primary/15 data-[state=on]:text-primary"
              >
                <WidgetIcon size={18} className="size-4.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="text"
                aria-label="Show text"
                className="rounded-lg px-3 transition-colors text-primary/60 hover:bg-primary/10 hover:text-primary data-[state=on]:bg-primary/15 data-[state=on]:text-primary"
              >
                <TextSquareIcon size={18} className="size-4.5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
