import { useRef } from "react";
import weaver from "@/assets/weaver.jpg";
import zari from "@/assets/zari.jpg";
import { useGsap, gsap } from "@/hooks/useGsap";

const stats = [
  { v: "214", l: "Master weavers" },
  { v: "42", l: "Days per saree" },
  { v: "1897", l: "Our first loom" },
];

export function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, (reduced) => {
    if (reduced) return;
    gsap.fromTo(".bs-img", { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: ref.current, scrub: true } });
    gsap.fromTo(".bs-mask", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "power2.out", scrollTrigger: { trigger: ".bs-mask", start: "top 85%", end: "top 30%", scrub: true } });
    gsap.from(".bs-line", { yPercent: 100, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".bs-copy", start: "top 75%" } });
  });
  return (
    <section id="craft" ref={ref} className="bg-umber px-6 py-28 text-umber-foreground md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-12">
        <div className="bs-mask relative aspect-[4/5] overflow-hidden md:col-span-6">
          <img src={weaver} alt="Weaver's hands working gold threads on a wooden handloom" width={1280} height={1600} loading="lazy" className="bs-img h-[124%] w-full object-cover" />
        </div>
        <div className="bs-copy md:col-span-5 md:col-start-8">
          <p className="eyebrow text-gold">Our Craft</p>
          <h2 className="mt-6 text-5xl leading-[1.02] md:text-6xl">
            {["Woven by hands", "that remember", "every pattern."].map((l) => (
              <span key={l} className="block overflow-hidden"><span className="bs-line block">{l}</span></span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-umber-foreground/75">For four generations, Zariya has partnered directly with weaving families in Varanasi and Kanchipuram. No power looms, no shortcuts — only pure silk, real zari, and the patience of a craft passed from parent to child.</p>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-umber-foreground/15 pt-8">
            {stats.map((s) => (
              <div key={s.l}><dt className="eyebrow text-[0.55rem] text-umber-foreground/60">{s.l}</dt><dd className="mt-2 font-display text-4xl text-gold">{s.v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <div className="relative mx-auto mt-32 max-w-7xl overflow-hidden">
        <img src={zari} alt="" aria-hidden width={1920} height={1088} loading="lazy" className="h-[40vh] w-full object-cover opacity-40" />
        <p className="absolute inset-0 grid place-items-center px-6 text-center font-display text-3xl italic md:text-5xl">“A saree is not worn. It is inherited.”</p>
      </div>
    </section>
  );
}
