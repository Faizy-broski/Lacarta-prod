import { Button } from "@public/components/ui/button";

export default function Newsletter() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/overlayed.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center text-white">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase font-antigua">
          Cartagena Newsletter
        </h2>
        <p className="my-4 text-xs sm:text-base md:text-xl opacity-90">
          Get the latest discounts, deals, coupons, news, &amp; tips of Cartagena.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex bg-white rounded overflow-hidden p-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 bg-white text-black placeholder:px-3 outline-none text-sm"
            />
            <Button className="text-white hidden sm:block w-[200px] my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
              Subscribe
            </Button>
          </div>
          <Button className="text-white sm:hidden w-full my-auto rounded px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
