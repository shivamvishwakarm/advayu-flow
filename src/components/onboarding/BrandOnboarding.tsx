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
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Onboarding Complete!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for submitting your brand information. Our team will review your application and contact you within 24 hours.
            </p>
            
            <div className="bg-muted/50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-medium mb-2">Application Summary:</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Brand:</strong> {formData.brandName}</p>
                <p><strong>Category:</strong> {formData.brandCategory}</p>
                <p><strong>Outlets:</strong> {formData.outlets.length} outlet(s)</p>
                <p><strong>Contact:</strong> {formData.contactEmail}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Reference ID: <span className="font-mono">ADV-{Date.now().toString().slice(-8)}</span>
              </p>
              <Button onClick={handleStartAgain} variant="outline">
                Submit Another Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Brand Onboarding</h1>
        <p className="text-muted-foreground">Complete your registration to get started with Advayu</p>
      </div>

      <StepIndicator 
        steps={steps} 
        currentStep={currentStep} 
        completedSteps={completedSteps} 
      />

      <div className="mt-8">
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