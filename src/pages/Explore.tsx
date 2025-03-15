import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChefHat, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';

interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  ingredients: string[];
  cuisine: string;
}

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');
  
  const categories = ['أطباق رئيسية', 'مقبلات', 'حلويات', 'مشروبات', 'شوربات', 'سلطات'];
  const difficulties = ['سهل', 'متوسط', 'صعب'];
  const cuisines = ['عربية', 'إيطالية', 'هندية', 'تركية', 'مكسيكية', 'صينية', 'لبنانية'];
  const timeRanges = ['أقل من 30 دقيقة', '30-60 دقيقة', 'أكثر من 60 دقيقة'];
  
  useEffect(() => {
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'كنافة نابلسية تقليدية',
        image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&q=80&w=2070',
        description: 'حلوى شرقية مشهورة ولذيذة مع عجينة الكنافة والقطر والجبنة',
        category: 'حلويات',
        difficulty: 'متوسط',
        time: '45 دقيقة',
        ingredients: ['عجينة كنافة', 'جبنة عكاوي', 'سمن', 'ماء زهر', 'سكر', 'ماء'],
        cuisine: 'عربية'
      },
      {
        id: '2',
        title: 'كبسة لحم سعودية تقليدية',
        image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&q=80&w=2070',
        description: 'طبق أرز غني باللحم والتوابل على الطريقة السعودية الأصيلة',
        category: 'أطباق رئيسية',
        difficulty: 'سهل',
        time: '60 دقيقة',
        ingredients: ['أرز بسمتي', 'لحم ضأن', 'بصل', 'طماطم', 'ثوم', 'بهارات كبسة', 'زيت'],
        cuisine: 'عربية'
      },
      {
        id: '3',
        title: 'تبولة لبنانية',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2072',
        description: 'سلطة طازجة من البقدونس والبرغل والطماطم والخضروات',
        category: 'سلطات',
        difficulty: 'سهل',
        time: '20 دقيقة',
        ingredients: ['بقدونس', 'برغل ناعم', 'طماطم', 'خيار', 'بصل أخضر', 'نعناع', 'زيت زيتون', 'ليمون'],
        cuisine: 'لبنانية'
      },
      {
        id: '4',
        title: 'مقلوبة فلسطينية',
        image: 'https://images.unsplash.com/photo-1695438272113-f86c6dae77c1?auto=format&fit=crop&q=80&w=1951',
        description: 'طبق أرز شهي مع الخضار والدجاج على الطريقة الفلسطينية',
        category: 'أطباق رئيسية',
        difficulty: 'متوسط',
        time: '75 دقيقة',
        ingredients: ['أرز', 'دجاج', 'باذنجان', 'بطاطا', 'قرنبيط', 'بهارات', 'زيت'],
        cuisine: 'عربية'
      },
      {
        id: '5',
        title: 'باستا بولونيز الإيطالية',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=2070',
        description: 'معكرونة إيطالية كلاسيكية مع صلصة اللحم المفروم الغنية',
        category: 'أطباق رئيسية',
        difficulty: 'سهل',
        time: '40 دقيقة',
        ingredients: ['معكرونة سباغيتي', 'لحم مفروم', 'طماطم', 'بصل', 'ثوم', 'جزر', 'كرفس', 'أعشاب'],
        cuisine: 'إيطالية'
      },
      {
        id: '6',
        title: 'كاري دجاج هندي',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1971',
        description: 'طبق هندي تقليدي من الدجاج بصلصة الكاري الغنية',
        category: 'أطباق رئيسية',
        difficulty: 'متوسط',
        time: '50 دقيقة',
        ingredients: ['دجاج', 'بصل', 'ثوم', 'زنجبيل', 'طماطم', 'بهارات كاري', 'كريمة', 'زيت'],
        cuisine: 'هندية'
      },
      {
        id: '7',
        title: 'كنافة تركية بالجبن',
        image: 'https://images.unsplash.com/photo-1600617611788-2eafcfae5a4d?auto=format&fit=crop&q=80&w=2070',
        description: 'حلوى تركية تقليدية مصنوعة من عجينة الكنافة والجبن والقطر',
        category: 'حلويات',
        difficulty: 'متوسط',
        time: '35 دقيقة',
        ingredients: ['عجينة كنافة', 'جبنة', 'زبدة', 'قطر', 'فستق حلبي'],
        cuisine: 'تركية'
      },
      {
        id: '8',
        title: 'تاكو مكسيكي تقليدي',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=2070',
        description: 'وجبة مكسيكية شهيرة محضرة من خبز التورتيلا محشو باللحم والخضار والصلصة',
        category: 'أطباق رئيسية',
        difficulty: 'سهل',
        time: '30 دقيقة',
        ingredients: ['تورتيلا', 'لحم مفروم', 'طماطم', 'بصل', 'فلفل حار', 'جبنة', 'أفوكادو', 'كزبرة'],
        cuisine: 'مكسيكية'
      }
    ];
    
    setRecipes(mockRecipes);
    setFilteredRecipes(mockRecipes);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedCuisine, selectedTime]);
  
  const applyFilters = () => {
    let filtered = [...recipes];
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }
    
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCuisine);
    }
    
    if (selectedTime !== 'all') {
      if (selectedTime === 'أقل من 30 دقيقة') {
        filtered = filtered.filter(recipe => {
          const minutes = parseInt(recipe.time.split(' ')[0]);
          return minutes < 30;
        });
      } else if (selectedTime === '30-60 دقيقة') {
        filtered = filtered.filter(recipe => {
          const minutes = parseInt(recipe.time.split(' ')[0]);
          return minutes >= 30 && minutes <= 60;
        });
      } else if (selectedTime === 'أكثر من 60 دقيقة') {
        filtered = filtered.filter(recipe => {
          const minutes = parseInt(recipe.time.split(' ')[0]);
          return minutes > 60;
        });
      }
    }
    
    setFilteredRecipes(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
    
    if (filteredRecipes.length === 0) {
      toast({
        title: "لا توجد نتائج",
        description: "لم يتم العثور على وصفات تطابق معايير البحث.",
        variant: "destructive",
      });
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedCuisine('all');
    setSelectedTime('all');
    setFilteredRecipes(recipes);
    
    toast({
      title: "تم إعادة ضبط الفلاتر",
      description: "تم إعادة تعيين جميع عوامل التصفية.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/90 via-indigo-800/90 to-blue-900/90">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            العودة
          </Button>
          
          <div className="flex items-center">
            <div className="relative">
              <ChefHat className="h-8 w-8 text-white mr-2" />
              <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-30 animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">استكشاف الوصفات</h1>
          </div>
        </div>
        
        <Card className="mb-8 bg-white/10 backdrop-blur-md border border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  placeholder="ابحث عن وصفات، مكونات، أو نصائح..."
                  className="pr-10 text-right bg-white/90 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="gap-1.5 bg-white/90 border-none"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  الفلاتر
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                >
                  بحث
                </Button>
              </div>
            </form>
            
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleContent className="mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label className="text-white mb-2 block">الفئة</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white/90 text-right border-none">
                        <SelectValue placeholder="جميع الفئات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">مستوى الصعوبة</Label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="bg-white/90 text-right border-none">
                        <SelectValue placeholder="جميع المستويات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستويات</SelectItem>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">المطبخ</Label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                      <SelectTrigger className="bg-white/90 text-right border-none">
                        <SelectValue placeholder="جميع المطابخ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المطابخ</SelectItem>
                        {cuisines.map((cuisine) => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">وقت التحضير</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="bg-white/90 text-right border-none">
                        <SelectValue placeholder="جميع الأوقات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأوقات</SelectItem>
                        {timeRanges.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
        
        <div className="mb-4 flex items-center justify-between">
          <p className="text-white/90">
            عدد النتائج: <span className="font-bold">{filteredRecipes.length}</span>
          </p>
          
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 gap-1.5"
            onClick={() => navigate('/ai-recipes')}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            ابحث باستخدام الذكاء الاصطناعي
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/80 text-primary">
                      {recipe.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {recipe.cuisine}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-600">{recipe.time}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      recipe.difficulty === 'سهل' ? 'bg-green-100 text-green-800' :
                      recipe.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/30 text-primary hover:bg-primary/10"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      عرض الوصفة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {filteredRecipes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <Search className="h-16 w-16 text-white/30 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">لا توجد نتائج</h3>
              <p className="text-white/70 text-center mb-4">
                لم نتمكن من العثور على وصفات تطابق معايير البحث الخاصة بك.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={resetFilters}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  إعادة ضبط الفلاتر
                </Button>
                
                <Button 
                  onClick={() => navigate('/ai-recipes')}
                  className="bg-gradient-to-r from-primary to-indigo-600 text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  جرب البحث بالذكاء الاصطناعي
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
