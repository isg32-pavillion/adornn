import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurHash?: string;
  threshold?: number;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  blurHash,
  threshold = 0.1,
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
    }
  }, [isInView, src, isLoaded]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blur placeholder */}
      <div 
        className={cn(
          "absolute inset-0 bg-muted/50 backdrop-blur-md transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.1) 100%)'
        }}
      />
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-all duration-500',
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default LazyImage;
