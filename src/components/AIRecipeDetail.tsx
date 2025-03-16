
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import RecipeHeader from './recipe/RecipeHeader';
import RecipeImage from './recipe/RecipeImage';
import RecipeIngredients from './recipe/RecipeIngredients';
import RecipeInstructions from './recipe/RecipeInstructions';
import RecipeFooter from './recipe/RecipeFooter';
import Recipe3DModal from './recipe/Recipe3DModal';

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
  const [isSaving, setIsSaving] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [is3DViewOpen, setIs3DViewOpen] = useState(false);
  
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
          <RecipeHeader 
            title={selectedRecipe.title}
            description={selectedRecipe.description}
            isLiked={isLiked}
            handleLike={handleLike}
            handlePrint={handlePrint}
            setIs3DViewOpen={setIs3DViewOpen}
          />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <RecipeImage 
              title={selectedRecipe.title}
              image={selectedRecipe.image}
              category={selectedRecipe.category}
              difficulty={selectedRecipe.difficulty}
              time={selectedRecipe.time}
            />
            <RecipeIngredients ingredients={selectedRecipe.ingredients} />
          </div>

          <div>
            <RecipeInstructions instructions={selectedRecipe.instructions} />
          </div>
        </div>

        <DialogFooter className="mt-8">
          <RecipeFooter isSaving={isSaving} handleSave={handleSave} />
        </DialogFooter>
      </DialogContent>

      <Recipe3DModal 
        isOpen={is3DViewOpen} 
        setIsOpen={setIs3DViewOpen}
        recipeCategory={selectedRecipe.category}
      />
    </Dialog>
  );
};

export default AIRecipeDetail;
