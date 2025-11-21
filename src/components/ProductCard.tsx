import { Heart, Star, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/LazyImage";
import type { Product } from "@/data/products";
import { ProductReviewSummary } from "@/hooks/useProductReviews";

interface ProductCardProps {
  product: Product;
  reviewData?: ProductReviewSummary;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  onAddToComparison?: (product: Product) => void;
  isInComparison?: boolean;
  canAddToComparison?: boolean;
}

const ProductCard = ({ 
  product, 
  reviewData,
  onToggleWishlist, 
  isWishlisted = false,
  onAddToComparison,
  isInComparison = false,
  canAddToComparison = true
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Default to fallback data if no reviewData provided
  const actualReviewData = reviewData || {
    product_id: product.id,
    average_rating: 0,
    total_reviews: 0
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group card-warm hover:shadow-medium transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden cursor-pointer">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              New
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="outline" className="bg-background/90 border-primary/20">
              Bestseller
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist and Compare Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist?.(product.id);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </Button>
          
          {onAddToComparison && (
            <Button
              variant="ghost"
              size="icon"
              className={`bg-background/80 hover:bg-background ${
                isInComparison ? "bg-primary/20" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (!isInComparison && canAddToComparison) {
                  onAddToComparison(product);
                }
              }}
              disabled={isInComparison || !canAddToComparison}
              title={
                isInComparison 
                  ? "Already in comparison" 
                  : !canAddToComparison 
                    ? "Comparison limit reached" 
                    : "Add to compare"
              }
            >
              <BarChart3
                className={`h-4 w-4 transition-colors ${
                  isInComparison ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </Button>
          )}
        </div>

        {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full btn-hero"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            {product.category}
          </p>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-inter font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(actualReviewData.average_rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {actualReviewData.total_reviews > 0 ? actualReviewData.average_rating.toFixed(1) : '0.0'} ({actualReviewData.total_reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;