import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/cart";
import { scrollToId } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";

const links = [
  { id: "story", label: "The Weave" },
  { id: "collections", label: "Collections" },
  { id: "shop", label: "Shop" },
  { id: "craft", label: "Craft" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, wishlist } = useStore();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/90 text-foreground shadow-sm backdrop-blur-md" : "bg-transparent text-umber-foreground",
      )}
    >
      <nav className={cn("mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-10", scrolled ? "h-16" : "h-24")}>
        <ul className="hidden gap-8 md:flex">
          {links.slice(0, 2).map((l) => (
            <li key={l.id}><button onClick={() => go(l.id)} className="eyebrow hover:text-gold transition-colors">{l.label}</button></li>
          ))}
        </ul>
        <button onClick={() => window.scrollTo({ top: 0 })} className="font-display text-2xl tracking-[0.3em] md:text-3xl" aria-label="Zariya home">
          ZARIYA
        </button>
        <div className="flex items-center gap-6">
          <ul className="hidden gap-8 md:flex">
            {links.slice(2).map((l) => (
              <li key={l.id}><button onClick={() => go(l.id)} className="eyebrow hover:text-gold transition-colors">{l.label}</button></li>
            ))}
          </ul>
          <span className="relative" aria-label={`${wishlist.length} wishlist items`}>
            <Heart className="size-5" strokeWidth={1.25} />
            {wishlist.length > 0 && <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-gold text-[10px] text-umber">{wishlist.length}</span>}
          </span>
          <span className="relative" aria-label={`${cart.length} items in bag`}>
            <ShoppingBag className="size-5" strokeWidth={1.25} />
            {cart.length > 0 && <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-gold text-[10px] text-umber">{cart.length}</span>}
          </span>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </nav>
      {open && (
        <ul className="flex flex-col gap-4 bg-background px-6 pb-6 text-foreground md:hidden">
          {links.map((l) => <li key={l.id}><button onClick={() => go(l.id)} className="eyebrow">{l.label}</button></li>)}
        </ul>
      )}
    </header>
  );
}
