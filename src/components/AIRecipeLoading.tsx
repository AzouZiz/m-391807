
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, ChefHat } from 'lucide-react';

const AIRecipeLoading: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // إعداد الرسوم المتحركة البسيطة للعناصر المرئية
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    
    // إنشاء جسيمات تمثل المكونات
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: `hsl(${Math.random() * 60 + 180}, 80%, 60%, ${Math.random() * 0.5 + 0.3})`
        });
      }
    };
    
    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // إعادة رسم الجسيمات عندما تخرج من الإطار
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      
      requestAnimationFrame(updateParticles);
    };
    
    // تعيين حجم Canvas للعرض المتجاوب
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        createParticles();
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    updateParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30 relative overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
        <div className="text-center relative z-10">
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
