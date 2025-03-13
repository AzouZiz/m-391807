
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    }
    
    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // استرداد قائمة المستخدمين من التخزين المحلي
    const users = JSON.parse(localStorage.getItem('sapidFoodUsers') || '[]');
    
    // البحث عن المستخدم بواسطة البريد الإلكتروني
    const user = users.find((u: any) => u.email === email);
    
    // التحقق من صحة بيانات الاعتماد
    if (!user || user.password !== password) {
      setErrors({ general: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
      return;
    }
    
    // حفظ معلومات المستخدم الحالي (باستثناء كلمة المرور)
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email
    }));
    
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: `مرحبًا بعودتك، ${user.name}!`,
    });
    
    // توجيه المستخدم إلى لوحة التحكم
    navigate('/dashboard');
  };
  
  const handleAdminLogin = () => {
    // إنشاء حساب المسؤول إذا لم يكن موجودًا بالفعل
    const users = JSON.parse(localStorage.getItem('sapidFoodUsers') || '[]');
    
    if (!users.some((u: any) => u.email === 'admin@sapid.com')) {
      const adminUser = {
        id: 'admin-' + Date.now().toString(),
        name: 'مسؤول النظام',
        email: 'admin@sapid.com',
        password: 'admin123', // في الإنتاج، استخدم كلمة مرور أقوى
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('sapidFoodUsers', JSON.stringify([...users, adminUser]));
    }
    
    // تعيين المسؤول كمستخدم حالي
    const adminUser = users.find((u: any) => u.email === 'admin@sapid.com') || {
      id: 'admin-' + Date.now().toString(),
      name: 'مسؤول النظام',
      email: 'admin@sapid.com',
      role: 'admin'
    };
    
    localStorage.setItem('currentUser', JSON.stringify({
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: 'admin'
    }));
    
    toast({
      title: "تم تسجيل دخول المسؤول",
      description: "جاري التوجيه إلى لوحة تحكم المسؤول...",
    });
    
    // توجيه المستخدم إلى لوحة التحكم
    navigate('/dashboard');
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
        
        <Card className="metaverse-card p-6 backdrop-blur-lg bg-white/10 border border-white/20">
          <h1 className="text-2xl font-bold mb-6 text-center text-gradient">تسجيل الدخول إلى SapidFood</h1>
          
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
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
                <Link to="/forgot-password" className="text-sm text-primary hover:text-white hover:underline transition-colors">
                  نسيت كلمة المرور؟
                </Link>
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
            
            <Button type="submit" className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
              تسجيل الدخول
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </form>
          
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
          >
            <User className="mr-2 h-4 w-4" />
            تسجيل دخول المسؤول
          </Button>
          
          <p className="text-center text-sm mt-6">
            <span className="text-white/60">ليس لديك حساب؟</span>{' '}
            <Link to="/signup" className="text-primary hover:text-white hover:underline transition-colors">
              إنشاء حساب جديد
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

export default Login;
