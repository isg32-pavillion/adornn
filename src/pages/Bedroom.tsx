import { BedDouble, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";

const Bedroom = () => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const bedroomProducts = products.filter(product => 
    product.room.toLowerCase() === "bedroom"
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-hero text-primary mb-4">
            Bedroom Collection
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Create your perfect retreat with thoughtfully designed bedroom essentials. 
            From cozy bedding to elegant nightstands, every piece designed for rest and relaxation.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {bedroomProducts.length > 0 ? (
          <>
            <div className="product-grid mb-12">
              {bedroomProducts.map((product) => (
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
                  <BedDouble className="h-10 w-10 text-primary-foreground" />
                </div>
                
                <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
                  Discover Your Style
                </h2>
                
                <p className="text-muted-foreground mb-8 text-lg">
                  Find more pieces perfectly curated for your bedroom. 
                  Take our style quiz to get personalized recommendations.
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
                      Take Style Quiz
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
                <BedDouble className="h-10 w-10 text-primary-foreground" />
              </div>
              
              <h2 className="font-playfair text-3xl font-medium text-primary mb-4">
                Coming Soon
              </h2>
              
              <p className="text-muted-foreground mb-8 text-lg">
                We're designing the ultimate bedroom collection for your personal oasis. 
                Luxurious bedding, stylish storage, and ambient lighting to create your dream space.
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
                    Take Style Quiz
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

export default Bedroom;