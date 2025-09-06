import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import StepIndicator from "./StepIndicator";
import BrandInformationStep from "./steps/BrandInformationStep";
import OutletsStep from "./steps/OutletsStep";
import ComplianceStep from "./steps/ComplianceStep";
import BankingStep from "./steps/BankingStep";
import ConsentStep from "./steps/ConsentStep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setCurrentStep, addCompletedStep, type RootState } from "@/store/formStore";

const steps = [
  "Brand Info",
  "Outlets",
  "Compliance",
  "Banking",
  "Consent"
];

const BrandOnboarding = () => {
  const dispatch = useDispatch();
  const { currentStep, completedSteps, formData } = useSelector((state: RootState) => state.form);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    dispatch(addCompletedStep(currentStep));
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleSubmit = () => {
    dispatch(addCompletedStep(currentStep));
    setIsSubmitted(true);
    toast({
      title: "Onboarding Complete!",
      description: "Your application has been submitted successfully. We'll review it and get back to you within 24 hours.",
    });
  };

  const handleStartAgain = () => {
    setIsSubmitted(false);
    dispatch(setCurrentStep(0));
  };

  if (isSubmitted) {
    return (
      <div className="w-full animate-fade-in">
        <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-brand">
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">Onboarding Complete!</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for submitting your brand information. Our team will review your application and contact you within 24 hours.
            </p>
            
            <div className="bg-brand-subtle/50 border border-brand-accent/30 p-6 rounded-xl mb-8 text-left">
              <h3 className="font-semibold mb-4 text-gray-900">Application Summary:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><span className="font-medium text-gray-700">Brand:</span> <span className="text-gray-900">{formData.brandName}</span></p>
                  <p><span className="font-medium text-gray-700">Category:</span> <span className="text-gray-900">{formData.brandCategory}</span></p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium text-gray-700">Outlets:</span> <span className="text-gray-900">{formData.outlets.length} outlet(s)</span></p>
                  <p><span className="font-medium text-gray-700">Contact:</span> <span className="text-gray-900">{formData.contactEmail}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Reference ID: <span className="font-mono font-semibold text-brand">ADV-{Date.now().toString().slice(-8)}</span>
                </p>
              </div>
              <Button onClick={handleStartAgain} variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                Submit Another Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 shadow-brand">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Brand Onboarding</h1>
            <p className="text-gray-600">Complete your registration to get started with Advayu</p>
          </div>
        </div>
        
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
        />
      </div>

      {/* Form Content */}
      <div className="animate-scale-in">
        {currentStep === 0 && <BrandInformationStep onNext={handleNext} />}
        {currentStep === 1 && <OutletsStep onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 2 && <ComplianceStep onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 3 && <BankingStep onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 4 && <ConsentStep onPrevious={handlePrevious} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default BrandOnboarding;