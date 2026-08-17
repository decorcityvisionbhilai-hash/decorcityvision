"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Images } from "lucide-react";
import { contact as staticContact } from "@/lib/data";

export default function StickyCTA({
  whatsapp,
  phone,
}: {
  whatsapp?: string;
  phone?: string;
}) {
  const resolvedWhatsapp = whatsapp ?? staticContact.whatsapp;
  const resolvedPhone = phone ?? staticContact.phones[0];

  return (
    <>
      {/* Floating WhatsApp button — always on screen, huge tap target, desktop + mobile */}
      <motion.a
        href={resolvedWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-24 md:bottom-8 right-5 z-50 w-16 h-16 rounded-full bg-[#25D366] shadow-2xl shadow-black/30 flex items-center justify-center text-ink"
        aria-label="WhatsApp Karein"
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full bg-[#25D366]"
          style={{ zIndex: -1 }}
        />
        <MessageCircle size={28} />
      </motion.a>

      {/* Fixed bottom nav on mobile — icon-first, 3 big obvious choices, no menus to figure out */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ink/95 backdrop-blur border-t border-white/10 flex items-stretch">
        <a
          href={`tel:${resolvedPhone.replace(/\s/g, "")}`}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/90"
        >
          <Phone size={20} />
          <span className="text-[11px]">Call Karein</span>
        </a>
        <a
          href="/#gallery"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/90 border-x border-white/10"
        >
          <Images size={20} />
          <span className="text-[11px]">Kaam Dekhein</span>
        </a>
        <a
          href={resolvedWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[#25D366]"
        >
          <MessageCircle size={20} />
          <span className="text-[11px]">WhatsApp</span>
        </a>
      </div>
    </>
  );
}
