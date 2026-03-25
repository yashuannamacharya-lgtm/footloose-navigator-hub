import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCart((s) => s.totalItems());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-primary">
          FOOT<span className="text-foreground">RUSH</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                      location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
