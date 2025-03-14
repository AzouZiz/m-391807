
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, ChefHat, Users, Printer, 
  BookmarkPlus, Share2, Star, StarHalf, ThumbsUp,
  AlertCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SocialShare from '@/components/SocialShare';

interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  tips: string[];
  cuisine: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  reviews: number;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchRecipe = () => {
      setLoading(true);
      
      // Mock recipe data based on ID
      setTimeout(() => {
        // In a real app, this would be an API call
        const mockRecipe: Recipe = {
          id: id || '1',
          title: 'كنافة نابلسية تقليدية',
          image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&q=80&w=2070',
          description: 'حلوى شرقية مشهورة ولذيذة مع عجينة الكنافة والقطر والجبنة. تُعتبر من أشهر الحلويات في بلاد الشام وخاصة في فلسطين.',
          category: 'حلويات',
          difficulty: 'متوسط',
          prepTime: '20 دقيقة',
          cookTime: '25 دقيقة',
          servings: 4,
          ingredients: [
            '500 غرام عجينة كنافة',
            '300 غرام جبنة عكاوي منزوعة الملح',
            '200 غرام سمن عربي',
            '2 ملعقة طعام ماء زهر',
            '2 كوب سكر',
            '1 كوب ماء',
            '1 ملعقة صغيرة عصير ليمون',
            'فستق حلبي للتزيين'
          ],
          instructions: [
            'نقوم بفرد نصف كمية العجينة في صينية دائرية.',
            'نضيف الجبنة فوق العجينة ونفردها بالتساوي.',
            'نغطي الجبنة بالنصف المتبقي من العجينة.',
            'نصب السمن المذاب فوق العجينة ونوزعه بالتساوي.',
            'نخبز في فرن حرارته 180 درجة مئوية لمدة 25 دقيقة حتى تصبح ذهبية اللون.',
            'لتحضير القطر: نضع الماء والسكر في قدر على النار ونتركه يغلي لمدة 10 دقائق.',
            'نضيف ماء الزهر وعصير الليمون ونتركه يغلي لدقيقة إضافية ثم نرفعه عن النار.',
            'بعد إخراج الكنافة من الفرن، نقلبها في طبق التقديم ونسكب القطر فوقها.',
            'نزين بالفستق الحلبي ونقدمها ساخنة أو باردة حسب الرغبة.'
          ],
          nutrition: {
            calories: '385 سعرة حرارية',
            protein: '8 غرام',
            carbs: '45 غرام',
            fats: '21 غرام'
          },
          tips: [
            'يمكن استخدام جبنة الموزاريلا بدلاً من العكاوي.',
            'تأكد من أن العجينة مفكوكة قبل استخدامها للحصول على أفضل نتيجة.',
            'يجب أن يكون القطر بارداً عند سكبه فوق الكنافة الساخنة.'
          ],
          cuisine: 'عربية',
          author: {
            name: 'سارة أحمد',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470'
          },
          rating: 4.7,
          reviews: 125
        };
        
        setRecipe(mockRecipe);
        setServings(mockRecipe.servings);
        setLoading(false);
      }, 1000);
    };
    
    fetchRecipe();
  }, [id]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleSaveRecipe = () => {
    setSaved(!saved);
    
    if (!saved) {
      toast({
        title: "تم حفظ الوصفة",
        description: "تمت إضافة الوصفة إلى المفضلة بنجاح.",
      });
    } else {
      toast({
        title: "تم إزالة الوصفة",
        description: "تمت إزالة الوصفة من المفضلة."
      });
    }
  };
  
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <ChefHat className="h-12 w-12 text-white mx-auto mb-4 animate-pulse" />
            <p className="text-white text-lg font-medium">جاري تحميل الوصفة...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">لم يتم العثور على الوصفة</h2>
            <p className="text-white/80 mb-6">
              عذراً، لم نتمكن من العثور على الوصفة التي تبحث عنها.
            </p>
            <Button onClick={() => navigate('/explore')} className="metaverse-button">
              استكشاف وصفات أخرى
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/90 via-indigo-800/90 to-blue-900/90">
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/20 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          العودة
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="metaverse-card overflow-hidden mb-8">
              {/* Recipe Header */}
              <div className="relative h-[300px] sm:h-[400px]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-2">
                    <span className="micro-chip">{recipe.category}</span>
                    <span className="micro-chip mr-2">{recipe.cuisine}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{recipe.title}</h1>
                  <div className="flex items-center flex-wrap gap-2">
                    <div className="flex items-center">
                      {renderRatingStars(recipe.rating)}
                      <span className="text-white mr-2">({recipe.reviews} تقييم)</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} دقيقة
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-sm flex items-center ${
                      recipe.difficulty === 'سهل' ? 'bg-green-500/80 text-white' :
                      recipe.difficulty === 'متوسط' ? 'bg-yellow-500/80 text-white' :
                      'bg-red-500/80 text-white'
                    }`}>
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recipe Description */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  {recipe.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center">
                    <Clock className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-gray-500">وقت التحضير</span>
                    <span className="font-medium">{recipe.prepTime}</span>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center">
                    <Clock className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-gray-500">وقت الطهي</span>
                    <span className="font-medium">{recipe.cookTime}</span>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center">
                    <Users className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-gray-500">عدد الأشخاص</span>
                    <span className="font-medium">{servings} أشخاص</span>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg flex flex-col items-center">
                    <ThumbsUp className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-gray-500">نسبة النجاح</span>
                    <span className="font-medium">98%</span>
                  </div>
                </div>
                
                {/* Tabs for Recipe Details */}
                <Tabs defaultValue="ingredients" className="mt-6">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="ingredients">المكونات</TabsTrigger>
                    <TabsTrigger value="instructions">طريقة التحضير</TabsTrigger>
                    <TabsTrigger value="nutrition">معلومات غذائية</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ingredients" className="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">المكونات</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setServings(Math.max(1, servings - 1))}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span>{servings} أشخاص</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setServings(servings + 1)}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="instructions" className="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                    <h3 className="text-lg font-bold mb-4">طريقة التحضير</h3>
                    <ol className="space-y-6">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                            {index + 1}
                          </div>
                          <div className="mt-1">{step}</div>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>
                  
                  <TabsContent value="nutrition" className="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                    <h3 className="text-lg font-bold mb-4">المعلومات الغذائية</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">سعرات حرارية</span>
                        <span className="font-bold text-lg">{recipe.nutrition.calories}</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">بروتين</span>
                        <span className="font-bold text-lg">{recipe.nutrition.protein}</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">كربوهيدرات</span>
                        <span className="font-bold text-lg">{recipe.nutrition.carbs}</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                        <span className="block text-sm text-gray-500">دهون</span>
                        <span className="font-bold text-lg">{recipe.nutrition.fats}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start">
                      <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        المعلومات الغذائية تقريبية وقد تختلف حسب المكونات المستخدمة وطريقة التحضير.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
            
            {/* Chef Tips */}
            <Card className="metaverse-card overflow-hidden mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">نصائح الشيف</h3>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <ChefHat className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Action Buttons */}
            <Card className="metaverse-card overflow-hidden mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4" />
                    طباعة
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full flex items-center justify-center gap-2 ${
                      saved ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={handleSaveRecipe}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    {saved ? 'تم الحفظ' : 'حفظ'}
                  </Button>
                </div>
                
                {/* استبدال زر المشاركة بمكون المشاركة الاجتماعية */}
                <h3 className="text-lg font-bold mb-4">مشاركة الوصفة</h3>
                <SocialShare 
                  title={recipe.title}
                  description={recipe.description}
                  url={window.location.href}
                  imageUrl={recipe.image}
                  variant="modern"
                  className="mb-4"
                />
              </CardContent>
            </Card>
            
            {/* Chef Info */}
            <Card className="metaverse-card overflow-hidden mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">الشيف</h3>
                <div className="flex items-center">
                  <img 
                    src={recipe.author.avatar} 
                    alt={recipe.author.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-medium">{recipe.author.name}</h4>
                    <p className="text-sm text-gray-600">شيف محترف</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Recipes Placeholder */}
            <Card className="metaverse-card overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">وصفات مشابهة</h3>
                <div className="space-y-4">
                  <Button 
                    variant="link" 
                    className="w-full justify-start p-0 text-primary hover:text-primary/80"
                    onClick={() => navigate('/recipe/2')}
                  >
                    قطايف بالقشطة والفستق
                  </Button>
                  <Button 
                    variant="link" 
                    className="w-full justify-start p-0 text-primary hover:text-primary/80"
                    onClick={() => navigate('/recipe/3')}
                  >
                    بقلاوة بالفستق
                  </Button>
                  <Button 
                    variant="link" 
                    className="w-full justify-start p-0 text-primary hover:text-primary/80"
                    onClick={() => navigate('/recipe/4')}
                  >
                    عوامة بالقطر
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
