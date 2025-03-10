
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Signup = () => {
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll just show a toast
    toast({
      title: "Account Created",
      description: "Welcome to SapidFood! Your account has been created successfully.",
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
        
        <Card className="metaverse-card p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gradient">Create an Account</h1>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="metaverse-input pl-10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className="metaverse-input pl-10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password" 
                  className="metaverse-input pl-10 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-white">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-white">
                  privacy policy
                </Link>
              </label>
            </div>
            
            <Button type="submit" className="metaverse-button w-full">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-center text-sm mt-6">
            <span className="text-white/60">Already have an account?</span>{' '}
            <Link to="/login" className="text-primary hover:text-white hover:underline transition-colors">
              Sign in
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

export default Signup;
