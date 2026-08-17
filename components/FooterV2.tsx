import Image from "next/image";
import { MapPin, Mail, Phone, Clock, PhoneCall } from "lucide-react";
import {
  contact as staticContact,
  developerCreditPrefix as staticCreditPrefix,
  developerCreditName as staticCreditName,
  developerCreditUrl as staticCreditUrl,
} from "@/lib/data";
import SocialLinks from "./SocialLinks";

export default function FooterV2({
  contact,
  youtubeChannelUrl,
  developerCreditPrefix,
  developerCreditName,
  developerCreditUrl,
}: {
  /** From Sanity's `siteSettings` singleton — falls back to the static contact info when unset. */
  contact?: Partial<typeof staticContact> | null;
  youtubeChannelUrl?: string | null;
  developerCreditPrefix?: string | null;
  developerCreditName?: string | null;
  developerCreditUrl?: string | null;
}) {
  const resolvedContact = { ...staticContact, ...contact };
  const resolvedCreditPrefix = developerCreditPrefix ?? staticCreditPrefix;
  const resolvedCreditName = developerCreditName ?? staticCreditName;
  const resolvedCreditUrl = developerCreditUrl ?? staticCreditUrl;

  return (
    <footer className="bg-ink text-cream/80 pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-cream/10">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo-mark.png" alt="" width={72} height={72} className="h-16 w-16" />
              <p className="font-display text-3xl text-cream">
                Decorcity<span className="italic text-gold"> Vision</span>
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              We believe in creating a smart and efficient living environment for you.
              We endeavor to give our clients the satisfaction that they deserve. Proudly
              serving Bhilai, Durg, Rajnandgaon, Raipur and now Kerala.
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-cream/70">
              <Clock size={14} className="text-gold shrink-0" />
              {resolvedContact.hours.days} · {resolvedContact.hours.open} – {resolvedContact.hours.close}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-cream/70">
              <PhoneCall size={14} className="text-gold shrink-0" />
              {resolvedContact.callAvailability}
            </p>
            <SocialLinks
              instagram={resolvedContact.socialLinks?.instagram}
              facebook={resolvedContact.socialLinks?.facebook}
              youtube={youtubeChannelUrl}
              className="mt-6"
            />
            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/ISO_1009.png"
                alt="ISO 9001:2015 Certified Quality Management System"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <Image
                src="/IAF.png"
                alt="IAF — International Accreditation Forum"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gold/80 mb-4">
              Our Company
            </p>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-cream transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors">Services</a></li>
              <li><a href="/services" className="hover:text-cream transition-colors">All Services</a></li>
              <li><a href="#projects" className="hover:text-cream transition-colors">Projects</a></li>
              <li><a href="/portfolio" className="hover:text-cream transition-colors">All Projects</a></li>
              <li><a href="#gallery" className="hover:text-cream transition-colors">Photo Gallery</a></li>
              <li><a href="/careers" className="hover:text-cream transition-colors">Careers</a></li>
              <li><a href="#inquiry" className="hover:text-cream transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gold/80 mb-4">
              Get in Touch
            </p>
            <ul className="space-y-3 text-sm">
              {resolvedContact.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone size={13} className="text-gold shrink-0" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-cream transition-colors">
                    {p}
                  </a>
                </li>
              ))}
              {resolvedContact.emails.map((e) => (
                <li key={e} className="flex items-center gap-2">
                  <Mail size={13} className="text-gold shrink-0" />
                  <a href={`mailto:${e}`} className="hover:text-cream transition-colors break-all">
                    {e}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                <span>{resolvedContact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/50">
          <p>Copyright © {new Date().getFullYear()} Decorcity Vision. All rights reserved.</p>
          <p>
            {resolvedCreditPrefix}{" "}
            <a
              href={resolvedCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/30 underline-offset-2 transition-colors hover:text-cream hover:decoration-cream/60"
            >
              {resolvedCreditName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
