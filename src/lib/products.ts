import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import blue from "@/assets/p-blue.jpg";
import pink from "@/assets/p-pink.jpg";
import red from "@/assets/p-red.jpg";
import mustard from "@/assets/p-mustard.jpg";
import hero from "@/assets/hero.jpg";
import emerald from "@/assets/emerald.jpg";

export type Category = "Banarasi" | "Silk" | "Kanjivaram" | "Designer" | "Wedding" | "Festive";
export const categories: Category[] = ["Banarasi", "Silk", "Kanjivaram", "Designer", "Wedding", "Festive"];

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  colors: string[];
  image: string;
  alt: string;
  description: string;
}

const imageMap: Record<string, string> = { hero, blue, pink, red, mustard, emerald };

async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").order("created_at");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category as Category,
    price: row.price,
    colors: row.colors,
    image: imageMap[row.image_key] ?? hero,
    alt: row.alt,
    description: row.description,
  }));
}

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000,
});

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
