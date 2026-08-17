"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sofa,
  ChefHat,
  Wrench,
  Lightbulb,
  PaintBucket,
  MessageCircleQuestion,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { servicesV2 as staticServices, contact as staticContact } from "@/lib/data";

const icons: Record<string, typeof Sofa> = {
  sofa: Sofa,
  "chef-hat": ChefHat,
  wrench: Wrench,
  lightbulb: Lightbulb,
  "paint-bucket": PaintBucket,
  "message-circle-question": MessageCircleQuestion,
};

const swatchClasses: Record<string, string> = {
  clay: "bg-clay",
  gold: "bg-gold",
  moss: "bg-moss",
};

type Service = { icon: string; title: string; titleHi: string; description: string; swatch: string };

export default function ServicesV2({
  services,
  whatsapp,
}: {
  /** From Sanity's `service` documents — falls back to the static list when empty/unset. */
  services?: Service[] | null;
  whatsapp?: string;
}) {
  const resolvedServices = services && services.length > 0 ? services : staticServices;
  return (
    <section id="services" className="py-16 md:py-24 bg-sand">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Hamari Services
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Sirf Design Nahi, <span className="italic text-clayText">Poora Kaam.</span>
          </h2>
          <p className="text-ink/70 mt-4 max-w-lg mx-auto">
            Interior design ke saath plumbing, lighting aur har household kaam —
            sab ek hi jagah, ek hi team se.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resolvedServices.map((s, i) => {
            const Icon = icons[s.icon];
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: fromLeft ? -14 : 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                className="overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-sm"
              >
                <div className={`h-1.5 w-full ${swatchClasses[s.swatch]}`} />
                <div className="p-6">
                  <div className="flex items-baseline gap-2.5">
                    <Icon size={17} strokeWidth={1.25} className="text-ink/70 shrink-0" />
                    <h3 className="font-display text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed mt-3">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink/85"
          >
            Poori Service List Dekhein <ArrowRight size={15} />
          </Link>
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Apni Service Puchein
          </a>
        </div>
      </div>
    </section>
  );
}
