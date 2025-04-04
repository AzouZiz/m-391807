
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PlanHeaderProps {
  planName: string;
  onPlanNameChange: (name: string) => void;
  startDate: string;
  endDate: string;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({
  planName,
  onPlanNameChange,
  startDate,
  endDate,
  isEditing,
  onEditClick,
  onSaveClick
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
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
      
      <div className="text-white text-sm">
        {new Date(startDate).toLocaleDateString('ar-SA')} - {new Date(endDate).toLocaleDateString('ar-SA')}
      </div>
    </div>
  );
};

export default PlanHeader;
