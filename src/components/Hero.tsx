import { useRef } from "react";
import { motion } from "framer-motion";
import hero from "@/assets/hero.jpg";
import { useGsap, gsap } from "@/hooks/useGsap";
import { scrollToId } from "@/hooks/useSmoothScroll";

const words = ["Elegance", "Woven", "in", "Every", "Thread"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (reduced) => {
    if (reduced) return;
    gsap.fromTo(".hero-img", { scale: 1.25 }, { scale: 1.08, duration: 2.8, ease: "power3.out" });
    // breathing drift on fabric
    gsap.to(".hero-drift", { xPercent: -1.5, yPercent: 1, rotate: 0.4, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
    // scroll out: image pushes in, copy lifts away
    gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } })
      .to(".hero-drift", { scale: 1.18, yPercent: 8, ease: "none" }, 0)
      .to(".hero-copy", { yPercent: -40, opacity: 0, ease: "none" }, 0);
  });

  return (
    <section ref={ref} className="relative h-svh min-h-[640px] overflow-hidden bg-umber text-umber-foreground">
      <div className="hero-drift absolute inset-0">
        <img src={hero} alt="Model in a maroon Banarasi saree inside a candlelit palace" width={1920} height={1088} className="hero-img h-full w-full object-cover object-[60%_center]" fetchPriority="high" />
      </div>
      <div className="veil absolute inset-0" />
      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-32 md:px-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="eyebrow mb-6 text-gold">
          The Heirloom Collection · 2026
        </motion.p>
        <h1 className="max-w-4xl text-5xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">
          {words.map((w, i) => (
            <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`inline-block ${w === "Thread" ? "italic text-gold-sheen" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.09, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-lg text-umber-foreground/80">Discover the Art of Timeless Indian Tradition</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToId("collections")} className="btn-gold eyebrow px-8 py-4 transition-transform hover:-translate-y-0.5">Explore Collection</button>
            <button onClick={() => scrollToId("shop")} className="eyebrow border border-umber-foreground/50 px-8 py-4 transition-colors hover:bg-umber-foreground hover:text-umber">Shop Now</button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3" aria-hidden>
        <span className="eyebrow text-[0.6rem] text-umber-foreground/70">Scroll</span>
        <span className="relative h-12 w-px bg-umber-foreground/20"><span className="animate-scroll-line absolute inset-0 bg-gold" /></span>
      </div>
    </section>
  );
}
