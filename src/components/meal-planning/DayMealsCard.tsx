
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Meal, mealTypes } from '@/hooks/useMealPlanning';

interface DayMealsCardProps {
  day: string;
  meals: Meal[];
  onDeleteMeal: (id: string) => void;
}

const DayMealsCard: React.FC<DayMealsCardProps> = ({
  day,
  meals,
  onDeleteMeal
}) => {
  return (
    <Card key={day} className="bg-white/10 border border-white/20">
      <CardHeader className="py-3 px-4 bg-white/10 border-b border-white/20">
        <h3 className="text-lg font-bold text-white">{day}</h3>
      </CardHeader>
      <CardContent className="p-3 space-y-2">
        {mealTypes.map((type) => {
          const dayMeals = meals.filter(
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
                      onClick={() => onDeleteMeal(meal.id)}
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
  );
};

export default DayMealsCard;
