import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";
import { getSearchSuggestions, highlightMatch } from "@/lib/searchUtils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  products: Product[];
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  products,
  placeholder = "Search for products...",
  className
}: SearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    products: Product[];
    categories: string[];
    styles: string[];
  }>({ products: [], categories: [], styles: [] });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const searchSuggestions = getSearchSuggestions(value, products);
      setSuggestions(searchSuggestions);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setSuggestions({ products: [], categories: [], styles: [] });
    }
  }, [value, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const hasResults = suggestions.products.length > 0 || 
                   suggestions.categories.length > 0 || 
                   suggestions.styles.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setIsOpen(true)}
          className={cn("pl-10 pr-10 py-3 text-base", className)}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && hasResults && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto shadow-lg"
        >
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {/* Product Suggestions */}
              {suggestions.products.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Products
                  </div>
                  <div className="space-y-2">
                    {suggestions.products.slice(0, 3).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div 
                              className="font-medium text-sm truncate"
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(product.name, value)
                              }}
                            />
                            <div className="text-xs text-muted-foreground">
                              ₹{product.price} • {product.category}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Suggestions */}
              {suggestions.categories.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Categories
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleSuggestionClick(category)}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(category, value)
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Style Suggestions */}
              {suggestions.styles.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Styles
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.styles.map((style) => (
                      <Badge
                        key={style}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        onClick={() => handleSuggestionClick(style)}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(style, value)
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchInput;