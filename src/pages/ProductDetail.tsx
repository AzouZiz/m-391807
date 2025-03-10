
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ArrowLeft, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  isOpen, 
  onToggle 
}) => {
  return (
    <div className="border-t border-border py-4">
      <button
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-foreground"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-3 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  const product = getProduct(id!);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum stock reached",
        description: `Sorry, only ${product.stock} items available.`,
        variant: "destructive",
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6 md:px-8 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 -ml-2 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-primary' 
                        : 'opacity-70 hover:opacity-100 transition-opacity'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              <div className="text-xl font-medium text-foreground mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              {product.rating && (
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 mr-1 ${
                          i < Math.floor(product.rating!) 
                            ? 'text-primary' 
                            : 'text-muted'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-1">
                    {product.rating.toFixed(1)} rating
                  </span>
                </div>
              )}
              
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Quantity and Add to Cart */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-md rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 h-10 flex items-center justify-center border-y border-input">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-md rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <div className="ml-4 text-sm text-muted-foreground">
                    {product.stock > 0 
                      ? `${product.stock} in stock` 
                      : 'Out of stock'}
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                  disabled={product.stock === 0}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Product information accordions */}
            <div>
              <AccordionItem 
                title="Description" 
                isOpen={openAccordion === 'description'} 
                onToggle={() => toggleAccordion('description')}
              >
                <p>{product.description}</p>
                <p className="mt-2">
                  Our products are crafted with precision and care, adhering to the highest standards of quality and design.
                </p>
              </AccordionItem>
              
              <AccordionItem 
                title="Features" 
                isOpen={openAccordion === 'features'} 
                onToggle={() => toggleAccordion('features')}
              >
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium materials</li>
                  <li>Thoughtfully designed</li>
                  <li>Built to last</li>
                  <li>Minimalist aesthetic</li>
                  <li>Precision crafted</li>
                </ul>
              </AccordionItem>
              
              <AccordionItem 
                title="Shipping & Returns" 
                isOpen={openAccordion === 'shipping'} 
                onToggle={() => toggleAccordion('shipping')}
              >
                <p>Free standard shipping on all orders over $50.</p>
                <p className="mt-2">
                  We accept returns within 30 days of delivery. Items must be unused and in original packaging.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products section would go here */}
      
      {/* Footer would go here */}
    </div>
  );
};

export default ProductDetail;
