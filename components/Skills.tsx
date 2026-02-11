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

import { TECH_LOGOS, TECH_LOGOS2, TECH_LOGOS3 } from "@/data/skills.data";
import { main, sub } from "@/font/font";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type TechLogo = { slug: string; name: string };
type MarqueeRow = { id: string; speed: number; logos: readonly TechLogo[] };

const MARQUEE_ROWS: readonly MarqueeRow[] = [
  { id: "row-1", speed: 2, logos: TECH_LOGOS as readonly TechLogo[] },
  { id: "row-2", speed: 1, logos: TECH_LOGOS2 as readonly TechLogo[] },
  { id: "row-3", speed: 3, logos: TECH_LOGOS3 as readonly TechLogo[] },
];

type BadgeMode = "logo" | "text";

function LogoTile({ logo }: { logo: TechLogo }) {
  return (
    <div
      className={`flex size-16 items-center justify-center rounded-2xl bg-white shadow-lg/10 ${sub.className}`}
      aria-label={logo.name}
      title={logo.name}
    >
      <Image
        alt={logo.name}
        src={`https://cdn.simpleicons.org/${logo.slug}?viewbox=auto`}
        width={28}
        height={28}
        className="opacity-100"
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
    <section className="grid items-center gap-10    lg:grid-cols-2">
      <div>
        <div
          className={`flex justify-center sm:justify-end    ${sub.className}`}
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
                rounded-xl bg-white
               
                h-80 sm:h-90 lg:h-95
                p-4 sm:p-6
                shadow-lg
                pb-16 sm:pb-16
              "
        >
          <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
            <div className="flex justify-center">
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(v) => {
                  if (v === "logo" || v === "text") setMode(v);
                }}
                variant="outline"
                size="sm"
                className={`${sub.className} bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60`}
              >
                <ToggleGroupItem
                  value="logo"
                  aria-label="Show logo"
                  className="text-primary"
                >
                  Logo
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="text"
                  aria-label="Show text"
                  className="text-primary"
                >
                  Text
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {mode === "logo" ? (
            <div className="absolute inset-0 grid place-items-center">
              {/* Responsive width instead of fixed 320px */}
              <div className="w-[240px] sm:w-[280px] md:w-[320px] rotate-90">
                <TooltipProvider delayDuration={150}>
                  <div className="flex flex-col gap-2">
                    {MARQUEE_ROWS.map((row) => (
                      <Marquee key={row.id} className="relative">
                        <MarqueeFade side="left" />
                        <MarqueeFade side="right" />

                        <MarqueeContent
                          speed={row.speed}
                          pauseOnHover
                          gradient={false}
                        >
                          {row.logos.map((logo) => (
                            <MarqueeItem key={logo.slug}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className="rotate-270"
                                    aria-label={logo.name}
                                  >
                                    <LogoTile logo={logo} />
                                  </button>
                                </TooltipTrigger>

                                <TooltipContent
                                  side="top"
                                  sideOffset={8}
                                  className={`${sub.className} bg-primary text-white`}
                                >
                                  {logo.name}
                                </TooltipContent>
                              </Tooltip>
                            </MarqueeItem>
                          ))}
                        </MarqueeContent>
                      </Marquee>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full w-full relative">
              <div className="absolute  bottom-0 z-10 w-full h-12  from-slate-50 via-slate-50/50 to-transparent left-0 righ-0 bg-linear-to-t"></div>
              <div
                className="
      grid gap-2 sm:gap-3
      grid-cols-[repeat(auto-fit,minmax(110px,1fr))]
      sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]
      items-stretch
      pb-2
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
        </div>
      </div>
    </section>
  );
}
