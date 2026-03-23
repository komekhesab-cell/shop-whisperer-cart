import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/store/Header";
import Hero from "@/components/store/Hero";
import ProductCard from "@/components/store/ProductCard";
import ProductDetail from "@/components/store/ProductDetail";
import CartDrawer from "@/components/store/CartDrawer";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/data/categories";

const WHATSAPP_NUMBER = "994509690680";

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { data: products = [], isLoading } = useProducts();

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.image && p.image.trim() !== "")
      .filter((p) => activeCategory === "all" || p.category === activeCategory)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, activeCategory, search]);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={() => setCartOpen(true)} />
      <Hero />

      <section id="collection" className="container mx-auto px-4 py-16 sm:px-8 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance animate-reveal-up">
            The Collection
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            Each piece is crafted with care from natural materials, designed to last beyond seasons.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-9 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${activeCategory === "all" ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat.value ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-muted-foreground hover:text-foreground"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-muted" />
              ))
            : filtered.length === 0
              ? <p className="col-span-full text-center text-sm text-muted-foreground py-12">No products found.</p>
              : filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} index={i} />
              ))}
        </div>
      </section>

      <section id="about" className="border-t bg-card">
        <div className="container mx-auto px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center animate-reveal-up">
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground text-balance">
              Made with intention
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
              We believe in slow fashion — fewer pieces, better quality, honest prices.
              Every garment is made from natural, responsibly sourced materials in small batches.
              No sales, no markdowns, no waste.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 sm:flex-row sm:justify-between sm:px-8">
          <span className="font-display text-sm text-foreground">Maison</span>
          <p className="font-sans text-xs text-muted-foreground">© 2026 Maison. All rights reserved.</p>
        </div>
      </footer>

      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} whatsappNumber={WHATSAPP_NUMBER} />
    </div>
  );
}
