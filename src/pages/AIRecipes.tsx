
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AIRecipeFilters from '@/components/AIRecipeFilters';
import AIRecipeCard from '@/components/AIRecipeCard';
import AIRecipeLoading from '@/components/AIRecipeLoading';
import AIRecipeEmpty from '@/components/AIRecipeEmpty';
import AIRecipeDetail from '@/components/AIRecipeDetail';

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

  const handleStartAI = () => {
    document.getElementById('ai-query')?.focus();
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
          {/* Sidebar with Filters */}
          <AIRecipeFilters
            query={query}
            setQuery={setQuery}
            ingredients={ingredients}
            setIngredients={setIngredients}
            diet={diet}
            setDiet={setDiet}
            cuisine={cuisine}
            setCuisine={setCuisine}
            excludeIngredients={excludeIngredients}
            setExcludeIngredients={setExcludeIngredients}
            loading={loading}
            handleGenerateRecipes={handleGenerateRecipes}
            suggestedQueries={suggestedQueries}
            handleSuggestedQuery={handleSuggestedQuery}
            generatedRecipes={generatedRecipes}
          />
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <AIRecipeLoading />
            ) : generatedRecipes.length > 0 ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-4">الوصفات الموصى بها</h2>
                
                {generatedRecipes.map((recipe) => (
                  <AIRecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    saveRecipe={saveRecipe}
                    handleViewRecipe={handleViewRecipe}
                  />
                ))}
              </div>
            ) : (
              <AIRecipeEmpty onStartAI={handleStartAI} />
            )}
          </div>
        </div>
      </div>

      {/* Recipe Detail Dialog */}
      <AIRecipeDetail
        selectedRecipe={selectedRecipe}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        saveRecipe={saveRecipe}
      />
    </div>
  );
};

export default AIRecipes;
