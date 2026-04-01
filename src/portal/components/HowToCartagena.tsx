import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@public/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@public/components/ui/avatar";
import { Badge } from "@public/components/ui/badge";
import { Button } from "@public/components/ui/button";
// import img7 from "../assets/Six-C-img1.png";
// import img8 from "../assets/Six-C-img2.png";
// import img9 from "../assets/Six-C-img3.png";
// import img0 from "../assets/Six-C-img4.png";

const cards = [
  {
    category: "BEACH",
    title: "Where to find the Best Exchange Rates",
    description:
      "Don’t Exchange Money at the Airport! Here are the best places to find ATMs & currency exchange in Cartagena.",
    author: "May",
    color: "bg-gradient-to-r from-gold to-gold-light",
    image: "/images/Six-C-img1.png",
  },
  {
    category: "CULTURE",
    title: "Is Cartagena a Safe City to Visit?",
    description:
      "Cartagena is very friendly but sometimes you will encounter scammers. Here is what to do & how to stay safe.",
    author: "Miguel",
    color: "bg-gradient-to-r from-red to-red-light",
    image: "/images/Six-C-img2.png",
  },
  {
    category: "CULTURE",
    title: "The Best Monuments and Statues of Cartagena, Colombia",
    description:
      "Here are some of the most famous statues of Cartagena and recognizable monuments from Cartagena.",
    author: "Luz",
    color: "bg-gradient-to-r from-red to-red-light",
    image: "/images/Six-C-img3.png",
  },
  {
    category: "ACTIVITIES",
    title: "How to order taxis in Cartagena",
    description:
      "Are Taxis Safe in Colombia? Find out in our step by step guide on how to order taxis in Cartagena.",
    author: "Alejandra",
    color: "bg-gradient-to-r from-green to-green-light",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="overflow-hidden relative rounded-md shadow-2xl flex flex-col h-full"
            >
              {/* Image */}
              <CardHeader className="p-0 relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover rounded-md"
                />

                {/* Badge */}
                <Badge
                  className={`absolute -top-2 right-0 py-2 px-auto text-xs mx-auto w-24 flex items-center justify-center text-center overflow-hidden  text-white rounded-tr-md rounded-bl-none rounded-tl-none rounded-br-none border-0 ${card.color}`}
                >
                  {card.category}
                </Badge>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-4">
                <h3 className="font-bold text-black leading-tight text-lg mb-2">
                  {card.title}
                </h3>

                {/* Auto-adjusting paragraph */}
                <p className="text-xs text-gray-500 leading-relaxed  mb-3">
                  {card.description}
                </p>

                {/* Button always aligned */}
                <Button className="text-sm font-medium p-0 text-gray-500 bg-background hover:underline ">
                  Read More <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>

              {/* Footer stays at bottom */}
              <CardFooter className="px-4 flex items-center gap-2  mt-auto">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar.png" />
                  <AvatarFallback>{card.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm fw-bold text-black">
                  {card.author}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
