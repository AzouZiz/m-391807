
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Calendar, Plus, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageFooter from '@/components/layout/PageFooter';

// Import custom hook and components
import { useMealPlanning, daysOfWeek } from '@/hooks/useMealPlanning';
import DayMealsCard from '@/components/meal-planning/DayMealsCard';
import AddMealForm from '@/components/meal-planning/AddMealForm';
import PlanHeader from '@/components/meal-planning/PlanHeader';
import ManagePlansTab from '@/components/meal-planning/ManagePlansTab';

const MealPlanning = () => {
  const navigate = useNavigate();
  const {
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
  } = useMealPlanning();

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
                  <PlanHeader
                    planName={planName}
                    onPlanNameChange={setPlanName}
                    startDate={activePlan.startDate}
                    endDate={activePlan.endDate}
                    isEditing={isEditing}
                    onEditClick={() => {
                      setPlanName(activePlan.name);
                      setIsEditing(true);
                    }}
                    onSaveClick={updatePlanName}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {daysOfWeek.map((day) => (
                      <DayMealsCard
                        key={day}
                        day={day}
                        meals={activePlan.meals}
                        onDeleteMeal={deleteMeal}
                      />
                    ))}
                  </div>
                  
                  <AddMealForm
                    newMeal={newMeal}
                    onMealChange={setNewMeal}
                    onAddMeal={addMeal}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="manage" className="p-0 mt-0">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">إدارة خطط الوجبات</h2>
                  
                  <ManagePlansTab
                    plans={plans}
                    activePlanId={activePlan.id}
                    onViewPlan={setActivePlan}
                    onDeletePlan={deletePlan}
                  />
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
        
        <PageFooter />
      </div>
    </div>
  );
};

export default MealPlanning;
