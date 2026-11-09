import { motion } from "framer-motion";
import { Heart, Eye, Plus } from "lucide-react";
import { type Product, formatINR } from "@/lib/products";
import { useStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ p, onQuickView }: { p: Product; onQuickView: (p: Product) => void }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(p.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img src={p.image} alt={p.alt} width={896} height={1200} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-umber/0 transition-colors duration-500 group-hover:bg-umber/20" />
        <button onClick={() => toggleWish(p.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/85 backdrop-blur transition-transform hover:scale-110">
          <Heart className={cn("size-4", wished && "fill-primary text-primary")} strokeWidth={1.5} />
        </button>
        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button onClick={() => onQuickView(p)} className="eyebrow flex flex-1 items-center justify-center gap-2 bg-background/95 py-3 text-[0.6rem]"><Eye className="size-3.5" /> Quick view</button>
          <button onClick={() => add(p.id)} className="btn-gold eyebrow flex flex-1 items-center justify-center gap-2 py-3 text-[0.6rem]"><Plus className="size-3.5" /> Add to bag</button>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 text-2xl">{p.name}</h3>
          <div className="mt-2 flex gap-1.5" aria-label="Available colours">
            {p.colors.map((c) => <span key={c} className="size-3 rounded-full ring-1 ring-border ring-offset-1 ring-offset-background" style={{ background: c }} />)}
          </div>
        </div>
        <p className="font-display text-xl">{formatINR(p.price)}</p>
      </div>
    </motion.article>
  );
}
