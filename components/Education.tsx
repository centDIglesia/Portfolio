// components/Education.tsx
import { main, sub } from "@/font/font";

const EDUCATION = [
  {
    title:
      "Polytechnic University of the Philippines — Santa Maria, Bulacan Campus",
    meta: "BS Information Technology • 2022–Present",
    note: "President’s Lister (1st Year to 3rd Year, 1st sem).",
  },
  {
    title: "Immaculate Conception Polytechnic",
    meta: "Senior High (ICT) • 2020–2022",
    note: "With High Honors.",
  },
  {
    title: "Catmon National High School — Catmon, Santa Maria, Bulacan",
    meta: "Junior High • 2016–2020",
    note: "With High Honors.",
  },
  {
    title: "Jose Juan Serapio Elementary School",
    meta: "Elementary • 2014–2016",
    note: "",
  },
];

const TRAININGS = [
  "Know Your Enemy: A Fundamental Guide to Cybersecurity (Nov 28, 2025)",
  "ISKOLARIUM'S MAGSUSULAT AT MAGMUMULAT: A JOURNALIST'S BATTLECRY (Mar 30, 2023)",
];

export default function Education() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
          <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
            Education
          </h2>

          <div className="mt-6 space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.title} className="border-l border-white/10 pl-4">
                <p className="text-sm font-semibold text-white">{e.title}</p>
                <p className="mt-1 text-xs text-white/50">{e.meta}</p>
                {e.note ? (
                  <p className="mt-2 text-sm text-white/70">{e.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/3 p-8">
          <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
            Trainings & seminars
          </h2>

          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {TRAININGS.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.75 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
