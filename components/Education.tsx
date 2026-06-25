// components/Education.tsx
"use client";

import * as React from "react";
import { main } from "@/font/font";
import { EDUCATION, TRAININGS, OTHER_SKILLS } from "@/data/portfolio.data";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

export default function Education() {
  const [active, setActive] = React.useState(1);

  return (
    <section className="relative mx-auto mt-6 max-w-6xl ">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Education */}
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
          <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
            Education
          </h2>

          <div className="mt-6">
            <Stepper
              value={active}
              onValueChange={setActive}
              orientation="vertical"
              className="w-full"
            >
              {EDUCATION.map((e, idx) => {
                const step = idx + 1;
                const isLast = idx === EDUCATION.length - 1;

                return (
                  <StepperItem
                    key={e.title}
                    step={step}
                    className="w-full items-start gap-4"
                  >
                    <StepperTrigger className="w-full items-start gap-4">
                      <div className="flex flex-col items-center">
                        <StepperIndicator className="bg-white/5 text-white/70 data-[state=active]:bg-white/15 data-[state=completed]:bg-white/15 data-[state=active]:text-white data-[state=completed]:text-white" />
                        {!isLast && (
                          <StepperSeparator className="mt-2 h-10 w-px bg-white/10 group-data-[state=completed]/step:bg-white/30" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <StepperTitle className="text-sm font-semibold text-white">
                          {e.title}
                        </StepperTitle>
                        <p className="mt-1 text-xs text-white/50">{e.meta}</p>
                        {e.note ? (
                          <StepperDescription className="mt-2 text-sm text-white/70">
                            {e.note}
                          </StepperDescription>
                        ) : null}
                      </div>
                    </StepperTrigger>
                  </StepperItem>
                );
              })}
            </Stepper>
          </div>
        </div>

        {/* Right column: Trainings + Other skills */}
        <div className="space-y-4">
          {/* Trainings */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
            <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
              Trainings & seminars
            </h2>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {TRAININGS.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Other skills (new) */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
            <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
              Other skills
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {OTHER_SKILLS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Graphic design & multimedia: brand-aligned layouts, vector assets,
              and polished short-form edits using Canva, Illustrator, and
              CapCut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
