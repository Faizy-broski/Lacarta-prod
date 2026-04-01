import { Button } from "@public/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@public/components/ui/accordion"

const tagRoutes: Record<string, string> = {
  Beaches: "/Beaches",
  Accommodations: "/hotels",
  Boating: "/Boating",
  "Real Estate": "/real-estate",
  Activities: "/Activities",
  Gastronomy: "/Gastronomy",
};

export default function FaqSection() {
  return (
    <section className="w-full bg-[#fbf7ef] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">
            Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-['Inter] font-extrabold text-black">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 px-4"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-medium text-black hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-neutral-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="max-w-3xl p-0 m-auto mt-5">
                    <div className="w-full mb-2">
                      <nav className="lg:grid grid-cols-6 hidden flex-wrap justify-center gap-1">
                    {[
                      "Beaches",
                      "Accommodations",
                      "Boating",
                      "Real Estate",
                      "Activities",
                      "Gastronomy",
                    ].map((tag) => (
                      <Button className="bg-white text-black font-bold shadow-xl rounded hover:bg-gray-200">
                      <Link
                        key={tag}
                        href={tagRoutes[tag]}
                      >
                        {tag}
                      </Link>
                      </Button>
                    ))}
                  </nav>
                    </div>
        
                    <div className=" w-full">
                     <div className="flex bg-white rounded overflow-hidden p-1">
                                 <input
                                   className="flex-grow p-2 bg-white text-black"
                                   type="text"
                                   placeholder="Search for Anything"
                                 />
                                 <Button className="text-white w-[250px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
                                   Search
                                 </Button>
                               </div>
                    </div>
                   
                  </div>

      </div>
    </section>
  )
}

const faqData = [
  {
    question: "How do I get there?",
    answer:
      "You can reach the location via private transport, taxi services, or arranged transfers. Detailed directions will be shared after booking.",
  },
  {
    question: "Is it family-friendly?",
    answer:
      "Yes, the location is suitable for families and offers a safe, comfortable environment for all age groups.",
  },
  {
    question: "Is Wi-Fi available?",
    answer:
      "High-speed Wi-Fi is available throughout the property for guests.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made within the allowed period are eligible for a refund. Please refer to the booking terms for exact details.",
  },
  {
    question: "What is the best time to visit?",
    answer:
      "The best time to visit is during mild weather months when conditions are ideal for outdoor activities.",
  },
]
