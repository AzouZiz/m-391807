
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const AIRecipeLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-white mx-auto mb-4 animate-pulse" />
          <p className="text-white text-lg font-medium mb-4">
            جاري إنشاء وصفات ذكية باستخدام الذكاء الاصطناعي...
          </p>
          <div className="h-2 bg-white/20 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent w-1/2 animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIRecipeLoading;
