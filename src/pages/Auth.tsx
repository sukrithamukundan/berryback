
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"consumer" | "business">("consumer");
  
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
    // For demo purposes, set the user as logged in as a business
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", "business");
    
    toast({
      title: "Business registered!",
      description: "Your business account has been successfully created.",
    });
    
    navigate('/business-dashboard');
  };

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
