import { ArrowRight, Heart, Star, Truck, Shield, RotateCcw, Bath, Sparkles, Flower2, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products as mockProducts, collections } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProductReviews } from "@/hooks/useProductReviews";
import heroImage from "@/assets/hero-body-care.jpg";

const Index = () => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { products: shopifyProducts, isLoading } = useShopifyProducts();
  const products = shopifyProducts.length > 0 ? shopifyProducts : mockProducts;
  
  // Show all products as featured if we have Shopify products, otherwise filter
  const featuredProducts = shopifyProducts.length > 0 
    ? shopifyProducts.slice(0, 8) 
    : products.filter(p => p.isBestseller || p.isNew);
  const newArrivals = shopifyProducts.length > 0
    ? shopifyProducts.slice(0, 4)
    : products.filter(p => p.isNew);
  const bestsellers = shopifyProducts.length > 0
    ? shopifyProducts.slice(0, 4)
    : products.filter(p => p.isBestseller);
  
  // Get review data for all products displayed on the page
  const allDisplayedProducts = [...featuredProducts, ...newArrivals];
  const { getProductReviews } = useProductReviews(allDisplayedProducts.map(p => p.id));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Bath & Body":
        return <Bath className="h-8 w-8 text-primary-foreground" />;
      case "Skincare":
        return <Sparkles className="h-8 w-8 text-primary-foreground" />;
      case "Hair Care":
        return <Flower2 className="h-8 w-8 text-primary-foreground" />;
      case "Wellness":
        return <Leaf className="h-8 w-8 text-primary-foreground" />;
      default:
        return <span className="text-primary-foreground font-semibold text-lg">{category.charAt(0)}</span>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-hero mb-6 animate-fade-in">
            Premium Body Care for Every Lifestyle
          </h1>
          <p className="text-subtitle text-white mb-8 animate-slide-up">
            Discover luxurious, effective products that nourish your skin and elevate your wellness. 
            From clinical skincare to spa-worthy indulgence, find your perfect routine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button asChild size="lg" className="btn-hero text-lg px-8">
              <Link to="/shop">
                Shop All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-primary border-white hover:bg-white hover:text-primary text-lg px-8">
              <Link to="/style-quiz">
                Take Style Quiz
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-secondary/30 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Free Shipping Over $75</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Dermatologist Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Shop Categories */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Elevate your self-care with our expertly curated collections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Bath & Body", "Skincare", "Hair Care", "Wellness"].map((category) => {
              const categoryPath = category.toLowerCase().replace(' ', '-').replace('&', 'and');
              return (
                <Link key={category} to={`/shop/${categoryPath}`}>
                  <Card className="group card-warm hover:shadow-medium transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {getCategoryIcon(category)}
                      </div>
                      <h3 className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Discover products
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground">
              Handpicked products our customers love most
            </p>
          </div>

          <div className="product-grid mb-12">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  reviewData={getProductReviews(product.id)}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Style Quiz CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-medium mb-4">
            Not Sure What Your Skin Needs?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Take our quick 3-question beauty quiz and get personalized product recommendations 
            tailored to your unique skin and wellness goals.
          </p>
          
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/style-quiz">
              Find Your Perfect Routine
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-3xl font-medium text-primary mb-2">
                New Arrivals
              </h2>
              <p className="text-muted-foreground">
                Fresh finds for radiant skin and wellness
              </p>
            </div>
            
            <Button asChild variant="outline">
              <Link to="/shop?filter=new">
                View All New
              </Link>
            </Button>
          </div>

          <div className="product-grid">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Loading new arrivals...</p>
              </div>
            ) : newArrivals.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No new arrivals yet</p>
              </div>
            ) : (
              newArrivals.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  reviewData={getProductReviews(product.id)}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
