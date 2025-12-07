import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { AuthDialog } from "@/components/auth/AuthDialog";
import CartDropdown from "@/components/CartDropdown";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const location = useLocation();
  const { toggleCart, getCartCount } = useCart();
  const { user, signOut } = useAuth();
  const { wishlistItems } = useWishlist();

  const navigationItems = [
    { name: "Shop All", href: "/shop" },
    { name: "Skincare", href: "/shop/skincare" },
    { name: "Hair Care", href: "/shop/hair-care" },
    { name: "Body Care", href: "/shop/bath-and-body" },
    { name: "Kits & Gifts", href: "/shop/kits-and-gifts" },
    { name: "Beauty Quiz", href: "/style-quiz" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      {/* Top notification bar - full width */}
      <div className="py-2 text-center text-sm bg-gradient-hero text-primary-foreground w-full">
        Free shipping on orders over ₹2000 • Beauty Quiz: Find your perfect routine
      </div>
      
      <div className="container mx-auto px-4">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-playfair text-2xl font-semibold text-primary">
            Adornn
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-inter text-sm transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search body care products..."
                  className="pl-10 w-64 bg-secondary/50 border-border/50 focus:bg-background"
                />
              </div>
            </div>

            {/* Actions */}
            <Link to="/account">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {getCartCount() > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                >
                  {getCartCount()}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowAuthDialog(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In / Sign Up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search body care products..."
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
              
              {/* Mobile Menu Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-inter text-sm py-2 transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <CartDropdown />
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
    </header>
  );
};

export default Navigation;