// components/Contact.tsx
import { main } from "@/font/font";
import { CONTACT } from "@/data/portfolio.data";

export default function Contact() {
  return (
    <section className="relative mx-auto max-w-6xl mt-6 mb-24">
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/90 p-6 text-center shadow-xl sm:p-10">
        <h2 className={`text-2xl sm:text-3xl ${main.className} text-primary dark:text-foreground`}>
          Let's work together
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-primary/70 dark:text-foreground/70 sm:text-base">
          I'm a fresh graduate looking for entry-level opportunities and open to
          collaboration.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto shadow-sm"
          >
            Email me
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 border border-transparent dark:border-white/10 px-6 py-3 text-sm font-semibold text-primary dark:text-foreground hover:bg-slate-200 dark:hover:bg-zinc-700 sm:w-auto transition-colors"
          >
            Call: {CONTACT.phone}
          </a>
        </div>

        <p className="mt-4 text-xs text-primary/50 dark:text-foreground/50">
          {CONTACT.location} • {CONTACT.status}
        </p>
      </div>
    </section>
  );
}
