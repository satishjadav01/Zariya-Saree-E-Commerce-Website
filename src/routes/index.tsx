import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SareeStory } from "@/components/SareeStory";
import { CategoryReel, Collection } from "@/components/Collection";
import { BrandStory } from "@/components/BrandStory";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/lib/cart";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { productsQuery } from "@/lib/products";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "Zariya — Handwoven Luxury Sarees" },
      { name: "description", content: "Banarasi, Kanjivaram, silk and bridal sarees handwoven with real zari by master weavers." },
      { property: "og:title", content: "Zariya — Elegance Woven in Every Thread" },
      { property: "og:description", content: "Discover handwoven luxury sarees from Varanasi and Kanchipuram." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <StoreProvider>
      <Navbar />
      <main>
        <Hero />
        <SareeStory />
        <CategoryReel />
        <Collection />
        <BrandStory />
      </main>
      <Footer />
    </StoreProvider>
  );
}
