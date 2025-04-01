
import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        throw error;
      }
      
      setIsSuccess(true);
      toast({
        title: "تم إرسال رابط إعادة تعيين كلمة المرور",
        description: "يرجى التحقق من بريدك الإلكتروني",
      });
    } catch (error: any) {
      console.error('خطأ في إرسال رابط إعادة تعيين كلمة المرور:', error);
      setError(error.message || 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="bg-green-500/20 border border-green-500/50 rounded-md p-4 mb-4 text-white flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-500" />
          <div>
            <p className="font-medium">تم إرسال رابط إعادة تعيين كلمة المرور</p>
            <p className="text-sm mt-1">يرجى التحقق من بريدك الإلكتروني: {email}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
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
            <p className="text-sm text-white/60">
              سنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'جاري الإرسال...' : (
              <>
                إرسال رابط إعادة التعيين
                <ArrowRight className="mr-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
