import { main } from "@/font/font";
import { EXPERIENCES } from "@/data/portfolio.data";

export default function Experience() {
  return (
    <section className="relative mx-auto my-6 max-w-6xl ">
      <div className="rounded-3xl border border-white/10 bg-white/3 p-12">
        <h2
          className={`text-2xl sm:text-3xl  md:text-4xl ${main.className} text-white`}
        >
          Personal Experience
        </h2>

        <div className="mt-6 space-y-8">
          {EXPERIENCES.map((exp) => (
            <div key={`${exp.company}-${exp.period}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className={`text-lg font-semibold text-white`}>
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">{exp.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-semibold text-white/80">
                    {exp.hours}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-semibold text-white/80">
                    {exp.period}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-white">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
