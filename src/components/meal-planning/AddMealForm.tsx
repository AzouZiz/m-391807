
import React from 'react';
import { Plus, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Meal, daysOfWeek, mealTypes } from '@/hooks/useMealPlanning';

interface AddMealFormProps {
  newMeal: Partial<Meal>;
  onMealChange: (meal: Partial<Meal>) => void;
  onAddMeal: () => void;
}

const AddMealForm: React.FC<AddMealFormProps> = ({
  newMeal,
  onMealChange,
  onAddMeal,
}) => {
  return (
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
              onValueChange={(value) => onMealChange({ ...newMeal, day: value })}
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
              onValueChange={(value) => onMealChange({ ...newMeal, type: value as any })}
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
              onChange={(e) => onMealChange({ ...newMeal, name: e.target.value })}
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
            onChange={(e) => onMealChange({ ...newMeal, notes: e.target.value })}
          />
        </div>
        
        <Button 
          className="w-full bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-90 text-white"
          onClick={onAddMeal}
        >
          <Plus className="h-4 w-4 mr-1" />
          إضافة الوجبة
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddMealForm;
