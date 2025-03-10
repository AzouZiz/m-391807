
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-spring py-4 px-6 md:px-8",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="sr-only">Minimalist Store</span>
          minimal<span className="text-primary font-semibold">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            to="/shop" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              location.pathname.startsWith("/shop") && "text-primary"
            )}
          >
            Shop
            {location.pathname.startsWith("/shop") && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              location.pathname === "/about" && "text-primary"
            )}
          >
            About
            {location.pathname === "/about" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              location.pathname === "/contact" && "text-primary"
            )}
          >
            Contact
            {location.pathname === "/contact" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link to="/cart" className="relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative transition-all hover:bg-primary/5"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs rounded-full"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[72px] bg-white shadow-lg p-6 transition-all duration-300 ease-spring transform md:hidden",
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              location.pathname.startsWith("/shop") && "text-primary"
            )}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              location.pathname === "/about" && "text-primary"
            )}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              location.pathname === "/contact" && "text-primary"
            )}
          >
            Contact
          </Link>

          <div className="pt-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full justify-start"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
