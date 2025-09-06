import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, Upload, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { updateFormData, addOutlet, removeOutlet, updateOutlet, type RootState, type OutletData } from "@/store/formStore";

interface OutletsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const posProviders = [
  "Petpooja", "POSist", "DotPe", "Swiggy POS", "Zomato POS", "Square", "Others"
];

const OutletsStep = ({ onNext, onPrevious }: OutletsStepProps) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  
  const { control, handleSubmit, register, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      outlets: formData.outlets
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "outlets"
  });

  const handleAddOutlet = () => {
    dispatch(addOutlet());
    append({
      name: '',
      address: '',
      posProvider: '',
      posOutletId: '',
      managerName: '',
      managerPhone: '',
      managerEmail: '',
    });
  };

  const handleRemoveOutlet = (index: number) => {
    if (fields.length > 1) {
      dispatch(removeOutlet(index));
      remove(index);
    }
  };

  const handleMenuUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updateOutlet({ index, data: { menuFile: file } }));
    }
  };

  const onSubmit = (data: { outlets: OutletData[] }) => {
    dispatch(updateFormData({ outlets: data.outlets }));
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Outlet Information</CardTitle>
        <p className="text-muted-foreground">Add details for each of your outlets</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="border-border">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Outlet {index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveOutlet(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`outlets.${index}.name`}>Outlet Name *</Label>
                    <Input
                      {...register(`outlets.${index}.name` as const, { 
                        required: "Outlet name is required" 
                      })}
                      placeholder="Enter outlet name"
                    />
                    {errors.outlets?.[index]?.name && (
                      <p className="text-sm text-destructive">
                        {errors.outlets[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`outlets.${index}.posProvider`}>POS Provider *</Label>
                    <Select
                      value={watch(`outlets.${index}.posProvider`)}
                      onValueChange={(value) => setValue(`outlets.${index}.posProvider`, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select POS provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {posProviders.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`outlets.${index}.address`}>Outlet Address *</Label>
                  <Textarea
                    {...register(`outlets.${index}.address` as const, { 
                      required: "Outlet address is required" 
                    })}
                    placeholder="Enter complete outlet address"
                    rows={3}
                  />
                  {errors.outlets?.[index]?.address && (
                    <p className="text-sm text-destructive">
                      {errors.outlets[index]?.address?.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`outlets.${index}.posOutletId`}>POS Outlet ID / API Key</Label>
                    <Input
                      {...register(`outlets.${index}.posOutletId` as const)}
                      placeholder="Enter POS outlet ID or API key"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Geo-location</Label>
                    <Button type="button" variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Pin Location on Map
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Menu Upload</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <div className="space-y-1 text-center">
                        <p className="text-sm text-muted-foreground">
                          Upload menu (CSV, Excel, or Image)
                        </p>
                        <Input
                          type="file"
                          accept=".csv,.xlsx,.xls,.jpg,.jpeg,.png"
                          onChange={(e) => handleMenuUpload(index, e)}
                          className="hidden"
                          id={`menu-upload-${index}`}
                        />
                        <Label htmlFor={`menu-upload-${index}`} className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </Label>
                        {formData.outlets[index]?.menuFile && (
                          <p className="text-sm text-primary">
                            {formData.outlets[index]?.menuFile?.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Outlet Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`outlets.${index}.managerName`}>Manager Name *</Label>
                      <Input
                        {...register(`outlets.${index}.managerName` as const, { 
                          required: "Manager name is required" 
                        })}
                        placeholder="Enter manager name"
                      />
                      {errors.outlets?.[index]?.managerName && (
                        <p className="text-sm text-destructive">
                          {errors.outlets[index]?.managerName?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`outlets.${index}.managerPhone`}>Manager Phone *</Label>
                      <Input
                        type="tel"
                        {...register(`outlets.${index}.managerPhone` as const, { 
                          required: "Manager phone is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Please enter a valid phone number"
                          }
                        })}
                        placeholder="10-digit mobile number"
                      />
                      {errors.outlets?.[index]?.managerPhone && (
                        <p className="text-sm text-destructive">
                          {errors.outlets[index]?.managerPhone?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`outlets.${index}.managerEmail`}>Manager Email *</Label>
                      <Input
                        type="email"
                        {...register(`outlets.${index}.managerEmail` as const, { 
                          required: "Manager email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email"
                          }
                        })}
                        placeholder="Enter email address"
                      />
                      {errors.outlets?.[index]?.managerEmail && (
                        <p className="text-sm text-destructive">
                          {errors.outlets[index]?.managerEmail?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddOutlet}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Outlet
          </Button>

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

export default OutletsStep;