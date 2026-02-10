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
      className={`flex size-16 items-center justify-center rounded-2xl bg-white shadow-lg/5 ${sub.className}`}
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
    <section
      id="tech-stack"
      className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="rounded-3xl bg-white/10 p-2 backdrop-blur-2xl">
        <div className="grid items-center gap-10 rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge>Tech Stack &amp; Tools</Badge>

              {/* Better-looking toggle group (use shadcn variant/size props) */}
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(v) => {
                  if (v === "logo" || v === "text") setMode(v);
                }}
                variant="outline"
                size="sm"
                className={`${sub.className}`}
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
                  aria-label="Show grid "
                  className="text-primary"
                >
                  Text
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <h2
              className={`mt-4 text-3xl sm:text-4xl ${main.className} text-primary`}
            >
              Key Technologies &amp; Platforms
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-primary/70 sm:text-base">
              The tools I use most often to build clean UIs, scalable features,
              and polished experiences.
            </p>
          </div>

        
          <div>
          
            <div
              className="
      ml-auto relative w-full 
      rounded-3xl bg-slate-50 p-6
      shadow-inner
      overflow-hidden
      h-[320px] sm:h-[360px]
    "
            >
              {mode === "logo" ? (
                // Keep everything INSIDE via absolute centered wrapper
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-[320px] rotate-90">
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
                <TooltipProvider delayDuration={150}>
                  <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] items-stretch">
                    {TECH_LOGOS.map((logo) => (
                      <Tooltip key={logo.slug}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={logo.name}
                            className="w-full text-left"
                          >
                            <TextPill label={logo.name} />
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
                    ))}
                  </div>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
