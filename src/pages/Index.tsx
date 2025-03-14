
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Sparkles, Award, Book, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('currentUser') !== null;

  const featuredRecipes = [
    {
      id: '1',
      title: 'كنافة نابلسية تقليدية',
      image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&q=80&w=2070',
      description: 'حلوى شرقية مشهورة ولذيذة مع عجينة الكنافة والقطر والجبنة',
      category: 'حلويات',
      difficulty: 'متوسط',
      time: '45 دقيقة'
    },
    {
      id: '2',
      title: 'كبسة لحم سعودية تقليدية',
      image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&q=80&w=2070',
      description: 'طبق أرز غني باللحم والتوابل على الطريقة السعودية الأصيلة',
      category: 'أطباق رئيسية',
      difficulty: 'سهل',
      time: '60 دقيقة'
    },
    {
      id: '3',
      title: 'تبولة لبنانية',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2072',
      description: 'سلطة طازجة من البقدونس والبرغل والطماطم والخضروات',
      category: 'مقبلات',
      difficulty: 'سهل',
      time: '20 دقيقة'
    },
    {
      id: '4',
      title: 'مقلوبة فلسطينية',
      image: 'https://images.unsplash.com/photo-1695438272113-f86c6dae77c1?auto=format&fit=crop&q=80&w=1951',
      description: 'طبق أرز شهي مع الخضار والدجاج على الطريقة الفلسطينية',
      category: 'أطباق رئيسية',
      difficulty: 'متوسط',
      time: '75 دقيقة'
    }
  ];

  const searchRecipes = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/explore');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&q=80&w=2071')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative container mx-auto flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="h-16 w-16 text-white glow-effect" />
            <span className="text-5xl font-bold text-white mr-3">SapidFood</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            منصة تجربة الطعام <span className="text-gradient">المدعومة بالذكاء الاصطناعي</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl">
            اكتشف وصفات جديدة، خطط وجباتك الأسبوعية، واستخدم الذكاء الاصطناعي لتخصيص تجربتك الغذائية
          </p>
          
          <form onSubmit={searchRecipes} className="w-full max-w-xl relative mb-8">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 z-10" />
            <Input 
              placeholder="ابحث عن وصفات، مكونات، أو نصائح..." 
              className="pl-12 pr-12 h-14 bg-white/90 backdrop-blur-md border-white/30 shadow-lg text-right"
            />
            <Button 
              type="submit" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 neo-button h-10"
            >
              بحث
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {isLoggedIn ? (
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')} 
                className="metaverse-button"
              >
                انتقل إلى لوحة التحكم
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')} 
                  className="metaverse-button"
                >
                  إنشاء حساب جديد
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  onClick={() => navigate('/login')} 
                  className="border-white text-white hover:bg-white/20"
                >
                  تسجيل الدخول
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center">
            <ArrowRight className="h-5 w-5 text-white transform rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ميزات مبتكرة لعشاق الطعام</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مجموعة متكاملة من الخدمات المصممة خصيصاً لتحسين تجربتك الغذائية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-scale glass-card">
              <CardContent className="p-8">
                <div className="feature-icon">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">وصفات مميزة</h3>
                <p className="text-gray-600">
                  مجموعة متنوعة من الوصفات المميزة من مختلف المطابخ العالمية مختارة بعناية
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale glass-card">
              <CardContent className="p-8">
                <div className="feature-icon">
                  <Book className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">إدارة الوصفات</h3>
                <p className="text-gray-600">
                  إنشاء وتخزين وتنظيم وصفاتك الخاصة بسهولة مع إمكانية المشاركة
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale glass-card">
              <CardContent className="p-8">
                <div className="feature-icon">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">تخطيط الوجبات</h3>
                <p className="text-gray-600">
                  خطط وجباتك الأسبوعية بسهولة مع توصيات متوازنة ومتنوعة
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale glass-card lg:col-span-3">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:w-2/3">
                  <div className="feature-icon">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">وصفات ذكية بالذكاء الاصطناعي</h3>
                  <p className="text-gray-600 mb-4">
                    استفد من قوة الذكاء الاصطناعي للحصول على وصفات مخصصة بناءً على تفضيلاتك والمكونات المتوفرة لديك
                  </p>
                  <Button onClick={() => navigate('/ai-recipes')} className="neo-button">
                    اكتشف الوصفات الذكية
                  </Button>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-primary animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الوصفات المميزة</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مجموعة مختارة من أشهى الوصفات الشرقية والعالمية
            </p>
          </div>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {featuredRecipes.map((recipe) => (
                <CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="recipe-card overflow-hidden">
                      <div className="overflow-hidden h-48">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="micro-chip">{recipe.category}</span>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600">{recipe.time}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                          >
                            عرض الوصفة
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
          
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate('/explore')} 
              className="neo-button"
            >
              استكشاف المزيد من الوصفات
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جرب SapidFood اليوم!</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين الذين يستمتعون بتجربة طعام مميزة ومبتكرة
          </p>
          
          {isLoggedIn ? (
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')} 
              className="metaverse-button"
            >
              انتقل إلى لوحة التحكم
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          ) : (
            <Button 
              size="lg"
              onClick={() => navigate('/signup')} 
              className="metaverse-button"
            >
              ابدأ مجاناً
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <ChefHat className="h-8 w-8 text-white mr-2" />
              <span className="text-2xl font-bold">SapidFood</span>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-6 md:mb-0">
              <Link to="/explore" className="hover:text-primary transition-colors">استكشاف</Link>
              <Link to="/recipes" className="hover:text-primary transition-colors">وصفاتي</Link>
              <Link to="/meal-planning" className="hover:text-primary transition-colors">خطة وجبات</Link>
              <Link to="/ai-recipes" className="hover:text-primary transition-colors">وصفات ذكية</Link>
            </div>
            
            <div>
              <p className="text-white/60 text-sm">
                © 2025 SapidFood. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
