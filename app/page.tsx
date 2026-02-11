import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden mx-2  ">
      <Hero />
      <div className="rounded-3xl  space-y-6 p-2  sm:p-4  relative mx-auto max-w-6xl ">
        <About />
      </div>
      <div className="rounded-3xl bg-white/5 border border-white/10 space-y-6 p-2  sm:p-4  relative mx-auto max-w-6xl ">
        <Skills />
      </div>

      <div className="rounded-3xl bg-white/5  border border-white/10 space-y-6 p-2 mt-6 sm:p-4  relative mx-auto max-w-6xl ">
        <Projects />
      </div>
      <Education />
      <Contact />
    </div>
  );
}
