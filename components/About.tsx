// components/About.tsx
import { main } from "@/app/layout";
import DynamicBlurImage from "@/components/ui/DynamicBlurImage";
import me from "@/public/me.jpg";

export default function About() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8 sm:p-10 flex gap-2">
              
               <div className="shrink-0">
            <div className="relative h-38 w-38 overflow-hidden rounded-2xl border border-white/10 sm:h-32 sm:w-32">
              <DynamicBlurImage
                src={me}
                alt="Portrait photo"
                fill
                sizes="(max-width: 640px) 112px, 158px"
                className="object-cover"
              />
            </div>
          </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
              About me
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
              Dedicated B.S. Information Technology student seeking an
              internship opportunity to apply my technical skills and academic
              background in a professional environment while gaining hands-on
              industry experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Santa Maria, Bulacan",
                "BSIT • PUP Santa Maria",
                "President’s Lister",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}
