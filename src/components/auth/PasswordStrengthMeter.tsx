
import React from 'react';

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

interface PasswordStrengthMeterProps {
  password: string;
  passwordStrength: PasswordStrength;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  passwordStrength
}) => {
  if (password.length === 0) return null;
  
  return (
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
  );
};

export default PasswordStrengthMeter;
