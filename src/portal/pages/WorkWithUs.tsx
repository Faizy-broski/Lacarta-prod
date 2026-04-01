import Link from "next/link";

const panels = [
  {
    title: "Brand",
    subtitle: "Showcase Your Brand For All of Cartagena!",
    image: "/lacarta_images/brand.png",
    overlay: "rgba(220, 180, 40, 0.55)",
    btnColor: "#f5c542",
    btnText: "#000",
    href: "/work-with-us/brand",
  },
  {
    title: "Creator",
    subtitle: "Create Your Cartagena Idea!",
    image: "/lacarta_images/creator.png",
    overlay: "rgba(40, 180, 160, 0.55)",
    btnColor: "#e8534a",
    btnText: "#fff",
    href: "/work-with-us/creator",
  },
  {
    title: "Influencers",
    subtitle: "Influence Cartagena Baby!",
    image: "/lacarta_images/influencer.png",
    overlay: "rgba(210, 80, 60, 0.50)",
    btnColor: "#f5c542",
    btnText: "#000",
    href: "/work-with-us/influencer",
  },
];

export default function WorkWithUs() {
  return (
    <div className="flex flex-col sm:flex-row w-full" style={{ minHeight: "calc(100vh - 80px)" }}>
      {panels.map((p) => (
        <div
          key={p.title}
          className="relative flex-1 flex flex-col items-center justify-center text-center"
          style={{ minHeight: 320 }}
        >
          {/* Background image */}
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: p.overlay }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-12 flex flex-col items-center gap-4">
            <h2
              className="font-antigua font-black"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000" }}
            >
              {p.title}
            </h2>
            <p
              className="font-semibold"
              style={{ fontSize: "0.95rem", color: "#000", maxWidth: 260 }}
            >
              {p.subtitle}
            </p>
            <Link href={p.href}>
              <button
                className="font-black uppercase tracking-widest px-10 py-2.5 text-sm hover:brightness-110 transition-all"
                style={{
                  backgroundColor: p.btnColor,
                  color: p.btnText,
                  borderRadius: 4,
                  letterSpacing: "0.1em",
                }}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
