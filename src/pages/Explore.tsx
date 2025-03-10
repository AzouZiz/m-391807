
import React from 'react';
import { Flame, Filter, Search, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Explore = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Explore Recipes</h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div className="flex items-center w-full md:w-auto">
            <Input type="search" placeholder="Search for a recipe..." className="md:w-80" />
            <Button variant="outline" className="ml-2">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe Cards */}
          <Card className="recipe-card hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2122&auto=format&fit=crop" 
              alt="Saudi Kabsa" 
              className="recipe-image" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Saudi Kabsa</h2>
              <p className="text-sm text-muted-foreground mb-3">Traditional recipe from Saudi Arabia.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  High Calorie
                </Badge>
                <Button variant="ghost">View Details</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop" 
              alt="Yemeni Mandi" 
              className="recipe-image" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Yemeni Mandi</h2>
              <p className="text-sm text-muted-foreground mb-3">Famous smoked meat rice dish from Yemen.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  Medium Calorie
                </Badge>
                <Button variant="ghost">View Details</Button>
              </div>
            </div>
          </Card>

          <Card className="recipe-card hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1633877752148-3068b8ba0283?q=80&w=2070&auto=format&fit=crop" 
              alt="Indian Biryani" 
              className="recipe-image" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Indian Biryani</h2>
              <p className="text-sm text-muted-foreground mb-3">Mixed rice dish from the Indian subcontinent.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  High Calorie
                </Badge>
                <Button variant="ghost">View Details</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
