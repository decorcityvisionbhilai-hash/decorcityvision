"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Home,
  Star,
  History,
  IndianRupee,
  Palmtree,
  MessageCircle,
  ShieldCheck,
  Award,
  PhoneCall,
} from "lucide-react";
import { trustPoints as staticTrustPoints, contact as staticContact } from "@/lib/data";

const trustIcons: Record<string, typeof Home> = {
  home: Home,
  star: Star,
  history: History,
  rupee: IndianRupee,
  palmtree: Palmtree,
  "shield-check": ShieldCheck,
  award: Award,
  "phone-call": PhoneCall,
};

type TrustPoint = { icon: string; label: string };

export default function AboutBanner({
  trustPoints,
  contact,
}: {
  /** From Sanity's `trustPoint` documents — falls back to the static list when empty/unset. */
  trustPoints?: TrustPoint[] | null;
  contact?: Partial<typeof staticContact> | null;
}) {
  const resolvedTrustPoints = trustPoints && trustPoints.length > 0 ? trustPoints : staticTrustPoints;
  const resolvedContact = { ...staticContact, ...contact };
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} id="about" className="grain relative py-20 md:py-28 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1800&auto=format&fit=crop"
          alt="Decorcity Vision studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-white text-3xl md:text-5xl leading-tight"
        >
          2011 Se Bhilai, Durg, Rajnandgaon Aur Raipur Mein, <span className="italic text-gold">Bharose Ke Saath.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-cream/70 text-sm md:text-base max-w-xl mx-auto"
        >
          Hamari team khud site pe involved rehti hai — cooperative staff,
          custom design, aur transparency har stage par.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {resolvedTrustPoints.map((t) => {
            const Icon = trustIcons[t.icon];
            return (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <Icon size={22} strokeWidth={1.25} className="text-gold" />
                <p className="text-white text-sm md:text-base font-medium">
                  {t.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 text-cream/70 text-sm border-t border-cream/10 pt-8"
        >
          <span className="flex items-center gap-2">
            <Clock size={15} className="text-gold" />
            {resolvedContact.hours.days} · {resolvedContact.hours.open} – {resolvedContact.hours.close}
          </span>
          <span className="hidden sm:inline text-cream/30">|</span>
          <span className="flex items-center gap-2">
            <PhoneCall size={15} className="text-gold" />
            {resolvedContact.callAvailability}
          </span>
          <span className="hidden sm:inline text-cream/30">|</span>
          <span className="flex items-center gap-2 text-center">
            <MapPin size={15} className="text-gold shrink-0" />
            {resolvedContact.address}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={resolvedContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> WhatsApp Karein
          </a>
        </motion.div>
      </div>
    </section>
  );
}
