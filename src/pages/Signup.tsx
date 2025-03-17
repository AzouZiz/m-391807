
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/app';

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    terms?: string;
    general?: string;
  }>({});

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </Link>
          <p className="text-white/80">منصة تجربة الطعام المدعومة بالذكاء الاصطناعي</p>
        </div>
        
        <Card className="metaverse-card p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gradient">إنشاء حساب جديد</h1>
          
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
          
          <p className="text-center text-sm mt-6">
            <span className="text-white/60">لديك حساب بالفعل؟</span>{' '}
            <Link to="/login" className="text-primary hover:text-white hover:underline transition-colors">
              تسجيل الدخول
            </Link>
          </p>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/60 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
