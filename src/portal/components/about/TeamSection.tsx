import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

export default function TeamSection({ title, members }: TeamSectionProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-antigua text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
