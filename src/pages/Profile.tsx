
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, User, Mail, Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول للوصول إلى الملف الشخصي",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      const currentUser = JSON.parse(currentUserJSON);
      setUser(currentUser);
      setName(currentUser.name);
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في قراءة بيانات المستخدم:', error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'الاسم الكامل مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) {
      return;
    }
    
    // تحديث بيانات المستخدم في localStorage
    const users = JSON.parse(localStorage.getItem('sapidFoodUsers') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, name } : u
    );
    
    localStorage.setItem('sapidFoodUsers', JSON.stringify(updatedUsers));
    
    // تحديث بيانات المستخدم الحالي
    const updatedUser = { ...user, name };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast({
      title: "تم التحديث",
      description: "تم تحديث الملف الشخصي بنجاح",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل الملف الشخصي...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </div>
          <p className="text-white text-base">منصة تجربة الطعام المدعومة بالذكاء الاصطناعي</p>
        </div>
        
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                className="text-white p-0 hover:bg-white/20" 
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="text-white font-medium">العودة</span>
              </Button>
              <h1 className="text-2xl font-bold text-white">الملف الشخصي</h1>
            </div>
          </CardHeader>
          
          <Separator className="bg-white/20 my-2" />
          
          <CardContent className="pt-6">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-glow">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="أدخل اسمك الكامل" 
                    className="pl-10 text-white bg-white/20 border-white/30"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-300 text-sm flex items-center mt-1 font-medium">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={user?.email}
                    readOnly
                    className="pl-10 text-white bg-white/20 border-white/30 opacity-80 cursor-not-allowed"
                  />
                </div>
                <p className="text-white/80 text-xs">لا يمكن تغيير البريد الإلكتروني</p>
              </div>
            
              <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium">
                <Save className="mr-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col pt-6">
            <Separator className="bg-white/20 mb-6" />
            <Button 
              variant="outline" 
              className="w-full border-white/30 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40 transition-all duration-300 font-medium"
              onClick={() => {
                localStorage.removeItem('currentUser');
                toast({
                  title: "تسجيل الخروج",
                  description: "تم تسجيل الخروج بنجاح",
                });
                navigate('/login');
              }}
            >
              تسجيل الخروج
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/80 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
