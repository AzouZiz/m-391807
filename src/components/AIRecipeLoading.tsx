
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, ChefHat } from 'lucide-react';

const AIRecipeLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <ChefHat className="h-12 w-12 text-white mx-auto absolute top-0 left-0 right-0 animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          </div>
          <p className="text-white text-lg font-medium mb-4">
            جاري إنشاء وصفات ذكية باستخدام الذكاء الاصطناعي...
          </p>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-primary via-indigo-500 to-primary bg-[length:200%_auto] animate-gradient-x"></div>
          </div>
          <p className="text-white/70 text-sm">
            قد تستغرق العملية بضع ثوانٍ، نقوم بتحليل طلبك لتقديم أفضل النتائج
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="w-20 h-20 bg-white/10 rounded-md animate-pulse"></div>
            <div className="w-20 h-20 bg-white/10 rounded-md animate-pulse delay-100"></div>
            <div className="w-20 h-20 bg-white/10 rounded-md animate-pulse delay-200"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIRecipeLoading;
