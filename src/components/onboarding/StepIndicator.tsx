import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

const StepIndicator = ({ steps, currentStep, completedSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0">
          <div 
            className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div
              className={cn(
                "w-10 h-10 rounded-full border-3 flex items-center justify-center transition-all duration-300 shadow-lg",
                index < currentStep || completedSteps.includes(index)
                  ? "bg-gradient-to-br from-brand to-brand-light border-brand text-white scale-110"
                  : index === currentStep
                  ? "border-brand bg-white text-brand scale-105 ring-4 ring-brand/20"
                  : "border-gray-300 bg-white text-gray-400"
              )}
            >
              {index < currentStep || completedSteps.includes(index) ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <span 
              className={cn(
                "text-xs mt-3 text-center max-w-20 transition-all duration-300 font-medium",
                index === currentStep 
                  ? "text-brand scale-105" 
                  : index < currentStep || completedSteps.includes(index)
                  ? "text-gray-700"
                  : "text-gray-500"
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