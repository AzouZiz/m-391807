
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChefHat,
  ArrowLeft, 
  Clock, 
  Users, 
  Fire, 
  Globe, 
  Printer, 
  Share2, 
  Bookmark,
  MessageSquare,
  ThumbsUp,
  Play,
  View3d,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

// Mock recipe details
const recipe = {
  id: 1,
  title: 'كسكس مغربي تقليدي',
  description: 'طبق شمال أفريقي تقليدي مع اللحم والخضار المطبوخة ببطء، غني بالنكهات والتوابل. يعتبر الكسكس من أشهر الأطباق في المطبخ المغربي والمغاربي عموماً.',
  image: 'https://images.unsplash.com/photo-1574562662231-69e4ad4a0ef9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
  time: '90 دقيقة',
  difficulty: 'متوسط',
  servings: 6,
  cuisine: 'مغربية',
  created_by_ai: false,
  likes: 342,
  comments: 28,
  ingredients: [
    '500 غرام من لحم الضأن المقطع',
    '2 كوب من حبوب الكسكس',
    '2 جزر مقطع',
    '2 كوسة مقطعة',
    'بصلة كبيرة مقطعة',
    '2 فص ثوم مهروس',
    '1 ملعقة كبيرة زيت زيتون',
    '1 ملعقة صغيرة كمون',
    '1 ملعقة صغيرة كركم',
    '1/2 ملعقة صغيرة فلفل أحمر',
    '1/2 ملعقة صغيرة قرفة',
    'ملح وفلفل حسب الذوق',
    '4 أكواب ماء أو مرق',
    'حفنة من الزبيب (اختياري)',
    'حفنة من الحمص المطبوخ (اختياري)'
  ],
  instructions: [
    'في قدر كبير، سخني زيت الزيتون على نار متوسطة وأضيفي قطع اللحم. حمريها حتى تكتسب لوناً بنياً من جميع الجوانب.',
    'أضيفي البصل المفروم والثوم المهروس وقلبي لمدة 3-4 دقائق حتى يصبح البصل شفافاً.',
    'أضيفي التوابل: الكمون، الكركم، الفلفل الأحمر، القرفة، الملح والفلفل الأسود. قلبي جيداً مع اللحم والبصل.',
    'أضيفي الماء أو المرق واتركي المزيج يغلي، ثم خففي النار وغطي القدر واتركيه على نار هادئة لمدة 45 دقيقة.',
    'أضيفي الجزر والكوسة والخضار الأخرى التي ترغبين بها. استمري في الطهي لمدة 20 دقيقة إضافية.',
    'في هذه الأثناء، حضري الكسكس وفقاً للتعليمات على العبوة أو باستخدام كسكسية تقليدية.',
    'قدمي الكسكس مع المرق واللحم والخضار. يمكن تزيينه بالزبيب والحمص المطبوخ والبقدونس المفروم.'
  ],
  nutritional_info: {
    calories: 450,
    protein: '28g',
    carbs: '52g',
    fat: '15g',
    fiber: '6g'
  },
  tips: [
    'يمكنك استبدال لحم الضأن بلحم البقر أو الدجاج حسب الرغبة.',
    'لنكهة أعمق، أضيفي قليلاً من معجون الطماطم مع التوابل.',
    'الكسكس التقليدي يتم طهيه بالبخار فوق المرق، مما يمنحه نكهة فريدة.',
    'يمكن إضافة خضار أخرى مثل الكرفس، البطاطا، اللفت، أو البازلاء.'
  ],
  tags: ['كسكس', 'مغربي', 'لحم', 'عشاء', 'طبق رئيسي']
};

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [servingsCount, setServingsCount] = useState(recipe.servings);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleViewAR = () => {
    toast({
      title: "قريباً!",
      description: "ميزة الواقع المعزز قيد التطوير وستكون متاحة قريباً.",
    });
  };
  
  const handleGenerate3D = () => {
    toast({
      title: "جاري التحميل",
      description: "يتم الآن تحميل النموذج ثلاثي الأبعاد للطبق...",
    });
  };
  
  const handleWatchVideo = () => {
    toast({
      title: "جاري تشغيل الفيديو",
      description: "سيتم فتح فيديو طريقة التحضير في نافذة منبثقة.",
    });
  };
  
  const increaseServings = () => {
    setServingsCount(prev => prev + 1);
  };
  
  const decreaseServings = () => {
    if (servingsCount > 1) {
      setServingsCount(prev => prev - 1);
    }
  };
  
  const adjustIngredientAmount = (ingredient: string) => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?)\s*(.+)$/);
    if (match) {
      const amount = parseFloat(match[1]);
      const rest = match[2];
      const adjustedAmount = amount * (servingsCount / recipe.servings);
      return `${adjustedAmount % 1 === 0 ? adjustedAmount : adjustedAmount.toFixed(1)} ${rest}`;
    }
    return ingredient;
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
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 flex items-center gap-1"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>العودة</span>
        </Button>
        
        {/* Recipe Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/2 relative rounded-xl overflow-hidden aspect-video">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            {recipe.created_by_ai && (
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>إنشاء AI</span>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-muted-foreground mb-6">{recipe.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-3 text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium block">{recipe.time}</span>
                <span className="text-xs text-muted-foreground">وقت التحضير</span>
              </div>
              
              <div className="bg-muted rounded-lg p-3 text-center">
                <Fire className="h-5 w-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium block">{recipe.difficulty}</span>
                <span className="text-xs text-muted-foreground">مستوى الصعوبة</span>
              </div>
              
              <div className="bg-muted rounded-lg p-3 text-center">
                <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium block">{servingsCount}</span>
                <span className="text-xs text-muted-foreground">عدد الأشخاص</span>
              </div>
              
              <div className="bg-muted rounded-lg p-3 text-center">
                <Globe className="h-5 w-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium block">{recipe.cuisine}</span>
                <span className="text-xs text-muted-foreground">المطبخ</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => 
                    toast({
                      title: "تمت إضافة الوصفة",
                      description: "تمت إضافة الوصفة إلى المفضلة.",
                    })
                  }
                >
                  <Bookmark className="h-4 w-4" />
                  <span>حفظ</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => 
                    toast({
                      title: "مشاركة الوصفة",
                      description: "تم نسخ رابط الوصفة إلى الحافظة.",
                    })
                  }
                >
                  <Share2 className="h-4 w-4" />
                  <span>مشاركة</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => 
                    toast({
                      title: "طباعة الوصفة",
                      description: "جاري تهيئة الوصفة للطباعة...",
                    })
                  }
                >
                  <Printer className="h-4 w-4" />
                  <span>طباعة</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={decreaseServings}
                >
                  -
                </Button>
                <span className="text-sm font-medium">{servingsCount}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={increaseServings}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 mb-6">
              <Button className="flex items-center gap-1" onClick={handleWatchVideo}>
                <Play className="h-4 w-4" />
                <span>شاهد الفيديو</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handleViewAR}
              >
                <View3d className="h-4 w-4" />
                <span>عرض بتقنية AR</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span>{recipe.likes} إعجاب</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>{recipe.comments} تعليق</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Ingredients */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>المكونات</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={handleGenerate3D}
                >
                  عرض ثلاثي الأبعاد
                </Button>
              </h2>
              <Card className="p-6">
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{adjustIngredientAmount(ingredient)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
            
            {/* Instructions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">طريقة التحضير</h2>
              <Card className="p-6">
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p>{instruction}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            </section>
            
            {/* Tips */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">نصائح الطهي</h2>
              <Card className="p-6">
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                        ✓
                      </div>
                      <p>{tip}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
          
          <div className="space-y-8">
            {/* Nutritional Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">القيمة الغذائية</h2>
              <Card className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">السعرات الحرارية</span>
                    <span className="font-medium">{recipe.nutritional_info.calories} سعرة</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">البروتين</span>
                    <span className="font-medium">{recipe.nutritional_info.protein}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الكربوهيدرات</span>
                    <span className="font-medium">{recipe.nutritional_info.carbs}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الدهون</span>
                    <span className="font-medium">{recipe.nutritional_info.fat}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الألياف</span>
                    <span className="font-medium">{recipe.nutritional_info.fiber}</span>
                  </div>
                </div>
              </Card>
            </section>
            
            {/* Tags */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">الوسوم</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <Link 
                    key={index} 
                    to={`/explore?tag=${tag}`}
                    className="bg-muted px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
            
            {/* AI Enhancement */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">تحسين بالذكاء الاصطناعي</h2>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="space-y-3">
                  <Button 
                    className="w-full flex justify-start items-center gap-2"
                    variant="outline"
                    onClick={() => 
                      toast({
                        title: "جاري التعديل",
                        description: "يتم الآن تعديل الوصفة لتناسب نظام غذائي نباتي...",
                      })
                    }
                  >
                    <Brain className="h-4 w-4" />
                    <span>تحويل إلى نسخة نباتية</span>
                  </Button>
                  
                  <Button 
                    className="w-full flex justify-start items-center gap-2"
                    variant="outline"
                    onClick={() => 
                      toast({
                        title: "جاري التعديل",
                        description: "يتم الآن تعديل الوصفة لتكون خالية من الغلوتين...",
                      })
                    }
                  >
                    <Brain className="h-4 w-4" />
                    <span>جعلها خالية من الغلوتين</span>
                  </Button>
                  
                  <Button 
                    className="w-full flex justify-start items-center gap-2"
                    variant="outline"
                    onClick={() => 
                      toast({
                        title: "جاري التعديل",
                        description: "يتم الآن تقليل السعرات الحرارية في الوصفة...",
                      })
                    }
                  >
                    <Brain className="h-4 w-4" />
                    <span>تقليل السعرات الحرارية</span>
                  </Button>
                  
                  <Button 
                    className="w-full flex justify-start items-center gap-2"
                    variant="outline"
                    onClick={() => 
                      toast({
                        title: "جاري التعديل",
                        description: "يتم الآن تبسيط خطوات الوصفة...",
                      })
                    }
                  >
                    <Brain className="h-4 w-4" />
                    <span>تبسيط طريقة التحضير</span>
                  </Button>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">SapidFood</span>
            </div>
            <p className="text-sm text-muted-foreground">
              منصة الذكاء الاصطناعي الشاملة للطعام
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SapidFood. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipeDetail;
