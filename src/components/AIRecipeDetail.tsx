
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Save, Share2, PrinterIcon, Heart, ChefHat, View3d } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Recipe3DView from './Recipe3DView';

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
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [is3DViewOpen, setIs3DViewOpen] = React.useState(false);
  
  if (!selectedRecipe) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveRecipe(selectedRecipe);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">{selectedRecipe.title}</DialogTitle>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-gray-700"
                onClick={handlePrint}
              >
                <PrinterIcon className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-gray-700"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "text-gray-400 hover:text-red-500",
                  isLiked && "text-red-500"
                )}
                onClick={handleLike}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-blue-500"
                onClick={() => setIs3DViewOpen(true)}
              >
                <View3d className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <DialogDescription className="text-base text-gray-500">{selectedRecipe.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex items-center text-white">
                  <ChefHat className="h-5 w-5 mr-2" />
                  <span className="font-medium">وصفة بالذكاء الاصطناعي</span>
                </div>
              </div>
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
              <Recipe3DView recipeType={selectedRecipe.category} />
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
            <ol className="relative list-none space-y-6 border-r-2 border-primary/20 pr-6 mr-2">
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index} className="relative">
                  <div className="absolute right-[-29px] top-0 bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button 
            onClick={handleSave} 
            className="bg-primary text-white"
            disabled={isSaving}
          >
            {isSaving ? (
              <Clock className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            حفظ الوصفة في مجموعتك
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* نافذة العرض ثلاثي الأبعاد */}
      <Dialog open={is3DViewOpen} onOpenChange={setIs3DViewOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl h-[500px] p-0">
          <DialogHeader className="absolute top-2 right-2 z-10">
            <Button variant="ghost" size="icon" onClick={() => setIs3DViewOpen(false)} className="h-8 w-8 bg-white/80">
              <View3d className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="w-full h-full">
            <Recipe3DView recipeType={selectedRecipe.category} isButtonHidden={true} />
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default AIRecipeDetail;
