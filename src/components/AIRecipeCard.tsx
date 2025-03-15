
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Save, BookOpen, Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AIRecipe {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  ingredients: string[];
  instructions: string[];
}

interface AIRecipeCardProps {
  recipe: AIRecipe;
  saveRecipe: (recipe: AIRecipe) => Promise<void>;
  handleViewRecipe: (recipe: AIRecipe) => void;
}

const AIRecipeCard: React.FC<AIRecipeCardProps> = ({ 
  recipe, 
  saveRecipe, 
  handleViewRecipe 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveRecipe(recipe);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast({
        title: "أعجبتك الوصفة",
        description: "تم إضافة الوصفة إلى المفضلة",
      });
    }
  };

  return (
    <Card 
      key={recipe.id} 
      className="neo-card overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-[1.01]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-60 md:h-auto">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-white/80 text-primary hover:bg-white">
              {recipe.category}
            </Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40",
                isLiked && "text-red-500 bg-white/40"
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm text-primary font-medium">وصفة ذكية</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{recipe.time}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">المكونات الرئيسية:</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 5).map((ing, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {ing}
                </span>
              ))}
              {recipe.ingredients.length > 5 && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  +{recipe.ingredients.length - 5} أخرى
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
            <Badge variant="outline" className={cn(
              recipe.difficulty === 'سهل' ? 'text-green-600 border-green-200 bg-green-50' :
              recipe.difficulty === 'متوسط' ? 'text-amber-600 border-amber-200 bg-amber-50' :
              'text-red-600 border-red-200 bg-red-50'
            )}>
              {recipe.difficulty}
            </Badge>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="text-primary border-primary/30 hover:bg-primary/10"
              >
                {isSaving ? (
                  <Clock className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                حفظ الوصفة
              </Button>
              
              <Button 
                onClick={() => handleViewRecipe(recipe)} 
                className="neo-button"
                size="sm"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                عرض التفاصيل
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIRecipeCard;
