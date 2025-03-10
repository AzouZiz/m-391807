
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const { product, quantity } = item;
  
  return (
    <div className="flex items-center py-6 first:pt-0 border-b border-border/60 last:border-0 animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <Link 
          to={`/product/${product.id}`}
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="text-sm text-muted-foreground mt-1">
          ${product.price.toFixed(2)}
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-1 ml-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        
        <div className="text-center w-8">
          {quantity}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          disabled={quantity >= product.stock}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      
      {/* Price */}
      <div className="ml-6 text-right w-20">
        <div className="font-medium">
          ${(product.price * quantity).toFixed(2)}
        </div>
      </div>
      
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="ml-4 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(product.id)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
};

export default CartItem;
