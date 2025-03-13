
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Plus, Search, Trash2, Edit, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  userId: string;
  createdAt: string;
  imageUrl?: string;
}

const defaultRecipes: Recipe[] = [
  {
    id: '1',
    title: 'مكرونة بالصلصة الحمراء',
    ingredients: ['مكرونة', 'صلصة طماطم', 'ثوم', 'بصل', 'زيت زيتون', 'ملح وفلفل'],
    instructions: 'اسلق المكرونة وقم بتحضير الصلصة بقلي البصل والثوم ثم إضافة الطماطم. امزج المكرونة مع الصلصة.',
    userId: 'admin-1234',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'سلطة الخضار المشكلة',
    ingredients: ['خس', 'طماطم', 'خيار', 'فلفل ألوان', 'زيتون', 'زيت زيتون', 'ليمون'],
    instructions: 'قطع جميع الخضار إلى قطع متوسطة وامزجها معًا. أضف الزيتون وزيت الزيتون وعصير الليمون واخلطهم جيدًا.',
    userId: 'admin-1234',
    createdAt: new Date().toISOString(),
  }
];

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState<Omit<Recipe, 'id' | 'userId' | 'createdAt'>>({
    title: '',
    ingredients: [],
    instructions: '',
  });
  const [ingredientInput, setIngredientInput] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول للوصول إلى الوصفات",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      // استرداد الوصفات من التخزين المحلي أو استخدام الوصفات الافتراضية
      const savedRecipes = localStorage.getItem('sapidFoodRecipes');
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      } else {
        // استخدام الوصفات الافتراضية في حالة عدم وجود وصفات محفوظة
        localStorage.setItem('sapidFoodRecipes', JSON.stringify(defaultRecipes));
        setRecipes(defaultRecipes);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في قراءة بيانات الوصفات:', error);
      setIsLoading(false);
    }
  }, [navigate]);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      if (editingRecipe) {
        setEditingRecipe({
          ...editingRecipe,
          ingredients: [...editingRecipe.ingredients, ingredientInput.trim()]
        });
      } else {
        setNewRecipe({
          ...newRecipe,
          ingredients: [...newRecipe.ingredients, ingredientInput.trim()]
        });
      }
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    if (editingRecipe) {
      const updatedIngredients = [...editingRecipe.ingredients];
      updatedIngredients.splice(index, 1);
      setEditingRecipe({
        ...editingRecipe,
        ingredients: updatedIngredients
      });
    } else {
      const updatedIngredients = [...newRecipe.ingredients];
      updatedIngredients.splice(index, 1);
      setNewRecipe({
        ...newRecipe,
        ingredients: updatedIngredients
      });
    }
  };

  const handleSaveRecipe = () => {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول لإضافة وصفات",
        variant: "destructive",
      });
      return;
    }
    
    const currentUser = JSON.parse(currentUserJSON);

    if (editingRecipe) {
      // تحديث وصفة موجودة
      const updatedRecipes = recipes.map(r => 
        r.id === editingRecipe.id ? { ...editingRecipe, ingredients: [...editingRecipe.ingredients] } : r
      );
      setRecipes(updatedRecipes);
      localStorage.setItem('sapidFoodRecipes', JSON.stringify(updatedRecipes));
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث الوصفة بنجاح",
      });
    } else {
      // إضافة وصفة جديدة
      if (!newRecipe.title.trim() || newRecipe.ingredients.length === 0 || !newRecipe.instructions.trim()) {
        toast({
          title: "بيانات غير مكتملة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }
      
      const recipeToAdd: Recipe = {
        ...newRecipe,
        id: Date.now().toString(),
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      
      const updatedRecipes = [...recipes, recipeToAdd];
      setRecipes(updatedRecipes);
      localStorage.setItem('sapidFoodRecipes', JSON.stringify(updatedRecipes));
      
      // إعادة تعيين نموذج الوصفة الجديدة
      setNewRecipe({
        title: '',
        ingredients: [],
        instructions: '',
      });
      
      toast({
        title: "تمت الإضافة",
        description: "تمت إضافة الوصفة بنجاح",
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('sapidFoodRecipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "تم الحذف",
      description: "تم حذف الوصفة بنجاح",
    });
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsAddDialogOpen(true);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل الوصفات...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex flex-col p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <ChefHat className="h-10 w-10 text-white glow-effect" />
            <span className="text-3xl font-bold text-white">SapidFood</span>
          </div>
          <p className="text-white text-base">منصة تجربة الطعام المدعومة بالذكاء الاصطناعي</p>
        </div>
        
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 p-4 mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                className="text-white p-0 hover:bg-white/20" 
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="text-white font-medium">العودة</span>
              </Button>
              <h1 className="text-2xl font-bold text-white">وصفاتي</h1>
            </div>
          </CardHeader>
          
          <Separator className="bg-white/20 my-2" />
          
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input 
                  placeholder="ابحث عن وصفة..." 
                  className="pl-10 text-white bg-white/20 border-white/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white whitespace-nowrap"
                    onClick={() => {
                      setEditingRecipe(null);
                      setNewRecipe({
                        title: '',
                        ingredients: [],
                        instructions: '',
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    إضافة وصفة
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white/90 backdrop-blur-lg border-white/30">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      {editingRecipe ? 'تعديل الوصفة' : 'إضافة وصفة جديدة'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">اسم الوصفة</Label>
                      <Input 
                        id="title" 
                        value={editingRecipe ? editingRecipe.title : newRecipe.title}
                        onChange={(e) => editingRecipe 
                          ? setEditingRecipe({...editingRecipe, title: e.target.value})
                          : setNewRecipe({...newRecipe, title: e.target.value})
                        }
                        placeholder="أدخل اسم الوصفة"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ingredients">المكونات</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="ingredients" 
                          value={ingredientInput}
                          onChange={(e) => setIngredientInput(e.target.value)}
                          placeholder="أضف مكون"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddIngredient}
                          className="bg-primary"
                        >
                          إضافة
                        </Button>
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        {(editingRecipe ? editingRecipe.ingredients : newRecipe.ingredients).map((ingredient, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-white/20 rounded-md">
                            <span>{ingredient}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveIngredient(index)}
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/20 p-1 h-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instructions">طريقة التحضير</Label>
                      <textarea 
                        id="instructions" 
                        rows={4}
                        value={editingRecipe ? editingRecipe.instructions : newRecipe.instructions}
                        onChange={(e) => editingRecipe 
                          ? setEditingRecipe({...editingRecipe, instructions: e.target.value})
                          : setNewRecipe({...newRecipe, instructions: e.target.value})
                        }
                        placeholder="اكتب خطوات تحضير الوصفة"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      ></textarea>
                    </div>
                  </div>
                  
                  <DialogFooter className="mt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        setEditingRecipe(null);
                      }}
                    >
                      إلغاء
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleSaveRecipe}
                      className="bg-gradient-to-r from-primary to-accent"
                    >
                      {editingRecipe ? 'تحديث' : 'إضافة'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRecipes.map(recipe => (
                  <Card key={recipe.id} className="bg-white/30 backdrop-blur-sm border border-white/40 overflow-hidden">
                    <CardHeader className="pb-2">
                      <h3 className="text-xl font-bold text-white">{recipe.title}</h3>
                      <p className="text-white/70 text-sm">
                        {new Date(recipe.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </CardHeader>
                    <CardContent className="text-white">
                      <div className="mb-3">
                        <h4 className="font-semibold mb-1">المكونات:</h4>
                        <ul className="list-disc list-inside">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-sm">{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">طريقة التحضير:</h4>
                        <p className="text-sm text-white/90">
                          {recipe.instructions.length > 150 
                            ? `${recipe.instructions.substring(0, 150)}...` 
                            : recipe.instructions}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/30 text-white hover:bg-white/20"
                        onClick={() => handleEditRecipe(recipe)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        تعديل
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/30 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        حذف
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white/10 rounded-lg border border-white/20">
                <p className="text-white text-lg mb-2">لا توجد وصفات تطابق البحث</p>
                <p className="text-white/70">جرب البحث عن شيء آخر أو أضف وصفة جديدة</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-white/80 text-xs">
            © 2025 SapidFood. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
