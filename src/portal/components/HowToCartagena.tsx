import { ChevronRight } from "lucide-react";
// import img7 from "../assets/Six-C-img1.png";
// import img8 from "../assets/Six-C-img2.png";
// import img9 from "../assets/Six-C-img3.png";
// import img0 from "../assets/Six-C-img4.png";

const cards = [
  {
    category: "BEACH",
    title: "Where to find the Best Exchange Rates",
    description: "Don’t Exchange Money at the Airport! Here are the best places to find ATMs & Currency exchange in Cartagena.",
    author: "May",
    avatar: "/lacarta_images/Maria Moreno.webp",
    badgeBg: "#f5c542",
    image: "/images/Six-C-img1.png",
  },
  {
    category: "CULTURE",
    title: "Is Cartagena a Safe City to Visit?",
    description: "Cartagena is very friendly but some times you will encounter scammers. Here is what to do avoid and how to stay safe.",
    author: "Miguel",
    avatar: "/lacarta_images/Miguel LaLibertad.webp",
    badgeBg: "#e8534a",
    image: "/images/Six-C-img2.png",
  },
  {
    category: "CULTURE",
    title: "The Best Monuments and Statues of Cartagena, Colombia",
    description: "Here are some of the most famous statues of Cartagena and recognizable monuments from Cartagena.",
    author: "Luz",
    avatar: "/lacarta_images/Isabella-Castillo.png",
    badgeBg: "#e8534a",
    image: "/images/Six-C-img3.png",
  },
  {
    category: "ACTIVITES",
    title: "How to order taxis in Cartagena",
    description: "Are Taxis Safe in Colombia? Find out in our step by step guide on how to order taxis in Cartagena.",
    author: "Alejandra",
    avatar: "/lacarta_images/Alejandra-Quiroga.png",
    badgeBg: "#4caf74",
    image: "/images/Six-C-img4.png",
  },
];

export default function HowToDoCartagena() {
  return (
    <>
      <div className="text-center mb-7 mt-10 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-black font-antigua text-black text-center capitalize mb-16">
          How To Do Cartagena
        </h2>
      </div>

      <section className="container mb-5 mx-auto pb-13 px-10 md:px-16 md:py-16">
        {/* Title */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
            >
              {/* Image + badge */}
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover"
                />
                <span
                  className="absolute top-0 right-0 text-white text-xs font-bold px-3 py-2 rounded-bl-xl"
                  style={{ backgroundColor: card.badgeBg }}
                >
                  {card.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-black leading-tight text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">
                  {card.description}
                </p>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition mb-4">
                  Read More <ChevronRight className="w-4 h-4" />
                </button>

                {/* Author */}
                <div className="flex items-center gap-2 border-t pt-3">
                  <img
                    src={card.avatar}
                    alt={card.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-black">{card.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
