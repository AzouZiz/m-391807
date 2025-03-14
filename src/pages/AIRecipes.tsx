
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChefHat, Sparkles, Search, 
  AlertCircle, Loader2, ListFilter, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';

interface AIRecipe {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  ingredients: string[];
  instructions: string[];
}

const AIRecipes = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<AIRecipe[]>([]);
  const [suggestedQueries, setSuggestedQueries] = useState([
    'وصفة سهلة وسريعة للعشاء',
    'طبق صحي قليل السعرات الحرارية',
    'حلويات بدون سكر مضاف',
    'وجبة غنية بالبروتين',
    'أطباق تقليدية سهلة'
  ]);
  
  const dietOptions = [
    { value: '', label: 'أي نظام غذائي' },
    { value: 'نباتي', label: 'نباتي' },
    { value: 'خالي من الغلوتين', label: 'خالي من الغلوتين' },
    { value: 'قليل الكربوهيدرات', label: 'قليل الكربوهيدرات' },
    { value: 'كيتو', label: 'كيتو' },
    { value: 'باليو', label: 'باليو' },
  ];
  
  const cuisineOptions = [
    { value: '', label: 'أي مطبخ' },
    { value: 'عربي', label: 'عربي' },
    { value: 'إيطالي', label: 'إيطالي' },
    { value: 'هندي', label: 'هندي' },
    { value: 'صيني', label: 'صيني' },
    { value: 'مكسيكي', label: 'مكسيكي' },
    { value: 'تركي', label: 'تركي' },
    { value: 'لبناني', label: 'لبناني' },
  ];
  
  const handleGenerateRecipes = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!localStorage.getItem('currentUser')) {
      toast({
        title: "يرجى تسجيل الدخول",
        description: "يجب عليك تسجيل الدخول لاستخدام ميزة الوصفات الذكية",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!query && !ingredients) {
      toast({
        title: "المعلومات غير كافية",
        description: "يرجى إدخال وصف للوصفة أو المكونات المتوفرة لديك",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // في التطبيق الحقيقي، هنا سنقوم بإرسال الطلب إلى API للذكاء الاصطناعي
    // هنا نقوم بمحاكاة استجابة API بعد فترة زمنية
    setTimeout(() => {
      const mockRecipes: AIRecipe[] = [
        {
          id: 'ai-1',
          title: 'سلطة الكينوا المتوسطية',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070',
          description: 'سلطة صحية ولذيذة مصنوعة من الكينوا والخضروات الطازجة والأعشاب',
          category: 'سلطات',
          difficulty: 'سهل',
          time: '20 دقيقة',
          ingredients: [
            'كوب كينوا مطبوخة',
            'خيار مقطع',
            'طماطم كرزية',
            'فلفل ملون',
            'بصل أحمر',
            'زيتون أسود',
            'جبنة فيتا',
            'زيت زيتون',
            'عصير ليمون',
            'أعشاب طازجة'
          ],
          instructions: [
            'اطبخ الكينوا حسب التعليمات على العبوة واتركها تبرد.',
            'قطع الخضروات إلى قطع صغيرة.',
            'امزج الكينوا والخضار والزيتون والجبنة في وعاء كبير.',
            'اخلط زيت الزيتون وعصير الليمون والأعشاب لعمل التتبيلة.',
            'أضف التتبيلة إلى السلطة وقلبها جيداً.',
            'قدمها باردة.'
          ]
        },
        {
          id: 'ai-2',
          title: 'دجاج مشوي بالأعشاب والليمون',
          image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=2069',
          description: 'دجاج طري ومتبل بالأعشاب الطازجة وعصير الليمون',
          category: 'أطباق رئيسية',
          difficulty: 'متوسط',
          time: '50 دقيقة',
          ingredients: [
            'صدور دجاج',
            'ثوم مفروم',
            'زعتر طازج',
            'إكليل الجبل',
            'عصير ليمون',
            'زيت زيتون',
            'ملح وفلفل'
          ],
          instructions: [
            'اخلط الثوم والأعشاب وعصير الليمون وزيت الزيتون والتوابل في وعاء.',
            'ضع الدجاج في التتبيلة واتركه في الثلاجة لمدة ساعة على الأقل.',
            'سخن الفرن إلى 200 درجة مئوية.',
            'ضع الدجاج في صينية الخبز واسكب باقي التتبيلة عليه.',
            'اشوي لمدة 30-35 دقيقة حتى ينضج تماماً.',
            'قدمه مع الخضار المشوية.'
          ]
        },
        {
          id: 'ai-3',
          title: 'باستا بصلصة الطماطم والريحان',
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=2070',
          description: 'باستا إيطالية كلاسيكية مع صلصة طماطم منزلية وريحان طازج',
          category: 'أطباق رئيسية',
          difficulty: 'سهل',
          time: '25 دقيقة',
          ingredients: [
            'معكرونة سباغيتي',
            'طماطم مقطعة',
            'بصل مفروم',
            'ثوم مفروم',
            'معجون طماطم',
            'ريحان طازج',
            'زيت زيتون',
            'ملح وفلفل',
            'جبنة بارميزان للتقديم'
          ],
          instructions: [
            'اطبخ المعكرونة في ماء مملح حتى تصبح طرية.',
            'في مقلاة، سخن زيت الزيتون وأضف البصل والثوم وقلبهما حتى يذبلا.',
            'أضف الطماطم ومعجون الطماطم واتركها على نار خفيفة لمدة 15 دقيقة.',
            'أضف الريحان المفروم والتوابل.',
            'صفي المعكرونة وأضفها إلى الصلصة وقلبها جيداً.',
            'قدمها مع جبنة البارميزان المبشورة.'
          ]
        }
      ];
      
      // Update the suggested queries based on current search
      const newSuggestions = [
        'وصفات ' + (cuisine || 'متنوعة') + ' سريعة التحضير',
        'أطباق ' + (diet || 'صحية') + ' لذيذة',
        'حلويات ' + (cuisine || 'بسيطة') + ' للمناسبات',
        'وجبات خفيفة سريعة التحضير',
        'أطباق تقليدية سهلة'
      ];
      setSuggestedQueries(newSuggestions);
      
      setGeneratedRecipes(mockRecipes);
      setLoading(false);
      
      toast({
        title: "تم إنشاء الوصفات",
        description: "تم إنشاء وصفات تناسب طلبك بنجاح!",
      });
    }, 2000);
  };
  
  const handleSuggestedQuery = (query: string) => {
    setQuery(query);
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
            <Sparkles className="h-8 w-8 text-white mr-2 glow-effect" />
            <h1 className="text-2xl font-bold text-white">وصفات ذكية</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="metaverse-card overflow-hidden sticky top-8">
              <CardContent className="p-6">
                <form onSubmit={handleGenerateRecipes}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-white">ماذا تريد أن تطبخ؟</Label>
                      <Textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="مثل: وصفة صحية لعشاء سريع لشخصين..."
                        className="metaverse-input h-24 text-right"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">المكونات المتوفرة لديك</Label>
                      <Textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="أدخل المكونات مفصولة بفواصل..."
                        className="metaverse-input h-24 text-right"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">النظام الغذائي</Label>
                      <Select value={diet} onValueChange={setDiet}>
                        <SelectTrigger className="metaverse-input text-right">
                          <SelectValue placeholder="أي نظام غذائي" />
                        </SelectTrigger>
                        <SelectContent>
                          {dietOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">المطبخ</Label>
                      <Select value={cuisine} onValueChange={setCuisine}>
                        <SelectTrigger className="metaverse-input text-right">
                          <SelectValue placeholder="أي مطبخ" />
                        </SelectTrigger>
                        <SelectContent>
                          {cuisineOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">مكونات تريد استبعادها</Label>
                      <Input
                        value={excludeIngredients}
                        onChange={(e) => setExcludeIngredients(e.target.value)}
                        placeholder="مثل: مكسرات، حليب..."
                        className="metaverse-input text-right"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="metaverse-button w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          جاري إنشاء الوصفات...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          إنشاء وصفات ذكية
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                
                {!loading && generatedRecipes.length === 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-3">اقتراحات البحث</h3>
                    <div className="space-y-2">
                      {suggestedQueries.map((q, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          className="w-full justify-start text-white border-white/20 hover:bg-white/10"
                          onClick={() => handleSuggestedQuery(q)}
                        >
                          <Search className="h-4 w-4 mr-2" />
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-white mx-auto mb-4 animate-pulse" />
                    <p className="text-white text-lg font-medium mb-4">
                      جاري إنشاء وصفات ذكية باستخدام الذكاء الاصطناعي...
                    </p>
                    <div className="h-2 bg-white/20 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : generatedRecipes.length > 0 ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-4">الوصفات الموصى بها</h2>
                
                {generatedRecipes.map((recipe) => (
                  <Card key={recipe.id} className="neo-card overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="relative h-60 md:h-auto">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="micro-chip bg-white/80 text-primary">
                            {recipe.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-primary mr-2" />
                            <span className="text-sm text-primary font-medium">وصفة ذكية</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{recipe.time}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                        <p className="text-gray-600 mb-4">{recipe.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">المكونات الرئيسية:</h4>
                          <div className="flex flex-wrap gap-2">
                            {recipe.ingredients.slice(0, 5).map((ing, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                              >
                                {ing}
                              </span>
                            ))}
                            {recipe.ingredients.length > 5 && (
                              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                +{recipe.ingredients.length - 5} أخرى
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            recipe.difficulty === 'سهل' ? 'bg-green-100 text-green-800' :
                            recipe.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {recipe.difficulty}
                          </span>
                          <Button 
                            onClick={() => navigate(`/recipe/${recipe.id}`)} 
                            className="neo-button"
                          >
                            عرض الوصفة كاملة
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg border border-white/30">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-white mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-3">
                      وصفات ذكية باستخدام الذكاء الاصطناعي
                    </h2>
                    <p className="text-white/80 mb-6">
                      اكتب وصفاً لما تريد طبخه، أو أدخل المكونات المتوفرة لديك، وسنقوم بإنشاء وصفات مخصصة لك!
                    </p>
                    <Button 
                      className="metaverse-button" 
                      onClick={() => document.getElementById('ai-query')?.focus()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      ابدأ باستخدام الذكاء الاصطناعي
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecipes;
