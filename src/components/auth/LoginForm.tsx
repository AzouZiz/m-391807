
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import FormInput from '@/components/auth/FormInput';
import FormError from '@/components/auth/FormError';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import { useLogin } from '@/hooks/useLogin';

const LoginForm: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    isGoogleLoading,
    errors,
    handleLogin,
    handleGoogleLogin,
    handleAdminLogin
  } = useLogin();

  const GoogleIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path 
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
        fill="#4285F4" 
      />
      <path 
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
        fill="#34A853" 
      />
      <path 
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
        fill="#FBBC05" 
      />
      <path 
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
        fill="#EA4335" 
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {errors.general && <FormError message={errors.general} />}
      
      <FormInput
        id="email"
        label="البريد الإلكتروني"
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        Icon={Mail}
      />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-white">كلمة المرور</Label>
          <Link to="/forgot-password" className="text-sm text-primary hover:text-white hover:underline transition-colors">
            نسيت كلمة المرور؟
          </Link>
        </div>
        <FormInput
          id="password"
          label=""
          type="password"
          placeholder="أدخل كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          Icon={Lock}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <Label 
          htmlFor="remember" 
          className="text-sm text-white/80 cursor-pointer"
        >
          تذكرني
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'جاري تسجيل الدخول...' : (
          <>
            تسجيل الدخول
            <ArrowRight className="mr-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-white/60">أو</span>
        </div>
      </div>
      
      <SocialLoginButton
        onClick={handleGoogleLogin}
        isLoading={isGoogleLoading}
        icon={GoogleIcon}
        className="mb-4"
      >
        تسجيل الدخول باستخدام Google
      </SocialLoginButton>
      
      <SocialLoginButton
        onClick={handleAdminLogin}
        isLoading={isLoading || isGoogleLoading}
        icon={<User className="mr-2 h-4 w-4" />}
      >
        تسجيل دخول المسؤول
      </SocialLoginButton>
    </form>
  );
};

export default LoginForm;
