
import React from 'react';
import { Trash2, Copy, Share2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MealPlan } from '@/hooks/useMealPlanning';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ManagePlansTabProps {
  plans: MealPlan[];
  activePlanId: string;
  onViewPlan: (plan: MealPlan) => void;
  onDeletePlan: (id: string) => void;
  onDuplicatePlan?: (plan: MealPlan) => void;
  onSharePlan?: (plan: MealPlan) => void;
}

const ManagePlansTab: React.FC<ManagePlansTabProps> = ({
  plans,
  activePlanId,
  onViewPlan,
  onDeletePlan,
  onDuplicatePlan,
  onSharePlan
}) => {
  // تنسيق التاريخ بشكل مختصر
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('ar-SA')} - ${end.toLocaleDateString('ar-SA')}`;
  };

  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <Card key={plan.id} className="bg-white/10 border border-white/20 hover:bg-white/15 transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  {activePlanId === plan.id && (
                    <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                      نشط
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-white/70">
                  {formatDateRange(plan.startDate, plan.endDate)}
                </p>
                <div className="flex items-center mt-1 text-sm text-white/70">
                  <span className="flex items-center">
                    {plan.meals.length} وجبة
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/30 text-white hover:bg-white/20 h-8 w-8"
                      onClick={() => onViewPlan(plan)}
                      disabled={activePlanId === plan.id}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>عرض الخطة</p>
                  </TooltipContent>
                </Tooltip>
                
                {onDuplicatePlan && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-white/30 text-white hover:bg-white/20 h-8 w-8"
                        onClick={() => onDuplicatePlan(plan)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>نسخ الخطة</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                
                {onSharePlan && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-white/30 text-white hover:bg-white/20 h-8 w-8"
                        onClick={() => onSharePlan(plan)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>مشاركة الخطة</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/30 text-white hover:bg-red-500/30 hover:border-red-500/50 h-8 w-8"
                      onClick={() => onDeletePlan(plan.id)}
                      disabled={plans.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف الخطة</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManagePlansTab;
