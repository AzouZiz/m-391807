
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Award, Book, UserRound, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول للوصول إلى لوحة التحكم",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      const currentUser = JSON.parse(currentUserJSON);
      setUser(currentUser);
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في قراءة بيانات المستخدم:', error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح",
    });
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل لوحة التحكم...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </div>
          <p className="text-white text-base">منصة تجربة الطعام المدعومة بالذكاء الاصطناعي</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold shadow-glow">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{`مرحباً، ${user?.name}`}</h2>
                <p className="text-white/80 text-sm">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/profile')}
              >
                <UserRound className="h-4 w-4 mr-1" />
                الملف الشخصي
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
          
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <Input 
              placeholder="ابحث عن وصفات، مكونات، أو نصائح..." 
              className="pl-12 bg-white/20 border-white/30 text-white h-12"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/explore">
              <Card className="bg-gradient-to-br from-purple-600/80 to-indigo-700/80 hover:from-purple-600/90 hover:to-indigo-700/90 border-white/30 hover:border-white/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center p-6 h-40">
                  <Award className="h-12 w-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white">استكشاف</h3>
                  <p className="text-white/80 text-sm text-center mt-1">اكتشف وصفات جديدة ومثيرة</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/recipes">
              <Card className="bg-gradient-to-br from-pink-600/80 to-rose-700/80 hover:from-pink-600/90 hover:to-rose-700/90 border-white/30 hover:border-white/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center p-6 h-40">
                  <Book className="h-12 w-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white">وصفاتي</h3>
                  <p className="text-white/80 text-sm text-center mt-1">إدارة وإنشاء وصفاتك الخاصة</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/meal-planning">
              <Card className="bg-gradient-to-br from-blue-600/80 to-cyan-700/80 hover:from-blue-600/90 hover:to-cyan-700/90 border-white/30 hover:border-white/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center p-6 h-40">
                  <ChefHat className="h-12 w-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white">خطة وجبات</h3>
                  <p className="text-white/80 text-sm text-center mt-1">خطط وجبات أسبوعية متوازنة</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/80 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
