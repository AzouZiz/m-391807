
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, User, Mail, Save, ArrowLeft, AlertCircle, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FormError from '@/components/auth/FormError';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar_url?: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    avatar?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "غير مصرح",
            description: "يرجى تسجيل الدخول للوصول إلى الملف الشخصي",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        // الحصول على بيانات الملف الشخصي
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error || !profile) {
          throw error || new Error('لم يتم العثور على الملف الشخصي');
        }
          
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          avatar_url: profile.avatar_url
        });
        
        setName(profile.name);
        setAvatarUrl(profile.avatar_url);
        setIsLoading(false);
      } catch (error) {
        console.error('خطأ في جلب بيانات المستخدم:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل الملف الشخصي",
          variant: "destructive",
        });
        navigate('/login');
      }
    };
    
    fetchUserProfile();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'الاسم الكامل مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // التحقق من حجم الملف (الحد الأقصى 2 ميجابايت)
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ avatar: 'يجب أن يكون حجم الصورة أقل من 2 ميجابايت' });
      return;
    }

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      setErrors({ avatar: 'يرجى اختيار صورة صالحة' });
      return;
    }

    setUploadingAvatar(true);
    setErrors({});

    try {
      // إنشاء اسم فريد للملف
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // تحميل الملف إلى التخزين
      const { error: uploadError } = await supabase.storage
        .from('user_content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // الحصول على الرابط العام للملف
      const { data: publicURL } = supabase.storage
        .from('user_content')
        .getPublicUrl(filePath);

      if (!publicURL) throw new Error('فشل في الحصول على رابط الصورة');

      // تحديث عنوان URL للصورة الرمزية في الحالة
      setAvatarUrl(publicURL.publicUrl);

      toast({
        title: "تم التحميل",
        description: "تم تحميل الصورة الرمزية بنجاح",
      });
    } catch (error: any) {
      console.error('خطأ في تحميل الصورة الرمزية:', error);
      setErrors({ avatar: error.message || 'فشل في تحميل الصورة' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // تحديث الملف الشخصي في Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ 
          name,
          avatar_url: avatarUrl 
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // تحديث بيانات المستخدم المحلية
      setUser({ ...user, name, avatar_url: avatarUrl });
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث الملف الشخصي بنجاح",
      });
    } catch (error: any) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      setErrors({ 
        general: error.message || 'حدث خطأ أثناء تحديث الملف الشخصي' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
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
            {errors.general && (
              <FormError message={errors.general} />
            )}
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-white/50">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={user?.name || ''} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="absolute -bottom-2 -right-2">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                      <input 
                        id="avatar-upload" 
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                      />
                    </label>
                  </div>
                  
                  {user?.role === 'admin' && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      مسؤول
                    </span>
                  )}
                </div>
              </div>
              
              {errors.avatar && (
                <p className="text-center text-red-300 text-sm flex items-center justify-center mt-1 font-medium">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.avatar}
                </p>
              )}
              
              {uploadingAvatar && (
                <p className="text-center text-white/80 text-sm mt-1">
                  جاري تحميل الصورة...
                </p>
              )}
              
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
            
              <Button 
                type="submit" 
                className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium"
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col pt-6">
            <Separator className="bg-white/20 mb-6" />
            <Button 
              variant="outline" 
              className="w-full border-white/30 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40 transition-all duration-300 font-medium"
              onClick={handleLogout}
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
