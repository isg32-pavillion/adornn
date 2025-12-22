import { ArrowRight, Bath, Sparkles, Flower2, Leaf, Award, CheckCircle2, Droplets, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products as mockProducts, collections } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useWishlist } from "@/contexts/WishlistContext";

import heroBanner from "@/assets/hero-banner.png";

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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#f5f0eb]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
                Where Nature Meets Nurture
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
                Discover 100% herbal and natural products crafted with traditional Ayurvedic wisdom. 
                Free from harmful chemicals, backed by research, and made with love.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
                <Button asChild size="lg" className="btn-hero text-lg px-8">
                  <Link to="/shop">
                    Shop All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/style-quiz">
                    Take Style Quiz
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroBanner} 
                alt="Adornn Herbals natural body care products including Body Ubtan, Hair Pack, Herbal Shampoo, and Hair Oil" 
                className="w-full h-auto rounded-lg"
              />
            </div>
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
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
              Why Choose Adornn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of ancient Ayurvedic wisdom and modern wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sprout className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">100% Natural Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                Crafted with pure herbal extracts and traditional Ayurvedic formulations, free from harmful chemicals
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Time-Tested Recipes</h3>
              <p className="text-sm text-muted-foreground">
                Formulated using centuries-old Ayurvedic wisdom passed down through generations of experts
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Every product is carefully tested and certified to ensure safety, purity, and effectiveness
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Droplets className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Holistic Wellness</h3>
              <p className="text-sm text-muted-foreground">
                More than just products—experience complete body, mind, and soul rejuvenation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
