import Hero from "@public/components/listings/Hero";
import { Card, CardContent } from "@public/components/ui/card";
import { ScrollArea } from "@public/components/ui/scroll-area";
import { Separator } from "@public/components/ui/separator";

const sections = [
  {
    id: "mission",
    title: "Our Editorial Mission",
    content: `At La Carta, our editorial mission is to celebrate and promote the best of Cartagena and Colombia's Caribbean Coast. We are committed to publishing positive, accurate, and culturally respectful content that serves travelers, expats, and locals alike.\n\nWe only promise to bring our communities high-caliber feel-good news. Every story we publish must serve the reader — informing, inspiring, or connecting them to what makes Cartagena extraordinary.`,
  },
  {
    id: "accuracy",
    title: "Accuracy & Fact-Checking",
    content: `All factual claims published on La Carta must be verified before publication. Our editors review every submission for accuracy, and writers are expected to cite sources or provide evidence for statistics, quotes, and factual statements.\n\nIf an error is discovered after publication, it will be corrected promptly with a visible correction notice. We do not silently edit published articles.`,
  },
  {
    id: "independence",
    title: "Editorial Independence",
    content: `La Carta maintains a clear separation between editorial and advertising. Advertisers and brand partners do not influence our editorial coverage.\n\nSponsored content is always clearly labeled as "Sponsored" or "Partner Content." Our editorial team does not accept gifts or free services in exchange for favorable coverage, except as part of our official influencer and creator programs, which are disclosed to readers.`,
  },
  {
    id: "sources",
    title: "Sources & Attribution",
    content: `Writers must properly attribute quotes, data, and ideas to their original sources. Plagiarism of any kind — including paraphrasing without attribution — is grounds for immediate removal from the platform.\n\nWe encourage the use of primary sources: interviews with locals, business owners, and cultural figures from Cartagena are strongly preferred over secondary reporting.`,
  },
  {
    id: "respect",
    title: "Cultural Respect & Sensitivity",
    content: `Cartagena is a city of extraordinary cultural richness. All content published on La Carta must treat local culture, traditions, and communities with respect and dignity.\n\nWe do not publish content that stereotypes, demeans, or misrepresents the people of Cartagena or Colombia. Content that exploits vulnerable communities — including promoting sex tourism or illegal activity — is strictly prohibited.`,
  },
  {
    id: "corrections",
    title: "Corrections Policy",
    content: `La Carta is committed to transparency. If you believe an article contains an error, please contact us at editorial@lacarta.com with the article title, the specific error, and supporting evidence.\n\nSignificant corrections will be noted at the top of the article. Minor corrections (spelling, grammar) may be made without notice. We will respond to all correction requests within 5 business days.`,
  },
  {
    id: "contact",
    title: "Contact the Editorial Team",
    content: `For editorial inquiries, story pitches, or corrections, please reach us at:\n\nEmail: editorial@lacarta.com\nResponse time: 3–5 business days\n\nFor advertising and partnership inquiries, please visit our Advertise With Us page.`,
  },
];

export default function EditorialStandards() {
  return (
    <>
      <Hero
        title="Editorial Standards"
        subtitle="Our commitment to accuracy, independence, and cultural respect"
        button={false}
        path="La Carta › Editorial Standards"
        bgImage="https://picsum.photos/1400/600?random=50"
      />

      <div className="min-h-screen bg-white text-black px-6 md:px-20 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <ScrollArea className="hidden md:block h-[90vh] rounded-2xl">
              <Card className="sticky top-20 bg-gold-light border-none shadow-sm rounded-2xl">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-gold mb-4 font-antigua">Contents</h2>
                  <ul className="space-y-3 text-sm">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="text-black hover:text-gold">{s.title}</a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollArea>

              <ScrollArea className="h-[90vh] rounded-2xl p-6 bg-white shadow-2xl border border-gray-100">
              <div className="space-y-10">
                <section>
                  <p className="leading-relaxed text-black">
                    La Carta holds itself to the highest editorial standards. These guidelines govern all content published on our platform — from staff writers and contributors to sponsored and partner content.
                  </p>
                </section>
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-xl font-semibold text-gold mb-3">{s.title}</h2>
                    <Separator className="mb-4 bg-gold" />
                    <p className="text-black leading-relaxed whitespace-pre-line">{s.content}</p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
