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
      className={`fixed bottom-7 right-7 w-[60px] h-[60px] rounded-2xl gradient-primary border-none text-primary-foreground shadow-green z-[700] flex items-center justify-center hover:scale-105 hover:shadow-green-hover active:scale-95 transition-all duration-200 ${
        pop ? "animate-fpop" : ""
      }`}
    >
      <ShoppingCart className="w-[22px] h-[22px]" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[10px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-card shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
}
