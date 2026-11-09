import { createContext, useContext, useState, type ReactNode } from "react";

interface Store {
  cart: string[];
  wishlist: string[];
  add: (id: string) => void;
  toggleWish: (id: string) => void;
}
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  return (
    <Ctx.Provider
      value={{
        cart,
        wishlist,
        add: (id) => setCart((c) => [...c, id]),
        toggleWish: (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
