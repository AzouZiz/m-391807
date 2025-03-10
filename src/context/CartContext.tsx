
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './ProductContext';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'minimalist-store-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart', error);
      }
    }
    setInitialized(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, initialized]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newItems = [...currentItems];
        const newQuantity = newItems[existingItemIndex].quantity + quantity;
        
        if (newQuantity > product.stock) {
          toast({
            title: "Maximum stock reached",
            description: `Sorry, only ${product.stock} items available.`,
            variant: "destructive",
          });
          return currentItems;
        }
        
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity,
        };
        
        toast({
          title: "Item updated",
          description: `${product.name} quantity updated in your cart.`,
        });
        
        return newItems;
      } else {
        // New item, add to cart
        if (quantity > product.stock) {
          toast({
            title: "Maximum stock reached",
            description: `Sorry, only ${product.stock} items available.`,
            variant: "destructive",
          });
          quantity = product.stock;
        }
        
        toast({
          title: "Item added",
          description: `${product.name} has been added to your cart.`,
        });
        
        return [...currentItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.product.id === productId);
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.product.name} has been removed from your cart.`,
        });
      }
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.product.id === productId) {
          if (quantity > item.product.stock) {
            toast({
              title: "Maximum stock reached",
              description: `Sorry, only ${item.product.stock} items available.`,
              variant: "destructive",
            });
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Calculate total number of items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
