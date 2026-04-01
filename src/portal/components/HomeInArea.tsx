export default function HomeArea() {

  return (
    <section className="w-full max-w-5xl text-center m-auto py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <h6 className="text-muted-foreground font-serif font-bold tracking-tight mb-6">FIND US</h6>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black font-bold tracking-tight mb-6">
           Location & Getting There
          </h1>
     <div className="mt-3 h-[230px] w-full overflow-hidden rounded-xl border">
     <iframe
          title="Map Preview"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Pakistan&output=embed"
  />
</div>
    </section>
  );
}
