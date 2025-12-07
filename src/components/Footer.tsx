import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Instagram, PinIcon, Mail } from "lucide-react";
const Footer = () => {
  return <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Adornn</h3>
            <p className="text-sm text-muted-foreground">
              Premium body care products for radiant skin and wellness. Nourish your body with our expertly curated collection.
            </p>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Customer Service</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </Link>
            </nav>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Information</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/care" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Product Care
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Connect</h4>
            <nav className="flex flex-row space-x-4">
              <a 
                href="https://instagram.com/havenlyhome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://pinterest.com/havenlyhome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Pinterest"
              >
                <PinIcon size={20} />
              </a>
              <a 
                href="mailto:newsletter@havenlyhome.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Subscribe to our newsletter"
              >
                <Mail size={20} />
              </a>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">© 2025 Adornn. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;