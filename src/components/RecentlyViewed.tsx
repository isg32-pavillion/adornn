import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from './ProductCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useWishlist } from '@/contexts/WishlistContext';


const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-playfair text-2xl font-medium text-primary">
            Recently Viewed
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={clearRecentlyViewed}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-4 md:overflow-x-auto gap-6 md:pb-4">
        {recentlyViewed.map((product) => (
          <div key={product.id} className="md:flex-shrink-0 md:w-64">
            <ProductCard 
              product={product} 
              onToggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;