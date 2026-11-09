import { useLayoutEffect, useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Run a GSAP setup scoped to a ref; auto-reverted on unmount. Receives reduced-motion flag. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (reduced: boolean) => void, deps: unknown[] = []) {
  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => setup(reduced), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
