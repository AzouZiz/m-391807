
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Calculator, 
  Calendar, 
  ChefHat, 
  Utensils, 
  PieChart,
  ArrowLeft 
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/layout/PageHeader';
import PageFooter from '@/components/layout/PageFooter';
import BackButton from '@/components/layout/BackButton';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// تعريف أنواع البيانات
interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: number;
  servingUnit: string;
}

interface CalorieGoal {
  daily: number;
  protein: number;
  carbs: number;
  fat: number;
}

// قائمة الأطعمة الافتراضية
const defaultFoods: Food[] = [
  { id: '1', name: 'صدر دجاج', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: 100, servingUnit: 'جرام' },
  { id: '2', name: 'أرز مطبوخ', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: 100, servingUnit: 'جرام' },
  { id: '3', name: 'بيضة كاملة', calories: 70, protein: 6, carbs: 0.6, fat: 5, serving: 1, servingUnit: 'قطعة' },
  { id: '4', name: 'سمك السلمون', calories: 206, protein: 22, carbs: 0, fat: 13, serving: 100, servingUnit: 'جرام' },
  { id: '5', name: 'حليب قليل الدسم', calories: 102, protein: 8.2, carbs: 12, fat: 2.4, serving: 240, servingUnit: 'مل' },
  { id: '6', name: 'شوفان', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, serving: 100, servingUnit: 'جرام' },
  { id: '7', name: 'موز', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: 100, servingUnit: 'جرام' },
  { id: '8', name: 'زبادي يوناني', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, serving: 100, servingUnit: 'جرام' },
];

