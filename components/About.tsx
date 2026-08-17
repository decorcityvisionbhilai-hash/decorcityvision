"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, PhoneCall } from "lucide-react";
import { gallery as staticGallery, contact as staticContact, type GalleryItem } from "@/lib/data";

export default function About({
  image,
  whatsapp,
  callAvailability,
}: {
  /** From Sanity's `galleryImage` documents (4th item) — falls back to the static gallery. */
  image?: GalleryItem | null;
  whatsapp?: string;
  callAvailability?: string;
}) {
  const resolvedImage = image ?? staticGallery[3];

  return (
    <section id="about-us" className="bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Hamare Baare Mein
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            2011 Se, <span className="italic text-clayText">Ek Hi Mission.</span>
          </h2>
          <p className="mt-5 text-sm md:text-base text-ink/70 leading-relaxed">
            2011 se Decorcity Vision, Bhilai, Durg, Rajnandgaon aur Raipur ke
            ghar aur offices ko smart aur khoobsurat spaces mein badal raha hai. Hamari
            team har project mein khud site pe involved rehti hai — pehle 3D
            design se lekar final handover tak — taaki aapki vision aur
            finished room ke beech kuch miss na ho.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-2 text-xs font-medium text-clayText">
              <ShieldCheck size={14} /> 10-Year Warranty
            </span>
            <div className="flex items-center gap-3">
              <Image
                src="/ISO_1009.png"
                alt="ISO 9001:2015 Certified Quality Management System"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <Image
                src="/IAF.png"
                alt="IAF — International Accreditation Forum"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink/40"
            >
              Hamara Kaam Dekhein <ArrowRight size={15} />
            </a>
            <a
              href={whatsapp ?? staticContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
            >
              <MessageCircle size={17} /> WhatsApp Karein
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs font-medium text-ink/70">
            <PhoneCall size={13} className="text-clayText shrink-0" /> {callAvailability ?? staticContact.callAvailability} — kabhi bhi call karein
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image src={resolvedImage.image} alt={resolvedImage.title} fill className="object-cover" />
          </div>

          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-lg sm:-left-10">
            <p className="font-display text-3xl text-clayText">15+</p>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/70">
              Years of Experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
