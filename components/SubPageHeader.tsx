import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function SubPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="bg-ink text-cream pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
          >
            <ArrowLeft size={16} /> Home
          </Link>
          <Image src="/logo-mark.png" alt="Decorcity Vision" width={56} height={56} className="h-12 w-12" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold/80">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-sm text-cream/65 md:text-base">{description}</p>
        )}
      </div>
    </div>
  );
}
