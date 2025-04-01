
import React from 'react';
import { ArrowRight, AlertCircle, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormInput from './FormInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import TermsCheckbox from './TermsCheckbox';
import { useSignup } from '@/hooks/useSignup';

const SignupForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    passwordStrength,
    agreeTerms,
    setAgreeTerms,
    isLoading,
    errors,
    handlePasswordChange,
    handleSignup
  } = useSignup();

  return (
    <>
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{errors.general}</p>
        </div>
      )}
      
      <form onSubmit={handleSignup} className="space-y-4">
        <FormInput
          id="name"
          label="الاسم الكامل"
          type="text"
          placeholder="أدخل اسمك الكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          Icon={User}
        />
        
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
          <FormInput
            id="password"
            label="كلمة المرور"
            type="password"
            placeholder="إنشاء كلمة مرور"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
            Icon={Lock}
          />
          
          <PasswordStrengthMeter 
            password={password} 
            passwordStrength={passwordStrength} 
          />
        </div>
        
        <TermsCheckbox
          checked={agreeTerms}
          onCheckedChange={setAgreeTerms}
          error={errors.terms}
        />
        
        <Button 
          type="submit" 
          className="metaverse-button w-full"
          disabled={isLoading}
        >
          {isLoading ? 'جاري إنشاء الحساب...' : (
            <>
              إنشاء حساب
              <ArrowRight className="mr-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
