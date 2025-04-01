
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/app';

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const validatePassword = () => {
    if (password.length < 6) {
      setError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return false;
    }
    
    if (passwordStrength === 'weak') {
      setError('كلمة المرور ضعيفة جدًا، يرجى اختيار كلمة مرور أقوى');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error, data } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw error;
      }
      
      setIsAuthenticated(true);
      
      toast({
        title: "تم تحديث كلمة المرور",
        description: "تم تغيير كلمة المرور الخاصة بك بنجاح.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('خطأ في إعادة تعيين كلمة المرور:', error);
      setError(error.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">كلمة المرور الجديدة</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input 
            id="password" 
            type="password" 
            placeholder="كلمة المرور الجديدة" 
            className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">تأكيد كلمة المرور</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="أدخل كلمة المرور مرة أخرى" 
            className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-red-400 text-sm flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            كلمات المرور غير متطابقة
          </p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'جاري إعادة التعيين...' : (
          <>
            إعادة تعيين كلمة المرور
            <ArrowRight className="mr-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
