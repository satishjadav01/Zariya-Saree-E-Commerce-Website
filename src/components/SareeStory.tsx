import { useRef } from "react";
import zari from "@/assets/zari.jpg";
import hero from "@/assets/hero.jpg";
import emerald from "@/assets/emerald.jpg";
import { useGsap, gsap } from "@/hooks/useGsap";

const chapters = [
  { n: "I", t: "The Drape Unfolds", d: "Six yards of hand-loomed katan silk, released across the frame." },
  { n: "II", t: "Threads of Real Zari", d: "Silver wire, gilded in gold, beaten fine and woven into paisley by hand." },
  { n: "III", t: "From Maroon to Emerald", d: "Every loom tells a new colour story. Kanchipuram's temple borders, in jewel green." },
];

/**
 * Pinned cinematic sequence: a narrow fabric strip expands to full screen,
 * zooms into zari detail, then wipes to a new saree colourway.
 */
export function SareeStory() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (reduced) => {
    if (reduced) {
      gsap.set(".st-frame", { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ref.current, start: "top top", end: "+=350%", scrub: 0.8, pin: ".st-stage" },
    });
    // Ch I: fabric strip expands across screen
    tl.fromTo(".st-frame", { clipPath: "inset(18% 38% 18% 38% round 200px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
      .fromTo(".st-base", { scale: 1.6, xPercent: 6 }, { scale: 1.1, xPercent: 0, duration: 1 }, 0)
      .fromTo(".st-title-0", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 0.3)
      // Ch II: zari macro reveal with circular aperture
      .to(".st-title-0", { opacity: 0, y: -60, duration: 0.3 }, 1.1)
      .fromTo(".st-zari", { clipPath: "circle(0% at 60% 50%)", scale: 1.35 }, { clipPath: "circle(80% at 60% 50%)", scale: 1, duration: 1 }, 1.1)
      .to(".st-zari", { xPercent: -4, duration: 1 }, 2.1)
      .fromTo(".st-title-1", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 1.6)
      // Ch III: wipe to emerald
      .to(".st-title-1", { opacity: 0, y: -60, duration: 0.3 }, 2.4)
      .fromTo(".st-emerald", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 2.4)
      .fromTo(".st-emerald img", { scale: 1.3, xPercent: 8 }, { scale: 1.05, xPercent: 0, duration: 1.2 }, 2.4)
      .fromTo(".st-title-2", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 3)
      .to(".st-progress", { scaleX: 1, duration: 3.6 }, 0);
  });

  return (
    <section id="story" ref={ref} className="relative bg-umber text-umber-foreground">
      <div className="st-stage relative h-svh overflow-hidden">
        <div className="st-frame absolute inset-0 overflow-hidden will-change-[clip-path]">
          <img src={hero} alt="" aria-hidden width={1920} height={1088} loading="lazy" className="st-base absolute inset-0 h-full w-full object-cover object-[55%_70%]" />
          <img src={zari} alt="Macro of gold zari paisley embroidery on maroon silk" width={1920} height={1088} loading="lazy" className="st-zari absolute inset-0 h-full w-full object-cover" />
          <div className="st-emerald absolute inset-0 overflow-hidden">
            <img src={emerald} alt="Model in emerald Kanjivaram silk saree in a marble courtyard" width={1920} height={1088} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="veil absolute inset-0 opacity-70" />
        </div>

        {chapters.map((c, i) => (
          <div key={c.n} className={`st-title-${i} pointer-events-none absolute inset-x-0 bottom-20 z-10 mx-auto max-w-7xl px-6 opacity-0 md:bottom-28 md:px-10`}>
            <p className="eyebrow mb-4 text-gold">Chapter {c.n}</p>
            <h2 className="max-w-3xl text-5xl leading-none md:text-7xl">{c.t}</h2>
            <p className="mt-5 max-w-md text-umber-foreground/80">{c.d}</p>
          </div>
        ))}

        <div className="absolute inset-x-6 top-28 z-10 mx-auto flex max-w-7xl items-center gap-4 md:inset-x-10">
          <span className="eyebrow text-[0.6rem] text-umber-foreground/70">The Weave</span>
          <span className="h-px flex-1 bg-umber-foreground/20"><span className="st-progress block h-full origin-left scale-x-0 bg-gold" /></span>
        </div>
      </div>
    </section>
  );
}
