// components/Skills.tsx
import { main } from "@/app/layout";

const SKILLS = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "TypeScript",
    ],
  },
  { title: "Backend & Database", items: ["Node.js", "Prisma ORM", "MongoDB"] },
  { title: "Tools & Version Control", items: ["Git", "GitHub", "VS Code"] },
  {
    title: "UI/UX & Design",
    items: ["Figma", "Canva", "Photoshop", "Illustrator"],
  },
];

export default function Skills() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
            Skills
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Technologies and tools I use to build modern web apps.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-white/10 bg-white/3 p-6"
          >
            <p className="text-sm font-semibold text-white">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.75 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
