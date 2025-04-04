
import React from 'react';

interface PageFooterProps {
  className?: string;
}

const PageFooter: React.FC<PageFooterProps> = ({
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-white/80 text-xs">
        © 2025 SapidFood. جميع الحقوق محفوظة.
      </p>
    </div>
  );
};

export default PageFooter;
