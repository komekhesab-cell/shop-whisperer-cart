import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onViewDetails, index }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="group animate-reveal-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-secondary"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />

        {/* Quick add */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 active:scale-[0.95]"
          aria-label={`Add ${product.name} to basket`}
        >
          <Plus className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
          {product.category}
        </span>
        <h3
          className="cursor-pointer font-sans text-sm font-medium text-foreground transition-colors hover:text-primary"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="font-sans text-sm tabular-nums text-muted-foreground">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
