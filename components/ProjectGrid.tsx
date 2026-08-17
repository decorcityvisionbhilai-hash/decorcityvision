"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Maximize2, MessageCircle } from "lucide-react";
import { gallery as staticGallery, contact as staticContact, type GalleryItem } from "@/lib/data";
import Lightbox from "./Lightbox";

export default function ProjectGrid({
  items,
  whatsapp,
}: {
  /** From Sanity's `galleryImage` documents — falls back to the static gallery when empty/unset. */
  items?: GalleryItem[] | null;
  whatsapp?: string;
}) {
  const resolvedGallery = items && items.length > 0 ? items : staticGallery;
  const categories = ["All", ...Array.from(new Set(resolvedGallery.map((g) => g.category)))];

  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    active === "All" ? resolvedGallery : resolvedGallery.filter((g) => g.category === active);

  return (
    <section id="gallery" className="pt-16 md:pt-24 pb-12 md:pb-16 bg-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-10">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Photo Gallery
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Ek Click Mein <span className="italic text-clayText">Sab Dekhein</span>
          </h2>
        </div>

        {/* big, tappable category pills — icons over text where possible */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-3 rounded-full text-sm md:text-base font-medium border-2 transition-colors ${
                active === c
                  ? "bg-ink text-cream border-ink"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {filtered.map((item, i) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-square rounded-2xl overflow-hidden text-left"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-active:scale-95 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Maximize2
                  size={22}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute bottom-2 left-2 right-2 text-white text-xs md:text-sm bg-black/50 rounded-lg px-2 py-1 backdrop-blur-sm">
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-ink/70 text-sm mt-8">
          Photo pe click karein, bada karke dekhein
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Aisa Hi Kaam Chahiye
          </a>
        </div>
      </div>

      <Lightbox
        items={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
        }
        onNext={() =>
          setOpenIndex((i) => (i === null ? null : (i + 1) % filtered.length))
        }
      />
    </section>
  );
}
