import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFormData, type RootState } from "@/store/formStore";

interface ConsentFormData {
  posBillsPermission: boolean;
  discountPermission: boolean;
  qrDisplayPermission: boolean;
  termsAgreed: boolean;
}

interface ConsentStepProps {
  onPrevious: () => void;
  onSubmit: () => void;
}

const ConsentStep = ({ onPrevious, onSubmit }: ConsentStepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<ConsentFormData>({
    defaultValues: {
      posBillsPermission: formData.posBillsPermission,
      discountPermission: formData.discountPermission,
      qrDisplayPermission: formData.qrDisplayPermission,
      termsAgreed: formData.termsAgreed,
    }
  });

  const handleConsentChange = (field: keyof ConsentFormData, value: boolean) => {
    setValue(field, value);
    dispatch(updateFormData({ [field]: value }));
  };

  const handleFormSubmit = (data: ConsentFormData) => {
    dispatch(updateFormData(data));
    onSubmit();
  };

  const allPermissionsGranted = watch("posBillsPermission") && 
                              watch("discountPermission") && 
                              watch("qrDisplayPermission") && 
                              watch("termsAgreed");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Permissions & Consent</CardTitle>
        <p className="text-muted-foreground">Grant necessary permissions to complete your onboarding</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">System Permissions</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="posBillsPermission"
                    checked={watch("posBillsPermission")}
                    onCheckedChange={(checked) => 
                      handleConsentChange("posBillsPermission", checked as boolean)
                    }
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="posBillsPermission" className="text-sm font-medium cursor-pointer">
                      Permission to fetch bills from POS
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow Advayu to automatically fetch bill data from your POS system for analytics and reporting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="discountPermission"
                    checked={watch("discountPermission")}
                    onCheckedChange={(checked) => 
                      handleConsentChange("discountPermission", checked as boolean)
                    }
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="discountPermission" className="text-sm font-medium cursor-pointer">
                      Permission to apply discounts / insert free items in bills
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow Advayu to automatically apply promotional discounts and add free items to customer bills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                  <Checkbox
                    id="qrDisplayPermission"
                    checked={watch("qrDisplayPermission")}
                    onCheckedChange={(checked) => 
                      handleConsentChange("qrDisplayPermission", checked as boolean)
                    }
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="qrDisplayPermission" className="text-sm font-medium cursor-pointer">
                      Permission to display fintech-sponsored QR via slotting machine
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow Advayu to display sponsored payment QR codes through your existing hardware for additional revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Terms & Policies</h3>
              
              <div className="flex items-start space-x-3 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                <Checkbox
                  id="termsAgreed"
                  checked={watch("termsAgreed")}
                  onCheckedChange={(checked) => 
                    handleConsentChange("termsAgreed", checked as boolean)
                  }
                />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="termsAgreed" className="text-sm font-medium cursor-pointer">
                    I agree to Advayu's Terms & Policies *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>,{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>, and{" "}
                    <a href="#" className="text-primary hover:underline">Data Processing Agreement</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {allPermissionsGranted && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">All permissions granted!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                You're ready to complete your onboarding and start using Advayu.
              </p>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your application will be reviewed by our team</li>
              <li>• You'll receive a confirmation email within 24 hours</li>
              <li>• Our technical team will help you integrate with your POS</li>
              <li>• You can start using Advayu's features once integration is complete</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button 
              type="submit" 
              className="px-8"
              disabled={!allPermissionsGranted}
            >
              Complete Onboarding
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsentStep;