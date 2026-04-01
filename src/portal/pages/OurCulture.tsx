import Link from "next/link";
import { Lock, Diamond, Check, Star, Briefcase, Users } from "lucide-react";

/* ── Perks data ── */
const perks = [
  {
    icon: <Lock size={36} strokeWidth={2} />,
    title: "Reputation",
    desc: "We take immense pride in our reputation as a trusted source for all things Cartagena. Working at La Carta means aligning yourself with a publication that is widely respected by both locals and tourists. This reputation opens doors for you to collaborate with passionate creatives, engage with the community, and build a strong network within Cartagena and beyond.",
  },
  {
    icon: <Diamond size={36} strokeWidth={1.5} />,
    title: "Recognizability",
    desc: "At La Carta, being part of our team means contributing to a publication that's a well-known fixture in Cartagena. Gain the advantage of working with a brand that people identify with and trust. Our high standard grading scale filters quality work from others. This visibility boosts your professional profile and allows you to make meaningful connections in the community.",
  },
  {
    icon: <Check size={36} strokeWidth={3} />,
    title: "References",
    desc: "We believe in fostering growth and supporting our team members as they build their careers. Working with us means gaining access to a wealth of knowledge and expertise, as well as earning valuable references from respected professionals in the industry. Our internship programs provide a creative platform for university students credibility to join the workforce.",
  },
  {
    icon: <Star size={36} strokeWidth={1.5} fill="black" />,
    title: "Showcase",
    desc: "Our platform offers artists and creatives a unique opportunity to showcase their work to a wide and engaged audience. Whether you're a writer, photographer, or visual artist, your contributions will be featured alongside our top-quality content, giving your work the recognition it deserves. Here, you can elevate your creative expression.",
  },
  {
    icon: <Briefcase size={36} strokeWidth={1.5} />,
    title: "Experience",
    desc: "You'll have the chance to develop your skills, take on meaningful projects, and work alongside talented professionals. This invaluable experience not only enhances your career but also allows you to contribute to content that resonates with a diverse audience. Experience growth, creativity, and professional development with La Carta.",
  },
  {
    icon: <Users size={36} strokeWidth={1.5} />,
    title: "Intern Hours",
    desc: "Our flexible intern hours are designed to fit around your schedule, providing you with the opportunity to gain valuable experience without compromising your other responsibilities. Our flexible hours ensure you can learn, grow, and make a meaningful contribution to our team, all while maintaining a healthy work-life balance.",
  },
];

/* ── Stories data ── */
const stories = [
  {
    name: "Miguel LaLibertad",
    image: "/lacarta_images/Miguel LaLibertad.webp",
    paragraphs: [
      "I started La Carta with the intention to bring a new upbeat, positive, & fun magazine that would showcase the best of Cartagena for the world to see. I wanted to spotlight the many amazing people, top businesses, passionate activists making an impact in our community in an artistic story telling way. We now give young creatives the opportunity to show off their story in their creative fashion.",
      "La Carta has organically attracted top artistic minds from many diverse backgrounds and we have become a true platform of creative expression and storytelling. I am so happy to work alongside so many talented individuals and hope our blessed growth continues here in Cartagena my city.",
    ],
  },
  {
    name: "Juan Pablo",
    image: "/lacarta_images/Juan Pablo.png",
    paragraphs: [
      "I started working at La Carta part time via the internship program. After 3 months, I was hired part time and after 6 months, full time. I was able to experience first hand the journey of starting a start up with a group of experts from different backgrounds.",
      "We are able to try new things, put them to action, break things, and ultimately find what sticks. I have made strong relationships at La Carta that do not feel like work relationships but more like travel journeymen & women. You bring ideas here and you can really since them come to life.",
    ],
  },
];

const headingStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontWeight: 900,
  color: "#000",
};

const goldBtn =
  "inline-block bg-[#f5c542] text-black font-black uppercase tracking-wide px-10 py-3 rounded-full hover:brightness-105 transition text-sm";

