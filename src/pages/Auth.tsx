import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ChevronLeft, Building2, Mail, Phone, MapPin, FileUp } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"consumer" | "business">("consumer");
  const [showRegistration, setShowRegistration] = useState(false);
  const [certificate, setCertificate] = useState<File | null>(null);
  
  const businessForm = useForm({
    defaultValues: {
      businessName: "",
      businessType: "",
      email: "",
      phone: "",
      address: "",
      description: ""
    }
  });

  const handleSignIn = () => {
    // For demo purposes, set the user as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    
    toast({
      title: "Welcome back!",
      description: "You've been successfully signed in.",
    });
    
    if (userType === "business") {
      navigate('/business-dashboard');
    } else {
      navigate('/');
    }
  };
  
  const handleRegisterBusiness = () => {
    setShowRegistration(true);
  };

  const handleRegistrationSubmit = (data: any) => {
    // For demo purposes, set the user as logged in as a business
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", "business");
    
    // Store certificate information if uploaded
    const businessData = {
      ...data,
      certificateUploaded: certificate ? true : false,
      certificateName: certificate ? certificate.name : null
    };
    
    // Store business data for future use
    localStorage.setItem("businessData", JSON.stringify(businessData));
    
    toast({
      title: "Business registered!",
      description: "Your business account has been successfully created.",
    });
    
    navigate('/business-dashboard');
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
      toast({
        title: "Certificate uploaded",
        description: `File "${e.target.files[0].name}" has been selected.`,
      });
    }
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-4 py-6">
        <button 
          className="flex items-center text-[#472D21] mb-6" 
          onClick={() => setShowRegistration(false)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold text-[#472D21] mb-2">Register Your Business</h1>
          <p className="text-gray-600 mb-6">Join Berry Back and reduce food waste while connecting with new customers.</p>
          
          <Form {...businessForm}>
            <form onSubmit={businessForm.handleSubmit(handleRegistrationSubmit)} className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-[#472D21]">Business Name</Label>
                    <div className="relative">
                      <Input
                        id="businessName"
                        placeholder="e.g., Fresh Harvest Café"
                        {...businessForm.register("businessName", { required: true })}
                        className="pl-10 border-[#472D21]/30 focus:border-[#472D21]"
                      />
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-[#472D21]">Business Type</Label>
                    <Input
                      id="businessType"
                      placeholder="e.g., Restaurant, Bakery, Grocery"
                      {...businessForm.register("businessType", { required: true })}
                      className="border-[#472D21]/30 focus:border-[#472D21]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#472D21]">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...businessForm.register("email", { required: true })}
                        className="pl-10 border-[#472D21]/30 focus:border-[#472D21]"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#472D21]">Phone Number</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        {...businessForm.register("phone", { required: true })}
                        className="pl-10 border-[#472D21]/30 focus:border-[#472D21]"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#472D21]">Business Address</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      placeholder="123 Main St, City, Country"
                      {...businessForm.register("address", { required: true })}
                      className="pl-10 border-[#472D21]/30 focus:border-[#472D21]"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificate" className="text-[#472D21]">Food Safety Certificate</Label>
                  <div className="border-2 border-dashed border-[#472D21]/30 rounded-md p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <FileUp className="h-10 w-10 text-[#472D21]/50" />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Upload your food safety certificate (required)</p>
                    
                    <div className="relative">
                      <Input
                        id="certificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleCertificateChange}
                        required
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        className="border-[#472D21] text-[#472D21]"
                      >
                        Select Certificate
                      </Button>
                    </div>
                    
                    {certificate && (
                      <p className="mt-3 text-sm text-green-600">
                        {certificate.name} ({Math.round(certificate.size / 1024)} KB)
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#472D21]">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business and the type of food items you typically sell..."
                    {...businessForm.register("description")}
                    className="min-h-[100px] border-[#472D21]/30 focus:border-[#472D21]"
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="bg-[#472D21] hover:bg-[#5A392C] w-full text-white py-6 text-lg mt-4"
                disabled={!certificate}
              >
                Complete Registration
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-xs w-full">
        <div className="text-center mb-10">
          <div className="h-32 w-32 mx-auto mb-6">
            <svg 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path 
                d="M35 45C35 36.7 41.7 30 50 30C58.3 30 65 36.7 65 45C65 53.3 58.3 60 50 60C41.7 60 35 53.3 35 45Z" 
                stroke="#472D21" 
                strokeWidth="3"
              />
              <path 
                d="M63 50C63 50 68 60 75 60C82 60 85 52 85 52" 
                stroke="#472D21" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M50 60C60 60 65 70 65 80C65 80 60 76 50 76C40 76 35 80 35 80C35 70 40 60 50 60Z" 
                stroke="#472D21" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#472D21] mb-3">
            Berry Back
          </h1>
          <p className="text-lg text-[#472D21] px-6">
            Why wait in line when you can have your discounted food ready and waiting for you?
          </p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-medium text-[#472D21] mb-3 text-center">I am a...</p>
          <RadioGroup 
            defaultValue="consumer" 
            value={userType} 
            onValueChange={(value) => setUserType(value as "consumer" | "business")}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 border-2 border-[#472D21]/30 rounded-md p-3 hover:bg-[#472D21]/5 transition-colors">
              <RadioGroupItem value="consumer" id="consumer" className="text-[#472D21]" />
              <Label htmlFor="consumer" className="cursor-pointer flex-1">Customer</Label>
            </div>
            <div className="flex items-center space-x-2 border-2 border-[#472D21]/30 rounded-md p-3 hover:bg-[#472D21]/5 transition-colors">
              <RadioGroupItem value="business" id="business" className="text-[#472D21]" />
              <Label htmlFor="business" className="cursor-pointer flex-1">Business</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator className="my-6 bg-[#472D21]/20" />
        
        <div className="space-y-4">
          <Button 
            onClick={handleSignIn}
            className="bg-[#472D21] hover:bg-[#5A392C] w-full text-white py-6 text-lg"
          >
            Sign in
          </Button>
          {userType === "business" && (
            <Button 
              onClick={handleRegisterBusiness}
              variant="outline"
              className="w-full border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 py-6 text-lg"
            >
              Register Business
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
