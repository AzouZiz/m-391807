
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Search, ArrowLeft, AlertCircle, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// قائمة وصفات افتراضية لمحاكاة الذكاء الاصطناعي
const dummyAIRecipes = [
  {
    id: 'ai-recipe-1',
    title: 'سلطة الكينوا المتوسطية',
    description: 'سلطة منعشة مع الكينوا والخضروات الطازجة وزيت الزيتون',
    ingredients: [
      '1 كوب كينوا', '2 حبة طماطم مقطعة', '1 خيار مقطع', '1/2 كوب زيتون أسود',
      '1/2 كوب جبنة فيتا', '2 ملعقة كبيرة زيت زيتون', 'عصير ليمون', 'ملح وفلفل حسب الرغبة'
    ],
    instructions: [
      'اغسلي الكينوا جيداً ثم اطهيها حسب التعليمات الموجودة على العبوة.',
      'اتركي الكينوا لتبرد تماماً.',
      'في وعاء كبير، امزجي الكينوا مع الطماطم والخيار والزيتون والجبنة.',
      'أضيفي زيت الزيتون وعصير الليمون والملح والفلفل.',
      'قلبي المكونات برفق واتركيها في الثلاجة لمدة ساعة قبل التقديم.'
    ],
    nutritionalInfo: {
      calories: 320,
      protein: '12g',
      carbs: '35g',
      fat: '15g',
      fiber: '8g'
    },
    prepTime: 15,
    cookTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7f94'
  },
  {
    id: 'ai-recipe-2',
    title: 'دجاج مشوي بالأعشاب',
    description: 'دجاج مشوي ومتبل بالأعشاب الطازجة وزيت الزيتون',
    ingredients: [
      '4 قطع صدور دجاج', '3 ملاعق كبيرة زيت زيتون', '2 ملعقة صغيرة إكليل الجبل المفروم',
      '2 ملعقة صغيرة زعتر طازج مفروم', '2 فص ثوم مهروس', 'ملح وفلفل حسب الرغبة',
      '1 ليمونة مقطعة شرائح'
    ],
    instructions: [
      'في وعاء، اخلطي زيت الزيتون مع الأعشاب والثوم والملح والفلفل.',
      'ضعي قطع الدجاج في الخليط وغلفيها جيداً. اتركيها لمدة ساعة على الأقل.',
      'سخني الفرن إلى درجة حرارة 200 درجة مئوية.',
      'ضعي قطع الدجاج في صينية الخبز وأضيفي شرائح الليمون فوقها.',
      'اشوي الدجاج لمدة 25-30 دقيقة أو حتى ينضج تماماً.',
      'قدميه ساخناً مع الخضار المشوية أو السلطة.'
    ],
    nutritionalInfo: {
      calories: 280,
      protein: '32g',
      carbs: '3g',
      fat: '15g',
      fiber: '1g'
    },
    prepTime: 10,
    cookTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d'
  },
  {
    id: 'ai-recipe-3',
    title: 'عصيدة الشوفان بالتوت والعسل',
    description: 'فطور صحي ومغذي من الشوفان والتوت الطازج والعسل',
    ingredients: [
      '1 كوب شوفان', '2 كوب حليب أو ماء', '1/2 كوب توت مشكل',
      '1 ملعقة كبيرة عسل', '1 ملعقة صغيرة قرفة', '1 ملعقة كبيرة بذور الشيا (اختياري)'
    ],
    instructions: [
      'في قدر، ضعي الشوفان والحليب واتركيه على نار متوسطة.',
      'اتركي المزيج يغلي ثم خففي النار واتركيه يطهى لمدة 5 دقائق مع التحريك.',
      'أضيفي القرفة وحركي جيداً، ثم ارفعيه عن النار.',
      'صبي العصيدة في وعاء التقديم وزينيها بالتوت والعسل وبذور الشيا.',
      'قدميها دافئة.'
    ],
    nutritionalInfo: {
      calories: 280,
      protein: '10g',
      carbs: '45g',
      fat: '8g',
      fiber: '7g'
    },
    prepTime: 5,
    cookTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f17'
  },
  {
    id: 'ai-recipe-4',
    title: 'حساء العدس الأحمر',
    description: 'حساء دافئ ومغذي من العدس الأحمر والخضروات',
    ingredients: [
      '1.5 كوب عدس أحمر', '1 بصلة مفرومة', '2 جزرة مقطعة مكعبات',
      '2 فص ثوم مهروس', '1 ملعقة صغيرة كمون', '1 ملعقة صغيرة كركم',
      '6 أكواب مرق خضار', '2 ملعقة كبيرة زيت زيتون', 'ملح وفلفل حسب الرغبة',
      'عصير ليمون للتقديم'
    ],
    instructions: [
      'في قدر كبير، سخني الزيت وأضيفي البصل والجزر. قلبي لمدة 5 دقائق.',
      'أضيفي الثوم والتوابل وقلبي لمدة دقيقة إضافية.',
      'أضيفي العدس ومرق الخضار واتركي المزيج يغلي.',
      'خففي النار وغطي القدر واتركيه يطهى لمدة 25-30 دقيقة حتى ينضج العدس.',
      'استخدمي الخلاط اليدوي لهرس الحساء حتى يصبح ناعماً.',
      'تبلي بالملح والفلفل وقدميه مع رشة من عصير الليمون.'
    ],
    nutritionalInfo: {
      calories: 220,
      protein: '12g',
      carbs: '30g',
      fat: '6g',
      fiber: '10g'
    },
    prepTime: 10,
    cookTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1614111345914-99b89d9072d6'
  }
];

