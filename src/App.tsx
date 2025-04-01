
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
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
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import { useAppStore } from './store/app';
import { supabase } from './integrations/supabase/client';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { setIsAuthenticated } = useAppStore();

  useEffect(() => {
    // التحقق من الجلسة الحالية عند تحميل التطبيق
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      // إذا كان المستخدم قادمًا من عملية تسجيل الدخول باستخدام OAuth (مثل Google)
      // فقد يكون لديه رمز مصادقة في عنوان URL
      if (window.location.hash && window.location.hash.includes('access_token')) {
        // سوف يتم التعامل مع ذلك تلقائيًا بواسطة supabase.auth.getSession()
        // وستتم إعادة توجيه المستخدم إلى مكان آخر إذا تم تحديده في redirectTo
      }
    };
    
    checkSession();
    
    // الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    // تنظيف الاشتراك عند إلغاء التحميل
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/ai-recipes" element={<AIRecipes />} />
        <Route path="/meal-planning" element={<MealPlanning />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
