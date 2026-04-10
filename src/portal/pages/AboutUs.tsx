import Hero from "@public/components/listings/Hero";
import TeamSection from "@public/components/about/TeamSection";
import type { TeamMember } from "@public/components/about/TeamMemberCard";
import { fetchTeamMembers } from "@/lib/services/team.service";
import { Button } from "@public/components/ui/button";
import Link from "next/link";

export default async function AboutUs() {
  const dbMembers = await fetchTeamMembers(true);

  const teamMembers: TeamMember[] = dbMembers.map((m) => ({
    name: m.name,
    role: m.role,
    image: m.photo_url ?? '/lacarta_images/placeholder.png',
    slug: m.slug,
    socials: {
      email: m.email ?? undefined,
      twitter: m.twitter_url ?? undefined,
      instagram: m.instagram_url ?? undefined,
      linkedin: m.linkedin_url ?? undefined,
    },
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero
        bgImage="/lacarta_images/about.png"
        title="About Us"
        subtitle=""
        path="La Carta › Cartagena Culture & Magazine › About Us"
        button={false}
      />

      {/* About Description */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="w-full mb-8">
            <img
              src="/lacarta_images/about.png"
              alt="La Carta - Cartagena Culture Magazine"
              className="w-full h-auto rounded-sm object-cover"
            />
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-center">
            At La Carta we are a team of passionate Costeño Cartageneros. Our
            mission is to bring the top positive stories of Cartagena. We only
            promise to bring our communities high calibrating feel good news. We
            are a team of highly creative individuals coming from background of
            arts, journalism, business, law, design, hospitality, real estate,
            and even dance! All of us have practiced our crafts in Cartagena and
            hope to bring you a taste of our talents from our city we are very
            proud of. If you feel like your a like minded talent like us please
            apply to{" "}
            <Link
              href="#"
              className="text-green underline hover:text-green-light transition-colors"
            >
              our Home Page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection title="Meet The Team" members={teamMembers} />

      {/* Culture CTA */}
      <div className="flex justify-center pb-12 sm:pb-16">
        <Link href="#">
          <Button className="rounded-sm font-antigua bg-gradient-to-t from-gold-light to-gold text-lg text-white hover:brightness-110 transition px-8 py-5">
            Read About Our Culture
          </Button>
        </Link>
      </div>
    </div>
  );
}
