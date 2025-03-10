
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Index = () => {
  const { products, featuredProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero section */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="animate-slide-down font-heading font-medium tracking-tight mb-6">
              Minimalist essentials for modern living
            </h1>
            <p className="animate-slide-down animation-delay-100 text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover thoughtfully designed products that combine beauty with function, enhancing your everyday experience.
            </p>
            <Button 
              size="lg" 
              className="animate-slide-up rounded-full"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
        
        {/* Featured products */}
        {featuredProducts.length > 0 && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium tracking-tight">Featured Products</h2>
              <Button variant="ghost" className="gap-1 text-sm group">
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} featured={true} />
              ))}
            </div>
          </section>
        )}
        
        {/* All products */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-medium tracking-tight">Shop All Products</h2>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="rounded-full capitalize"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Call to action */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto">
          <div className="bg-secondary rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
              Ready to enhance your space?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our carefully curated collection brings together the best in minimalist design.
            </p>
            <Button size="lg" className="rounded-full">
              Shop Now
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-16 py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-4">minimal<span className="text-primary">.</span></h3>
              <p className="text-sm text-muted-foreground">
                Elevating everyday essentials through thoughtful design.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Order Tracking</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-sm text-muted-foreground text-center">
            <p>&copy; {new Date().getFullYear()} minimal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
