
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Search, 
  Filter, 
  ArrowRight, 
  Globe, 
  Clock, 
  Fire, 
  Users,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

// Mock recipe data
const recipes = [
  {
    id: 1,
    title: 'كسكس مغربي تقليدي',
    description: 'طبق شمال أفريقي تقليدي مع اللحم والخضار المطبوخة ببطء',
    image: 'https://images.unsplash.com/photo-1574562662231-69e4ad4a0ef9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
    time: '90 دقيقة',
    difficulty: 'متوسط',
    servings: 6,
    cuisine: 'مغربية',
    created_by_ai: false
  },
  {
    id: 2,
    title: 'طاجين الدجاج بالزيتون',
    description: 'طبق مغربي كلاسيكي من الدجاج المطهو ببطء مع الزيتون والليمون المخلل',
    image: 'https://images.unsplash.com/photo-1626056087728-05c3d180911a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    time: '60 دقيقة',
    difficulty: 'سهل',
    servings: 4,
    cuisine: 'مغربية',
    created_by_ai: false
  },
  {
    id: 3,
    title: 'باستيلا المغربية باللوز',
    description: 'فطيرة حلوة ومالحة مليئة باللوز والقرفة ومغطاة بالسكر البودرة',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80',
    time: '120 دقيقة',
    difficulty: 'صعب',
    servings: 8,
    cuisine: 'مغربية',
    created_by_ai: false
  },
  {
    id: 4,
    title: 'شوربة الحريرة',
    description: 'حساء مغربي غني بالحمص والعدس والمعكرونة والتوابل الدافئة',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    time: '45 دقيقة',
    difficulty: 'متوسط',
    servings: 6,
    cuisine: 'مغربية',
    created_by_ai: true
  },
  {
    id: 5,
    title: 'كبسة لحم سعودية',
    description: 'طبق أرز عربي مشهور مع اللحم والبهارات المميزة',
    image: 'https://images.unsplash.com/photo-1640116345144-0ce12a861f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
    time: '70 دقيقة',
    difficulty: 'متوسط',
    servings: 6,
    cuisine: 'سعودية',
    created_by_ai: true
  },
  {
    id: 6,
    title: 'محشي ورق عنب',
    description: 'أوراق العنب المحشوة بالأرز والأعشاب، طبق مشهور في المطبخ الشرق أوسطي',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
    time: '90 دقيقة',
    difficulty: 'صعب',
    servings: 8,
    cuisine: 'لبنانية',
    created_by_ai: false
  }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine ? recipe.cuisine === selectedCuisine : true;
    
    return matchesSearch && matchesCuisine;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAIRecipeGeneration = () => {
    toast({
      title: "جاري توليد وصفات باستخدام الذكاء الاصطناعي",
      description: "سيتم إنشاء وصفات مخصصة بناءً على تفضيلاتك.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SapidFood</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              الرئيسية
            </Link>
            <Link to="/explore" className="text-foreground font-medium">
              استكشاف
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              لوحة التحكم
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">إنشاء حساب</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="ابحث عن وصفات..." 
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button onClick={handleAIRecipeGeneration} className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>توليد وصفات بالذكاء الاصطناعي</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCuisine === null ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCuisine(null)}
            >
              الكل
            </Button>
            
            {cuisines.map(cuisine => (
              <Button 
                key={cuisine} 
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="group">
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="relative aspect-video">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {recipe.created_by_ai && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        <span>إنشاء AI</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>{recipe.cuisine}</span>
                      </div>
                      <Separator orientation="vertical" className="h-3" />
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{recipe.time}</span>
                      </div>
                      <Separator orientation="vertical" className="h-3" />
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs">
                        <Fire className="h-3 w-3 text-primary" />
                        <span>{recipe.difficulty}</span>
                      </div>
                      <span className="text-primary text-sm group-hover:underline flex items-center">
                        عرض الوصفة
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">
                لم نتمكن من العثور على وصفات تطابق معايير البحث الخاصة بك
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCuisine(null);
              }}>
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SapidFood</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                منصة الذكاء الاصطناعي الشاملة للطعام
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                الرئيسية
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                من نحن
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                اتصل بنا
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                سياسة الخصوصية
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SapidFood. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Explore;
