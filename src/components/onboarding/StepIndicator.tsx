import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

const StepIndicator = ({ steps, currentStep, completedSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border z-0">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <div
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                index < currentStep || completedSteps.includes(index)
                  ? "bg-primary border-primary text-primary-foreground"
                  : index === currentStep
                  ? "border-primary bg-background text-primary"
                  : "border-border bg-background text-muted-foreground"
              )}
            >
              {index < currentStep || completedSteps.includes(index) ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span 
              className={cn(
                "text-xs mt-2 text-center max-w-20 transition-colors",
                index === currentStep ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;