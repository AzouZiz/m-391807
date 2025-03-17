
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';
import { useAppStore } from '@/store/app';

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppStore();

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const FooterContent = (
    <p className="text-center text-sm mt-6">
      <span className="text-white/60">لديك حساب بالفعل؟</span>{' '}
      <Link to="/login" className="text-primary hover:text-white hover:underline transition-colors">
        تسجيل الدخول
      </Link>
    </p>
  );

  return (
    <AuthLayout 
      title="إنشاء حساب جديد" 
      footer={FooterContent}
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
