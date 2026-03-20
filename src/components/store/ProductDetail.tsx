import { X, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 mx-4 grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-card shadow-2xl animate-reveal-up sm:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] sm:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground transition-transform active:scale-[0.95] sm:relative sm:float-right sm:right-0 sm:top-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
              {product.category}
            </span>
            <h2 className="mt-2 font-display text-2xl font-medium leading-tight text-foreground">
              {product.name}
            </h2>
            <p className="mt-1 font-sans text-lg tabular-nums font-medium text-primary">
              ${product.price}
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2 font-sans text-sm text-muted-foreground">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97]"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added to Basket
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Add to Basket
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