export default function OurCulture() {
  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: "#000" }}>

      {/* ── 1. HERO ── */}
      <section className="pt-8 pb-4 text-center px-4">
        {/* breadcrumb */}
        <p className="text-sm mb-4">
          <span style={{ color: "#c0a030" }}>La Carta - Cartagena Culture &amp; Tourism</span>
          <span className="text-black font-semibold"> &rsaquo; Our Culture</span>
        </p>

        <h1 className="font-antigua mb-8" style={{ ...headingStyle, fontSize: "clamp(2.4rem, 6vw, 4rem)" }}>
          Our Culture
        </h1>

        {/* 3 photos */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {["/lacarta_images/culture-1.png", "/lacarta_images/culture-2.png", "/lacarta_images/culture-3.png"].map((src, i) => (
              <img key={i} src={src} alt={`culture ${i + 1}`}
                className="w-full object-cover rounded-3xl"
                style={{ aspectRatio: "1 / 1", maxHeight: 280 }}
              />
            ))}
          </div>

          {/* Intro paragraphs */}
          <div className="text-left space-y-4 text-base leading-relaxed max-w-none mx-auto" style={{ color: "#000" }}>
            <p>
              At <em>La Carta</em>, we celebrate the vibrant spirit of Cartagena and are passionate about sharing its unique stories with the world. Our company culture is built on creativity, collaboration, and a love for all things local. We believe in highlighting the best of Cartagena's culture, from its hidden gems to its bustling events, in a way that resonates with both tourists and locals alike.
            </p>
            <p>
              We are committed to creating high-quality, feel-good content that reflects the warmth and authenticity of Cartagena. Our team values integrity, positivity, and a shared sense of purpose. We strive to create an environment where every team member feels inspired and empowered to contribute their unique talents and ideas.
            </p>
            <p>
              With a strong focus on community and individuality, <em>La Carta</em> is not just a workplace—it's an art museum. We are dedicated to innovating fast and learning faster, while making a positive impact through our work. Join us, and be part of a team that's passionate about making Cartagena shine!
            </p>
          </div>

          {/* MEET OUR TEAM button */}
          <div className="flex justify-center mt-10">
            <Link href="/about-us" className={goldBtn}>Meet Our Team</Link>
          </div>
        </div>
      </section>

      {/* ── 2. PERKS & BENEFITS ── */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="font-antigua text-center mb-12"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Perks &amp; Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {perks.map((p) => (
              <div key={p.title} className="flex flex-col items-start">
                {/* icon above card */}
                <div className="mb-3 pl-1" style={{ color: "#000" }}>{p.icon}</div>
                {/* card */}
                <div className="border border-gray-300 rounded-2xl p-5 w-full h-full">
                  <h3 className="font-antigua font-black text-lg mb-2" style={{ color: "#000" }}>
                    {p.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#000" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PEOPLE & CULTURE ── */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="font-antigua mb-6"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            People &amp; Culture
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#000" }}>
            We value competency over diversity, we foster a fast paced learning environment over a supportive environment, and strongly believe in empowering each team member to contribute their unique talents. We are completely against any globalist or collectivist ideologies. We detest politics, bureaucracy, woke tribalism, and we absolutely do not tolerate the American victimhood culture and any woke agendas. We believe passion and effort combined create the solutions to the majority of the worlds problems. We strongly advocate for individual liberties &amp; freedom of expression no matter how crazy an idea may be. If you find that our values align with yours join us and be part of a dynamic community where your ideas are valued, and your contributions make a difference. At <em>La Carta</em>, we work together to create impactful content that resonates with all of Cartagena, while enjoying every step of the journey.
          </p>
          <img
            src="/lacarta_images/culture-4.png"
            alt="La Carta Office"
            className="w-full rounded-3xl object-cover"
            style={{ maxHeight: 380 }}
          />
        </div>
      </section>

      {/* ── 4. OUR VIRTUES & HOW WE WORK ── */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Our Virtues */}
            <div>
              <h2 className="font-antigua mb-4"
                style={{ ...headingStyle, fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                Our Virtues
              </h2>
              <img
                src="/lacarta_images/culture-5.png"
                alt="Our Virtues"
                className="w-full rounded-3xl object-cover mb-4"
                style={{ maxHeight: 300 }}
              />
              <p className="text-base leading-relaxed mb-6" style={{ color: "#000" }}>
                We value high calibrating stories only. Stories that will leave our readers feeling good about themselves, motivated, inspired, or left in awe. We despise click bait propaganda and we'll never conform to traditional media revenue models. "We will never accept any political donation for any story, and we have never accepted any outside funding for our business when offered and NEVER will." – Miguel LaLibertad
              </p>
              <Link href="/submit-a-story" className={goldBtn}>Submit A Tip</Link>
            </div>

            {/* How We Work */}
            <div>
              <h2 className="font-antigua mb-4"
                style={{ ...headingStyle, fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                How We Work
              </h2>
              <img
                src="/lacarta_images/culture-6.png"
                alt="How We Work"
                className="w-full rounded-3xl object-cover mb-4"
                style={{ maxHeight: 300 }}
              />
              <p className="text-base leading-relaxed mb-6" style={{ color: "#000" }}>
                We have a decentralized work force approach and work with a team of 50% salaried employees and 50% intern basis. All of our hired staff started working for us with through our internship program before becoming full time at La Carta. We have rotating office spaces all over Cartagena and virtual offices. We consistently refine our operations and encourage a innovative work environment from everybody.
              </p>
              <Link href="/work-with-us" className={goldBtn}>Join Our Team</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. STORIES ── */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="font-antigua text-center mb-10"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Stories
          </h2>

          <div className="space-y-6">
            {stories.map((s) => (
              <div
                key={s.name}
                className="border border-gray-300 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6 items-start"
              >
                {/* Text */}
                <div>
                  <h3 className="font-antigua font-black italic text-xl mb-3" style={{ color: "#000" }}>
                    {s.name}
                  </h3>
                  {s.paragraphs.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed mb-3" style={{ color: "#000" }}>
                      {para}
                    </p>
                  ))}
                </div>
                {/* Photo */}
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full rounded-2xl object-cover"
                  style={{ height: 220 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
