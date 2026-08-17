"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contact as staticContact, processSteps as staticSteps, type ProcessStep } from "@/lib/data";

export default function Process({
  steps,
  whatsapp,
}: {
  /** From Sanity's `processStep` documents — falls back to the static list when empty/unset. */
  steps?: ProcessStep[] | null;
  whatsapp?: string;
}) {
  const resolvedSteps = steps && steps.length > 0 ? steps : staticSteps;

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
          Kaise Kaam Karte Hain
        </p>
        <h2 className="font-display text-3xl md:text-5xl">
          Humara <span className="italic text-clayText">Process.</span>
        </h2>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 lg:block" />
          {resolvedSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-left"
            >
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-clay bg-cream font-display text-lg text-clayText">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Apna Project Shuru Karein
          </a>
        </div>
      </div>
    </section>
  );
}
