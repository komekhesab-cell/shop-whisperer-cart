import heroImage from "@/assets/hero-fashion.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid min-h-[70vh] lg:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
          <p
            className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground animate-reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            Spring / Summer 2026
          </p>
          <h1
            className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance animate-reveal-up"
            style={{ animationDelay: "0.25s" }}
          >
            Thoughtful clothing for everyday life
          </h1>
          <p
            className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground animate-reveal-up"
            style={{ animationDelay: "0.4s" }}
          >
            Natural fabrics, timeless silhouettes, honest pricing. Pieces designed to be worn, loved, and kept.
          </p>
          <div className="mt-8 animate-reveal-up" style={{ animationDelay: "0.55s" }}>
            <a
              href="#collection"
              className="inline-flex items-center rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-transform hover:shadow-lg active:scale-[0.97]"
            >
              View Collection
            </a>
          </div>
        </div>

        {/* Image side */}
        <div className="relative min-h-[50vh] lg:min-h-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <img
            src={heroImage}
            alt="Curated clothing collection on a rack"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
