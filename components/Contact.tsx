// components/Contact.tsx
import { main } from "@/font/font";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <h2 className={`text-2xl sm:text-3xl ${main.className} text-white`}>
          Let’s work together
        </h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          I’m currently looking for an internship opportunity and open to
          collaboration.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="mailto:vincent.iglesia07@gmail.com"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Email me
          </Link>
          <Link
            href="tel:+639203341360"
            className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.07]"
          >
            Call: +63 920 334 1360
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/50">
          Santa Maria, Bulacan • Available for internship
        </p>
      </div>
    </section>
  );
}