const AIRecipes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول للوصول إلى اقتراحات الوصفات",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      const currentUser = JSON.parse(currentUserJSON);
      setUser(currentUser);
      setRecipes(dummyAIRecipes);
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في قراءة بيانات المستخدم:', error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  const generateRecipes = () => {
    if (!prompt.trim()) {
      toast({
        title: "الوصف فارغ",
        description: "يرجى إدخال وصف لتوليد وصفات",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // محاكاة لتوليد الوصفات (في الواقع سنستخدم API للذكاء الاصطناعي)
    setTimeout(() => {
      // اختيار وصفات عشوائية من القائمة الافتراضية
      const shuffled = [...dummyAIRecipes].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
      
      setRecipes(selected);
      setIsGenerating(false);
      
      toast({
        title: "تم التوليد",
        description: "تم توليد الوصفات بناءً على طلبك",
      });
    }, 2000);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveRecipe = (recipe: any) => {
    if (!user) return;
    
    // استرجاع الوصفات المحفوظة
    const savedRecipesJSON = localStorage.getItem(`recipes_${user.id}`);
    const savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];
    
    // التحقق مما إذا كانت الوصفة محفوظة بالفعل
    const isAlreadySaved = savedRecipes.some((r: any) => r.id === recipe.id);
    
    if (isAlreadySaved) {
      toast({
        title: "موجودة بالفعل",
        description: "هذه الوصفة محفوظة بالفعل في مجموعتك",
        variant: "destructive",
      });
      return;
    }
    
    // إضافة الوصفة إلى القائمة المحفوظة
    const updatedRecipes = [...savedRecipes, {
      ...recipe,
      savedAt: new Date().toISOString(),
      source: 'ai-generated'
    }];
    
    localStorage.setItem(`recipes_${user.id}`, JSON.stringify(updatedRecipes));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الوصفة إلى مجموعتك",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل اقتراحات الوصفات...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-white p-2 hover:bg-white/20" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="text-white">العودة للوحة التحكم</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">SapidFood</span>
          </div>
          
          <div className="w-20"></div> {/* للتوازن */}
        </div>
        
        <Card className="w-full bg-white/20 backdrop-blur-lg border border-white/30 mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <h1 className="text-xl font-bold text-white">اقتراحات الوصفات الذكية</h1>
            </div>
            
            <p className="text-white/80 mb-6">
              استخدم الذكاء الاصطناعي لاقتراح وصفات مخصصة بناءً على تفضيلاتك واحتياجاتك الغذائية.
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 mb-6 border border-white/30">
              <h2 className="text-white font-bold mb-3">توليد وصفات جديدة</h2>
              <Textarea
                placeholder="اكتب وصفاً لما تبحث عنه (مثال: أريد وصفات نباتية غنية بالبروتين وسهلة التحضير)"
                className="mb-4 bg-white/20 border-white/30 text-white"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
              <Button 
                className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                onClick={generateRecipes}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    توليد وصفات مخصصة
                  </>
                )}
              </Button>
            </div>
            
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input 
                  placeholder="ابحث في الوصفات المقترحة..." 
                  className="pl-10 bg-white/20 border-white/30 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <Card key={recipe.id} className="bg-white/10 border border-white/20 overflow-hidden">
                      <div 
                        className="h-40 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2">{recipe.title}</h3>
                        <p className="text-white/80 text-sm mb-4">{recipe.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                            {recipe.prepTime + recipe.cookTime} دقيقة
                          </span>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                            {recipe.nutritionalInfo.calories} سعرة
                          </span>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                            بروتين: {recipe.nutritionalInfo.protein}
                          </span>
                        </div>
                        
                        <div className="space-y-1 mb-4">
                          <h4 className="text-sm font-bold text-white">المكونات الرئيسية:</h4>
                          <ul className="text-white/80 text-xs space-y-1">
                            {recipe.ingredients.slice(0, 4).map((ingredient: string, index: number) => (
                              <li key={index} className="flex items-center gap-1">
                                <span className="block h-1 w-1 rounded-full bg-white/60"></span>
                                {ingredient}
                              </li>
                            ))}
                            {recipe.ingredients.length > 4 && (
                              <li className="text-white/60">...والمزيد</li>
                            )}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-white/30 text-white hover:bg-white/20"
                          onClick={() => saveRecipe(recipe)}
                        >
                          حفظ الوصفة
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-white/30 text-white hover:bg-white/20"
                          onClick={() => navigate(`/recipe/${recipe.id}`)}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          عرض التفاصيل
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                  <AlertCircle className="h-10 w-10 text-white/50 mx-auto mb-3" />
                  <p className="text-white text-lg font-medium">لم يتم العثور على وصفات</p>
                  <p className="text-white/70 mt-1">
                    جرب البحث بكلمات مختلفة أو توليد وصفات جديدة
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Separator className="bg-white/20" />
          
          <div className="p-4 text-center">
            <p className="text-white/60 text-sm">
              تم توليد هذه الوصفات باستخدام تقنيات الذكاء الاصطناعي. قد تحتاج إلى تعديل الكميات والمكونات حسب الذوق.
            </p>
          </div>
        </Card>
        
        <div className="text-center">
          <p className="text-white/80 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIRecipes;
