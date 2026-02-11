import AnimatedTestimonialsDemo from "@/components/ProjectCard";
import { main, sub } from "@/font/font";
import { Badge } from "./ui/badge";

export default function Projects() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 text-center  pb-12">
      <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
        Projects
      </h2>
      <p className={`mt-2 text-sm text-white/60 ${sub.className}`}>
        Real-world apps I’ve built—focused on clean UI, solid UX, and
        production-ready workflows.
      </p>

      <div className="my-8 flex gap-2 font-bold items-center justify-center">
          <Badge variant={"custom"}>Full Stack Websites</Badge>
          <Badge variant={"custom"}>UI/UX</Badge>
        </div>

      <div className="mt-12 ">
        
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
}
