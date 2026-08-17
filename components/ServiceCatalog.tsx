"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { serviceCatalog as staticCatalog, contact as staticContact } from "@/lib/data";

const swatchClasses: Record<string, string> = {
  clay: "bg-clay",
  gold: "bg-gold",
  moss: "bg-moss",
};

const dotClasses: Record<string, string> = {
  clay: "bg-clay/50",
  gold: "bg-gold/60",
  moss: "bg-moss/50",
};

type ServiceCategory = { category: string; swatch: string; items: readonly string[] };

export default function ServiceCatalog({
  catalog,
  whatsapp,
}: {
  /** From Sanity's `serviceCategory` documents — falls back to the static catalog when empty/unset. */
  catalog?: ServiceCategory[] | null;
  whatsapp?: string;
}) {
  const resolvedCatalog = catalog && catalog.length > 0 ? catalog : staticCatalog;

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-6 lg:grid-cols-2">
          {resolvedCatalog.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className={`h-1.5 w-full ${swatchClasses[cat.swatch]}`} />
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl mb-5">{cat.category}</h3>
                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-ink/70 leading-relaxed"
                    >
                      <span
                        className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${dotClasses[cat.swatch]}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Apni Zaroorat Batayein
          </a>
        </div>
      </div>
    </section>
  );
}
