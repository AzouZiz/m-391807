
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock, Package, Truck, Home } from 'lucide-react';

export type OrderStatus = 'processing' | 'shipped' | 'outForDelivery' | 'delivered';

interface TrackingStatusProps {
  status: OrderStatus;
  orderDate: Date;
  shippedDate?: Date;
  outForDeliveryDate?: Date;
  deliveredDate?: Date;
}

interface StatusStep {
  id: OrderStatus;
  label: string;
  icon: React.ReactNode;
  date?: Date;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({
  status,
  orderDate,
  shippedDate,
  outForDeliveryDate,
  deliveredDate,
}) => {
  const steps: StatusStep[] = [
    { 
      id: 'processing', 
      label: 'Order Processing', 
      icon: <Clock className="h-5 w-5" />,
      date: orderDate 
    },
    { 
      id: 'shipped', 
      label: 'Shipped', 
      icon: <Package className="h-5 w-5" />,
      date: shippedDate 
    },
    { 
      id: 'outForDelivery', 
      label: 'Out for Delivery', 
      icon: <Truck className="h-5 w-5" />,
      date: outForDeliveryDate 
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: <Home className="h-5 w-5" />,
      date: deliveredDate 
    },
  ];

  const statusIndex = steps.findIndex(step => step.id === status);

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="py-6">
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted = index <= statusIndex;
          const isCurrent = index === statusIndex;
          const isUpcoming = index > statusIndex;

          return (
            <div 
              key={step.id} 
              className={cn(
                "flex items-start transition-opacity duration-300",
                isUpcoming && "opacity-50"
              )}
            >
              {/* Status icon */}
              <div 
                className={cn(
                  "rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 mr-4",
                  isCompleted 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  isCurrent ? step.icon : <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>

              {/* Status details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div 
                    className={cn(
                      "font-medium transition-colors",
                      isCurrent ? "text-primary" : 
                      isCompleted ? "text-foreground" : 
                      "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </div>

                  {step.date && (
                    <div 
                      className={cn(
                        "text-sm",
                        isCompleted ? "text-muted-foreground" : "text-muted-foreground/60"
                      )}
                    >
                      {formatDate(step.date)}
                    </div>
                  )}
                </div>

                {/* Status description */}
                {isCurrent && (
                  <div className="text-sm text-muted-foreground mt-1 animate-fade-in">
                    {step.id === 'processing' && "Your order is being processed. We'll notify you when it ships."}
                    {step.id === 'shipped' && "Your order has been shipped. It's on the way!"}
                    {step.id === 'outForDelivery' && "Your package is out for delivery. It will arrive soon!"}
                    {step.id === 'delivered' && "Your order has been delivered. Enjoy!"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicators between steps */}
      <div className="hidden sm:block relative mt-4 left-5 h-full">
        {steps.slice(0, -1).map((step, index) => {
          const isCompleted = index < statusIndex;
          const isInProgress = index === statusIndex - 1 && index < steps.length - 2;

          return (
            <div 
              key={`connector-${index}`} 
              className="absolute top-0 bottom-0 w-0.5 bg-secondary -translate-y-14 h-12"
              style={{ top: `${index * 8}rem` }}
            >
              <div 
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-1000 ease-out",
                  isCompleted ? "h-full bg-primary" : 
                  isInProgress ? "h-1/2 bg-primary" : 
                  "h-0 bg-primary"
                )} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingStatus;
