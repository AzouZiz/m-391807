
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children, footer }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </Link>
          <p className="text-white/80">منصة تجربة الطعام المدعومة بالذكاء الاصطناعي</p>
        </div>
        
        <Card className="metaverse-card p-6 backdrop-blur-lg bg-white/10 border border-white/20">
          <h1 className="text-2xl font-bold mb-6 text-center text-gradient">{title}</h1>
          {children}
          {footer && footer}
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/60 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
