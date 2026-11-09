import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categories, productsQuery, formatINR, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { useStore } from "@/lib/cart";
import { useGsap, gsap } from "@/hooks/useGsap";
import { cn } from "@/lib/utils";

/** Horizontal scroll-driven category reel (pinned) */
export function CategoryReel() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, (reduced) => {
    if (reduced || window.innerWidth < 768) return;
    const track = ref.current!.querySelector<HTMLElement>(".reel-track")!;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: () => "+=" + (track.scrollWidth - window.innerWidth), scrub: 0.8, pin: true, invalidateOnRefresh: true },
    });
    gsap.utils.toArray<HTMLElement>(".reel-img").forEach((img) => {
      gsap.fromTo(img, { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: () => "+=" + (track.scrollWidth - window.innerWidth), scrub: true } });
    });
  });

  return (
    <section id="collections" ref={ref} className="relative overflow-hidden bg-background py-24 md:flex md:h-svh md:items-center md:py-0">
      <div className="reel-track flex flex-col gap-10 px-6 md:flex-row md:gap-8 md:px-10">
        <div className="flex shrink-0 flex-col justify-center md:w-[32vw]">
          <p className="eyebrow text-primary">The Collections</p>
          <h2 className="mt-4 text-5xl leading-none md:text-7xl">Six looms,<br /><em>six legacies.</em></h2>
          <p className="mt-6 max-w-sm text-muted-foreground">From the ghats of Varanasi to the temple towns of Tamil Nadu — each weave carries centuries of inherited craft.</p>
        </div>
        {products.map((p, i) => (
          <a key={p.id} href="#shop" className="group relative block shrink-0 overflow-hidden md:h-[70vh] md:w-[28vw]" style={{ marginTop: i % 2 ? "8vh" : 0 }}>
            <div className="aspect-[3/4] h-full w-full overflow-hidden">
              <img src={p.image} alt={p.alt} width={896} height={1200} loading="lazy" className="reel-img h-full w-[120%] max-w-none -translate-x-[8%] object-cover transition-[filter] duration-700 group-hover:brightness-110" />
            </div>
            <div className="veil absolute inset-0 opacity-80" />
            <div className="absolute bottom-6 left-6 text-umber-foreground">
              <p className="eyebrow text-gold text-[0.6rem]">0{i + 1}</p>
              <h3 className="text-4xl">{p.category}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Collection() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const [cat, setCat] = useState<Category | "All">("All");
  const [quick, setQuick] = useState<Product | null>(null);
  const { add } = useStore();
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <section id="shop" className="bg-card px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-primary">Featured</p>
            <h2 className="mt-4 text-5xl md:text-7xl">The Atelier Edit</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist">
            {(["All", ...categories] as const).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("eyebrow border px-4 py-2 text-[0.6rem] transition-colors", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.95 }}>
                <ProductCard p={p} onQuickView={setQuick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {quick && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-umber/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQuick(null)} role="dialog" aria-modal aria-label={quick.name}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto bg-background md:grid-cols-2">
              <img src={quick.image} alt={quick.alt} width={896} height={1200} className="aspect-[3/4] w-full object-cover" />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <button onClick={() => setQuick(null)} aria-label="Close" className="absolute right-4 top-4"><X className="size-5" /></button>
                <p className="eyebrow text-primary">{quick.category}</p>
                <h3 className="mt-3 text-4xl">{quick.name}</h3>
                <p className="mt-2 font-display text-2xl">{formatINR(quick.price)}</p>
                <p className="mt-6 text-muted-foreground">{quick.description}</p>
                <div className="mt-6 flex gap-2">{quick.colors.map((c) => <span key={c} className="size-5 rounded-full ring-1 ring-border" style={{ background: c }} />)}</div>
                <button onClick={() => { add(quick.id); setQuick(null); }} className="btn-gold eyebrow mt-10 py-4">Add to bag</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
