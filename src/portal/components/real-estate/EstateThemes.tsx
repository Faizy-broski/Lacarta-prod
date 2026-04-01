// components/RealEstateThemes.tsx
import { Badge } from "@public/components/ui/badge";
const fishImg = "/assets/real-estate/Collection projects.png";

const featured = {
  id: "collection",
  title: "COLLECTION™ Projects",
  image: fishImg,
  tag: "COLLECTION",
};
const themes = [
  [
    {
      id: "sale",
      title: "Home For Sale",
      image: fishImg,
      image2: fishImg,
      tag: "SALE",
      orderClass: "1.7fr_2.3fr",
    },
    {
      id: "rent",
      title: "Homes For Rent",
      image: fishImg,
      image2: fishImg,
      tag: "FOR RENT",
      orderClass: "2.3fr_1.7fr",
    },
    {
      id: "offer",
      title: "Homes With Special Offer",
      image: fishImg,
      image2: fishImg,
      tag: "SPECIAL OFFER",
      orderClass: "1.7fr_2.3fr",
    },
  ],
  [
    {
      id: "preConstruction",
      title: "Pre-Construction",
      image: fishImg,
      image2: fishImg,
      tag: "PRE CONSTRUCTION",
      orderClass: "1.7fr_2.3fr",
    },
    {
      id: "historic",
      title: "Historic Center",
      image: fishImg,
      image2: fishImg,
      tag: "HISTORIC CENTER",
      orderClass: "2.3fr_1.7fr",
    },
    {
      id: "beach",
      title: "By The Beach",
      image: fishImg,
      image2: fishImg,
      tag: "BEACH",
      orderClass: "1.7fr_2.3fr",
    },
  ],
];

export default function EstateThemes() {
  // const featured = themes.find((t) => t.featured)
  // const others = themes.filter((t) => !t.featured)
  const title = featured.title.split(" ");
  console.log(title);

  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb10 lg:pt-20 lg:pb-12">
      <div className="container px-4 sm:px-6 ">
        <h2 className="text-3xl md:text-4xl font-antigua font-bold mb-6 md:mb-10 text-black/65">
          Real estate projects by theme
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-2">
          {/* LEFT BIG FEATURED */}
          <div className="relative rounded overflow-hidden shadow-2xl group aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px]">
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white font-antigua">
                COLLECTION
                <sup className="font-sans text-muted-foreground text-sm">
                  TM
                </sup>{" "}
                Projects
              </h3>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-2 lg:h-[600px]">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.6fr] gap-2 flex-1">
              <ThemeCard item={themes.flat()[0]} />
              <ThemeCard item={themes.flat()[1]} />
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr] gap-2 flex-1">
              <ThemeCard item={themes.flat()[2]} />
              <ThemeCard item={themes.flat()[3]} />
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.6fr] gap-2 flex-1">
              <ThemeCard item={themes.flat()[4]} />
              <ThemeCard item={themes.flat()[5]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ThemeCard = ({ item }) => (
  <div className="relative rounded overflow-hidden shadow-md group aspect-[16/9] lg:aspect-auto">
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

    <div className="absolute left-4 bottom-4 w-full text-center">
      <h3 className="text-white font-semibold text-lg font-antigua text-left">
        {item.title}
      </h3>
    </div>
  </div>
);
