"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { contact as staticContact, team as staticTeam, type TeamMember } from "@/lib/data";

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`relative min-w-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-400 ${className} ${
        isDimmed ? "opacity-60" : "opacity-100"
      }`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes="(min-width: 768px) 200px, 33vw"
        className="object-cover transition-[filter] duration-500"
        style={{ filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.7) brightness(0.85)" }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`min-w-0 cursor-pointer transition-opacity duration-300 ${isDimmed ? "opacity-50" : "opacity-100"}`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={`h-3 flex-shrink-0 rounded-full bg-clay transition-all duration-300 ${
            isActive ? "w-5" : "w-4 opacity-30"
          }`}
        />
        <span
          className={`min-w-0 truncate font-display text-lg transition-colors duration-300 ${
            isActive ? "text-ink" : "text-ink/70"
          }`}
        >
          {member.name}
        </span>
      </div>
      <p className="ml-[26px] mt-1 text-sm text-ink/70">{member.role}</p>
    </div>
  );
}

function TeamShowcase({ members }: { members: TeamMember[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-8 md:flex-row md:gap-10">
      <div className="mx-auto flex w-full min-w-0 max-w-xs gap-2 sm:max-w-sm md:mx-0 md:w-[42%] md:max-w-none md:flex-shrink-0 md:gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="mt-8 flex min-w-0 flex-1 flex-col gap-2 md:mt-12 md:gap-3">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="mt-4 flex min-w-0 flex-1 flex-col gap-2 md:mt-6 md:gap-3">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
        {members.map((member) => (
          <MemberRow key={member.id} member={member} hoveredId={hoveredId} onHover={setHoveredId} />
        ))}
      </div>
    </div>
  );
}

export default function Team({
  members,
  whatsapp,
}: {
  /** From Sanity's `teamMember` documents — falls back to the static roster when empty/unset. */
  members?: TeamMember[] | null;
  whatsapp?: string;
}) {
  const resolvedMembers = members && members.length > 0 ? members : staticTeam;

  return (
    <section className="py-16 md:py-24 bg-sand">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">Hamari Team</p>
        <h2 className="font-display text-3xl md:text-5xl">
          Log Jo <span className="italic text-clayText">Kaam Karte Hain.</span>
        </h2>
        <p className="text-ink/70 mt-4 max-w-lg mx-auto">
          Design se lekar site tak — har stage par ek dedicated team aapke
          project ka poora dhyaan rakhti hai.
        </p>

        <div className="mt-14">
          <TeamShowcase members={resolvedMembers} />
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Hamari Team Se Baat Karein
          </a>
        </div>
      </div>
    </section>
  );
}
