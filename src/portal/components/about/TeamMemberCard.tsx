import Link from "next/link";
import { Mail, Twitter, Instagram, Linkedin } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  slug?: string;
  socials?: {
    email?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const profileHref = member.slug ? `/about-us/team/${member.slug}` : undefined;

  const ImageWrapper = ({ children }: { children: React.ReactNode }) =>
    profileHref ? (
      <Link href={profileHref} className="block">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <div className="flex flex-col w-full">
      {/* Square image — fills full card width */}
      <div className="w-full aspect-square overflow-hidden rounded-xl mb-4">
        <ImageWrapper>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </ImageWrapper>
      </div>
      <h3 className="font-antigua text-3xl sm:text-4xl font-black leading-tight" style={{ color: "#000" }}>
        {profileHref ? (
          <Link href={profileHref} className="hover:text-gold transition-colors">
            {member.name}
          </Link>
        ) : (
          member.name
        )}
      </h3>
      <p className="text-lg font-semibold mt-2 mb-5" style={{ color: "#222" }}>
        {member.role}
      </p>
      <div className="flex items-center gap-3">
        {[
          {
            href: member.socials?.email ? `mailto:${member.socials.email}` : null,
            Icon: Mail,
            label: "Email",
            activeClass: "bg-[#fff9e6] text-[#c28710] hover:bg-[#d0a439] hover:text-white",
            inactiveClass: "bg-[#f5f5f5] text-[#a1a1aa] cursor-not-allowed",
          },
          {
            href: member.socials?.twitter ?? null,
            Icon: Twitter,
            label: "X",
            activeClass: "bg-[#e8f7ff] text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white",
            inactiveClass: "bg-[#f5f5f5] text-[#a1a1aa] cursor-not-allowed",
          },
          {
            href: member.socials?.instagram ?? null,
            Icon: Instagram,
            label: "Instagram",
            activeClass: "bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-90",
            inactiveClass: "bg-[#f5f5f5] text-[#a1a1aa] cursor-not-allowed",
          },
          {
            href: member.socials?.linkedin ?? null,
            Icon: Linkedin,
            label: "LinkedIn",
            activeClass: "bg-[#e8f4f9] text-[#0077b5] hover:bg-[#0077b5] hover:text-white",
            inactiveClass: "bg-[#f5f5f5] text-[#a1a1aa] cursor-not-allowed",
          },
        ].map(({ href, Icon, label, activeClass, inactiveClass }) =>
          href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={`${label} ${member.name}`}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ddd] shadow-sm transition ${activeClass}`}
            >
              <Icon size={24} />
            </a>
          ) : (
            <span
              key={label}
              aria-label={`${label} not available`}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ddd] shadow-sm ${inactiveClass}`}
            >
              <Icon size={24} />
            </span>
          )
        )}
      </div>
    </div>
  );
}
