import { useState } from "react";
import emerald from "@/assets/emerald.jpg";
import { scrollToId } from "@/hooks/useSmoothScroll";

export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-background">
      <section className="relative overflow-hidden">
        <img src={emerald} alt="" aria-hidden width={1920} height={1088} loading="lazy" className="h-[80vh] w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-umber-foreground">
          <p className="eyebrow text-gold">Private Appointments</p>
          <h2 className="mt-5 max-w-3xl text-5xl leading-none md:text-7xl">Find the saree<br /><em>you'll pass on.</em></h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToId("shop")} className="btn-gold eyebrow px-8 py-4">Shop the Edit</button>
            <a href="mailto:atelier@zariya.in" className="eyebrow border border-umber-foreground/50 px-8 py-4 hover:bg-umber-foreground hover:text-umber transition-colors">Book a Stylist</a>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-4xl tracking-[0.3em]">ZARIYA</p>
          <p className="mt-4 max-w-xs text-muted-foreground">Handwoven Indian couture since 1897.</p>
          <form className="mt-8 flex max-w-sm border-b border-foreground/30" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" type="email" required placeholder="Join the atelier letter" className="flex-1 bg-transparent py-3 outline-none placeholder:text-muted-foreground" />
            <button className="eyebrow text-primary">{done ? "Thank you" : "Subscribe"}</button>
          </form>
        </div>
        {[
          { h: "Shop", l: ["Banarasi", "Kanjivaram", "Wedding", "Festive"] },
          { h: "House", l: ["Our Craft", "Stores", "Care Guide", "Contact"] },
        ].map((c) => (
          <div key={c.h}>
            <p className="eyebrow text-primary">{c.h}</p>
            <ul className="mt-5 space-y-3 text-muted-foreground">{c.l.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="eyebrow border-t border-border px-6 py-6 text-center text-[0.55rem] text-muted-foreground">© 2026 Zariya Handlooms · Varanasi · Kanchipuram</p>
    </footer>
  );
}
