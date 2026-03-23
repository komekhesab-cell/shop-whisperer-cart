import { X, Minus, Plus, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export default function CartDrawer({ isOpen, onClose, whatsappNumber }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const lines = items.map(
      (i) =>
        `• ${i.product.name}${i.size ? ` (${i.size})` : ""} × ${i.quantity} — $${(i.product.price * i.quantity).toFixed(2)}`
    );
    const message = [
      "Hi! I'd like to order:",
      "",
      ...lines,
      "",
      `Total: $${totalPrice.toFixed(2)}`,
      "",
      "Please let me know the next steps!",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={onClose} />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-card shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-display text-lg font-medium text-foreground">Your Basket</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted active:scale-[0.95]"
            aria-label="Close basket"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="font-sans text-sm text-muted-foreground">Your basket is empty</p>
              <button
                onClick={onClose}
                className="mt-4 font-sans text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.product.id}__${item.size || ""}`} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-16 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-sm font-medium text-foreground">
                        {item.product.name}
                      </h4>
                      {item.size && (
                        <p className="font-sans text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="font-sans text-sm tabular-nums text-muted-foreground">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border text-foreground transition-colors hover:bg-muted active:scale-[0.95]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-sans text-sm tabular-nums font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border text-foreground transition-colors hover:bg-muted active:scale-[0.95]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="ml-auto font-sans text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-muted-foreground">Total</span>
              <span className="font-sans text-lg font-semibold tabular-nums text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(142,70%,41%)] py-3.5 font-sans text-sm font-medium text-white transition-transform hover:shadow-lg active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
