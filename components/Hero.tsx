
import { main, sub } from "@/font/font";

export default function Hero() {
  return (
    <section className={`relative overflow-hidden `}>
      <div className="relative mx-auto flex min-h-100 max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div
          className={`text-xs size-12 flex justify-center items-center shrink-0 font-black tracking-tight rounded text-primary mb-12 bg-white  ${sub.className}`}
        >
          Xent.js
        </div>

        <p
          className={`text-xs font-medium tracking-wide text-white/60 ${sub.className}`}
        >
          PH-based 4th year BSIT student • PUP Santa Maria, Bulacan
        </p>

        <h1
          className={`mt-4 max-w-4xl ${main.className} text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl`}
        >
          Vincent Donaire Iglesia
        </h1>

        <p
          className={`mt-5 max-w-2xl text-sm leading-6 text-white/90 sm:text-base   ${sub.className}`}
        >
          Aspiring{" "}
          <span className="bg-white text-primary px-2 rounded font-semibold ">
            Frontend Engineer
          </span>{" "}
          and{" "}
          <span className="bg-white text-primary px-2 rounded font-semibold ">
            {" "}
            Node.js Developer
          </span>{" "}
          building modern web apps with React/Next.js, Tailwind, and MongoDB.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {["React.js", "Next.js", "TypeScript", "Node.js", "PHP"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white/70"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
