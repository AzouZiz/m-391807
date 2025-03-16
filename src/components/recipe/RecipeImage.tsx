
import React from 'react';
import { ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Recipe3DView from '../Recipe3DView';
import { Clock } from 'lucide-react';

interface RecipeImageProps {
  title: string;
  image: string;
  category: string;
  difficulty: string;
  time: string;
}

const RecipeImage: React.FC<RecipeImageProps> = ({
  title,
  image,
  category,
  difficulty,
  time
}) => {
  return (
    <>
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div className="flex items-center text-white">
            <ChefHat className="h-5 w-5 mr-2" />
            <span className="font-medium">وصفة بالذكاء الاصطناعي</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-primary/90">{category}</Badge>
        <Badge variant="outline" className={cn(
          difficulty === 'سهل' ? 'text-green-600 border-green-200 bg-green-50' :
          difficulty === 'متوسط' ? 'text-amber-600 border-amber-200 bg-amber-50' :
          'text-red-600 border-red-200 bg-red-50'
        )}>
          {difficulty}
        </Badge>
        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </Badge>
        <Recipe3DView recipeType={category} />
      </div>
    </>
  );
};

export default RecipeImage;
