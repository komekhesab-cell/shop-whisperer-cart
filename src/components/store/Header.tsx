import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <a href="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
          Maison
        </a>

        <nav className="hidden gap-8 font-sans text-sm tracking-wide text-muted-foreground sm:flex">
          <a href="#collection" className="transition-colors hover:text-foreground">Collection</a>
          <a href="#about" className="transition-colors hover:text-foreground">About</a>
        </nav>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform active:scale-[0.97]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Basket</span>
          {totalItems > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
