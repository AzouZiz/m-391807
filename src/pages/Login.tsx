
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll just show a toast
    toast({
      title: "Login Successful",
      description: "Welcome to SapidFood platform!",
    });
  };
  
  const handleAdminLogin = () => {
    toast({
      title: "Admin Login",
      description: "Redirecting to admin dashboard...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </Link>
          <p className="text-white/80">AI-Powered Food Experience Platform</p>
        </div>
        
        <Card className="metaverse-card p-6 backdrop-blur-lg bg-white/10 border border-white/20">
          <h1 className="text-2xl font-bold mb-6 text-center text-gradient">Login to SapidFood</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
                  defaultValue="johndoe@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-white hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  className="metaverse-input bg-white/10 border-white/20 pl-10 text-white"
                  defaultValue="************"
                />
              </div>
            </div>
            
            <Button type="submit" className="metaverse-button w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/60">or</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mb-4 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            onClick={handleAdminLogin}
          >
            <User className="mr-2 h-4 w-4" />
            Admin Login
          </Button>
          
          <p className="text-center text-sm mt-6">
            <span className="text-white/60">Don't have an account?</span>{' '}
            <Link to="/signup" className="text-primary hover:text-white hover:underline transition-colors">
              Create a new account
            </Link>
          </p>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/60 text-xs">
            © 2025 SapidFood. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
