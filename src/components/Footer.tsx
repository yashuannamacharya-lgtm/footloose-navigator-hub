import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-bold text-primary mb-3">
              FOOT<span className="text-foreground">RUSH</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium footwear for those who refuse to compromise on style and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              {["FAQ", "Shipping", "Returns", "Size Guide"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">Get exclusive drops & offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-muted border border-border rounded-l-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FootRush. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
