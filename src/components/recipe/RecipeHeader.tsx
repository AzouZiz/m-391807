
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, PrinterIcon, Heart, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface RecipeHeaderProps {
  title: string;
  description: string;
  isLiked: boolean;
  handleLike: () => void;
  handlePrint: () => void;
  setIs3DViewOpen: (open: boolean) => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  description,
  isLiked,
  handleLike,
  handlePrint,
  setIs3DViewOpen
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        <DialogDescription className="text-base text-gray-500">{description}</DialogDescription>
      </div>
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
          <Box className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeHeader;
