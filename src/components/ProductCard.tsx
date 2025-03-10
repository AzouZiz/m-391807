
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, CheckCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group block relative rounded-2xl overflow-hidden bg-white hover-scale", 
        featured ? "md:col-span-2 lg:col-span-2" : "",
        "border border-border/40 hover:border-border transition-all duration-500"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <div className="relative w-full h-full">
          {/* Primary Image */}
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={cn(
              "object-cover w-full h-full transition-all duration-700 ease-spring",
              isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100",
              !isImageLoaded ? "blur-sm" : "blur-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Hover Image */}
          {product.images.length > 1 && (
            <img 
              src={product.images[1]} 
              alt={`${product.name} - alternate view`}
              className={cn(
                "absolute inset-0 object-cover w-full h-full transition-all duration-700 ease-spring",
                isHovered ? "scale-100 opacity-100" : "scale-110 opacity-0"
              )}
            />
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base sm:text-lg tracking-tight">
              {product.name}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "rounded-full h-9 w-9 p-0 flex items-center justify-center transition-all duration-300",
              isAdded ? "bg-green-50 text-green-600" : "bg-secondary text-foreground hover:bg-primary hover:text-white"
            )}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <CheckCheck className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
        
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "w-3 h-3 mr-1",
                    i < Math.floor(product.rating!) 
                      ? "text-primary" 
                      : "text-muted"
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      {/* Stock indicator */}
      {product.stock <= 5 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="micro-chip bg-red-50 text-red-600">
            {product.stock === 0 ? "Out of stock" : `Only ${product.stock} left`}
          </div>
        </div>
      )}
      
      {/* Featured badge */}
      {product.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="micro-chip">
            Featured
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
