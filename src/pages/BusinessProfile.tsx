
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, LogOut, MapPin, Phone, Mail, Edit, TrendingUp, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const BusinessProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [businessStats] = useState({
    rescuedItems: 478,
    co2Saved: 1250,
    foodWasteSaved: 320,
    customersSatisfied: 215
  });
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/'); // Changed from '/auth' to '/' to redirect to splash screen
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex items-center shadow-md sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-white" 
          onClick={() => navigate('/business-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold">Business Profile</div>
      </div>

      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-[#472D21]">Fresh Harvest Café</h2>
                <div className="flex items-center text-gray-500 mt-1">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="text-sm">Organic Restaurant</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">123 Green St, Trivandrum</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500"
                onClick={() => toast({ title: "Coming soon", description: "Edit profile functionality will be available soon." })}
              >
                <Edit className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center text-gray-500 mt-1">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Mail className="h-4 w-4 mr-1" />
                <span className="text-sm">contact@freshharvest.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4 text-[#472D21]">Your Impact</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <TrendingUp className="h-8 w-8 text-green-500 mb-1" />
                <div className="text-xl font-bold text-center">{businessStats.rescuedItems}</div>
                <div className="text-xs text-gray-500 text-center">Items Rescued</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 text-blue-500 mb-1" />
                <div className="text-xl font-bold text-center">{businessStats.customersSatisfied}</div>
                <div className="text-xs text-gray-500 text-center">Happy Customers</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-1">
            <CardTitle className="text-lg">Environmental Impact</CardTitle>
            <CardDescription>Your contribution to sustainability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CO₂ Emissions Saved</span>
                  <span className="font-semibold">{businessStats.co2Saved} kg</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Food Waste Reduced</span>
                  <span className="font-semibold">{businessStats.foodWasteSaved} kg</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Business Information
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Payment Methods
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Notifications
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Privacy Settings
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Contact Support
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              FAQs
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Terms of Service
            </div>
            <Separator />
            <div className="cursor-pointer py-2 hover:bg-gray-50 rounded px-1">
              Privacy Policy
            </div>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessProfile;

