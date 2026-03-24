import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import shoe4 from "@/assets/shoe-4.png";
import shoe5 from "@/assets/shoe-5.png";
import shoe6 from "@/assets/shoe-6.png";
import heroShoe from "@/assets/hero-shoe.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

export const products: Product[] = [
  { id: "1", name: "Aurelius Gold Edition", price: 249, category: "Sneakers", image: shoe1, tag: "New" },
  { id: "2", name: "Obsidian High-Top", price: 199, category: "Sneakers", image: shoe2, tag: "Best Seller" },
  { id: "3", name: "Neptune Runner", price: 189, category: "Running", image: shoe3, tag: "Popular" },
  { id: "4", name: "Windsor Chelsea Boot", price: 329, category: "Boots", image: shoe4 },
  { id: "5", name: "Ivory Slip-On", price: 149, category: "Casual", image: shoe5 },
  { id: "6", name: "Blaze Court Pro", price: 219, category: "Athletic", image: shoe6, tag: "Limited" },
  { id: "7", name: "Luxe Stride Premium", price: 279, category: "Sneakers", image: heroShoe, tag: "Featured" },
];
