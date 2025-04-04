
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, ChefHat, Calculator, CalendarCheck, Activity,
  Users, Heart, BookOpen, LineChart, Apple, Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import PageFooter from '@/components/layout/PageFooter';

const AthleteNutrition: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calculator');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState<number | null>(null);

  // حساب السعرات الحرارية الأساسية (BMR)
  const calculateBMR = () => {
    // معادلة هاريس-بينديكت للحساب
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // حساب السعرات الحرارية اليومية
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    let activityMultiplier = 1.2; // قليل النشاط
    
    switch (activityLevel) {
      case 'light':
        activityMultiplier = 1.375; // نشاط خفيف
        break;
      case 'moderate':
        activityMultiplier = 1.55; // نشاط معتدل
        break;
      case 'active':
        activityMultiplier = 1.725; // نشاط عالي
        break;
      case 'very-active':
        activityMultiplier = 1.9; // نشاط شديد
        break;
    }
    
    let tdee = bmr * activityMultiplier;
    
    // تعديل بناءً على الهدف
    if (goal === 'lose') {
      tdee -= 500; // نقص 500 سعرة حرارية لخسارة الوزن
    } else if (goal === 'gain') {
      tdee += 500; // زيادة 500 سعرة حرارية لاكتساب العضلات
    }
    
    return Math.round(tdee);
  };

  // حساب النتائج
  const handleCalculate = () => {
    const result = calculateTDEE();
    setCalories(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          subtitle="حاسبة التغذية للرياضيين والمتدربين" 
          className="mb-8" 
        />
        
        <Card className="metaverse-card bg-white/5 backdrop-blur-md mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <Button
                variant={activeTab === 'calculator' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setActiveTab('calculator')}
              >
                <Calculator className="w-4 h-4" />
                <span>حاسبة السعرات</span>
              </Button>
              
              <Button
                variant={activeTab === 'meal-tracking' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setActiveTab('meal-tracking')}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>تتبع الوجبات</span>
              </Button>
              
              <Button
                variant={activeTab === 'food-database' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setActiveTab('food-database')}
              >
                <Apple className="w-4 h-4" />
                <span>قاعدة بيانات الأطعمة</span>
              </Button>
              
              <Button
                variant={activeTab === 'progress' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setActiveTab('progress')}
              >
                <LineChart className="w-4 h-4" />
                <span>التقدم</span>
              </Button>
              
              <Button
                variant={activeTab === 'education' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setActiveTab('education')}
              >
                <BookOpen className="w-4 h-4" />
                <span>تعليم تغذوي</span>
              </Button>
            </div>
            
            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white text-center">حاسبة السعرات الحرارية اليومية</h3>
                <p className="text-white/80 text-center mb-6">
                  أدخل معلوماتك الشخصية لحساب احتياجاتك اليومية من السعرات الحرارية
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="gender" className="text-white">الجنس</Label>
                      <Select 
                        value={gender} 
                        onValueChange={setGender}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="اختر الجنس" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="age" className="text-white">العمر (سنوات)</Label>
                      <Input 
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weight" className="text-white">الوزن (كجم)</Label>
                      <Input 
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="height" className="text-white">الطول (سم)</Label>
                      <Input 
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="activity" className="text-white">مستوى النشاط البدني</Label>
                      <Select 
                        value={activityLevel} 
                        onValueChange={setActivityLevel}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="اختر مستوى النشاط" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">قليل الحركة (مكتبي معظم اليوم)</SelectItem>
                          <SelectItem value="light">خفيف (تمارين خفيفة 1-3 أيام أسبوعياً)</SelectItem>
                          <SelectItem value="moderate">معتدل (تمارين معتدلة 3-5 أيام أسبوعياً)</SelectItem>
                          <SelectItem value="active">نشط (تمارين قوية 6-7 أيام أسبوعياً)</SelectItem>
                          <SelectItem value="very-active">نشط جداً (تدريب مكثف أو عمل بدني)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="goal" className="text-white">هدفك</Label>
                      <Select 
                        value={goal} 
                        onValueChange={setGoal}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="اختر هدفك" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">فقدان الوزن</SelectItem>
                          <SelectItem value="maintain">الحفاظ على الوزن</SelectItem>
                          <SelectItem value="gain">بناء العضلات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full mt-6"
                >
                  حساب السعرات الحرارية
                </Button>
                
                {calories !== null && (
                  <div className="mt-8 p-6 bg-white/10 rounded-xl text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">نتائج الحساب</h4>
                    <p className="text-white/80 mb-4">بناءً على معلوماتك، تحتاج يومياً إلى:</p>
                    
                    <div className="text-3xl font-bold text-white mb-2">{calories} سعرة حرارية</div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white text-sm">البروتين</p>
                        <p className="text-white font-bold mt-1">{Math.round(calories * 0.3 / 4)} جرام</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white text-sm">الكربوهيدرات</p>
                        <p className="text-white font-bold mt-1">{Math.round(calories * 0.45 / 4)} جرام</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white text-sm">الدهون</p>
                        <p className="text-white font-bold mt-1">{Math.round(calories * 0.25 / 9)} جرام</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-white/70 text-sm">
                      * هذه التقديرات تقريبية وقد تتغير حسب الحالة الصحية والاحتياجات الفردية
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline"
                    className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => navigate('/meal-planning')}
                  >
                    الذهاب إلى تخطيط الوجبات
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'meal-tracking' && (
              <div className="text-center py-8">
                <Clock className="h-16 w-16 mx-auto text-white/50 mb-4" />
                <h3 className="text-xl font-bold text-white">قريباً</h3>
                <p className="text-white/70 mt-2 max-w-md mx-auto">
                  نعمل على تطوير أداة متكاملة لتتبع الوجبات يومياً. ترقبوا هذه الميزة الجديدة.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/meal-planning')}
                  className="mt-6 border-white/30 text-white hover:bg-white/10"
                >
                  استخدم تخطيط الوجبات بدلاً من ذلك
                </Button>
              </div>
            )}
            
            {activeTab === 'food-database' && (
              <div className="text-center py-8">
                <Clock className="h-16 w-16 mx-auto text-white/50 mb-4" />
                <h3 className="text-xl font-bold text-white">قريباً</h3>
                <p className="text-white/70 mt-2 max-w-md mx-auto">
                  نعمل على إنشاء قاعدة بيانات شاملة للأطعمة مع العناصر الغذائية. ترقبوا هذه الميزة الجديدة.
                </p>
              </div>
            )}
            
            {activeTab === 'progress' && (
              <div className="text-center py-8">
                <Clock className="h-16 w-16 mx-auto text-white/50 mb-4" />
                <h3 className="text-xl font-bold text-white">قريباً</h3>
                <p className="text-white/70 mt-2 max-w-md mx-auto">
                  نعمل على تطوير أداة لتتبع تقدمك مع رسوم بيانية وإحصاءات. ترقبوا هذه الميزة الجديدة.
                </p>
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="text-center py-8">
                <Clock className="h-16 w-16 mx-auto text-white/50 mb-4" />
                <h3 className="text-xl font-bold text-white">قريباً</h3>
                <p className="text-white/70 mt-2 max-w-md mx-auto">
                  نعمل على إضافة محتوى تعليمي عن التغذية الرياضية. ترقبوا هذه الميزة الجديدة.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="neo-card">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 mt-2">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">حسابات مخصصة</h3>
              <p className="text-white/70 text-sm">
                احسب احتياجاتك اليومية من السعرات الحرارية والماكروز بناءً على أهدافك
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 mt-2">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">وصفات للرياضيين</h3>
              <p className="text-white/70 text-sm">
                وصفات صحية غنية بالبروتين ومتوازنة لتلبية احتياجاتك الغذائية
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 mt-2">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">المتابعة والتحليل</h3>
              <p className="text-white/70 text-sm">
                تتبع تقدمك وحلل عاداتك الغذائية لتحسين أدائك الرياضي
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">اقتراحات لتحسين تغذيتك</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            إليك بعض النصائح المفيدة للرياضيين لتحسين تغذيتهم وأدائهم
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="neo-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-white mb-3">قبل التمرين</h3>
                <ul className="space-y-2 text-white/80 text-right">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>تناول وجبة غنية بالكربوهيدرات قبل 2-3 ساعات من التمرين</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>وجبة خفيفة سهلة الهضم إذا كان الوقت أقل من ساعة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>تأكد من ترطيب جسمك بشكل جيد</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="neo-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-white mb-3">بعد التمرين</h3>
                <ul className="space-y-2 text-white/80 text-right">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>تناول البروتين خلال 30 دقيقة بعد التمرين</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>استهلك الكربوهيدرات لتعويض مخزون الجليكوجين</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span>لا تنسَ التعويض عن السوائل المفقودة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <PageFooter className="py-6" />
      </div>
    </div>
  );
};

export default AthleteNutrition;
