import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useWishlist } from "@/contexts/WishlistContext";

const Skincare = () => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { products, isLoading } = useShopifyProducts();
  const skincareProducts = products.filter(product => 
    product.room.toLowerCase() === "skincare"
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-hero text-primary mb-4">
            Skincare Collection
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Radiant skin starts here. Discover Ayurvedic serums, nourishing face packs, 
            and treatments that reveal your authentic glow.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : skincareProducts.length > 0 ? (
          <>
            <div className="product-grid mb-12">
              {skincareProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))}
            </div>

            <Card className="card-warm max-w-2xl mx-auto">
              <CardContent className="text-center p-12">
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                
                <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
                  Discover Your Glow
                </h2>
                
                <p className="text-muted-foreground mb-8 text-lg">
                  Find more products perfectly suited for your skin type. 
                  Take our beauty quiz to get personalized recommendations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-hero">
                    <Link to="/shop">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Browse All Products
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/style-quiz">
                      Take Beauty Quiz
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="card-warm max-w-2xl mx-auto">
            <CardContent className="text-center p-12">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
              
              <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
                Coming Soon
              </h2>
              
              <p className="text-muted-foreground mb-8 text-lg">
                We're curating the ultimate skincare collection for radiant, healthy skin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-hero">
                  <Link to="/shop">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse All Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Skincare;