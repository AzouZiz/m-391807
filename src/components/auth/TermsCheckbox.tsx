
import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle } from 'lucide-react';

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onCheckedChange,
  error
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked === true)}
        />
        <label
          htmlFor="terms"
          className="text-sm text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          أوافق على{" "}
          <Link to="/terms" className="text-primary hover:text-white">
            شروط الخدمة
          </Link>{" "}
          و{" "}
          <Link to="/privacy" className="text-primary hover:text-white">
            سياسة الخصوصية
          </Link>
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-sm flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </>
  );
};

export default TermsCheckbox;
