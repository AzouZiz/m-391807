
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, User } from 'lucide-react';
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
        password,
        options: {
          // استخدام خيار تذكرني لزيادة فترة انتهاء الصلاحية
          expiresIn: rememberMe ? 30 * 24 * 60 * 60 : 3600, // 30 يوم مقابل ساعة واحدة
        }
      });
      
      if (error) {
        throw error;
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
      
      <Button 
        variant="outline" 
        className="w-full mb-4 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        onClick={handleAdminLogin}
        disabled={isLoading}
      >
        <User className="mr-2 h-4 w-4" />
        تسجيل دخول المسؤول
      </Button>
    </form>
  );
};

export default LoginForm;
