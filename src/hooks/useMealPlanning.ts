
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define types
export interface Meal {
  id: string;
  name: string;
  recipeId?: string;
  recipeName?: string;
  day: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  meals: Meal[];
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useMealPlanning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
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

  return {
    user,
    plans,
    activePlan,
    setActivePlan,
    planName,
    setPlanName,
    newMeal,
    setNewMeal,
    isLoading,
    isEditing,
    setIsEditing,
    createNewPlan,
    addMeal,
    deleteMeal,
    deletePlan,
    updatePlanName
  };
};

// أيام الأسبوع باللغة العربية
export const daysOfWeek = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

// أنواع الوجبات
export const mealTypes = [
  { value: 'breakfast', label: 'فطور' },
  { value: 'lunch', label: 'غداء' },
  { value: 'dinner', label: 'عشاء' },
  { value: 'snack', label: 'وجبة خفيفة' }
];
