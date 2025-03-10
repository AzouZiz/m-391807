
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Image, 
  Video, 
  FileText, 
  Settings, 
  Plus, 
  TrendingUp, 
  Search, 
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateContent = () => {
    toast({
      title: "مرحباً بك في منشئ المحتوى",
      description: "يمكنك الآن إنشاء محتوى جديد باستخدام الذكاء الاصطناعي.",
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-card border-r border-border ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          <Link to="/" className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <ChefHat className="h-8 w-8 text-primary" />
            {isSidebarOpen && (
              <span className="ml-2 text-xl font-bold">SapidFood</span>
            )}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Button 
                variant={selectedMenu === 'overview' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('overview')}
              >
                <BarChart3 className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">نظرة عامة</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'content' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('content')}
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">المحتوى</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'media' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('media')}
              >
                <Image className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">الوسائط</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'users' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('users')}
              >
                <Users className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">المستخدمون</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'analytics' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('analytics')}
              >
                <TrendingUp className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">التحليلات</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'messages' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('messages')}
              >
                <MessageSquare className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">الرسائل</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'settings' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'}`}
                onClick={() => setSelectedMenu('settings')}
              >
                <Settings className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">الإعدادات</span>}
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="بحث..." className="pl-10" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-medium">المشرف</p>
                <p className="text-muted-foreground text-xs">مشرف النظام</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {selectedMenu === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">لوحة التحكم</h1>
                <Button onClick={handleCreateContent}>
                  <Plus className="mr-2 h-4 w-4" />
                  إنشاء محتوى
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">المستخدمون النشطون</div>
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold">2,543</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+12.5% هذا الأسبوع</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">الوصفات المنشورة</div>
                      <ChefHat className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold">1,286</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+5.3% هذا الأسبوع</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">مقالات AI</div>
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold">428</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+18.2% هذا الأسبوع</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">فيديوهات AI</div>
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+22.7% هذا الأسبوع</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">الأنشطة الأخيرة</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">إنشاء مقال جديد</h3>
                      <p className="text-sm text-muted-foreground">تم إنشاء مقال "وصفات التمر الإبداعية" باستخدام الذكاء الاصطناعي</p>
                    </div>
                    <div className="text-sm text-muted-foreground">منذ 30 دقيقة</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Image className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">توليد صور جديدة</h3>
                      <p className="text-sm text-muted-foreground">تم إنشاء 5 صور للكسكس المغربي باستخدام DALL-E 4</p>
                    </div>
                    <div className="text-sm text-muted-foreground">منذ ساعة</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">مستخدم جديد</h3>
                      <p className="text-sm text-muted-foreground">انضم محمد أحمد إلى المنصة وأضاف 3 وصفات جديدة</p>
                    </div>
                    <div className="text-sm text-muted-foreground">منذ 3 ساعات</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">إنشاء فيديو جديد</h3>
                      <p className="text-sm text-muted-foreground">تم إنشاء فيديو "طريقة تحضير البسطيلة المغربية" مع صوت باللهجة المغربية</p>
                    </div>
                    <div className="text-sm text-muted-foreground">منذ 5 ساعات</div>
                  </div>
                </div>
              </Card>

              {/* Content Generation Section */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">منشئ المحتوى بالذكاء الاصطناعي</h2>
                <p className="text-muted-foreground mb-6">أدخل عنواناً أو موضوعاً لإنشاء محتوى متكامل بالذكاء الاصطناعي</p>
                
                <div className="space-y-4">
                  <Input placeholder="أدخل عنواناً مثل 'وصفات التمر الإبداعية'" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4" />
                      إنشاء مقال
                    </Button>
                    <Button className="flex items-center justify-center gap-2">
                      <Image className="h-4 w-4" />
                      إنشاء صور
                    </Button>
                    <Button className="flex items-center justify-center gap-2">
                      <Video className="h-4 w-4" />
                      إنشاء فيديو
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {selectedMenu !== 'overview' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">قريباً</h2>
                <p className="text-muted-foreground mb-4">جاري العمل على تطوير هذا القسم</p>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedMenu('overview')}
                >
                  العودة إلى لوحة التحكم
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
