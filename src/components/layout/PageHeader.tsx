
import React from 'react';
import { ChefHat } from 'lucide-react';

interface PageHeaderProps {
  subtitle?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex items-center gap-2 mb-2">
        <ChefHat className="h-10 w-10 text-white glow-effect" />
        <span className="text-3xl font-bold text-white">SapidFood</span>
      </div>
      <p className="text-white text-base">
        {subtitle || "منصة تجربة الطعام المدعومة بالذكاء الاصطناعي"}
      </p>
    </div>
  );
};

export default PageHeader;
