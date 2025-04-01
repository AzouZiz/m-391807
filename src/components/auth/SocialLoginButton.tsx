
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SocialLoginButtonProps {
  onClick: () => void;
  isLoading: boolean;
  icon: JSX.Element;
  children: React.ReactNode;
  className?: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  onClick,
  isLoading,
  icon,
  children,
  className
}) => {
  return (
    <Button 
      type="button"
      variant="outline" 
      className={`w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 justify-center ${className || ''}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </Button>
  );
};

export default SocialLoginButton;
