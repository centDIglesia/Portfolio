import { main, sub } from "@/app/layout";
import DynamicBlurImage from "@/components/ui/DynamicBlurImage";
import { Badge } from "@/components/ui/badge";
import me from "@/public/me.jpg";
import { Palette } from "lucide-react";
import Image from "next/image";
import code from "@/icons/coded.svg"
import design from "@/icons/design.svg";


export default function About() {
  const tags = [
    "22 yrs old.",
    "Santa Maria, Bulacan",
    "BSIT • PUP Santa Maria",
    "President’s Lister",
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="rounded-3xl bg-white/10 p-2 backdrop-blur-2xl">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8 md:flex-row md:items-center md:gap-10">
          {/* Image */}
          <div className="relative mx-auto shrink-0 isolate md:mx-0">
            {/* Floating square (top-right) */}
            <div className="absolute -right-2 top-6 z-20 rotate-4 -translate-y-2 translate-x-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-lg backdrop-blur sm:size-14">
                <Image
                  src={code}
                  alt="Code"
                  width={32}
                  height={32}
                  className="fill-primary"
                  priority={false}
                />
              </div>
            </div>

            {/* Floating square (left) */}
            <div className="absolute -left-7 top-36 z-20 -rotate-8 -translate-y-2 translate-x-2">
              <div className="flex size-14 items-center justify-center rounded-xl bg-white shadow-lg backdrop-blur sm:size-16">
                <Image
                  src={design}
                  alt="design"
                  width={36}
                  height={36}
                  className="fill-primary"
                  priority={false}
                />
              </div>
            </div>

            {/* Glow UNDER */}
            <div className="absolute inset-x-0 -bottom-10 -z-10 mx-auto size-44 rounded-full bg-primary blur-3xl sm:size-52" />

            {/* Photo card */}
            <div className="relative z-10 h-56 w-44 overflow-hidden rounded-xl border border-black/10 -rotate-3 transition-transform duration-200 ease-in-out hover:rotate-0 sm:h-60 sm:w-52">
              <DynamicBlurImage
                src={me}
                alt="Portrait photo"
                fill
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 208px"
                className="object-cover grayscale transition duration-300 ease-in hover:grayscale-0"
              />
            </div>
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h2
              className={`text-2xl font-medium sm:text-3xl ${main.className} text-primary`}
            >
              About me
            </h2>

            <p
              className={`mt-3 max-w-3xl text-sm leading-6 text-primary/70 sm:text-base ${sub.className}`}
            >
              I’m a B.S. Information Technology student and full-stack web
              developer who enjoys turning ideas into polished, responsive
              interfaces. Outside of coding, I work as a layout/Graphic
              artist—bringing strong visual structure and detail to every design
            </p>

            <div className={`mt-4 flex flex-wrap gap-2 ${sub.className}`}>
              {tags.map((tag) => (
                <Badge key={tag} className="p-1 px-2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
