import { X, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import type { SizeStock } from "@/data/categories";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return null;

  const sizes: SizeStock[] = Array.isArray((product as any).sizes)
    ? (product as any).sizes
    : [];
  const hasSizes = sizes.length > 0;

  const handleAdd = () => {
    if (hasSizes && !selectedSize) return;
    addToCart(product, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const selectedInStock = selectedSize
    ? sizes.find((s) => s.size === selectedSize)?.in_stock ?? true
    : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={onClose} />

      <div className="relative z-10 mx-4 grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-card shadow-2xl animate-reveal-up sm:grid-cols-2">
        <div className="relative aspect-[4/5] sm:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between overflow-y-auto p-6 sm:p-8">
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

            {/* Sizes */}
            {hasSizes && (
              <div className="mt-6">
                <h3 className="mb-2 font-sans text-sm font-medium text-foreground">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    const outOfStock = !s.in_stock;

                    return (
                      <button
                        key={s.size}
                        onClick={() => !outOfStock && setSelectedSize(s.size)}
                        disabled={outOfStock}
                        className={`
                          relative flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg border px-3 font-sans text-sm transition-all
                          ${isSelected
                            ? "border-foreground bg-foreground text-background"
                            : outOfStock
                              ? "border-muted bg-muted text-muted-foreground/40 cursor-not-allowed line-through"
                              : "border-border bg-background text-foreground hover:border-foreground/50"
                          }
                        `}
                      >
                        {s.size}
                        {outOfStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="absolute h-px w-[80%] rotate-[-20deg] bg-muted-foreground/30" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
            disabled={hasSizes && (!selectedSize || !selectedInStock)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 font-sans text-sm font-medium text-background transition-transform active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added to Basket
              </>
            ) : hasSizes && !selectedSize ? (
              "Select a Size"
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
