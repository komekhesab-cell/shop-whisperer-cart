import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/store/Header";
import Hero from "@/components/store/Hero";
import ProductCard from "@/components/store/ProductCard";
import ProductDetail from "@/components/store/ProductDetail";
import CartDrawer from "@/components/store/CartDrawer";
import { products, type Product } from "@/data/products";

// Replace with your WhatsApp number (with country code, no + sign)
const WHATSAPP_NUMBER = "994509690680";

function StorePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={() => setCartOpen(true)} />
      <Hero />

      {/* Collection */}
      <section id="collection" className="container mx-auto px-4 py-16 sm:px-8 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance animate-reveal-up">
            The Collection
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            Each piece is crafted with care from natural materials, designed to last beyond seasons.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* About */}
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

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 sm:flex-row sm:justify-between sm:px-8">
          <span className="font-display text-sm text-foreground">Maison</span>
          <p className="font-sans text-xs text-muted-foreground">
            © 2026 Maison. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} whatsappNumber={WHATSAPP_NUMBER} />
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <StorePage />
    </CartProvider>
  );
}
