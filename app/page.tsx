import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { OnThisPage } from "@/components/OnThisPage";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden mx-2  ">
      <OnThisPage />
      <div id="hero">
        <Hero />
      </div>
      <div id="about" className="rounded-3xl  space-y-6 p-2  sm:p-4  relative mx-auto max-w-6xl ">
        <About />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills" className="rounded-3xl bg-white/5 border border-white/10 space-y-6 p-2  sm:p-4  relative mx-auto max-w-6xl ">
        <Skills />
      </div>

      <div id="projects" className="rounded-3xl bg-white/5  border border-white/10 space-y-6 p-2 mt-6 sm:p-4  relative mx-auto max-w-6xl ">
        <Projects />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
