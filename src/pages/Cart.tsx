import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const shipping = totalPrice() > 100 ? 0 : 9.99;
  const total = totalPrice() + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Your <span className="text-primary">Cart</span>
          </motion.h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="flex items-center gap-4 bg-card border border-border rounded-xl p-4"
                    >
                      <div className="h-24 w-24 shrink-0 bg-secondary/30 rounded-lg flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          loading="lazy"
                          width={96}
                          height={96}
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.category}</p>
                        <h3 className="font-display text-lg font-semibold truncate">{item.product.name}</h3>
                        <p className="text-primary font-semibold">${item.product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary/20 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary/20 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-semibold w-20 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors mt-2"
                >
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24"
              >
                <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-primary">Free shipping on orders over $100</p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-md font-medium text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
