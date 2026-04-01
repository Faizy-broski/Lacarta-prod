import { Mail, Twitter, Instagram, Linkedin } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
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
  return (
    <div className="flex flex-col w-full">
      {/* Square image — fills full card width */}
      <div className="w-full aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <h3 className="font-antigua text-xl sm:text-2xl font-black" style={{ color: "#000" }}>
        {member.name}
      </h3>
      <p className="text-sm mt-0.5 mb-3" style={{ color: "#555" }}>
        {member.role}
      </p>
      {member.socials && (
        <div className="flex items-center gap-3">
          {member.socials.email && (
            <a
              href={`mailto:${member.socials.email}`}
              aria-label={`Email ${member.name}`}
              className="hover:text-gold transition-colors"
              style={{ color: "#000" }}
            >
              <Mail size={18} />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on X`}
              className="hover:text-gold transition-colors"
              style={{ color: "#000" }}
            >
              <Twitter size={18} />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="hover:text-gold transition-colors"
              style={{ color: "#000" }}
            >
              <Instagram size={18} />
            </a>
          )}
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="hover:text-gold transition-colors"
              style={{ color: "#000" }}
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
