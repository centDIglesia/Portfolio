import { main } from "@/app/layout";
import { TECH_LOGOS } from "@/data/skills.data";

import Image from "next/image";
import { Badge } from "./ui/badge";

export default function Skills() {
  return (
    <section
      id="tech-stack"
      className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
     
      <div className="rounded-3xl bg-white/10 p-2 backdrop-blur-2xl">
       
        <div className="grid items-center gap-10 rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8 lg:grid-cols-2">
        
          <div>
            <Badge>Tech Stack & Tools</Badge>

            <h2
              className={`mt-4 text-3xl sm:text-4xl ${main.className} text-primary`}
            >
              Key Technologies & Platforms
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-primary/70 sm:text-base">
              The tools I use most often to build clean UIs, scalable features,
              and polished experiences.
            </p>
          </div>

          {/* Right card with logos */}
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-primary blur-3xl opacity-30" />

            <div className="mx-auto w-full max-w-md rounded-3xl  bg-slate-50 p-6 backdrop-blur">
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
                {TECH_LOGOS.map((logo) => (
                  <div
                    key={logo.slug}
                    className="flex aspect-square items-center justify-center rounded-2xl bg-white drop-shadow-xl/5"
                    title={logo.name}
                  >
                    <Image
                      alt={logo.name}
                      src={`https://cdn.simpleicons.org/${logo.slug}?viewbox=auto`}
                      width={28}
                      height={28}
                      className="opacity-100 "
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
