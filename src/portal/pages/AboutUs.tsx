import Hero from "@public/components/listings/Hero";
import TeamSection from "@public/components/about/TeamSection";
import type { TeamMember } from "@public/components/about/TeamMemberCard";
import { Button } from "@public/components/ui/button";
import Link from "next/link";

const teamMembers: TeamMember[] = [
  {
    name: "Cris Morelo",
    role: "Head of Creative & HR",
    image: "/lacarta_images/cris-morelo.png",
    socials: {
      email: "cris@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Maria Moreno",
    role: "Editor in Chief",
    image: "/lacarta_images/Maria Moreno.webp",
    socials: {
      email: "maria@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Alejandra Quiroga",
    role: "VP Marketing & Content",
    image: "/lacarta_images/Alejandra-Quiroga.png",
    socials: {
      email: "alejandra@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Isabella Castillo",
    role: "Head of Social Media",
    image: "/lacarta_images/Isabella-Castillo.png",
    socials: {
      email: "isabella@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Lizeth Cantillo",
    role: "Travel Concierge & Coordinator",
    image: "/lacarta_images/Lizeth-Cantillo.png",
    socials: {
      email: "lizeth@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ivan la Spada",
    role: "Head of Design",
    image: "/lacarta_images/Ivan la Spada.png",
    socials: {
      email: "ivan@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sofia Belen Turbay",
    role: "Chief Legal Officer – Head of Sponsorships & Partnerships",
    image: "/lacarta_images/Sofia Belen Turbay.png",
    socials: {
      email: "sofia@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ivan Mondol",
    role: "Head of Real Estate",
    image: "/lacarta_images/Ivan Mondol.png",
    socials: {
      email: "ivanm@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Juan Pablo Moreno",
    role: "Head of Tours & Client Relations",
    image: "/lacarta_images/Juan Pablo Moreno.png",
    socials: {
      email: "juanpablo@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Miguel LaLibertad",
    role: "Founder – CEO & CMO",
    image: "/lacarta_images/Miguel LaLibertad.webp",
    socials: {
      email: "miguel@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Daniel Fernando De La Espriella",
    role: "Social Media Manager",
    image: "/lacarta_images/Daniel Fernando De La Espriella.png",
    socials: {
      email: "daniel@lacarta.com",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

export default function AboutUs() {
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
