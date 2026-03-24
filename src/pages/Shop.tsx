import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const Shop = () => {
  const [active, setActive] = useState("All");
  const addItem = useCart((s) => s.addItem);
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Our <span className="text-primary">Collection</span>
          </motion.h1>
          <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
            Handcrafted footwear designed for those who appreciate quality and style.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="relative bg-secondary/30 p-6 flex items-center justify-center h-64">
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-48 w-48 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-display text-lg font-semibold">{product.name}</h3>
                    <p className="text-primary font-semibold mt-1">${product.price}</p>
                  </div>
                  <button className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
