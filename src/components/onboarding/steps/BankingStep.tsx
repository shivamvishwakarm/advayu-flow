import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFormData, type RootState } from "@/store/formStore";

interface BankingFormData {
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

interface BankingStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const BankingStep = ({ onNext, onPrevious }: BankingStepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BankingFormData>({
    defaultValues: {
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      upiId: formData.upiId,
    }
  });

  const handleChequeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updateFormData({ cancelledCheque: file }));
    }
  };

  const onSubmit = (data: BankingFormData) => {
    dispatch(updateFormData(data));
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Banking Details</CardTitle>
        <p className="text-muted-foreground">Provide your business banking information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Bank Account Number *</Label>
              <Input
                id="accountNumber"
                {...register("accountNumber", { 
                  required: "Bank account number is required",
                  pattern: {
                    value: /^[0-9]{9,18}$/,
                    message: "Please enter a valid account number (9-18 digits)"
                  }
                })}
                placeholder="Enter bank account number"
                className="font-mono"
              />
              {errors.accountNumber && (
                <p className="text-sm text-destructive">{errors.accountNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code *</Label>
              <Input
                id="ifscCode"
                {...register("ifscCode", { 
                  required: "IFSC code is required",
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: "Please enter a valid IFSC code"
                  }
                })}
                placeholder="Enter IFSC code"
                className="font-mono uppercase"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.ifscCode && (
                <p className="text-sm text-destructive">{errors.ifscCode.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: ABCD0123456 (4 letters + 0 + 6 alphanumeric)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID *</Label>
              <Input
                id="upiId"
                {...register("upiId", { 
                  required: "UPI ID is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/,
                    message: "Please enter a valid UPI ID"
                  }
                })}
                placeholder="Enter UPI ID (e.g., business@paytm)"
                className="font-mono"
              />
              {errors.upiId && (
                <p className="text-sm text-destructive">{errors.upiId.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: yourname@bankname or phone@bankname
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancelledCheque">Cancelled Cheque (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload cancelled cheque for verification
                </p>
                <Input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleChequeUpload}
                  className="hidden"
                  id="cheque-upload"
                />
                <Label htmlFor="cheque-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </Label>
                {formData.cancelledCheque && (
                  <p className="text-sm text-primary">{formData.cancelledCheque.name}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended for faster verification process
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Security Information:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your banking details are encrypted and stored securely</li>
              <li>• This information is used only for payment processing</li>
              <li>• We never store your complete account details in plain text</li>
              <li>• All transactions are processed through secure banking channels</li>
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

export default BankingStep;