import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import { useWishlist } from '@/contexts/WishlistContext';


interface RelatedProductsProps {
  products: Product[];
  currentProduct: Product;
}

const RelatedProducts = ({ products, currentProduct }: RelatedProductsProps) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  
  if (products.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-2xl font-medium text-primary mb-2">
            You May Also Like
          </h2>
          <p className="text-muted-foreground">
            Similar products that match your style
          </p>
        </div>
        
        <Button asChild variant="outline">
          <Link to={`/shop?style=${currentProduct.style[0]}`}>
            View More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted(product.id)}
          />
        ))}
      </div>

      {/* Complete the Look Section */}
      <div className="bg-gradient-subtle rounded-lg p-8 text-center">
        <h3 className="font-playfair text-xl font-medium text-primary mb-4">
          Complete the Look
        </h3>
        <p className="text-muted-foreground mb-6">
          Get personalized recommendations based on your style preferences
        </p>
        <Button asChild className="btn-hero">
          <Link to="/style-quiz">
            Take Style Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;