import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
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
    <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-brand animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Brand Information</CardTitle>
        <p className="text-gray-600">Tell us about your brand to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brandName" className="text-sm font-medium text-gray-700">Brand Name *</Label>
              <Input
                id="brandName"
                {...register("brandName", { required: "Brand name is required" })}
                placeholder="Enter your brand name"
                className="h-11 border-gray-200 focus:border-brand focus:ring-brand/20"
              />
              {errors.brandName && (
                <p className="text-sm text-red-500">{errors.brandName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandCategory" className="text-sm font-medium text-gray-700">Brand Category *</Label>
              <Select
                value={watch("brandCategory")}
                onValueChange={(value) => setValue("brandCategory", value)}
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-brand focus:ring-brand/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {brandCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!watch("brandCategory") && (
                <p className="text-sm text-red-500">Please select a category</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm font-medium text-gray-700">Brand Logo</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand/50 transition-colors">
              <ArrowRight className="mx-auto h-12 w-12 text-gray-400 mb-4 rotate-90" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
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
                  <Button type="button" variant="outline" className="mt-2 border-brand text-brand hover:bg-brand hover:text-white">
                    Choose File
                  </Button>
                </Label>
                {formData.logoFile && (
                  <p className="text-sm text-brand font-medium">{formData.logoFile.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Person</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">Full Name *</Label>
                <Input
                  id="contactName"
                  {...register("contactName", { required: "Contact name is required" })}
                  placeholder="Enter full name"
                  className="h-11 border-gray-200 focus:border-brand focus:ring-brand/20"
                />
                {errors.contactName && (
                  <p className="text-sm text-red-500">{errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
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
                  className="h-11 border-gray-200 focus:border-brand focus:ring-brand/20"
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">Email Address *</Label>
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
                  className="h-11 border-gray-200 focus:border-brand focus:ring-brand/20"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-brand to-brand-light hover:from-brand-dark hover:to-brand text-white font-medium rounded-lg shadow-lg hover:shadow-brand transition-all duration-300"
            >
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandInformationStep;