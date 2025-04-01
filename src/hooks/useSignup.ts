
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/app';

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

type ErrorState = {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
  general?: string;
};

export const useSignup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(null);

  // وظيفة للتحقق من قوة كلمة المرور
  const checkPasswordStrength = (password: string): PasswordStrength => {
    if (password.length < 6) return null;
    
    let score = 0;
    
    // التحقق من وجود أحرف كبيرة وصغيرة
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    
    // التحقق من وجود أرقام
    if (/[0-9]/.test(password)) score += 1;
    
    // التحقق من وجود رموز خاصة
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // التحقق من الطول
    if (password.length >= 10) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const validateForm = () => {
    const newErrors: ErrorState = {};
    
    if (!name.trim()) {
      newErrors.name = 'الاسم الكامل مطلوب';
    }
    
    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صالح';
    }
    
    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 6) {
      newErrors.password = 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل';
    } else if (passwordStrength === 'weak') {
      newErrors.password = 'كلمة المرور ضعيفة، يرجى اختيار كلمة مرور أقوى';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'يجب عليك الموافقة على الشروط والأحكام';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // إنشاء المستخدم في Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          // Disable email confirmation
          emailRedirectTo: undefined
        },
      });
      
      if (error) {
        throw error;
      }
      
      setIsAuthenticated(true);
      
      toast({
        title: "تم إنشاء الحساب",
        description: "مرحبًا بك في SapidFood! تم إنشاء حسابك بنجاح.",
      });
      
      // توجيه المستخدم إلى لوحة التحكم
      navigate('/dashboard');
    } catch (error: any) {
      console.error('خطأ في التسجيل:', error);
      
      if (error.message.includes('already')) {
        setErrors({ email: 'هذا البريد الإلكتروني مسجل بالفعل' });
      } else {
        setErrors({ general: error.message || 'حدث خطأ أثناء التسجيل' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    passwordStrength,
    agreeTerms,
    setAgreeTerms,
    isLoading,
    errors,
    handlePasswordChange,
    handleSignup
  };
};
