
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Share2, Calendar } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';

interface PlanHeaderProps {
  planName: string;
  onPlanNameChange: (name: string) => void;
  startDate: string;
  endDate: string;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  onShareClick?: () => void;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({
  planName,
  onPlanNameChange,
  startDate,
  endDate,
  isEditing,
  onEditClick,
  onSaveClick,
  onShareClick
}) => {
  // تنسيق إضافي للتاريخ لعرض الشهر
  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // الحصول على اسم الشهر بالعربية
    const getArabicMonth = (date: Date) => {
      const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ];
      return months[date.getMonth()];
    };

    // إذا كان الشهر نفسه
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} - ${end.getDate()} ${getArabicMonth(start)} ${start.getFullYear()}`;
    }
    
    // إذا كان الشهر مختلف
    return `${start.getDate()} ${getArabicMonth(start)} - ${end.getDate()} ${getArabicMonth(end)} ${start.getFullYear()}`;
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={planName}
              onChange={(e) => onPlanNameChange(e.target.value)}
              className="bg-white/30 border-white/30 text-white"
            />
            <Button
              variant="outline"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={onSaveClick}
            >
              حفظ
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{planName}</h2>
            <Button
              variant="ghost"
              className="p-1 h-auto text-white/70 hover:text-white hover:bg-white/10"
              onClick={onEditClick}
            >
              تعديل
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center text-white text-sm">
          <Calendar className="h-4 w-4 mr-2 opacity-70" />
          {formatDateRange()}
        </div>
        
        {onShareClick && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={onShareClick}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>مشاركة الخطة</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default PlanHeader;
