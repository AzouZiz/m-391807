
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MealPlan } from '@/hooks/useMealPlanning';

interface ManagePlansTabProps {
  plans: MealPlan[];
  activePlanId: string;
  onViewPlan: (plan: MealPlan) => void;
  onDeletePlan: (id: string) => void;
}

const ManagePlansTab: React.FC<ManagePlansTabProps> = ({
  plans,
  activePlanId,
  onViewPlan,
  onDeletePlan
}) => {
  return (
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
                onClick={() => onViewPlan(plan)}
                disabled={activePlanId === plan.id}
              >
                {activePlanId === plan.id ? 'نشط' : 'عرض'}
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-red-500/30 hover:border-red-500/50"
                onClick={() => onDeletePlan(plan.id)}
                disabled={plans.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManagePlansTab;
