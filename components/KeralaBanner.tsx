"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Palmtree, MessageCircle } from "lucide-react";
import { contact as staticContact } from "@/lib/data";

export default function KeralaBanner({ whatsapp }: { whatsapp?: string }) {
  return (
    <section className="relative overflow-hidden bg-moss py-14 md:py-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1800&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-moss/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 text-center text-cream"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
          <Palmtree size={14} /> Coming Soon
        </span>
        <h2 className="font-display text-2xl md:text-4xl leading-tight">
          Bhilai Ke Baad, <span className="italic text-gold">Ab Kerala Ki Baari.</span>
        </h2>
        <p className="max-w-lg text-sm text-cream/80 md:text-base">
          Wahi bharosa, wahi kaam — jald hi Kerala mein bhi hamara poora studio
          shuru ho raha hai.
        </p>
        <a
          href={whatsapp ?? staticContact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
        >
          <MessageCircle size={17} /> Sabse Pehle Jaankari Paayein
        </a>
      </motion.div>
    </section>
  );
}
