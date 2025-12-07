import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Product } from '@/data/products';

interface AdvancedFiltersProps {
  products: Product[];
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  rooms: string[];
  styles: string[];
  ratings: number[];
  availability: 'all' | 'inStock' | 'outOfStock';
  tags: string[];
}

const AdvancedFilters = ({ products, onFiltersChange, className }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    categories: [],
    rooms: [],
    styles: [],
    ratings: [],
    availability: 'all',
    tags: []
  });

  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values from products
  const categories = [...new Set(products.map(p => p.category))];
  const rooms = [...new Set(products.map(p => p.room))];
  const styles = [...new Set(products.flatMap(p => p.style))];
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      priceRange: [minPrice, maxPrice],
      categories: [],
      rooms: [],
      styles: [],
      ratings: [],
      availability: 'all',
      tags: []
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const activeFiltersCount = [
    filters.categories.length > 0,
    filters.rooms.length > 0,
    filters.styles.length > 0,
    filters.ratings.length > 0,
    filters.availability !== 'all',
    filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice,
  ].filter(Boolean).length;

  const handleArrayToggle = <T extends string>(
    array: T[], 
    value: T, 
    key: keyof FilterState
  ) => {
    const newArray = array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
    updateFilters({ [key]: newArray });
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>

        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <Card className="border-dashed">
            <CardContent className="p-6 space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                    max={maxPrice}
                    min={minPrice}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => 
                          handleArrayToggle(filters.categories, category, 'categories')
                        }
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Rooms</h4>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.map((room) => (
                    <div key={room} className="flex items-center space-x-2">
                      <Checkbox
                        id={`room-${room}`}
                        checked={filters.rooms.includes(room)}
                        onCheckedChange={() => 
                          handleArrayToggle(filters.rooms, room, 'rooms')
                        }
                      />
                      <label 
                        htmlFor={`room-${room}`}
                        className="text-sm cursor-pointer"
                      >
                        {room}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styles */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Styles</h4>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={`style-${style}`}
                        checked={filters.styles.includes(style)}
                        onCheckedChange={() => 
                          handleArrayToggle(filters.styles, style, 'styles')
                        }
                      />
                      <label 
                        htmlFor={`style-${style}`}
                        className="text-sm cursor-pointer"
                      >
                        {style}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Availability</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'inStock', label: 'In Stock Only' },
                    { value: 'outOfStock', label: 'Out of Stock' }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`availability-${option.value}`}
                        checked={filters.availability === option.value}
                        onCheckedChange={() => 
                          updateFilters({ availability: option.value as FilterState['availability'] })
                        }
                      />
                      <label 
                        htmlFor={`availability-${option.value}`}
                        className="text-sm cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedFilters;