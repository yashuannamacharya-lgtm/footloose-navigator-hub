import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Get In Touch</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              We'd Love to <span className="text-primary">Hear From You</span>
            </h1>
            <p className="text-muted-foreground">Have a question or feedback? Drop us a message and we'll get back to you within 24 hours.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                <input className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input type="email" className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                <textarea rows={5} className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Tell us what's on your mind..." />
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </motion.form>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {[
                { icon: MapPin, title: "Visit Us", detail: "123 Fashion Avenue, New York, NY 10001" },
                { icon: Mail, title: "Email Us", detail: "hello@footrush.com" },
                { icon: Phone, title: "Call Us", detail: "+1 (555) 123-4567" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
