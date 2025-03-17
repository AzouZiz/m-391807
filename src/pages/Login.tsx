
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { useAppStore } from '@/store/app';

const Login = () => {
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
      <span className="text-white/60">ليس لديك حساب؟</span>{' '}
      <Link to="/signup" className="text-primary hover:text-white hover:underline transition-colors">
        إنشاء حساب جديد
      </Link>
    </p>
  );

  return (
    <AuthLayout 
      title="تسجيل الدخول إلى SapidFood" 
      footer={FooterContent}
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
