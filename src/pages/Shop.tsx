import { useState } from "react";
import { Filter, SlidersHorizontal, BarChart3, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import AdvancedFilters, { FilterState } from "@/components/AdvancedFilters";
import ProductComparison from "@/components/ProductComparison";
import RecentlyViewed from "@/components/RecentlyViewed";
import SearchInput from "@/components/SearchInput";
import { products as mockProducts, getProductsByStyle, Product } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useProductComparison } from "@/hooks/useProductComparison";
import { useProductReviews } from "@/hooks/useProductReviews";
import { useWishlist } from "@/contexts/WishlistContext";
import { searchProducts, getSearchStats } from "@/lib/searchUtils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Shop = () => {
  const { products: shopifyProducts, isLoading: loadingShopify } = useShopifyProducts();
  const products = shopifyProducts.length > 0 ? shopifyProducts : mockProducts;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [activeTab, setActiveTab] = useState("products");
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    categories: [],
    rooms: [],
    styles: [],
    ratings: [],
    availability: 'all',
    tags: []
  });

  const { 
    comparisonProducts, 
    addToComparison, 
    removeFromComparison, 
    clearComparison, 
    canAddToComparison,
    isInComparison 
  } = useProductComparison();
  
  const { wishlistItems, toggleWishlist, isWishlisted } = useWishlist();
  const { toast } = useToast();

  const categories = ["All", "Lighting", "Textiles", "Decor", "Wall Art"];
  const rooms = ["All", "Living Room", "Bedroom", "Kitchen", "Office"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹500", value: "0-500" },
    { label: "₹500 - ₹1000", value: "500-1000" },
    { label: "₹1000 - ₹2000", value: "1000-2000" },
    { label: "Over ₹2000", value: "2000+" },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest First", value: "newest" },
    { label: "Best Rating", value: "rating" },
    { label: "Most Popular", value: "popular" },
  ];

  // Apply advanced filters
  const applyAdvancedFilters = (productList: typeof products) => {
    return productList.filter((product) => {
      // Price range filter
      const [minPrice, maxPrice] = advancedFilters.priceRange;
      if (product.price < minPrice || product.price > maxPrice) return false;

      // Categories filter
      if (advancedFilters.categories.length > 0 && 
          !advancedFilters.categories.includes(product.category)) return false;

      // Rooms filter
      if (advancedFilters.rooms.length > 0 && 
          !advancedFilters.rooms.includes(product.room)) return false;

      // Styles filter
      if (advancedFilters.styles.length > 0 && 
          !product.style.some(style => advancedFilters.styles.includes(style))) return false;

      // Availability filter
      if (advancedFilters.availability === 'inStock' && !product.inStock) return false;
      if (advancedFilters.availability === 'outOfStock' && product.inStock) return false;

      return true;
    });
  };

  // Apply search first for better performance
  let filteredProducts = searchQuery 
    ? searchProducts(searchQuery, products)
    : products;

  // Apply basic filters
  filteredProducts = filteredProducts.filter((product) => {
    if (selectedCategory !== "all" && product.category.toLowerCase() !== selectedCategory) {
      return false;
    }
    if (selectedRoom !== "all" && product.room.toLowerCase() !== selectedRoom) {
      return false;
    }
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (priceRange === "2000+") {
        return product.price > 2000;
      }
      return product.price >= min && product.price <= max;
    }
    return true;
  });

  // Apply advanced filters
  filteredProducts = applyAdvancedFilters(filteredProducts);

  // Get review data for all filtered products
  const { getProductReviews } = useProductReviews(filteredProducts.map(p => p.id));

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    const aReviews = getProductReviews(a.id);
    const bReviews = getProductReviews(b.id);
    
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : 1;
      case "rating":
        return bReviews.average_rating - aReviews.average_rating;
      case "popular":
        return bReviews.total_reviews - aReviews.total_reviews;
      default:
        return a.isBestseller ? -1 : 1;
    }
  });

  // Get style-based recommendations from wishlist
  const wishlistStyles = wishlistItems.flatMap(productId => 
    products.find(p => p.id === productId)?.style || []
  );
  const styleRecommendations = getProductsByStyle([...new Set(wishlistStyles)]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRoom("all");
    setPriceRange("all");
    setSortBy("featured");
    setAdvancedFilters({
      priceRange: [0, 5000],
      categories: [],
      rooms: [],
      styles: [],
      ratings: [],
      availability: 'all',
      tags: []
    });
  };

  const handleAddProductToComparison = (product: Product) => {
    if (canAddToComparison()) {
      addToComparison(product);
      toast({
        title: "Added to comparison",
        description: `${product.name} has been added to comparison.`,
      });
    }
  };

  const activeFiltersCount = [
    searchQuery !== "",
    selectedCategory !== "all",
    selectedRoom !== "all",
    priceRange !== "all",
    advancedFilters.categories.length > 0,
    advancedFilters.rooms.length > 0,
    advancedFilters.styles.length > 0,
    advancedFilters.availability !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-hero text-primary mb-4">
            Shop Home Decor
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Discover beautiful, budget-friendly pieces to transform your space. 
            From statement lighting to cozy textiles, find everything you need.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mt-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              Products
              <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
                {filteredProducts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 hidden sm:block" />
              Compare
              {comparisonProducts.length > 0 && (
                <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
                  {comparisonProducts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Eye className="h-4 w-4 hidden sm:block" />
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-8">
            {/* Advanced Filters */}
            <AdvancedFilters
              products={products}
              onFiltersChange={setAdvancedFilters}
              className="mb-6"
            />

            {/* Basic Filters & Search */}
            <div className="mb-6">
              {/* Enhanced Search */}
              <div className="mb-4">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  products={products}
                  placeholder="Search products, categories, styles..."
                  className="w-full"
                />
              </div>

              {/* Filter Pills - Mobile Optimized Grid */}
              <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room.toLowerCase()}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button - Mobile Optimized */}
                {activeFiltersCount > 0 && (
                  <div className="flex justify-center sm:justify-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      Clear all filters ({activeFiltersCount})
                    </Button>
                  </div>
                )}
              </div>

              {/* Results & Sort */}
              <div className="flex justify-between items-center">
                <div>
                  {(() => {
                    const stats = getSearchStats(searchQuery, products, filteredProducts);
                    return (
                      <div className="text-muted-foreground">
                        {stats.query ? (
                          <span>
                            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for{" "}
                            <span className="font-medium text-foreground">"{stats.query}"</span>
                          </span>
                        ) : (
                          <span>
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  reviewData={getProductReviews(product.id)}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                  onAddToComparison={handleAddProductToComparison}
                  isInComparison={isInComparison(product.id)}
                  canAddToComparison={canAddToComparison()}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <Card className="card-warm text-center py-16">
                <CardContent>
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-playfair text-xl text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="compare">
            <ProductComparison
              products={comparisonProducts}
              onRemoveProduct={removeFromComparison}
              onSwitchToProducts={() => setActiveTab("products")}
            />
          </TabsContent>

          <TabsContent value="recommended" className="space-y-8">
            {styleRecommendations.length > 0 ? (
              <div>
                <div className="text-center mb-8">
                  <h2 className="font-playfair text-2xl font-medium text-primary mb-2">
                    Recommended For You
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your wishlist and browsing preferences
                  </p>
                </div>
                <div className="product-grid">
                  {styleRecommendations.slice(0, 8).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      reviewData={getProductReviews(product.id)}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={isWishlisted(product.id)}
                      onAddToComparison={handleAddProductToComparison}
                      isInComparison={isInComparison(product.id)}
                      canAddToComparison={canAddToComparison()}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Card className="text-center p-8">
                <CardContent>
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-medium text-primary mb-2">
                    No Recommendations Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Add items to your wishlist or take our style quiz to get personalized recommendations
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/style-quiz">
                        Take Style Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button onClick={() => setActiveTab("products")}>
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shop;