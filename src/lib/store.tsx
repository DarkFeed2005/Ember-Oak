import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { findProduct, priceFor, type Weight } from "../data/products";

export interface CartLine {
  key: string;
  productId: string;
  weight: Weight;
  qty: number;
}

export interface Toast {
  id: number;
  msg: string;
}

interface Store {
  lines: CartLine[];
  add: (productId: string, weight: Weight, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  toasts: Toast[];
  toast: (msg: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((msg: string) => {
    const id = ++idRef.current;
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  const add = useCallback((productId: string, weight: Weight, qty: number) => {
    const key = `${productId}::${weight}`;
    setLines((ls) => {
      const hit = ls.find((l) => l.key === key);
      if (hit) {
        return ls.map((l) =>
          l.key === key ? { ...l, qty: Math.min(20, l.qty + qty) } : l,
        );
      }
      return [...ls, { key, productId, weight, qty: Math.min(20, qty) }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((ls) =>
      qty <= 0
        ? ls.filter((l) => l.key !== key)
        : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((ls) => ls.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      c += l.qty;
      s += priceFor(findProduct(l.productId), l.weight) * l.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value = useMemo(
    () => ({ lines, add, setQty, remove, clear, count, subtotal, toasts, toast }),
    [lines, add, setQty, remove, clear, count, subtotal, toasts, toast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

export const FREE_SHIPPING_AT = 45;
export const SHIPPING_FEE = 5.95;

