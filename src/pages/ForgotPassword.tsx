
import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  const FooterContent = (
    <p className="text-center text-sm mt-6">
      <span className="text-white/60">تذكرت كلمة المرور؟</span>{' '}
      <Link to="/login" className="text-primary hover:text-white hover:underline transition-colors">
        العودة إلى تسجيل الدخول
      </Link>
    </p>
  );

  return (
    <AuthLayout 
      title="استعادة كلمة المرور" 
      footer={FooterContent}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
