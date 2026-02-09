// components/Projects.tsx
import { main } from "@/app/layout";
import Link from "next/link";

const PROJECTS = [
  {
    title: "DishCover AR",
    role: "Capstone Project • Full stack",
    desc: "Next.js web platform using Augmented Reality and Generative AI to create 3D models for restaurant menus.",
    href: "https://dishcoverar.online",
    tags: ["Next.js", "AR", "GenAI"],
  },
  {
    title: "YSMAEL Kitchen x Bar x Cafe Reservation",
    role: "Front-end",
    desc: "Modern UI/UX and frontend reservation system built with React and Tailwind CSS.",
    href: "https://ysmael.vercel.app",
    tags: ["React", "Tailwind", "UI/UX"],
  },
];

export default function Projects() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
        Projects
      </h2>
      <p className="mt-2 text-sm text-white/60">
        Selected work with live demos.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="rounded-3xl border border-white/10 bg-white/3 p-7"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-lg font-semibold text-white">{p.title}</p>
                <p className="mt-1 text-xs text-white/50">{p.role}</p>
              </div>

              <Link
                href={p.href}
                target="_blank"
                className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.07]"
              >
                Live demo
              </Link>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/70">{p.desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
