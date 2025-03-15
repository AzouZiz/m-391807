
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChefHat, Sparkles, Search, 
  AlertCircle, Loader2, ListFilter, Clock, Save, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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
  const [selectedRecipe, setSelectedRecipe] = useState<AIRecipe | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
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
    
    try {
      // استدعاء الـ Edge Function
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: {
          query,
          ingredients,
          diet,
          cuisine,
          excludeIngredients
        }
      });
      
      if (error) throw error;
      
      setGeneratedRecipes(data.recipes);
      
      // تحديث الاقتراحات بناءً على البحث الحالي
      const newSuggestions = [
        'وصفات ' + (cuisine || 'متنوعة') + ' سريعة التحضير',
        'أطباق ' + (diet || 'صحية') + ' لذيذة',
        'حلويات ' + (cuisine || 'بسيطة') + ' للمناسبات',
        'وجبات خفيفة سريعة التحضير',
        'أطباق تقليدية سهلة'
      ];
      setSuggestedQueries(newSuggestions);
      
      toast({
        title: "تم إنشاء الوصفات",
        description: "تم إنشاء وصفات تناسب طلبك بنجاح!",
      });
    } catch (error) {
      console.error('خطأ في إنشاء الوصفات:', error);
      toast({
        title: "حدث خطأ",
        description: "تعذر إنشاء الوصفات. يرجى المحاولة مرة أخرى لاحقًا.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuggestedQuery = (query: string) => {
    setQuery(query);
  };

  const handleViewRecipe = (recipe: AIRecipe) => {
    setSelectedRecipe(recipe);
    setIsDetailOpen(true);
  };

  const saveRecipe = async (recipe: AIRecipe) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "يرجى تسجيل الدخول",
          description: "يجب عليك تسجيل الدخول لحفظ الوصفات",
          variant: "destructive",
        });
        return;
      }

      // حفظ الوصفة في قاعدة البيانات
      const { error } = await supabase
        .from('recipes')
        .insert({
          title: recipe.title,
          description: recipe.description,
          category: recipe.category,
          cooking_time: parseInt(recipe.time) || 30,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions.join('\n'),
          image_url: recipe.image,
          servings: 4,
          user_id: session.user.id,
          tags: [diet, cuisine].filter(tag => tag)
        });

      if (error) throw error;

      toast({
        title: "تم حفظ الوصفة",
        description: "تم حفظ الوصفة في مجموعة وصفاتك الخاصة",
      });
    } catch (error) {
      console.error('خطأ في حفظ الوصفة:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "تعذر حفظ الوصفة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
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
                        id="ai-query"
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
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-1/2 animate-pulse"></div>
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
                          <Badge className="bg-white/80 text-primary hover:bg-white">
                            {recipe.category}
                          </Badge>
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
                        
                        <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
                          <Badge variant="outline" className={cn(
                            recipe.difficulty === 'سهل' ? 'text-green-600 border-green-200 bg-green-50' :
                            recipe.difficulty === 'متوسط' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                            'text-red-600 border-red-200 bg-red-50'
                          )}>
                            {recipe.difficulty}
                          </Badge>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => saveRecipe(recipe)}
                              className="text-primary border-primary/30 hover:bg-primary/10"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              حفظ الوصفة
                            </Button>
                            
                            <Button 
                              onClick={() => handleViewRecipe(recipe)} 
                              className="neo-button"
                              size="sm"
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              عرض التفاصيل
                            </Button>
                          </div>
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

      {/* Recipe Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedRecipe.title}</DialogTitle>
                <DialogDescription className="text-base text-gray-500">{selectedRecipe.description}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge className="bg-primary/90">{selectedRecipe.category}</Badge>
                    <Badge variant="outline" className={cn(
                      selectedRecipe.difficulty === 'سهل' ? 'text-green-600 border-green-200 bg-green-50' :
                      selectedRecipe.difficulty === 'متوسط' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                      'text-red-600 border-red-200 bg-red-50'
                    )}>
                      {selectedRecipe.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedRecipe.time}
                    </Badge>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">المكونات</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">طريقة التحضير</h3>
                  <ol className="list-decimal list-inside space-y-4">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium text-gray-900">الخطوة {index + 1}:</span>{' '}
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button onClick={() => saveRecipe(selectedRecipe)} className="bg-primary text-white">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الوصفة في مجموعتك
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIRecipes;

