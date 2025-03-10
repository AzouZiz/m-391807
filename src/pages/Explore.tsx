
import React, { useState } from 'react';
import { Flame, Filter, Search, BarChart2, Star, Coffee, UtensilsCrossed, Clock, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary text-foreground p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Explore Recipes</h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="Search for a recipe..." className="pl-10 metaverse-input" />
            </div>
            <Button variant="outline" className="ml-2 hover:bg-primary/10 hover:text-primary">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="secondary" className="hover:bg-accent/10 hover:text-accent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-start gap-2 mb-6 overflow-x-auto py-2">
          <Button 
            variant={activeFilter === 'all' ? "default" : "outline"} 
            onClick={() => setActiveFilter('all')}
            className={activeFilter === 'all' ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === 'popular' ? "default" : "outline"} 
            onClick={() => setActiveFilter('popular')}
            className={activeFilter === 'popular' ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
          >
            <Flame className="w-4 h-4 mr-2" />
            Popular
          </Button>
          <Button 
            variant={activeFilter === 'vegetarian' ? "default" : "outline"} 
            onClick={() => setActiveFilter('vegetarian')}
            className={activeFilter === 'vegetarian' ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
          >
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            Vegetarian
          </Button>
          <Button 
            variant={activeFilter === 'quick' ? "default" : "outline"} 
            onClick={() => setActiveFilter('quick')}
            className={activeFilter === 'quick' ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
          >
            <Clock className="w-4 h-4 mr-2" />
            Quick & Easy
          </Button>
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe Cards */}
          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2122&auto=format&fit=crop" 
                alt="Saudi Kabsa" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.8
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Saudi Kabsa</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 45 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Traditional rice and meat dish from Saudi Arabia with aromatic spices and slow-cooked tenderness.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Middle Eastern
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop" 
                alt="Yemeni Mandi" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.6
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Yemeni Mandi</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 60 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Famous smoked meat and rice dish from Yemen with a unique smoky flavor and tender meat.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Middle Eastern
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1633877752148-3068b8ba0283?q=80&w=2070&auto=format&fit=crop" 
                alt="Indian Biryani" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.9
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Indian Biryani</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 55 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Fragrant layered rice dish from the Indian subcontinent with aromatic spices and tender meat.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Indian
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
                alt="Authentic Pizza" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.7
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Authentic Pizza</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 30 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Traditional Italian pizza with thin crust, San Marzano tomatoes, fresh mozzarella, and basil.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Italian
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1543826173-70651703c5a4?q=80&w=2070&auto=format&fit=crop" 
                alt="Sushi Rolls" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.5
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Sushi Rolls</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 40 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Japanese delicacy featuring vinegared rice, fresh fish, and vegetables wrapped in seaweed.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Japanese
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale overflow-hidden metaverse-card">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop" 
                alt="Colorful Salad" 
                className="recipe-image hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Star className="w-3 h-3 mr-1" /> 4.3
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Colorful Salad</h2>
                <Badge variant="outline" className="text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" /> 15 min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Refreshing mix of seasonal vegetables, fruits, and superfoods with a light tangy dressing.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" /> Vegetarian
                </Badge>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">View Recipe</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-6 rounded-full text-lg">
            Load More Recipes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
