
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import RecipeScene from '../three-d/RecipeScene';

interface Recipe3DModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  recipeCategory: string;
}

const Recipe3DModal: React.FC<Recipe3DModalProps> = ({ 
  isOpen, 
  setIsOpen, 
  recipeCategory 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-xl h-[500px] p-0">
        <DialogHeader className="absolute top-2 right-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)} 
            className="h-8 w-8 bg-white/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="w-full h-full">
          <RecipeScene recipeType={recipeCategory} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Recipe3DModal;
