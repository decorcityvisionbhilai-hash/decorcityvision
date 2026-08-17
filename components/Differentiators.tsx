"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cuboid, Ruler, Eye, Users, MessageCircle } from "lucide-react";
import Image from "next/image";
import { differentiators as staticDifferentiators, contact as staticContact } from "@/lib/data";

const icons: Record<string, typeof Cuboid> = {
  cuboid: Cuboid,
  ruler: Ruler,
  eye: Eye,
  users: Users,
};

type Differentiator = { icon: string; title: string; description: string };

export default function Differentiators({
  items,
  whatsapp,
}: {
  /** From Sanity's `differentiator` documents — falls back to the static list when empty/unset. */
  items?: Differentiator[] | null;
  whatsapp?: string;
}) {
  const resolvedItems = items && items.length > 0 ? items : staticDifferentiators;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(bgProgress, [0, 1], ["-8%", "8%"]);

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const ruleHeight = useTransform(trackProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="grain relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-25"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="max-w-lg">
          <p className="text-gold/50 text-xs tracking-[0.3em] uppercase mb-3">
            Log Humein Kyun Chunte Hain
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Sirf Design Nahi, <span className="italic text-gold">Bharosa.</span>
          </h2>
        </div>

        <div ref={trackRef} className="relative mt-16 pl-8 md:pl-10">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-cream/15" />
          <motion.div
            style={{ height: ruleHeight }}
            className="absolute left-0 top-1 w-px bg-gold"
          />

          <div className="flex flex-col gap-12 md:gap-14">
            {resolvedItems.map((d, i) => {
              const Icon = icons[d.icon];
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease: "easeOut" }}
                  className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-5"
                >
                  <Icon size={19} strokeWidth={1.25} className="text-gold/70" />
                  <div>
                    <h3 className="font-display text-xl md:text-2xl">{d.title}</h3>
                    <p className="text-sm text-cream/60 leading-relaxed mt-2 max-w-md">
                      {d.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex justify-start pl-8 md:pl-10">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Hamse Baat Karein
          </a>
        </div>
      </div>
    </section>
  );
}
