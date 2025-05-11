
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Form schema with validation
const formSchema = z.object({
  admissionNumber: z.string().min(1, "Admission number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
  danceTypes: z.array(z.string()).min(1, "At least one dance type is required"),
  otherDanceType: z.string().optional(),
  batchNo: z.coerce.number().min(1, "Batch number is required"),
  colony: z.string().optional(),
  area: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.coerce.number().optional(),
  parentName: z.string().optional(),
  mobileNumber: z.object({
    countryCode: z.string().default("+91"),
    number: z.string().min(10, "Mobile number must be at least 10 digits"),
  }),
  designation: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  classFee: z.coerce.number().min(1, "Class fee is required"),
  costumeFee: z.coerce.number().min(1, "Costume fee is required"),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const danceTypeOptions = [
  { id: "western", label: "WESTERN" },
  { id: "classical", label: "CLASSICAL" },
  { id: "others", label: "Others" },
];

const AddStudent: React.FC = () => {
  const [showOtherDanceType, setShowOtherDanceType] = useState(false);
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissionNumber: "",
      firstName: "",
      lastName: "",
      danceTypes: [],
      batchNo: 1,
      mobileNumber: {
        countryCode: "+91",
        number: "",
      },
      classFee: 0,
      costumeFee: 0,
      isActive: true,
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    console.log("Form data:", data);
    
    // Handle "Others" dance type
    if (showOtherDanceType && data.otherDanceType) {
      data.danceTypes = [...data.danceTypes.filter(type => type !== "others"), data.otherDanceType];
    }
    
    // This would connect to the backend API
    toast({
      title: "Student Added",
      description: `Successfully added ${data.firstName} ${data.lastName}`,
    });

    // Reset form
    form.reset();
    setShowOtherDanceType(false);
  };

  // Handle dance type checkbox changes
  const handleDanceTypeChange = (checked: boolean, value: string) => {
    if (value === "others") {
      setShowOtherDanceType(checked);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Student</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="p-6 border rounded-lg space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="admissionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Number*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. BB2023001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1940-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender*</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dance Information Section */}
          <div className="p-6 border rounded-lg space-y-6">
            <h2 className="text-xl font-semibold">Dance Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="danceTypes"
                render={() => (
                  <FormItem>
                    <FormLabel>Dance Types*</FormLabel>
                    <div className="mt-2 space-y-2">
                      {danceTypeOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="danceTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, option.id]
                                        : field.value?.filter(
                                            (value) => value !== option.id
                                          );
                                      field.onChange(updatedValue);
                                      handleDanceTypeChange(!!checked, option.id);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    
                    {showOtherDanceType && (
                      <FormField
                        control={form.control}
                        name="otherDanceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="mt-2"
                                placeholder="Specify other dance type"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="batchNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Number*</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Information Section */}
          <div className="p-6 border rounded-lg space-y-6">
            <h2 className="text-xl font-semibold">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="colony"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colony</FormLabel>
                    <FormControl>
                      <Input placeholder="Colony" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="p-6 border rounded-lg space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Parent name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="mobileNumber.countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber.number"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Mobile Number*</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Fee Information Section */}
          <div className="p-6 border rounded-lg space-y-6">
            <h2 className="text-xl font-semibold">Fee Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="classFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Fee (₹)*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="costumeFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costume Fee (₹)*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Active</FormLabel>
                      <FormDescription>
                        Mark as active student
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-1 h-4 w-4" /> Add Student
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddStudent;
