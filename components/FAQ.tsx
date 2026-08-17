"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { contact as staticContact, faqs as staticFaqs } from "@/lib/data";

export default function FAQ({
  faqs,
  whatsapp,
}: {
  /** From Sanity's `faq` documents — falls back to the static list when empty/unset. */
  faqs?: { q: string; a: string }[] | null;
  whatsapp?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const resolvedFaqs = faqs && faqs.length > 0 ? faqs : staticFaqs;

  return (
    <section className="py-16 md:py-24 bg-sand">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">FAQs</p>
        <h2 className="font-display text-3xl md:text-5xl">
          Aapke <span className="italic text-clayText">Sawaal.</span>
        </h2>

        <div className="mt-10 space-y-3 text-left">
          {resolvedFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-clayText"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-sm text-ink/70 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Aur Sawaal Poochein
          </a>
        </div>
      </div>
    </section>
  );
}
