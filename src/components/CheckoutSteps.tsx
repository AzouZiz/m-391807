
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export type CheckoutStep = 'cart' | 'information' | 'shipping' | 'payment' | 'confirmation';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps: { id: CheckoutStep; label: string }[] = [
  { id: 'cart', label: 'Cart' },
  { id: 'information', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <div className="py-6">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => {
          const currentIndex = getCurrentStepIndex();
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200",
                    isCompleted ? "bg-primary text-white" : 
                    isCurrent ? "bg-primary/10 text-primary border border-primary/30" : 
                    "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div 
                  className={cn(
                    "mt-2 text-xs transition-colors",
                    isCurrent ? "text-primary font-medium" : 
                    isCompleted ? "text-foreground" :
                    "text-muted-foreground"
                  )}
                >
                  {step.label}
                </div>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div 
                    className={cn(
                      "h-0.5 transition-colors",
                      index < currentIndex ? "bg-primary" : "bg-secondary"
                    )} 
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile version */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const currentIndex = getCurrentStepIndex();
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div 
                key={step.id}
                className={cn(
                  "rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200",
                  isCompleted ? "bg-primary text-white" : 
                  isCurrent ? "bg-primary/10 text-primary border border-primary/30" : 
                  "bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-sm font-medium text-primary text-center">
          {steps[getCurrentStepIndex()].label}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
