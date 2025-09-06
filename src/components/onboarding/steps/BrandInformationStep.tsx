import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFormData, type RootState } from "@/store/formStore";

interface BrandFormData {
  brandName: string;
  brandCategory: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface BrandInformationStepProps {
  onNext: () => void;
}

const brandCategories = [
  "F&B", "Retail", "Salon & Spa", "Healthcare", "Automotive", 
  "Education", "Fitness", "Electronics", "Fashion", "Others"
];

const BrandInformationStep = ({ onNext }: BrandInformationStepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BrandFormData>({
    defaultValues: {
      brandName: formData.brandName,
      brandCategory: formData.brandCategory,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
    }
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updateFormData({ logoFile: file }));
    }
  };

  const onSubmit = (data: BrandFormData) => {
    dispatch(updateFormData(data));
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Brand Information</CardTitle>
        <p className="text-muted-foreground">Tell us about your brand</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                id="brandName"
                {...register("brandName", { required: "Brand name is required" })}
                placeholder="Enter your brand name"
              />
              {errors.brandName && (
                <p className="text-sm text-destructive">{errors.brandName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandCategory">Brand Category *</Label>
              <Select
                value={watch("brandCategory")}
                onValueChange={(value) => setValue("brandCategory", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {brandCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!watch("brandCategory") && (
                <p className="text-sm text-destructive">Please select a category</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Brand Logo</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload your brand logo (PNG, JPG, SVG)
                </p>
                <Input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </Label>
                {formData.logoFile && (
                  <p className="text-sm text-primary">{formData.logoFile.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Person</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  {...register("contactName", { required: "Contact name is required" })}
                  placeholder="Enter full name"
                />
                {errors.contactName && (
                  <p className="text-sm text-destructive">{errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  {...register("contactPhone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  placeholder="10-digit mobile number"
                />
                {errors.contactPhone && (
                  <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email"
                    }
                  })}
                  placeholder="Enter email address"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-8">
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandInformationStep;