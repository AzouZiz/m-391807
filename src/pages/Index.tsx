
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
  ArrowRight,
  Sparkles,
  Zap,
  Database,
  ArrowUpRight,
  Star
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="mb-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-3 inline-flex">
                <div className="rounded-full bg-gradient-to-r from-primary to-accent p-2">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in relative">
                SapidFood
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">.</span>
                <div className="absolute -top-1 -right-1 md:top-0 md:right-0 h-3 w-3 rounded-full bg-primary animate-pulse"></div>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
                The All-in-One AI Food Platform with Integrated Admin Controls and Revolutionary Add-ons
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white rounded-full px-8" asChild>
                  <Link to="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-primary/10 rounded-full px-8" asChild>
                  <Link to="/explore">
                    Explore Recipes
                    <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </header>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block">
              <Badge className="mb-2 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Cutting-edge Technology</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Metaverse-Powered Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our range of advanced features that combine AI with immersive culinary experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Content Generation</h3>
                <p className="text-muted-foreground">
                  AI-powered custom articles, recipes, images, and videos tailored to your preferences
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <ChefHat className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Virtual Kitchen</h3>
                <p className="text-muted-foreground">
                  Explore 3D dishes and interact with ingredients using augmented reality
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <Camera className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ingredient Recognition</h3>
                <p className="text-muted-foreground">
                  Scan refrigerator ingredients with your phone camera for smart recipe suggestions
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Flavor Map</h3>
                <p className="text-muted-foreground">
                  Discover flavor harmonies and get innovative suggestions for ingredient combinations
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Culinary Heritage Documentation</h3>
                <p className="text-muted-foreground">
                  Preserve traditional recipes from diverse cultures and share them globally
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="metaverse-card p-6 text-center hover-scale relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="feature-icon mx-auto">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Social Cooking</h3>
                <p className="text-muted-foreground">
                  Join virtual cooking sessions with friends worldwide using augmented reality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Powering Global Culinary Innovation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is transforming how people discover, create, and share food experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">2.5M+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">50K+</div>
              <p className="text-muted-foreground">AI-Generated Recipes</p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">120+</div>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">4.8</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Recipes</h2>
              <p className="text-muted-foreground">
                Explore our most popular AI-enhanced recipes from around the world
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-gradient-to-r from-primary to-accent text-white rounded-full" asChild>
              <Link to="/explore">
                View All Recipes
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="metaverse-card overflow-hidden hover-scale">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2122&auto=format&fit=crop" 
                  alt="Saudi Kabsa" 
                  className="aspect-video object-cover w-full hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> 4.9
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Saudi Kabsa</h3>
                <p className="text-sm text-muted-foreground mb-3">Traditional rice dish with aromatic spices</p>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/recipe/1">View Recipe</Link>
                </Button>
              </div>
            </div>
            
            <div className="metaverse-card overflow-hidden hover-scale">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop" 
                  alt="Superfood Salad" 
                  className="aspect-video object-cover w-full hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> 4.7
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Superfood Salad</h3>
                <p className="text-sm text-muted-foreground mb-3">Nutrient-rich colorful salad with antioxidants</p>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/recipe/2">View Recipe</Link>
                </Button>
              </div>
            </div>
            
            <div className="metaverse-card overflow-hidden hover-scale">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop" 
                  alt="Yemeni Mandi" 
                  className="aspect-video object-cover w-full hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> 4.8
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Yemeni Mandi</h3>
                <p className="text-sm text-muted-foreground mb-3">Smoky rice dish with tender seasoned meat</p>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/recipe/3">View Recipe</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Join the Metaverse Food Revolution
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore a world of endless culinary possibilities with SapidFood's AI platform and transform your cooking experience
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white rounded-full px-8 py-6 text-lg" asChild>
              <Link to="/signup">
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Powered by Advanced Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver an immersive food experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced AI</h3>
              <p className="text-sm text-muted-foreground">
                Cutting-edge natural language and image processing models
              </p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Big Data</h3>
              <p className="text-sm text-muted-foreground">
                Processing millions of recipes and user preferences
              </p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Metaverse Integration</h3>
              <p className="text-sm text-muted-foreground">
                Immersive AR/VR experiences for cooking and learning
              </p>
            </div>
            
            <div className="metaverse-card p-6 text-center hover-scale">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Processing</h3>
              <p className="text-sm text-muted-foreground">
                Instant generation and adaptation of culinary content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-semibold flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-2">
                  <ChefHat className="h-4 w-4 text-white" />
                </div>
                SapidFood<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">.</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Where flavors are crafted, cultures preserved, and traditional kitchen rules broken with the power of AI and metaverse technologies!
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-medium mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link to="/recipes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Recipes</Link></li>
                  <li><Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
                  <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/licenses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Licenses</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Connect</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SapidFood. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Badge = ({ children, className, ...props }) => {
  return (
    <div className={`inline-flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Index;
