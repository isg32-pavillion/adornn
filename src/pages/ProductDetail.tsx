import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import ImageGallery from "@/components/ImageGallery";
import ProductReviews from "@/components/ProductReviews";
import RelatedProducts from "@/components/RelatedProducts";
import SocialShare from "@/components/SocialShare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useReviews } from "@/hooks/useReviews";
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
  
  // Use Shopify products if available, otherwise fall back to mock data
  const allProducts = shopifyProducts.length > 0 ? shopifyProducts : mockProducts;
  const product = allProducts.find(p => p.id === id);
  
  const { averageRating, totalReviews } = useReviews(product?.id || "");
  
  // Add to recently viewed when component mounts
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
  
  // Get product images - use array of images from Shopify or duplicate single image for front/back view
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
      {/* Breadcrumb Navigation */}
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
          {/* Product Images */}
          <div>
            <ImageGallery images={productImages} name={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Badges */}
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

            {/* Product Title & Category */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-playfair text-3xl lg:text-4xl font-medium text-primary mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {totalReviews > 0 ? averageRating.toFixed(1) : '0.0'} ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Price */}
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

            {/* Style Tags */}
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

            {/* Description */}
            <div>
              <h3 className="font-medium text-primary mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Actions */}
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

            {/* Features */}
            <Card className="card-warm">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping over ₹2000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-primary" />
                    <span>Easy exchanges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16 space-y-16">
          <Separator />
          
          {/* Product Reviews */}
          <ProductReviews product={product} />
          
          <Separator />
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} currentProduct={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;