import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFormData, type RootState } from "@/store/formStore";

interface ComplianceFormData {
  gstin: string;
  fssai: string;
  pan: string;
}

interface ComplianceStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ComplianceStep = ({ onNext, onPrevious }: ComplianceStepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ComplianceFormData>({
    defaultValues: {
      gstin: formData.gstin,
      fssai: formData.fssai,
      pan: formData.pan,
    }
  });

  const onSubmit = (data: ComplianceFormData) => {
    dispatch(updateFormData(data));
    onNext();
  };

  const isFnB = formData.brandCategory === "F&B";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Compliance Documents</CardTitle>
        <p className="text-muted-foreground">Provide your business compliance information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN *</Label>
              <Input
                id="gstin"
                {...register("gstin", { 
                  required: "GSTIN is required",
                  pattern: {
                    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Please enter a valid GSTIN"
                  }
                })}
                placeholder="Enter 15-digit GSTIN"
                className="font-mono"
              />
              {errors.gstin && (
                <p className="text-sm text-destructive">{errors.gstin.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: 22AAAAA0000A1Z5
              </p>
            </div>

            {isFnB && (
              <div className="space-y-2">
                <Label htmlFor="fssai">FSSAI License Number *</Label>
                <Input
                  id="fssai"
                  {...register("fssai", { 
                    required: isFnB ? "FSSAI is required for F&B businesses" : false,
                    pattern: {
                      value: /^[0-9]{14}$/,
                      message: "Please enter a valid 14-digit FSSAI number"
                    }
                  })}
                  placeholder="Enter 14-digit FSSAI license number"
                  className="font-mono"
                />
                {errors.fssai && (
                  <p className="text-sm text-destructive">{errors.fssai.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Required for Food & Beverage businesses
                </p>
              </div>
            )}

            {!isFnB && (
              <div className="space-y-2">
                <Label htmlFor="fssai">FSSAI License Number</Label>
                <Input
                  id="fssai"
                  {...register("fssai")}
                  placeholder="Enter FSSAI license number (if applicable)"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Only required for Food & Beverage businesses
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number *</Label>
              <Input
                id="pan"
                {...register("pan", { 
                  required: "PAN number is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Please enter a valid PAN number"
                  }
                })}
                placeholder="Enter PAN number"
                className="font-mono uppercase"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.pan && (
                <p className="text-sm text-destructive">{errors.pan.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: AAAAA9999A (Business/Proprietor PAN)
              </p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Important Notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All documents should be valid and up-to-date</li>
              <li>• GSTIN is mandatory for all businesses with turnover &gt; ₹20 lakhs</li>
              <li>• FSSAI is mandatory for all Food & Beverage businesses</li>
              <li>• PAN can be business PAN or proprietor PAN</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button type="submit" className="px-8">
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplianceStep;