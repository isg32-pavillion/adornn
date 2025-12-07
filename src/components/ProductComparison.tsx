import { useState } from 'react';
import { X, Plus, Star, Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useProductReviews } from '@/hooks/useProductReviews';
import { Link } from 'react-router-dom';

interface ProductComparisonProps {
  products: Product[];
  onAddProduct?: () => void;
  onRemoveProduct: (productId: string) => void;
  onSwitchToProducts?: () => void;
}

const ProductComparison = ({ products, onAddProduct, onRemoveProduct, onSwitchToProducts }: ProductComparisonProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Get review data for all products
  const { getProductReviews } = useProductReviews(products.map(p => p.id));

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (products.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-playfair text-xl font-medium text-primary mb-2">
            Compare Products
          </h3>
          <p className="text-muted-foreground mb-6">
            Browse products and click the comparison icon to add them here for side-by-side comparison.
          </p>
          <Button onClick={onSwitchToProducts} className="btn-hero">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Products
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-medium text-primary">
          Compare Products ({products.length}/3)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const reviewData = getProductReviews(product.id);
          
          return (
            <Card key={product.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
                onClick={() => onRemoveProduct(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <CardHeader className="text-center pb-4">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg font-medium">
                  {product.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ₹{product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {reviewData.total_reviews > 0 
                        ? reviewData.average_rating.toFixed(1) 
                        : '0.0'
                      }
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({reviewData.total_reviews} reviews)
                  </span>
                </div>

                {/* Category & Room */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room:</span>
                    <span className="font-medium">{product.room}</span>
                  </div>
                </div>

                {/* Styles */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Styles:</div>
                  <div className="flex flex-wrap gap-1">
                    {product.style.map((style) => (
                      <Badge key={style} variant="secondary" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  {product.inStock ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">In Stock</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductComparison;