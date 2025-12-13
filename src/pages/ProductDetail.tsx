import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import ImageGallery from "@/components/ImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import SocialShare from "@/components/SocialShare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { products as mockProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { products: shopifyProducts, isLoading } = useShopifyProducts();
  
  const allProducts = shopifyProducts.length > 0 ? shopifyProducts : mockProducts;
  const product = allProducts.find(p => p.id === id);
  
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-primary mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image];
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ImageGallery images={productImages} name={product.name} />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge variant="secondary">New</Badge>}
              {product.isBestseller && <Badge className="bg-gradient-hero text-primary-foreground">Bestseller</Badge>}
              {hasDiscount && <Badge variant="destructive">Sale</Badge>}
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-playfair text-3xl lg:text-4xl font-medium text-primary mb-2">
                {product.name}
              </h1>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-2xl text-primary">
                  ₹{product.price}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600">
                  You save ₹{(product.originalPrice! - product.price).toFixed(2)}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-primary mb-2">Style:</p>
              <div className="flex flex-wrap gap-2">
                {product.style.map((style) => (
                  <Badge key={style} variant="outline" className="text-xs">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-primary mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-primary">Quantity:</label>
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn-hero"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleWishlist}
                  className={`${isWishlisted(product.id) ? "text-red-500 border-red-200" : ""}`}
                  size="lg"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                </Button>
                <SocialShare product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <Separator />
          
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} currentProduct={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;