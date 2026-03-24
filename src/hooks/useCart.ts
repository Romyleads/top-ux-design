import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  emoji: string;
  price: string;
  tierName: string;
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
    const key = `${item.id}__${item.tierName}`;
    setItems((prev) => {
      const existing = prev.find((i) => `${i.id}__${i.tierName}` === key);
      if (existing) {
        return prev.map((i) => (`${i.id}__${i.tierName}` === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const itemKey = (item: CartItem) => `${item.id}__${item.tierName}`;

  const changeQty = useCallback((id: string, tierName: string, delta: number) => {
    const key = `${id}__${tierName}`;
    setItems((prev) =>
      prev
        .map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string, tierName: string) => {
    const key = `${id}__${tierName}`;
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
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
