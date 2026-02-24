import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

interface CartFabProps {
  totalItems: number;
  onOpen: () => void;
}

export default function CartFab({ totalItems, onOpen }: CartFabProps) {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  return (
    <button
      onClick={onOpen}
      className={`fixed bottom-7 right-7 w-[54px] h-[54px] rounded-full bg-foreground border-none text-background shadow-[0_4px_20px_rgba(15,23,42,0.28)] z-[700] flex items-center justify-center hover:scale-[1.07] transition-transform ${
        pop ? "animate-fpop" : ""
      }`}
    >
      <ShoppingCart className="w-[22px] h-[22px]" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-background">
          {totalItems}
        </span>
      )}
    </button>
  );
}
