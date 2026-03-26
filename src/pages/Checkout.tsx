import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "", card: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setForm(f => ({
          ...f,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || "",
        }));
      }
    });
  }, []);

  const shipping = totalPrice() > 100 ? 0 : 9.99;
  const total = totalPrice() + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip || !form.card) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!user) {
      toast.error("Please sign in to place an order");
      navigate("/auth");
      return;
    }

    setLoading(true);

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: total,
        shipping_name: form.name,
        shipping_email: form.email,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_zip: form.zip,
      })
      .select()
      .single();

    if (orderError) {
      toast.error("Failed to place order. Please try again.");
      setLoading(false);
      return;
    }

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    setLoading(false);

    if (itemsError) {
      toast.error("Order created but some items failed to save.");
    }

    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl font-bold mb-3">Order Placed!</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/orders"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                View Orders
              </Link>
              <Link
                to="/shop"
                className="border border-border text-foreground px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:bg-secondary transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-10"
          >
            Check<span className="text-primary">out</span>
          </motion.h1>

          {!user && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground">
                <Link to="/auth" className="text-primary font-semibold hover:underline">Sign in</Link> to place your order and track it later.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-display text-xl font-bold mb-2">Shipping Information</h2>
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                  { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
                  { label: "Address", name: "address", type: "text", placeholder: "123 Main St" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as any)[f.name]}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">City</label>
                    <input name="city" placeholder="New York" value={form.city} onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                    <input name="zip" placeholder="10001" value={form.zip} onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-display text-xl font-bold mb-2">Payment</h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                  <input name="card" placeholder="•••• •••• •••• ••••" value={form.card} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24"
            >
              <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </motion.div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
