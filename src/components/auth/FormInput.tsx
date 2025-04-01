
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  Icon: LucideIcon;
}

const FormInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  Icon
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
        <Input 
          id={id} 
          type={type} 
          placeholder={placeholder} 
          className="metaverse-input pl-10 text-white"
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
