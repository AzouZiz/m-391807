
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/app';

type ErrorState = {
  email?: string;
  password?: string;
  general?: string;
};

export const useLogin = () => {
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

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      setIsAuthenticated(true);
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك!",
      });
      
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    isGoogleLoading,
    errors,
    handleLogin,
    handleGoogleLogin,
    handleAdminLogin
  };
};
