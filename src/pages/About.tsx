import { motion } from "framer-motion";
import { Award, Heart, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Award, title: "Craftsmanship", desc: "Every pair is handcrafted using premium materials sourced from the finest tanneries worldwide." },
  { icon: Heart, title: "Passion", desc: "We pour our love for design into every stitch, sole, and silhouette we create." },
  { icon: Globe, title: "Sustainability", desc: "Committed to reducing our footprint with eco-conscious materials and ethical production." },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Born From a Love of <span className="text-primary">Fine Footwear</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              FootRush was founded in 2024 with a singular vision: to create footwear that marries timeless elegance with modern comfort. What started as a small atelier has grown into a brand trusted by style-conscious individuals around the world.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "200+", label: "Unique Designs" },
              { num: "15", label: "Countries" },
              { num: "4.9★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center bg-card border border-border rounded-xl p-6"
              >
                <p className="font-display text-3xl font-bold text-primary">{stat.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              What We <span className="text-primary">Stand For</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
