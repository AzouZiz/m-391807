
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 bg-secondary rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-sm">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/60">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">
                    Items ({itemCount})
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive"
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div>
                  {items.map(item => (
                    <CartItem 
                      key={item.product.id} 
                      item={item} 
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/60 sticky top-24">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full mt-6"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="ghost" 
                    className="text-sm text-muted-foreground"
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-2">We accept:</p>
                    <div className="flex space-x-2">
                      <div className="w-10 h-6 bg-secondary rounded"></div>
                      <div className="w-10 h-6 bg-secondary rounded"></div>
                      <div className="w-10 h-6 bg-secondary rounded"></div>
                      <div className="w-10 h-6 bg-secondary rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
