
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, User, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/app';

type ErrorState = {
  email?: string;
  password?: string;
  general?: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

  const validateForm = () => {
    const newErrors: ErrorState = {};
    
    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    }
    
    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }

      // إذا كان خيار تذكرني مفعل، نقوم بتخزين الجلسة لفترة أطول
      if (rememberMe) {
        // نحن لا نستخدم expiresIn مباشرة كما كان سابقًا لأنها ليست خيارًا في signInWithPassword
        // بدلاً من ذلك، يمكننا تخزين تفضيلات المستخدم محليًا
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      setIsAuthenticated(true);
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك!",
      });
      
      // توجيه المستخدم إلى لوحة التحكم
      navigate('/dashboard');
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ general: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
      } else {
        setErrors({ general: error.message || 'حدث خطأ أثناء تسجيل الدخول' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        throw error;
      }
      
      // ملاحظة: سيتم توجيه المستخدم إلى Google للمصادقة
      // وسيتم التعامل مع إعادة التوجيه بواسطة Supabase
      
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول باستخدام Google:', error);
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء محاولة تسجيل الدخول باستخدام Google",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  const handleAdminLogin = async () => {
    setEmail('admin@sapid.com');
    setPassword('admin123');
    
    // استخدم دالة handleLogin مع حدث وهمي
    await handleLogin({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{errors.general}</p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input 
            id="email" 
            type="email" 
            placeholder="أدخل بريدك الإلكتروني" 
            className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.email}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-white">كلمة المرور</Label>
          <a href="/forgot-password" className="text-sm text-primary hover:text-white hover:underline transition-colors">
            نسيت كلمة المرور؟
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input 
            id="password" 
            type="password" 
            placeholder="أدخل كلمة المرور" 
            className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.password}
          </p>
        )}
      </div>
      
      {/* خيار تذكرني */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <Label 
          htmlFor="remember" 
          className="text-sm text-white/80 cursor-pointer"
        >
          تذكرني
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'جاري تسجيل الدخول...' : (
          <>
            تسجيل الدخول
            <ArrowRight className="mr-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-white/60">أو</span>
        </div>
      </div>
      
      {/* زر تسجيل الدخول باستخدام Google */}
      <Button 
        type="button"
        variant="outline" 
        className="w-full mb-4 border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 justify-center"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path 
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
              fill="#4285F4" 
            />
            <path 
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
              fill="#34A853" 
            />
            <path 
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
              fill="#FBBC05" 
            />
            <path 
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
              fill="#EA4335" 
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        )}
        تسجيل الدخول باستخدام Google
      </Button>
      
      <Button 
        variant="outline" 
        type="button"
        className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        onClick={handleAdminLogin}
        disabled={isLoading || isGoogleLoading}
      >
        <User className="mr-2 h-4 w-4" />
        تسجيل دخول المسؤول
      </Button>
    </form>
  );
};

export default LoginForm;
