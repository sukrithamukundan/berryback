
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { ArrowLeft, Building, Mail, User, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters."),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter your business address."),
  businessType: z.string().min(1, "Please select a business type."),
});

type FormData = z.infer<typeof formSchema>;

const RegisterCompany = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      businessType: "restaurant",
    },
  });

  const onSubmit = (data: FormData) => {
    // For demo purposes, simulate a successful registration
    console.log("Business registration data:", data);
    
    // Generate a unique business ID
    const businessId = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Set the user as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", "business");
    localStorage.setItem("businessId", businessId);
    
    // Store the business information
    localStorage.setItem("businessName", data.businessName);
    localStorage.setItem("businessType", data.businessType);
    
    // Initialize empty surplus items array for this business
    const allSurplusItems = JSON.parse(localStorage.getItem("allSurplusItems") || "{}");
    allSurplusItems[businessId] = [];
    localStorage.setItem("allSurplusItems", JSON.stringify(allSurplusItems));
    
    // Set a flag for new registration to show welcome message
    sessionStorage.setItem("newRegistration", "true");
    
    // Display success message
    toast({
      title: "Registration successful!",
      description: "Your business account has been created.",
    });
    
    // Redirect to business listings
    navigate('/business-listings');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-white" 
            onClick={() => navigate('/auth')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-xl font-bold">Register Business</div>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-20 w-20 bg-[#472D21]/10 flex items-center justify-center rounded-full">
            <Building className="h-10 w-10 text-[#472D21]" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#472D21] mb-6">
          Join BerryBack as a Business Partner
        </h1>
        
        <p className="text-center mb-8 text-gray-600">
          Help reduce food waste while creating additional revenue streams for your business.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Your Business Name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Full Name" {...field} />
                    </div>
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" type="email" placeholder="your@email.com" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="123 Main St, City, State" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="restaurant">Restaurant</option>
                      <option value="cafe">Café</option>
                      <option value="bakery">Bakery</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="catering">Catering</option>
                      <option value="hotel">Hotel</option>
                      <option value="confectionery">Confectionery</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-[#472D21] hover:bg-[#5A392C] text-white py-6 text-lg mt-4"
            >
              Register Business
            </Button>
          </form>
        </Form>
        
        <p className="text-center mt-8 text-sm text-gray-500">
          Already have a business account?{" "}
          <Button variant="link" className="p-0 text-[#472D21]" onClick={() => navigate('/auth')}>
            Sign in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterCompany;
