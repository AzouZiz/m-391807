
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    // التحقق من وجود توكن إعادة التعيين في الرابط
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get('access_token') && !hashParams.get('type')) {
      setErrorMessage('رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية');
    }
  }, []);

  const FooterContent = (
    <p className="text-center text-sm mt-6">
      <button 
        onClick={() => navigate('/login')} 
        className="text-primary hover:text-white hover:underline transition-colors"
      >
        العودة إلى تسجيل الدخول
      </button>
    </p>
  );

  return (
    <AuthLayout 
      title="إعادة تعيين كلمة المرور" 
      footer={FooterContent}
    >
      {errorMessage ? (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-4 text-white">
          <p className="font-medium">خطأ في الرابط</p>
          <p className="text-sm mt-1">{errorMessage}</p>
          <p className="text-sm mt-3">
            يمكنك تجربة{' '}
            <button 
              onClick={() => navigate('/forgot-password')}
              className="text-primary hover:underline"
            >
              طلب رابط جديد
            </button>
          </p>
        </div>
      ) : (
        <ResetPasswordForm />
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
