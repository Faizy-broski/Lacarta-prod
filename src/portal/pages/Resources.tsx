import Link from "next/link";
import { Heart, Headphones, HelpCircle, ClipboardList, Plus, Music, Calendar, Play, Map, ArrowLeftRight } from "lucide-react";

const toolCards = [
  {
    title: "Tourist Service Center",
    desc: "If you ever need any help during your time in Cartagena!",
    icon: <Headphones size={28} color="#fff" />,
    iconBg: "#f5c542",
    btnLabel: "Go",
    btnBg: "#f5c542",
    href: "/tourist-service-center",
  },
  {
    title: "Cartagena FAQs",
    desc: "Cartagena's Most Frequently Asked Questions",
    icon: <HelpCircle size={28} color="#fff" />,
    iconBg: "#3bbfad",
    btnLabel: "Download",
    btnBg: "#3bbfad",
    href: "/faqs",
  },
  {
    title: "Cartagena Travel Checklist",
    desc: "Everything you must do before boarding your flight to Cartagena, Colombia!",
    icon: <ClipboardList size={28} color="#fff" />,
    iconBg: "#e8534a",
    btnLabel: "Check Off",
    btnBg: "#e8534a",
    href: "/checklist",
  },
  {
    title: "Cartagena Emergency Guide",
    desc: "Save our Emergency Guide with you at all times for all the police stations, hospitals, and medical services!",
    icon: <Plus size={28} color="#fff" />,
    iconBg: "#f5c542",
    btnLabel: "Download",
    btnBg: "#f5c542",
    href: "/resources",
  },
  {
    title: "Cartagena Spotify Playlist",
    desc: "Enhance your Cartagena trip by immersing yourself to the Cartagena Carribean beats!",
    icon: <Music size={28} color="#fff" />,
    iconBg: "#3bbfad",
    btnLabel: "Download",
    btnBg: "#3bbfad",
    href: "/spotify-playlist",
  },
  {
    title: "Cartagena Event Calendar",
    desc: "Integrate with your calendar all the top events happening in Cartagena so you don't miss out during you trip!",
    icon: <Calendar size={28} color="#fff" />,
    iconBg: "#e8534a",
    btnLabel: "Integrate",
    btnBg: "#e8534a",
    href: "/event-calendar",
  },
  {
    title: "Cartagena Help Video",
    desc: "Watch our quick help video on what to expect in Cartagena, cultural etiquette, staying safe, and how to take full advantage of your trip.",
    icon: <Play size={28} color="#fff" />,
    iconBg: "#f5c542",
    btnLabel: "Watch",
    btnBg: "#f5c542",
    href: "/help-video",
  },
  {
    title: "Cartagena Help Maps",
    desc: "Download our Safety Map, Activity Map, & Tourist Map for staying safe, staying in the know, and finding the best instagramable places of Cartagena",
    icon: <Map size={28} color="#fff" />,
    iconBg: "#3bbfad",
    btnLabel: "Download",
    btnBg: "#3bbfad",
    href: "/help-map",
  },
  {
    title: "Gringo to Parcero Translate",
    desc: "English to Colombian Spanish! Learn the basic slangs, expressions, and phrases to charm the Cartagena locals!",
    icon: <ArrowLeftRight size={28} color="#fff" />,
    iconBg: "#e8534a",
    btnLabel: "Learn",
    btnBg: "#e8534a",
    href: "/resources",
  },
];

const onThisPage = [
  { label: "Gringo to Parcero", icon: <ArrowLeftRight size={14} />, href: "#gringo" },
  { label: "Events in Cartagena", icon: <Calendar size={14} />, href: "#events", bold: true },
  { label: "Cartagena FAQ's", icon: <HelpCircle size={14} />, href: "#faqs" },
  { label: "Cartagena Help Maps", icon: <Map size={14} />, href: "#maps" },
  { label: "Cartagena Emergency Guide", icon: <Plus size={14} />, href: "#emergency" },
  { label: "Cartagena Tourist Center", icon: <Headphones size={14} />, href: "#tourist-center" },
  { label: "Colombian Music Spotify Playlist", icon: <Music size={14} />, href: "#spotify" },
  { label: "Cartagena Travel Checklist", icon: <ClipboardList size={14} />, href: "#checklist" },
];

