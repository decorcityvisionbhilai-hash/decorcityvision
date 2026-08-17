"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin, Clock, Navigation, PhoneCall } from "lucide-react";
import {
  contact as staticContact,
  servicesV2 as staticServices,
  serviceCatalog as staticCatalog,
  budgetConfig as staticBudget,
  formatBudget,
} from "@/lib/data";
import LocationMap from "./LocationMap";

type Service = { title: string; titleHi: string };
type ServiceCategory = { category: string; items: readonly string[] };
type Budget = { min: number; max: number; step: number; default: number };

export default function InquiryV2({
  contact,
  services,
  catalog,
  budget,
}: {
  contact?: Partial<typeof staticContact> | null;
  /** From Sanity's `service` documents — falls back to the static list when empty/unset. */
  services?: Service[] | null;
  /** From Sanity's `serviceCategory` documents — falls back to the static catalog when empty/unset. */
  catalog?: ServiceCategory[] | null;
  budget?: Budget | null;
}) {
  const resolvedContact = { ...staticContact, ...contact };
  const resolvedServices = services && services.length > 0 ? services : staticServices;
  const resolvedCatalog = catalog && catalog.length > 0 ? catalog : staticCatalog;
  const resolvedBudget = budget ?? staticBudget;

  const mapQuery = encodeURIComponent(resolvedContact.address);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>(resolvedServices[0].title);
  const [budgetValue, setBudgetValue] = useState(resolvedBudget.default);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = [
      `Namaste, mera naam ${name} hai.`,
      `Mujhe ${service} ke baare mein jaankari chahiye.`,
      `Mera budget lagbhag ${formatBudget(budgetValue)} hai.`,
      message && `Message: ${message}`,
      `Mera number: ${phone}`,
    ]
      .filter(Boolean)
      .join(" ");

    const whatsappNumber = resolvedContact.phones[0].replace(/\D/g, "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="inquiry" className="py-16 md:py-24 bg-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Free Consultation
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Apna Sawaal, <span className="italic text-clayText">Humein Bhejein.</span>
          </h2>
          <p className="text-ink/70 mt-4">
            Form bharein, hum WhatsApp par turant reply karenge.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Location column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <div className="relative min-h-[320px] flex-1">
              <iframe
                src={resolvedContact.mapEmbedUrl}
                title="Decorcity Vision — Bhilai studio location on Google Maps"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="space-y-3 p-6">
              <p className="flex items-start gap-2.5 text-sm text-ink/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-clayText" />
                {resolvedContact.address}
              </p>
              <p className="flex items-center gap-2.5 text-sm text-ink/70">
                <Clock size={16} className="shrink-0 text-clayText" />
                {resolvedContact.hours.days} · {resolvedContact.hours.open} – {resolvedContact.hours.close}
              </p>
              <p className="flex items-center gap-2.5 text-sm text-ink/70">
                <PhoneCall size={16} className="shrink-0 text-clayText" />
                {resolvedContact.callAvailability}
              </p>
              <p className="text-xs text-ink/70">
                Bhilai, Durg, Rajnandgaon aur Raipur — sabhi jagah service available.
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
              >
                <Navigation size={16} /> Directions Lein
              </a>

              <div className="flex flex-col items-start gap-3 border-t border-ink/10 pt-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <LocationMap location="Kerala Studio" accent="moss" comingSoon />
                </div>
                <p className="min-w-0 text-xs text-ink/70">
                  Kerala mein hamara poora studio jald hi shuru ho raha hai.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-name" className="block text-sm font-medium text-ink/70 mb-2">
                  Aapka Naam
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Naam likhein"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-clay bg-cream/40"
                />
              </div>
              <div>
                <label htmlFor="inquiry-phone" className="block text-sm font-medium text-ink/70 mb-2">
                  Phone Number
                </label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit number"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-clay bg-cream/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiry-service" className="block text-sm font-medium text-ink/70 mb-2">
                Kaunsi Service Chahiye
              </label>
              <select
                id="inquiry-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-clay bg-cream/40"
              >
                <optgroup label="General Services">
                  {resolvedServices.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title} / {s.titleHi}
                    </option>
                  ))}
                </optgroup>
                {resolvedCatalog.map((cat) => (
                  <optgroup key={cat.category} label={cat.category}>
                    {cat.items.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-ink/70">
                  Aapka Budget
                </label>
                <span className="font-display text-clayText text-lg">
                  {formatBudget(budgetValue)}
                </span>
              </div>
              <input
                type="range"
                min={resolvedBudget.min}
                max={resolvedBudget.max}
                step={resolvedBudget.step}
                value={budgetValue}
                onChange={(e) => setBudgetValue(Number(e.target.value))}
                aria-label="Apna budget chunein"
                className="w-full h-2 rounded-full accent-clay cursor-pointer"
              />
              <div className="flex justify-between text-ink/70 text-xs mt-1">
                <span>{formatBudget(resolvedBudget.min)}</span>
                <span>{formatBudget(resolvedBudget.max)}</span>
              </div>
            </div>

            <div>
              <label htmlFor="inquiry-message" className="block text-sm font-medium text-ink/70 mb-2">
                Message (optional)
              </label>
              <textarea
                id="inquiry-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kuch aur batana ho to yahan likhein"
                rows={3}
                className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-clay bg-cream/40 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-95 text-ink font-medium px-6 py-4 rounded-full transition"
              >
                <MessageCircle size={18} /> WhatsApp Par Bhejein
              </button>
              <a
                href={`tel:${resolvedContact.phones[0].replace(/\s/g, "")}`}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-ink/20 hover:border-ink/40 font-medium px-6 py-4 rounded-full transition-colors"
              >
                <Phone size={18} /> Seedha Call Karein
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
