
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll just show a toast
    toast({
      title: "تسجيل الدخول",
      description: "مرحباً بك في منصة SapidFood!",
    });
  };
  
  const handleAdminLogin = () => {
    toast({
      title: "تسجيل دخول المشرف",
      description: "جاري تحويلك إلى لوحة تحكم المشرف...",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SapidFood</span>
          </Link>
          <p className="text-muted-foreground">منصة الذكاء الاصطناعي الشاملة للطعام</p>
        </div>
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني" 
                  className="pl-10"
                  defaultValue="azeddinebeldjilali9@gmail.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="أدخل كلمة المرور" 
                  className="pl-10"
                  defaultValue="************"
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              تسجيل الدخول
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mb-4"
            onClick={handleAdminLogin}
          >
            تسجيل دخول المشرف
          </Button>
          
          <p className="text-center text-sm mt-6">
            <span className="text-muted-foreground">ليس لديك حساب؟</span>{' '}
            <Link to="/signup" className="text-primary hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
