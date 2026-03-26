import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product, products as fallbackProducts, resolveImage } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) return fallbackProducts;

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category,
        image: resolveImage(p.image_url),
        tag: p.tag ?? undefined,
      }));
    },
  });
};