const sections = [
  {
    id: "gringo",
    title: "Gringo to Parcero: Spanish to English Slang and Helpful Phrases",
    body: `Don't let language barriers get in the way of your adventure! Our "Gringo to Parcero" guide helps you navigate everyday conversations in Cartagena with ease. Learn common phrases and local slang that will help you bond with the locals and truly immerse yourself in the culture. Whether you're ordering food or chatting with new friends, this guide has you covered.`,
  },
  {
    id: "events",
    title: "Events in Cartagena",
    body: "Stay in the loop with Cartagena's vibrant event scene! Our events calendar keeps you updated with festivals, concerts, cultural activities, and more. It's perfect for those who want to experience the city's lively atmosphere. Plus, you can easily integrate events into your Google Calendar, ensuring that you won't miss a single moment of the action. From cultural festivals to local music shows, this resource has all the info you need to plan your itinerary.",
  },
  {
    id: "faqs",
    title: "Cartagena FAQ's",
    body: "Got questions about your trip to Cartagena? Our FAQs section answers the most common inquiries from visitors, like the best times to visit, tips for staying safe, and how to get around the city. It's the perfect place to find practical advice and make sure you're fully prepared for your stay.",
  },
  {
    id: "maps",
    title: "Cartagena Help Maps",
    body: "Explore Cartagena like a pro with our downloadable maps! These include a Safety Map that highlights safe areas and spots to avoid, a Tourist Map featuring all the must-see attractions, and an Activities Map for finding the best adventure spots. These maps are designed to make navigating the city easier, whether you're discovering historic sites or planning a day at the beach.",
  },
  {
    id: "emergency",
    title: "Cartagena Emergency Guide",
    body: "Safety first! Our Emergency Guide is a must-have for any visitor. It includes a list of important phone numbers for police stations, hospitals, medical services, and other emergency contacts in Cartagena. Download this guide and keep it on hand for peace of mind while you explore the city.",
  },
  {
    id: "tourist-center",
    title: "Cartagena Tourist Center",
    body: "Need local guidance or travel advice? Our Tourist Centers resource gives you all the information you need about the city's visitor centers. Learn where to find them, what services they offer, and who to contact for tours and travel tips. It's your one-stop-shop for city insights and assistance.",
  },
  {
    id: "spotify",
    title: "Colombian Music Spotify Playlist",
    body: "Experience the sounds of Cartagena with our specially curated Spotify playlist! Featuring both traditional and contemporary Colombian music, this playlist is perfect for setting the mood as you explore the city. Listen while walking through Cartagena's historic streets or while relaxing on the beach.",
  },
  {
    id: "checklist",
    title: "Cartagena Travel Checklist",
    body: "Make sure you're fully prepared with our comprehensive Travel Checklist. It covers everything from must-have travel documents and clothing recommendations to beach essentials and safety tips. Use this checklist as a handy guide to ensure a smooth trip and make the most of your Cartagena adventure.",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Teal banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Breadcrumb + Heading ── */}
      <section className="px-4 md:px-10 pt-8 pb-4 max-w-[1400px] mx-auto">
        <p className="text-sm text-center mb-4">
          <span style={{ color: "#c0a030" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
          <span className="font-bold" style={{ color: "#000" }}> › Travel Guide</span>
        </p>
        <h1
          className="font-antigua font-black uppercase text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Tools For Your Cartagena Journey
        </h1>
      </section>

      {/* ── Tool cards grid ── */}
      <section className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCards.map((card) => (
            <div
              key={card.title}
              className="relative flex flex-col items-center rounded-2xl pt-10 pb-6 px-6"
              style={{ border: "1px solid #e0e0e0", backgroundColor: "#fff" }}
            >
              {/* Floating colored circle */}
              <div
                className="absolute flex items-center justify-center rounded-full shadow-md"
                style={{ top: -28, left: "50%", transform: "translateX(-50%)", width: 56, height: 56, backgroundColor: card.iconBg }}
              >
                {card.icon}
              </div>

              {/* Heart icon top-right */}
              <div className="absolute top-4 right-4">
                <Heart size={18} style={{ color: "#ccc" }} />
              </div>

              <h3 className="font-black text-base text-center mb-2 mt-2" style={{ color: "#000" }}>{card.title}</h3>
              <p className="text-base text-center leading-relaxed flex-1 mb-5" style={{ color: "#555" }}>{card.desc}</p>

              <Link
                href={card.href}
                className="w-full text-center py-2.5 font-black text-base hover:brightness-110 transition rounded"
                style={{ backgroundColor: card.btnBg, color: "#000" }}
              >
                {card.btnLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── CARTAGENA RESOURCES heading + intro ── */}
      <section className="px-4 md:px-10 py-14 text-center max-w-[1400px] mx-auto">
        <h2
          className="font-antigua font-black uppercase mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Cartagena Resources
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#000" }}>
          Planning a trip to Cartagena? La Carta is here to make your experience as smooth and enjoyable as possible with our curated set of resources. From learning local slang to getting emergency contacts, our resources cover everything you need. Here's a rundown of what each section offers:
        </p>
      </section>

      {/* ── 2-col: sidebar + content ── */}
      <div className="px-4 md:px-10 pb-20 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="hidden md:block self-start sticky top-8">
          <p className="font-black text-base mb-4" style={{ color: "#000" }}>On This Page</p>
          <ul className="space-y-3">
            {onThisPage.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span style={{ color: "#555" }}>{item.icon}</span>
                <a
                  href={item.href}
                  className={`text-base hover:underline ${item.bold ? "font-black" : ""}`}
                  style={{ color: "#000" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Sections */}
        <main className="space-y-12">
          {sections.map((sec) => (
            <div key={sec.id} id={sec.id}>
              <h3
                className="font-antigua font-black mb-3"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "#000" }}
              >
                {sec.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#000" }}>{sec.body}</p>
            </div>
          ))}
        </main>
      </div>

    </div>
  );
}
