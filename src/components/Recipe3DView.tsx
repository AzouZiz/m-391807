
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Box, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RecipeScene from './three-d/RecipeScene';

interface Recipe3DViewProps {
  recipeType?: string;
  isButtonHidden?: boolean;
}

const Recipe3DView: React.FC<Recipe3DViewProps> = ({ 
  recipeType = 'default',
  isButtonHidden = false
}) => {
  const [open, setOpen] = useState(false);
  
  if (isButtonHidden) {
    return (
      <div className="w-full h-[300px]">
        <RecipeScene recipeType={recipeType} />
      </div>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex gap-2 items-center"
        >
          <Box size={16} />
          عرض ثلاثي الأبعاد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl h-[500px] p-0">
        <DialogHeader className="absolute top-2 right-2 z-10">
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="w-full h-full">
          <RecipeScene recipeType={recipeType} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Recipe3DView;
