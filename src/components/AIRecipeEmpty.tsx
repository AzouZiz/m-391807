
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AIRecipeEmptyProps {
  onStartAI: () => void;
}

const AIRecipeEmpty: React.FC<AIRecipeEmptyProps> = ({ onStartAI }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg border border-white/30">
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">
            وصفات ذكية باستخدام الذكاء الاصطناعي
          </h2>
          <p className="text-white/80 mb-6">
            اكتب وصفاً لما تريد طبخه، أو أدخل المكونات المتوفرة لديك، وسنقوم بإنشاء وصفات مخصصة لك!
          </p>
          <Button 
            className="metaverse-button" 
            onClick={onStartAI}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            ابدأ باستخدام الذكاء الاصطناعي
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AIRecipeEmpty;
