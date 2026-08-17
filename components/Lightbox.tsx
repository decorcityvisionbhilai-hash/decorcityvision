"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/lib/data";

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink/95 flex flex-col items-center justify-center px-4"
        >
          <button
            onClick={onClose}
            aria-label="Band Karein"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X size={24} />
          </button>

          <button
            onClick={onPrev}
            aria-label="Pichla"
            className="absolute left-3 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={onNext}
            aria-label="Agla"
            className="absolute right-3 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight size={26} />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl aspect-[4/5] md:aspect-[16/10] rounded-2xl overflow-hidden"
          >
            <Image
              src={items[index].image}
              alt={items[index].title}
              fill
              className="object-cover"
            />
          </motion.div>

          <p className="mt-6 text-white text-lg font-display italic">
            {items[index].title}
          </p>
          <p className="text-white/50 text-sm mt-1">
            {index + 1} / {items.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
