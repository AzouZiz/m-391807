
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Calendar, Plus, Trash2, ArrowLeft, AlertCircle, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// تعريف أنواع البيانات
interface Meal {
  id: string;
  name: string;
  recipeId?: string;
  recipeName?: string;
  day: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
}

interface MealPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  meals: Meal[];
  userId: string;
}

// أيام الأسبوع باللغة العربية
const daysOfWeek = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

// أنواع الوجبات
const mealTypes = [
  { value: 'breakfast', label: 'فطور' },
  { value: 'lunch', label: 'غداء' },
  { value: 'dinner', label: 'عشاء' },
  { value: 'snack', label: 'وجبة خفيفة' }
];

const MealPlanning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [activePlan, setActivePlan] = useState<MealPlan | null>(null);
  const [planName, setPlanName] = useState('خطة الوجبات الأسبوعية');
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    day: 'الأحد',
    type: 'breakfast',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
      toast({
        title: "غير مصرح",
        description: "يرجى تسجيل الدخول للوصول إلى تخطيط الوجبات",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      const currentUser = JSON.parse(currentUserJSON);
      setUser(currentUser);

      // استرجاع خطط الوجبات من التخزين المحلي
      const storedPlans = localStorage.getItem(`mealPlans_${currentUser.id}`);
      if (storedPlans) {
        const parsedPlans = JSON.parse(storedPlans);
        setPlans(parsedPlans);
        
        // تعيين الخطة النشطة إلى أحدث خطة إذا كانت موجودة
        if (parsedPlans.length > 0) {
          setActivePlan(parsedPlans[0]);
        } else {
          // إنشاء خطة جديدة إذا لم تكن هناك خطط
          createNewPlan(currentUser.id);
        }
      } else {
        // إنشاء خطة جديدة إذا لم تكن هناك خطط
        createNewPlan(currentUser.id);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في قراءة بيانات المستخدم:', error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  // إنشاء خطة جديدة
  const createNewPlan = (userId: string) => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 6); // أسبوع من اليوم
    
    const newPlan: MealPlan = {
      id: Date.now().toString(),
      name: planName,
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      meals: [],
      userId
    };
    
    setPlans(prevPlans => [newPlan, ...prevPlans]);
    setActivePlan(newPlan);
    
    // حفظ في التخزين المحلي
    localStorage.setItem(`mealPlans_${userId}`, JSON.stringify([newPlan, ...plans]));
    
    toast({
      title: "تم إنشاء الخطة",
      description: "تم إنشاء خطة وجبات جديدة",
    });
  };

  // حفظ الخطط في التخزين المحلي
  const savePlans = (updatedPlans: MealPlan[]) => {
    if (user) {
      localStorage.setItem(`mealPlans_${user.id}`, JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
    }
  };

  // إضافة وجبة جديدة
  const addMeal = () => {
    if (!activePlan || !newMeal.name || !newMeal.day || !newMeal.type) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع حقول الوجبة",
        variant: "destructive",
      });
      return;
    }
    
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      day: newMeal.day,
      type: newMeal.type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      notes: newMeal.notes
    };
    
    const updatedPlan = {
      ...activePlan,
      meals: [...activePlan.meals, meal]
    };
    
    const updatedPlans = plans.map(p => 
      p.id === activePlan.id ? updatedPlan : p
    );
    
    setActivePlan(updatedPlan);
    savePlans(updatedPlans);
    
    // إعادة تعيين نموذج الوجبة الجديدة
    setNewMeal({
      day: newMeal.day,
      type: newMeal.type,
      name: ''
    });
    
    toast({
      title: "تمت الإضافة",
      description: `تمت إضافة ${meal.name} إلى خطة الوجبات`,
    });
  };

  // حذف وجبة
  const deleteMeal = (mealId: string) => {
    if (!activePlan) return;
    
    const updatedPlan = {
      ...activePlan,
      meals: activePlan.meals.filter(m => m.id !== mealId)
    };
    
    const updatedPlans = plans.map(p => 
      p.id === activePlan.id ? updatedPlan : p
    );
    
    setActivePlan(updatedPlan);
    savePlans(updatedPlans);
    
    toast({
      title: "تم الحذف",
      description: "تم حذف الوجبة من خطة الوجبات",
    });
  };

  // حذف خطة
  const deletePlan = (planId: string) => {
    const updatedPlans = plans.filter(p => p.id !== planId);
    savePlans(updatedPlans);
    
    if (updatedPlans.length > 0) {
      setActivePlan(updatedPlans[0]);
    } else {
      setActivePlan(null);
      // إنشاء خطة جديدة إذا تم حذف جميع الخطط
      if (user) {
        createNewPlan(user.id);
      }
    }
    
    toast({
      title: "تم الحذف",
      description: "تم حذف خطة الوجبات",
    });
  };

  // تحديث اسم الخطة
  const updatePlanName = () => {
    if (!activePlan || !planName.trim()) return;
    
    const updatedPlan = {
      ...activePlan,
      name: planName
    };
    
    const updatedPlans = plans.map(p => 
      p.id === activePlan.id ? updatedPlan : p
    );
    
    setActivePlan(updatedPlan);
    savePlans(updatedPlans);
    setIsEditing(false);
    
    toast({
      title: "تم التحديث",
      description: "تم تحديث اسم خطة الوجبات",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل تخطيط الوجبات...</p>
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
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-white" />
                <h1 className="text-xl font-bold text-white">تخطيط الوجبات</h1>
              </div>
              
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/20"
                onClick={() => user && createNewPlan(user.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                خطة جديدة
              </Button>
            </div>
          </CardHeader>
          
          <Separator className="bg-white/20" />
          
          {activePlan ? (
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="w-full bg-white/10 border-b border-white/20 rounded-none justify-start p-0 h-auto">
                <TabsTrigger 
                  value="plan"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 py-3"
                >
                  خطة الوجبات
                </TabsTrigger>
                <TabsTrigger 
                  value="manage"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 py-3"
                >
                  إدارة الخطط
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="plan" className="p-0 mt-0">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={planName}
                          onChange={(e) => setPlanName(e.target.value)}
                          className="bg-white/30 border-white/30 text-white"
                        />
                        <Button
                          variant="outline"
                          className="border-white/30 bg-white/20 text-white hover:bg-white/30"
                          onClick={updatePlanName}
                        >
                          حفظ
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">{activePlan.name}</h2>
                        <Button
                          variant="ghost"
                          className="p-1 h-auto text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => {
                            setPlanName(activePlan.name);
                            setIsEditing(true);
                          }}
                        >
                          تعديل
                        </Button>
                      </div>
                    )}
                    
                    <div className="text-white text-sm">
                      {new Date(activePlan.startDate).toLocaleDateString('ar-SA')} - {new Date(activePlan.endDate).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {daysOfWeek.map((day) => (
                      <Card key={day} className="bg-white/10 border border-white/20">
                        <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
                          <h3 className="text-lg font-bold text-white">{day}</h3>
                        </CardHeader>
                        <CardContent className="p-3 space-y-2">
                          {mealTypes.map((type) => {
                            const dayMeals = activePlan.meals.filter(
                              m => m.day === day && m.type === type.value
                            );
                            
                            return (
                              <div key={`${day}-${type.value}`} className="space-y-1">
                                <h4 className="text-sm font-medium text-white/80">{type.label}</h4>
                                {dayMeals.length > 0 ? (
                                  dayMeals.map((meal) => (
                                    <div 
                                      key={meal.id} 
                                      className="flex justify-between items-center bg-white/10 rounded p-2 text-sm"
                                    >
                                      <span className="text-white truncate">{meal.name}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                                        onClick={() => deleteMeal(meal.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-white/50 text-sm py-1 px-2">لا توجد وجبات</div>
                                )}
                              </div>
                            );
                          })}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="bg-white/10 border border-white/20">
                    <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
                      <h3 className="text-lg font-bold text-white">إضافة وجبة جديدة</h3>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="day" className="text-white">اليوم</Label>
                          <Select
                            value={newMeal.day}
                            onValueChange={(value) => setNewMeal({ ...newMeal, day: value })}
                          >
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="اختر اليوم" />
                            </SelectTrigger>
                            <SelectContent>
                              {daysOfWeek.map((day) => (
                                <SelectItem key={day} value={day}>{day}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type" className="text-white">نوع الوجبة</Label>
                          <Select
                            value={newMeal.type}
                            onValueChange={(value) => setNewMeal({ ...newMeal, type: value as any })}
                          >
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="اختر نوع الوجبة" />
                            </SelectTrigger>
                            <SelectContent>
                              {mealTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="mealName" className="text-white">اسم الوجبة</Label>
                        <div className="relative">
                          <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                          <Input
                            id="mealName"
                            placeholder="أدخل اسم الوجبة"
                            className="pl-10 bg-white/20 border-white/30 text-white"
                            value={newMeal.name || ''}
                            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="notes" className="text-white">ملاحظات (اختياري)</Label>
                        <Input
                          id="notes"
                          placeholder="أضف ملاحظات حول الوجبة"
                          className="bg-white/20 border-white/30 text-white"
                          value={newMeal.notes || ''}
                          onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                        onClick={addMeal}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        إضافة الوجبة
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="manage" className="p-0 mt-0">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">إدارة خطط الوجبات</h2>
                  
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <Card key={plan.id} className="bg-white/10 border border-white/20">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-white">{plan.name}</h3>
                            <p className="text-sm text-white/70">
                              {new Date(plan.startDate).toLocaleDateString('ar-SA')} - {new Date(plan.endDate).toLocaleDateString('ar-SA')}
                            </p>
                            <p className="text-sm text-white/70">
                              {plan.meals.length} وجبة
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/20"
                              onClick={() => setActivePlan(plan)}
                              disabled={activePlan?.id === plan.id}
                            >
                              {activePlan?.id === plan.id ? 'نشط' : 'عرض'}
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/30 text-white hover:bg-red-500/30 hover:border-red-500/50"
                              onClick={() => deletePlan(plan.id)}
                              disabled={plans.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          ) : (
            <CardContent className="p-6 text-center">
              <p className="text-white text-lg">لا توجد خطط وجبات متاحة.</p>
              <Button 
                className="mt-4 bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                onClick={() => user && createNewPlan(user.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                إنشاء خطة جديدة
              </Button>
            </CardContent>
          )}
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

export default MealPlanning;
