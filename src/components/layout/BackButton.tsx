
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = 'العودة',
  className = 'text-white p-0 hover:bg-white/20'
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleClick}
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      <span className="text-white font-medium">{label}</span>
    </Button>
  );
};

export default BackButton;
