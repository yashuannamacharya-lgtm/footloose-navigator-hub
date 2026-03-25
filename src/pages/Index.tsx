import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import heroShoe from "@/assets/hero-shoe.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, label: "Premium Quality", desc: "Handcrafted materials" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day return policy" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative flex-1 flex items-center pt-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              New Collection 2026
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              Step Into <br />
              <span className="text-primary">Elegance</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
              Discover premium footwear crafted for those who demand style without compromising on comfort.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="border border-border text-foreground px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:bg-secondary transition-colors">
                Explore
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={heroShoe}
              alt="Premium sneaker from FootRush collection"
              width={1024}
              height={768}
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
