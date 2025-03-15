
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

interface AIRecipeDetailProps {
  selectedRecipe: AIRecipe | null;
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  saveRecipe: (recipe: AIRecipe) => Promise<void>;
}

const AIRecipeDetail: React.FC<AIRecipeDetailProps> = ({
  selectedRecipe,
  isDetailOpen,
  setIsDetailOpen,
  saveRecipe
}) => {
  if (!selectedRecipe) return null;

  return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{selectedRecipe.title}</DialogTitle>
          <DialogDescription className="text-base text-gray-500">{selectedRecipe.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-primary/90">{selectedRecipe.category}</Badge>
              <Badge variant="outline" className={cn(
                selectedRecipe.difficulty === 'سهل' ? 'text-green-600 border-green-200 bg-green-50' :
                selectedRecipe.difficulty === 'متوسط' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                'text-red-600 border-red-200 bg-red-50'
              )}>
                {selectedRecipe.difficulty}
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Clock className="h-3 w-3 mr-1" />
                {selectedRecipe.time}
              </Badge>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">المكونات</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">طريقة التحضير</h3>
            <ol className="list-decimal list-inside space-y-4">
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium text-gray-900">الخطوة {index + 1}:</span>{' '}
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => saveRecipe(selectedRecipe)} className="bg-primary text-white">
            <Save className="h-4 w-4 mr-2" />
            حفظ الوصفة في مجموعتك
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIRecipeDetail;
