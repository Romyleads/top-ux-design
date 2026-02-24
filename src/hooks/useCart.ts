import { useState, useCallback } from "react";

export interface CartItem {
  name: string;
  emoji: string;
  price: string;
  qty: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const parsePrice = (str: string): number | null => {
    const m = str.replace(/\./g, "").match(/\d+/);
    return m ? parseInt(m[0]) : null;
  };

  const totalPrice = items.reduce((s, i) => {
    const p = parsePrice(i.price);
    return p ? s + p * i.qty : s;
  }, 0);

  const hasPrice = items.some((i) => parsePrice(i.price) !== null);

  const formatEur = (n: number) => n.toLocaleString("de-DE") + " €";

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const changeQty = useCallback((name: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
    });
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setStep(1);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
    setStep(1);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    items,
    totalItems,
    totalPrice,
    hasPrice,
    formatEur,
    isOpen,
    step,
    setStep,
    addItem,
    changeQty,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };
}
