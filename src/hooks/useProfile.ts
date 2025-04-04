
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar_url?: string | null;
}

export const useProfile = () => {
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

  return {
    user,
    name,
    setName,
    avatarUrl,
    uploadingAvatar,
    errors,
    isLoading,
    isSaving,
    handleAvatarUpload,
    handleSaveProfile,
    handleLogout
  };
};