const AthleteNutrition = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calculator');
  const [foods, setFoods] = useState<Food[]>(() => {
    // استرجاع قائمة الأطعمة من التخزين المحلي أو استخدام القائمة الافتراضية
    const savedFoods = localStorage.getItem('athleteFoods');
    return savedFoods ? JSON.parse(savedFoods) : defaultFoods;
  });
  
  const [selectedFoods, setSelectedFoods] = useState<(Food & { quantity: number })[]>([]);
  const [newFood, setNewFood] = useState<Partial<Food>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    serving: 100,
    servingUnit: 'جرام'
  });
  
  const [calorieGoal, setCalorieGoal] = useState<CalorieGoal>(() => {
    // استرجاع هدف السعرات الحرارية من التخزين المحلي أو استخدام القيم الافتراضية
    const savedGoal = localStorage.getItem('athleteCalorieGoal');
    return savedGoal ? JSON.parse(savedGoal) : {
      daily: 2500,
      protein: 180,
      carbs: 250,
      fat: 70
    };
  });
  
  const [userData, setUserData] = useState({
    weight: 75,
    height: 175,
    age: 30,
    gender: 'ذكر',
    activityLevel: 'متوسط',
  });
  
  // حساب القيم الغذائية للوجبات المختارة
  const calculateTotals = () => {
    return selectedFoods.reduce((acc, food) => {
      const multiplier = food.quantity / food.serving;
      acc.calories += food.calories * multiplier;
      acc.protein += food.protein * multiplier;
      acc.carbs += food.carbs * multiplier;
      acc.fat += food.fat * multiplier;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // حفظ بيانات الأطعمة في التخزين المحلي
  const saveFoods = (updatedFoods: Food[]) => {
    localStorage.setItem('athleteFoods', JSON.stringify(updatedFoods));
    setFoods(updatedFoods);
  };
  
  // حفظ هدف السعرات الحرارية في التخزين المحلي
  const saveCalorieGoal = (goal: CalorieGoal) => {
    localStorage.setItem('athleteCalorieGoal', JSON.stringify(goal));
    setCalorieGoal(goal);
  };

  // إضافة طعام جديد
  const addNewFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى إدخال اسم الطعام والسعرات الحرارية على الأقل",
        variant: "destructive",
      });
      return;
    }
    
    const food: Food = {
      id: Date.now().toString(),
      name: newFood.name || '',
      calories: newFood.calories || 0,
      protein: newFood.protein || 0,
      carbs: newFood.carbs || 0,
      fat: newFood.fat || 0,
      serving: newFood.serving || 100,
      servingUnit: newFood.servingUnit || 'جرام'
    };
    
    const updatedFoods = [...foods, food];
    saveFoods(updatedFoods);
    
    setNewFood({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      serving: 100,
      servingUnit: 'جرام'
    });
    
    toast({
      title: "تمت الإضافة",
      description: `تمت إضافة ${food.name} إلى قائمة الأطعمة`,
    });
  };

  // إضافة طعام إلى الوجبات المختارة
  const addFoodToSelected = (food: Food, quantity: number) => {
    setSelectedFoods([...selectedFoods, { ...food, quantity }]);
  };

  // حذف طعام من الوجبات المختارة
  const removeSelectedFood = (index: number) => {
    const updated = [...selectedFoods];
    updated.splice(index, 1);
    setSelectedFoods(updated);
  };

  // حساب السعرات الحرارية اليومية المطلوبة
  const calculateDailyCalories = () => {
    const { weight, height, age, gender, activityLevel } = userData;
    
    // معادلة هاريس-بينديكت للحساب الأساسي للسعرات (BMR)
    let bmr;
    if (gender === 'ذكر') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // معامل مستوى النشاط
    let activityFactor;
    switch (activityLevel) {
      case 'قليل':
        activityFactor = 1.2;
        break;
      case 'خفيف':
        activityFactor = 1.375;
        break;
      case 'متوسط':
        activityFactor = 1.55;
        break;
      case 'عالي':
        activityFactor = 1.725;
        break;
      case 'عالي جداً':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.55;
    }
    
    // السعرات الحرارية اليومية المطلوبة
    const dailyCalories = Math.round(bmr * activityFactor);
    
    // تقدير توزيع العناصر الغذائية (بالجرام)
    // 30% بروتين، 45% كربوهيدرات، 25% دهون
    const protein = Math.round((dailyCalories * 0.3) / 4); // 4 سعرات حرارية لكل جرام بروتين
    const carbs = Math.round((dailyCalories * 0.45) / 4); // 4 سعرات حرارية لكل جرام كربوهيدرات
    const fat = Math.round((dailyCalories * 0.25) / 9); // 9 سعرات حرارية لكل جرام دهون
    
    const newGoal = { daily: dailyCalories, protein, carbs, fat };
    saveCalorieGoal(newGoal);
    
    toast({
      title: "تم الحساب",
      description: `السعرات الحرارية اليومية المطلوبة: ${dailyCalories} سعرة`,
    });
  };

  // حساب النسب المئوية للاستهلاك اليومي
  const calculatePercentage = (totals: { calories: number, protein: number, carbs: number, fat: number }) => {
    return {
      calories: Math.round((totals.calories / calorieGoal.daily) * 100),
      protein: Math.round((totals.protein / calorieGoal.protein) * 100),
      carbs: Math.round((totals.carbs / calorieGoal.carbs) * 100),
      fat: Math.round((totals.fat / calorieGoal.fat) * 100)
    };
  };

  // الإجماليات اليومية
  const totals = calculateTotals();
  const percentages = calculatePercentage(totals);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <BackButton to="/dashboard" />
          
          <PageHeader subtitle="قسم التغذية الرياضية" />
          
          <div className="w-20"></div>
        </div>
        
        <Card className="w-full bg-white/20 backdrop-blur-lg border border-white/30 mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-white" />
                <h1 className="text-xl font-bold text-white">التغذية الرياضية</h1>
              </div>
            </div>
          </CardHeader>
          
          <Tabs 
            defaultValue="calculator" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full bg-white/10 border-b border-white/20 rounded-none justify-start p-0 h-auto">
              <TabsTrigger 
                value="calculator"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 py-3"
              >
                <Calculator className="h-4 w-4 mr-2" />
                حاسبة السعرات
              </TabsTrigger>
              <TabsTrigger 
                value="meals"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 py-3"
              >
                <Utensils className="h-4 w-4 mr-2" />
                تتبع الوجبات
              </TabsTrigger>
              <TabsTrigger 
                value="foods"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 py-3"
              >
                <PieChart className="h-4 w-4 mr-2" />
                قائمة الأطعمة
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">حاسبة السعرات الحرارية للرياضيين</h2>
                
                <Card className="bg-white/10 border border-white/20 mb-6">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-white">الوزن (كجم)</Label>
                        <Input
                          id="weight"
                          type="number"
                          className="bg-white/20 border-white/30 text-white"
                          value={userData.weight}
                          onChange={(e) => setUserData({...userData, weight: Number(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-white">الطول (سم)</Label>
                        <Input
                          id="height"
                          type="number"
                          className="bg-white/20 border-white/30 text-white"
                          value={userData.height}
                          onChange={(e) => setUserData({...userData, height: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-white">العمر</Label>
                        <Input
                          id="age"
                          type="number"
                          className="bg-white/20 border-white/30 text-white"
                          value={userData.age}
                          onChange={(e) => setUserData({...userData, age: Number(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-white">الجنس</Label>
                        <Select
                          value={userData.gender}
                          onValueChange={(value) => setUserData({...userData, gender: value})}
                        >
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ذكر">ذكر</SelectItem>
                            <SelectItem value="أنثى">أنثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="activityLevel" className="text-white">مستوى النشاط البدني</Label>
                      <Select
                        value={userData.activityLevel}
                        onValueChange={(value) => setUserData({...userData, activityLevel: value})}
                      >
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="اختر مستوى النشاط" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="قليل">قليل (مستقر، قلة حركة)</SelectItem>
                          <SelectItem value="خفيف">خفيف (تمرين خفيف 1-3 مرات/أسبوع)</SelectItem>
                          <SelectItem value="متوسط">متوسط (تمرين معتدل 3-5 مرات/أسبوع)</SelectItem>
                          <SelectItem value="عالي">عالي (تمرين قوي 6-7 مرات/أسبوع)</SelectItem>
                          <SelectItem value="عالي جداً">عالي جداً (تمرين مكثف يومياً)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                      onClick={calculateDailyCalories}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      حساب السعرات الحرارية
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 border border-white/20">
                  <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
                    <h3 className="text-lg font-bold text-white">النتائج</h3>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-white/10 p-3 rounded-lg text-center">
                        <p className="text-xs text-white/70">السعرات اليومية</p>
                        <p className="text-xl font-bold text-white">{calorieGoal.daily}</p>
                        <p className="text-xs text-white/70">سعرة حرارية</p>
                      </div>
                      
                      <div className="bg-white/10 p-3 rounded-lg text-center">
                        <p className="text-xs text-white/70">البروتين</p>
                        <p className="text-xl font-bold text-white">{calorieGoal.protein}</p>
                        <p className="text-xs text-white/70">جرام</p>
                      </div>
                      
                      <div className="bg-white/10 p-3 rounded-lg text-center">
                        <p className="text-xs text-white/70">الكربوهيدرات</p>
                        <p className="text-xl font-bold text-white">{calorieGoal.carbs}</p>
                        <p className="text-xs text-white/70">جرام</p>
                      </div>
                      
                      <div className="bg-white/10 p-3 rounded-lg text-center">
                        <p className="text-xs text-white/70">الدهون</p>
                        <p className="text-xl font-bold text-white">{calorieGoal.fat}</p>
                        <p className="text-xs text-white/70">جرام</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">البروتين</span>
                          <span className="text-white">{calorieGoal.protein} جرام</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, percentages.protein)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">الكربوهيدرات</span>
                          <span className="text-white">{calorieGoal.carbs} جرام</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, percentages.carbs)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">الدهون</span>
                          <span className="text-white">{calorieGoal.fat} جرام</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, percentages.fat)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="meals" className="p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">تتبع الوجبات اليومي</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/10 border border-white/20">
                    <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
                      <h3 className="text-lg font-bold text-white">إضافة طعام</h3>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <Select>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="اختر من قائمة الأطعمة" />
                        </SelectTrigger>
                        <SelectContent>
                          {foods.map(food => (
                            <SelectItem key={food.id} value={food.id}>
                              {food.name} - {food.calories} سعرة
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="الكمية"
                          className="bg-white/20 border-white/30 text-white"
                          min="0"
                        />
                        <Button 
                          onClick={() => {
                            toast({
                              title: "تمت الإضافة",
                              description: "تمت إضافة الطعام إلى قائمة الوجبات"
                            });
                          }}
                          className="whitespace-nowrap bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                        >
                          إضافة
                        </Button>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/20">
                            إدخال طعام غير موجود في القائمة
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-white/20">
                          <DialogHeader>
                            <DialogTitle className="text-white">إضافة طعام جديد</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="foodName" className="text-white">اسم الطعام</Label>
                              <Input
                                id="foodName"
                                value={newFood.name}
                                onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                                placeholder="أدخل اسم الطعام"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="calories" className="text-white">السعرات الحرارية</Label>
                                <Input
                                  id="calories"
                                  type="number"
                                  value={newFood.calories || ''}
                                  onChange={(e) => setNewFood({...newFood, calories: Number(e.target.value)})}
                                  placeholder="0"
                                  className="bg-white/20 border-white/30 text-white"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="protein" className="text-white">البروتين (جرام)</Label>
                                <Input
                                  id="protein"
                                  type="number"
                                  value={newFood.protein || ''}
                                  onChange={(e) => setNewFood({...newFood, protein: Number(e.target.value)})}
                                  placeholder="0"
                                  className="bg-white/20 border-white/30 text-white"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="carbs" className="text-white">الكربوهيدرات (جرام)</Label>
                                <Input
                                  id="carbs"
                                  type="number"
                                  value={newFood.carbs || ''}
                                  onChange={(e) => setNewFood({...newFood, carbs: Number(e.target.value)})}
                                  placeholder="0"
                                  className="bg-white/20 border-white/30 text-white"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="fat" className="text-white">الدهون (جرام)</Label>
                                <Input
                                  id="fat"
                                  type="number"
                                  value={newFood.fat || ''}
                                  onChange={(e) => setNewFood({...newFood, fat: Number(e.target.value)})}
                                  placeholder="0"
                                  className="bg-white/20 border-white/30 text-white"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="serving" className="text-white">حجم الحصة</Label>
                                <Input
                                  id="serving"
                                  type="number"
                                  value={newFood.serving || ''}
                                  onChange={(e) => setNewFood({...newFood, serving: Number(e.target.value)})}
                                  placeholder="100"
                                  className="bg-white/20 border-white/30 text-white"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="servingUnit" className="text-white">وحدة الحصة</Label>
                                <Select
                                  value={newFood.servingUnit}
                                  onValueChange={(value) => setNewFood({...newFood, servingUnit: value})}
                                >
                                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                                    <SelectValue placeholder="اختر الوحدة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="جرام">جرام</SelectItem>
                                    <SelectItem value="مل">مل</SelectItem>
                                    <SelectItem value="قطعة">قطعة</SelectItem>
                                    <SelectItem value="كوب">كوب</SelectItem>
                                    <SelectItem value="ملعقة">ملعقة</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                              onClick={addNewFood}
                            >
                              إضافة الطعام
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/10 border border-white/20">
                    <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
                      <h3 className="text-lg font-bold text-white">ملخص اليوم</h3>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white">السعرات المستهلكة:</span>
                          <span className="text-white font-bold">{totals.calories.toFixed(0)} / {calorieGoal.daily} سعرة</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${percentages.calories > 100 ? 'bg-red-400' : 'bg-green-400'}`}
                            style={{ width: `${Math.min(100, percentages.calories)}%` }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="text-center p-2 bg-white/10 rounded-lg">
                            <p className="text-xs text-white/70">البروتين</p>
                            <p className="text-white font-bold">{totals.protein.toFixed(1)}جم</p>
                            <p className="text-xs text-white/70">{percentages.protein}%</p>
                          </div>
                          
                          <div className="text-center p-2 bg-white/10 rounded-lg">
                            <p className="text-xs text-white/70">الكربوهيدرات</p>
                            <p className="text-white font-bold">{totals.carbs.toFixed(1)}جم</p>
                            <p className="text-xs text-white/70">{percentages.carbs}%</p>
                          </div>
                          
                          <div className="text-center p-2 bg-white/10 rounded-lg">
                            <p className="text-xs text-white/70">الدهون</p>
                            <p className="text-white font-bold">{totals.fat.toFixed(1)}جم</p>
                            <p className="text-xs text-white/70">{percentages.fat}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4 bg-white/20" />
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">الوجبات المسجلة</h4>
                        
                        {selectedFoods.length === 0 ? (
                          <p className="text-white/70 text-sm">لم تسجل أي وجبات بعد</p>
                        ) : (
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {selectedFoods.map((food, index) => (
                              <div 
                                key={`${food.id}-${index}`} 
                                className="flex justify-between items-center bg-white/10 p-2 rounded-lg"
                              >
                                <div>
                                  <p className="text-white text-sm">{food.name}</p>
                                  <p className="text-white/70 text-xs">
                                    {food.quantity} {food.servingUnit} • {Math.round(food.calories * (food.quantity / food.serving))} سعرة
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                                  onClick={() => removeSelectedFood(index)}
                                >
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.8071 2.99385 3.44303 2.99385 3.21848 3.2184C2.99394 3.44295 2.99394 3.80702 3.21848 4.03157L6.6869 7.49999L3.21848 10.9684C2.99394 11.193 2.99394 11.557 3.21848 11.7816C3.44303 12.0061 3.8071 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                  </svg>
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <Button className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white">
                            حفظ سجل الوجبات
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="foods" className="p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">قائمة الأطعمة</h2>
                
                <Card className="bg-white/10 border border-white/20">
                  <CardContent className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/20">
                          <tr>
                            <th className="py-2 px-3 text-right text-white font-medium">الاسم</th>
                            <th className="py-2 px-3 text-center text-white font-medium">السعرات</th>
                            <th className="py-2 px-3 text-center text-white font-medium">البروتين</th>
                            <th className="py-2 px-3 text-center text-white font-medium">الكربوهيدرات</th>
                            <th className="py-2 px-3 text-center text-white font-medium">الدهون</th>
                            <th className="py-2 px-3 text-center text-white font-medium">الحصة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {foods.map(food => (
                            <tr key={food.id} className="hover:bg-white/5">
                              <td className="py-2 px-3 text-white">{food.name}</td>
                              <td className="py-2 px-3 text-center text-white">{food.calories}</td>
                              <td className="py-2 px-3 text-center text-white">{food.protein}جم</td>
                              <td className="py-2 px-3 text-center text-white">{food.carbs}جم</td>
                              <td className="py-2 px-3 text-center text-white">{food.fat}جم</td>
                              <td className="py-2 px-3 text-center text-white">
                                {food.serving} {food.servingUnit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="mt-4 bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                        >
                          إضافة طعام جديد
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-white/20">
                        <DialogHeader>
                          <DialogTitle className="text-white">إضافة طعام جديد</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="foodName2" className="text-white">اسم الطعام</Label>
                            <Input
                              id="foodName2"
                              value={newFood.name}
                              onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                              placeholder="أدخل اسم الطعام"
                              className="bg-white/20 border-white/30 text-white"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="calories2" className="text-white">السعرات الحرارية</Label>
                              <Input
                                id="calories2"
                                type="number"
                                value={newFood.calories || ''}
                                onChange={(e) => setNewFood({...newFood, calories: Number(e.target.value)})}
                                placeholder="0"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="protein2" className="text-white">البروتين (جرام)</Label>
                              <Input
                                id="protein2"
                                type="number"
                                value={newFood.protein || ''}
                                onChange={(e) => setNewFood({...newFood, protein: Number(e.target.value)})}
                                placeholder="0"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="carbs2" className="text-white">الكربوهيدرات (جرام)</Label>
                              <Input
                                id="carbs2"
                                type="number"
                                value={newFood.carbs || ''}
                                onChange={(e) => setNewFood({...newFood, carbs: Number(e.target.value)})}
                                placeholder="0"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="fat2" className="text-white">الدهون (جرام)</Label>
                              <Input
                                id="fat2"
                                type="number"
                                value={newFood.fat || ''}
                                onChange={(e) => setNewFood({...newFood, fat: Number(e.target.value)})}
                                placeholder="0"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="serving2" className="text-white">حجم الحصة</Label>
                              <Input
                                id="serving2"
                                type="number"
                                value={newFood.serving || ''}
                                onChange={(e) => setNewFood({...newFood, serving: Number(e.target.value)})}
                                placeholder="100"
                                className="bg-white/20 border-white/30 text-white"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="servingUnit2" className="text-white">وحدة الحصة</Label>
                              <Select
                                value={newFood.servingUnit}
                                onValueChange={(value) => setNewFood({...newFood, servingUnit: value})}
                              >
                                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                                  <SelectValue placeholder="اختر الوحدة" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="جرام">جرام</SelectItem>
                                  <SelectItem value="مل">مل</SelectItem>
                                  <SelectItem value="قطعة">قطعة</SelectItem>
                                  <SelectItem value="كوب">كوب</SelectItem>
                                  <SelectItem value="ملعقة">ملعقة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
                            onClick={addNewFood}
                          >
                            إضافة الطعام
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        
        <PageFooter className="mt-4" />
      </div>
    </div>
  );
};

export default AthleteNutrition;
