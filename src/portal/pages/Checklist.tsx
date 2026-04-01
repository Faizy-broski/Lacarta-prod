"use client";

import { useState } from "react";
import { checklistData } from "@public/data/checklist.data";
import Link from "next/link";

const sidebarLinks = [
  { label: "Hygiene / Personal Care", href: "#hygiene" },
  { label: "Best Outfit for Cartagena's Climate", href: "#outfit" },
  { label: "Tech You'll Need", href: "#tech" },
];

const PRE_CHECKED = new Set(["Foreign Currency", "Underwear", "Health Insurance"]);

export default function Checklist() {
  const initialChecked: Record<string, boolean> = {};
  checklistData.checklistSections.forEach((section) => {
    section.items.forEach((item) => {
      if (PRE_CHECKED.has(item)) initialChecked[item] = true;
    });
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialChecked);

  const toggle = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Teal banner */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* Hero */}
      <div
        className="relative w-full"
        style={{ minHeight: 240, backgroundColor: "#e8534a" }}
      >
        <div className="relative z-10 px-4 md:px-20 py-8 md:py-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Clipboard SVG */}
          <svg className="w-12 h-12 sm:w-[72px] sm:h-[72px] flex-shrink-0" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="14" width="40" height="44" rx="4" stroke="#000" strokeWidth="2.2" fill="none" />
            <rect x="22" y="8" width="20" height="12" rx="3" stroke="#000" strokeWidth="2.2" fill="none" />
            <line x1="22" y1="28" x2="42" y2="28" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="22" y1="36" x2="42" y2="36" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="22" y1="44" x2="34" y2="44" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena Travel Checklist
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#000" }}>
              Everything you must pack before boarding your flight to Cartagena!
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#7a2000" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#000" }}> › Travel Checklist</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2-col checklist cards grid */}
      <div className="px-4 md:px-10 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklistData.checklistSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-2xl p-6 relative"
                style={{ backgroundColor: "#fffde7", border: "1px solid #f5e8a0" }}
              >
                {/* Gold square icon top-right */}
                <div
                  className="absolute top-4 right-4 flex items-center justify-center rounded-lg"
                  style={{ width: 38, height: 38, backgroundColor: "#f5c542" }}
                >
                  <Icon size={20} color="#fff" />
                </div>

                <h3
                  className="font-antigua font-black uppercase mb-4"
                  style={{ fontSize: "1rem", color: "#000", letterSpacing: "0.05em" }}
                >
                  {section.title}
                </h3>

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item]}
                        onChange={() => toggle(item)}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: "#f5c542" }}
                      />
                      <span
                        className="text-base transition-all"
                        style={{
                          color: checkedItems[item] ? "#f5c542" : "#333",
                          textDecoration: checkedItems[item] ? "line-through" : "none",
                        }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* CENTER heading */}
      <div className="py-10 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Cartagena Travel Check List
        </h2>
        <p className="mt-2 text-base" style={{ color: "#000" }}>
          The Ultimate Checklist to Make Sure You Don't Forget Anything!
        </p>
      </div>

      {/* Gold divider */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* 2-col: sidebar + article */}
      <div className="px-4 md:px-10 py-14 pb-20 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="hidden md:block self-start sticky top-8">
          <p className="font-black text-base mb-5 uppercase" style={{ color: "#000" }}>
            Cartagena Travel Checklist
          </p>
          <ul className="space-y-3">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-base hover:underline"
                  style={{ color: "#000" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article content */}
        <main className="space-y-12 text-base leading-relaxed" style={{ color: "#000" }}>

          {/* Intro text */}
          <div>
            <p className="mb-3">
              Before packing your suitcase, come and create your travel checklist with La Carta. From essential travel documents—personal and financial—to toiletries, ideal clothing, accessories, personal care items, beach essentials, and safety tips… here we've thought of EVERYTHING.
            </p>
            <p className="mb-3">
              Traveling to Cartagena means stepping into an incredible universe of sun, beach, sand, warm people, and endless fun. But if you truly want to enjoy it as you should, you need to know the must-have items when packing to ensure a smooth, comfortable, and safe trip.
            </p>
            <p className="mb-3">
              Imagine arriving in a coastal city where the sun's rays embrace your skin all day long—and you forgot sunscreen, sunglasses, hats, or the right accessories for this type of weather. Or imagine bringing a suitcase full of clothes unsuited for the heat, or uncomfortable shoes that keep you from enjoying its cobblestone streets.
            </p>
            <p>
              That's a scenario you can easily avoid with our checklist and tips. Here at La Carta, we love this city and we know everything you need to make each journey not only unforgettable but also completely comfortable and safe.
            </p>
          </div>

          {/* 2-col image grid */}
          <div className="grid grid-cols-2 gap-2" style={{ maxWidth: 560 }}>
            <img src="/lacarta_images/travel-1.jpg" alt="Cartagena travel" className="w-full h-48 object-cover rounded" />
            <img src="/lacarta_images/travel-2.jpg" alt="Cartagena travel" className="w-full h-48 object-cover rounded" />
          </div>

          {/* Before Leaving Home */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-3" style={{ color: "#000" }}>
              Before Leaving Home — Keep the Essentials Always at Hand
            </h3>
            <p className="mb-3">
              The first things you should pack are all the necessary legal documents for your trip: ID card, valid passport, visa (if required from your country of origin), or any special entry requirements for Colombia.
            </p>
            <p>
              We also recommend bringing a copy of your hotel, flight, and even tour package reservations. Your phone will always be a handy tool to store documents, but it's best to have physical backups in case the signal fails—or worse, you lose your phone. A great tip is to digitize all your documents and store them in the cloud or in your email, just in case.
            </p>
          </div>

          {/* Hygiene */}
          <div id="hygiene">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Hygiene / Personal Care
            </h3>
            <p className="text-sm font-semibold mb-4" style={{ color: "#000" }}>TRAVEL CHECKLIST GUIDE</p>

            <img src="/lacarta_images/travel-3.jpg" alt="Personal care" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            <p className="mb-3">
              In Cartagena you'll find plenty of shops, local stores, and supermarkets where you can buy personal hygiene products if you forget something or run out. Still, it's always better to bring your own essentials—especially since you may not find the same brands you're used to in Colombia.
            </p>
            <p className="mb-3">
              Products like sunscreen, toothbrush, and toothpaste are a must. If you have a specific skincare routine with items like cleansers, moisturizers, serums, or masks, we recommend bringing them along—especially if they're tailored to your skin type.
            </p>
            <p className="mb-3">
              If you need medication, it's best to bring it with a prescription in case you run out and need to buy more urgently. Of course, having <strong>travel health insurance</strong> is essential—not only because it's often required, but also because it's very important if you're not used to tropical climates.
            </p>
            <p>
              It's also a good idea to carry a small first-aid kit with the basics: pain relievers, band-aids, antihistamines, sanitary pads, and motion sickness pills if you plan to take boat rides.
            </p>
          </div>

          {/* Best Outfit */}
          <div id="outfit">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Best Outfit for Cartagena's Climate
            </h3>
            <p className="text-sm font-semibold mb-4" style={{ color: "#000" }}>TRAVEL CHECKLIST GUIDE</p>
            <p className="mb-3">
              Cartagena enjoys tropical weather year-round. Unlike other regions, Colombia doesn't have four distinct seasons—so even during rainy months, the heat is constant and lightweight clothing is a must.
            </p>
            <p className="mb-3">
              We recommend packing light, breathable fabrics for the daytime. Loose styles that flow like ocean waves in light, tropical colors work best—but of course, keep your personal style. Just don't forget essentials like a handheld fan, a wide-brimmed hat, and even an umbrella for extra shade.
            </p>
            <p className="mb-3">
              For evenings, you can opt for short or long dresses in darker or bolder colors. While there's usually a breeze at night, it's still warm.
            </p>
            <p>
              A must-have accessory is a hat or cap. The sun in Cartagena is intense, and protecting your head and eyes will keep you energized longer. Sunglasses, sunscreen, and mosquito repellent should always be in your bag, especially if you're exploring nature or going out at night.
            </p>
          </div>

          {/* Tech */}
          <div id="tech">
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Tech You'll Need
            </h3>
            <p className="text-sm font-semibold mb-4" style={{ color: "#000" }}>TRAVEL CHECKLIST GUIDE</p>

            <img src="/lacarta_images/travel-4.jpg" alt="Tech essentials" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            <p className="mb-3">
              In today's digital age, it's essential to bring at least two chargers for your devices (phone, laptop, or others). Pack your regular charger and a fully charged portable one. Don't forget an adapter if needed.
            </p>
            <p className="mb-3">
              One of the most common travel mistakes is overpacking. In Cartagena, you won't need winter clothes or heavy accessories. Think functionality, comfort, and mobility. A helpful tip is to plan daily outfits in advance.
            </p>
            <p className="mb-3">
              We recommend bringing a beach bag (ideally waterproof and sand-proof), a medium suitcase, and a lightweight backpack for daily outings. Remember—you'll be walking a lot, so pack only the essentials: water, sunscreen, a bit of cash, and a phone with good battery life.
            </p>
            <p>
              If you plan to shop for handicrafts, clothing, or souvenirs, leave some extra space in your luggage so you don't go over the limit on your way back.
            </p>
          </div>

        </main>
      </div>

    </div>
  );
}
