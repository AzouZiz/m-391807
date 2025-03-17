
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Explore from '@/pages/Explore';
import Recipes from '@/pages/Recipes';
import RecipeDetail from '@/pages/RecipeDetail';
import ProductDetail from '@/pages/ProductDetail';
import AIRecipes from '@/pages/AIRecipes';
import MealPlanning from '@/pages/MealPlanning';
import Cart from '@/pages/Cart';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import { useAppStore } from './store/app';
import { supabase } from './integrations/supabase/client';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { setIsAuthenticated } = useAppStore();

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setIsAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/ai-recipes" element={<AIRecipes />} />
        <Route path="/meal-planning" element={<MealPlanning />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
