// components/Contact.tsx
import { main } from "@/font/font";
import { CONTACT } from "@/data/portfolio.data";

export default function Contact() {
  return (
    <section className="relative mx-auto max-w-6xl mt-6 mb-24">
      <div className="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm sm:p-10">
        <h2 className={`text-2xl sm:text-3xl ${main.className} text-primary`}>
          Let's work together
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-primary/70 sm:text-base">
          I'm currently looking for an internship opportunity and open to
          collaboration.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 sm:w-auto"
          >
            Email me
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center rounded-lg  bg-slate-100 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-200 sm:w-auto"
          >
            Call: {CONTACT.phone}
          </a>
        </div>

        <p className="mt-4 text-xs text-primary/50">
          {CONTACT.location} • {CONTACT.status}
        </p>
      </div>
    </section>
  );
}
