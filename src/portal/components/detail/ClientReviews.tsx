import { Card } from "@public/components/ui/card";
import { Button } from "@public/components/ui/button";
import { Star } from "lucide-react";

type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
};

type Props = {
  // eyebrow: string;
  title: string;
  cReviews: Review[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// export default function ClientReviews({ eyebrow, title, cReviews }: Props) {
export default function ClientReviews({ title, cReviews }: Props) {
  return (
    <section className="bg-[#fbf8f2] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          {/* <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
            {eyebrow}
          </p> */}
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Reviews */}
        <div className="mx-auto max-w-4xl space-y-6">
          {cReviews.map((review, i) => (
            <Card
              key={i}
              className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
            >
              {/* Top */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs font-bold text-gray-500">
                    {review.location}
                  </p>
                </div>

                <Stars rating={review.rating} />
              </div>

              {/* Text */}
              <p className="mb-6 text-sm font-bold leading-relaxed text-gray-700">
                {review.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-gray-500">
                    {review.location}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-1 font-bold border-red-400 px-4 text-xs text-red-500 bg-red-50 hover:text-red-400 hover:bg-white"
                >
                  Response
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
