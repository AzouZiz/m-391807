
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Search, 
  Utensils, 
  Brain, 
  Camera, 
  Globe, 
  Share2, 
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-background pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                SapidFood
                <span className="text-primary">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
                The All-in-One AI Food Platform with Integrated Admin Controls and Revolutionary Add-ons
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/explore">
                    Explore Recipes
                    <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Amazing AI-Powered Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover a range of advanced features that combine AI with the culinary experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <Brain />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Content Generation</h3>
              <p className="text-muted-foreground">
                AI-powered custom articles, recipes, images, and videos tailored to your preferences
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <ChefHat />
              </div>
              <h3 className="text-xl font-semibold mb-3">Virtual Kitchen</h3>
              <p className="text-muted-foreground">
                Explore 3D dishes and interact with ingredients using augmented reality
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <Camera />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ingredient Recognition</h3>
              <p className="text-muted-foreground">
                Scan refrigerator ingredients with your phone camera for smart recipe suggestions
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <Utensils />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Flavor Map</h3>
              <p className="text-muted-foreground">
                Discover flavor harmonies and get innovative suggestions for ingredient combinations
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <Globe />
              </div>
              <h3 className="text-xl font-semibold mb-3">Culinary Heritage Documentation</h3>
              <p className="text-muted-foreground">
                Preserve traditional recipes from diverse cultures and share them globally
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover-scale">
              <div className="feature-icon mx-auto">
                <Share2 />
              </div>
              <h3 className="text-xl font-semibold mb-3">Social Cooking</h3>
              <p className="text-muted-foreground">
                Join virtual cooking sessions with friends worldwide using augmented reality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Join the Future of Food Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore a world of endless possibilities with SapidFood's AI platform and revolutionize the food world
            </p>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">
                SapidFood<span className="text-primary">.</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Where flavors are crafted, cultures preserved, and traditional kitchen rules broken!
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-sm text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SapidFood. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
