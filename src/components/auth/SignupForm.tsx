
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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

const SignupForm = () => {
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

  return (
    <>
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{errors.general}</p>
        </div>
      )}
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">الاسم الكامل</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input 
              id="name" 
              type="text" 
              placeholder="أدخل اسمك الكامل" 
              className="metaverse-input pl-10 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input 
              id="email" 
              type="email" 
              placeholder="أدخل بريدك الإلكتروني" 
              className="metaverse-input pl-10 text-white"
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
          <Label htmlFor="password" className="text-white">كلمة المرور</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input 
              id="password" 
              type="password" 
              placeholder="إنشاء كلمة مرور" 
              className="metaverse-input pl-10 text-white"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          
          {/* مؤشر قوة كلمة المرور */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/70">قوة كلمة المرور:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength === 'strong' ? 'text-green-500' : 
                  passwordStrength === 'medium' ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {passwordStrength === 'strong' ? 'قوية' : 
                  passwordStrength === 'medium' ? 'متوسطة' : 
                  'ضعيفة'}
                </span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    passwordStrength === 'strong' ? 'bg-green-500 w-full' : 
                    passwordStrength === 'medium' ? 'bg-yellow-500 w-2/3' : 
                    'bg-red-500 w-1/3'
                  }`}
                />
              </div>
              <ul className="mt-2 text-xs text-white/70 space-y-1">
                <li className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${password.length >= 6 ? 'bg-green-500' : 'bg-white/20'}`}></span>
                  6 أحرف على الأقل
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></span>
                  حرف كبير واحد على الأقل
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></span>
                  رقم واحد على الأقل
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></span>
                  رمز خاص واحد على الأقل
                </li>
              </ul>
            </div>
          )}
          
          {errors.password && (
            <p className="text-red-400 text-sm flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.password}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked === true)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            أوافق على{" "}
            <Link to="/terms" className="text-primary hover:text-white">
              شروط الخدمة
            </Link>{" "}
            و{" "}
            <Link to="/privacy" className="text-primary hover:text-white">
              سياسة الخصوصية
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-400 text-sm flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.terms}
          </p>
        )}
        
        <Button 
          type="submit" 
          className="metaverse-button w-full"
          disabled={isLoading}
        >
          {isLoading ? 'جاري إنشاء الحساب...' : (
            <>
              إنشاء حساب
              <ArrowRight className="mr-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
