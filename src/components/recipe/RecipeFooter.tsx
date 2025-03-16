
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Clock } from 'lucide-react';

interface RecipeFooterProps {
  isSaving: boolean;
  handleSave: () => void;
}

const RecipeFooter: React.FC<RecipeFooterProps> = ({ isSaving, handleSave }) => {
  return (
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
  );
};

export default RecipeFooter;
