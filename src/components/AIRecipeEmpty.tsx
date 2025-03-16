
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ChefHat, Utensils, Search } from 'lucide-react';

interface AIRecipeEmptyProps {
  onStartAI: () => void;
}

const AIRecipeEmpty: React.FC<AIRecipeEmptyProps> = ({ onStartAI }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // إضافة تأثير تتبع مؤشر الماوس للبطاقة
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // حساب الزاوية بناءً على موقع المؤشر
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // تطبيق التحويل مع مراعاة كتابة RTL
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center h-96">
      <Card 
        ref={cardRef}
        className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg border border-white/30 transition-all duration-300 hover:shadow-xl"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
      >
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6" style={{ transform: 'translateZ(20px)' }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 flex items-center justify-center">
              <ChefHat className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3" style={{ transform: 'translateZ(15px)' }}>
            وصفات ذكية باستخدام الذكاء الاصطناعي
          </h2>
          <p className="text-white/80 mb-6" style={{ transform: 'translateZ(10px)' }}>
            اكتب وصفاً لما تريد طبخه، أو أدخل المكونات المتوفرة لديك، وسنقوم بإنشاء وصفات مخصصة لك!
          </p>
          
          <div className="space-y-3 mb-8" style={{ transform: 'translateZ(5px)' }}>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
              <Search className="h-5 w-5 text-white/70" />
              <p className="text-white/70 text-sm">ابحث عن "وجبات صحية سريعة"</p>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
              <Utensils className="h-5 w-5 text-white/70" />
              <p className="text-white/70 text-sm">أو أدخل المكونات المتوفرة لديك</p>
            </div>
          </div>
          
          <div className="flex justify-center" style={{ transform: 'translateZ(25px)' }}>
            <Button 
              className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
              onClick={onStartAI}
              size="lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              ابدأ باستخدام الذكاء الاصطناعي
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-white/50 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>نستخدم تقنيات الذكاء الاصطناعي المتطورة لتقديم وصفات مخصصة</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIRecipeEmpty;
