import { Instagram, Facebook, Youtube } from "lucide-react";

export default function SocialLinks({
  instagram,
  facebook,
  youtube,
  className = "",
}: {
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  className?: string;
}) {
  const links = [
    { href: instagram, label: "Instagram", Icon: Instagram },
    { href: facebook, label: "Facebook", Icon: Facebook },
    { href: youtube, label: "YouTube", Icon: Youtube },
  ].filter((link) => !!link.href);

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-gold hover:text-gold"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}
