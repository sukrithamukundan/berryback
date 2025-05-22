
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User } from "lucide-react";

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
    
    // Explicitly route to the correct dashboard
    if (userType === "business") {
      navigate('/business-dashboard');
    } else {
      navigate('/');
    }
  };
  
  const handleCreateAccount = () => {
    // For demo purposes, set the user as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    
    toast({
      title: "Account created!",
      description: "Your account has been successfully created.",
    });
    
    // Explicitly route to the correct dashboard
    if (userType === "business") {
      navigate('/business-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
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
          <p className="text-lg text-[#472D21] px-6 mb-6">
            Why wait in line when you can have your discounted food ready and waiting for you?
          </p>
          
          <Tabs defaultValue="consumer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger 
                value="consumer" 
                onClick={() => setUserType("consumer")}
              >
                Customer
              </TabsTrigger>
              <TabsTrigger 
                value="business" 
                onClick={() => setUserType("business")}
              >
                Business
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="consumer">
              <div className="space-y-4">
                <Button 
                  onClick={handleSignIn}
                  className="bg-[#472D21] hover:bg-[#5A392C] w-full text-white py-6 text-lg"
                >
                  Sign in as Customer
                </Button>
                <Button 
                  onClick={handleCreateAccount}
                  variant="outline"
                  className="w-full border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 py-6 text-lg"
                >
                  Create Customer Account
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="business">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="your@email.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Button 
                  onClick={handleSignIn}
                  className="bg-[#472D21] hover:bg-[#5A392C] w-full text-white py-6 text-lg"
                >
                  Sign in as Business
                </Button>
                <Button 
                  onClick={handleCreateAccount}
                  variant="outline"
                  className="w-full border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 py-6 text-lg"
                >
                  Register Business
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
