
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Edit, Building2, MapPin, Phone, Mail, TrendingUp, Award } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

interface BusinessProfileProps {}

const BusinessProfile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock business data
  const businessData = {
    name: "Fresh Harvest Café",
    type: "Organic Restaurant",
    address: "123 Green St, Trivandrum",
    phone: "+91 98765 43210",
    email: "contact@freshharvest.com",
    impact: {
      itemsRescued: 478,
      happyCustomers: 215,
      co2Saved: 1250,
      wasteReduced: 320
    }
  };

  useEffect(() => {
    // Check authentication status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const type = localStorage.getItem("userType");
    
    setIsLoggedIn(loggedIn);
    setUserType(type);
    
    // If not logged in or not a business user, redirect to auth
    if (!loggedIn || type !== "business") {
      navigate("/auth");
    }
    
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#472D21] border-r-[#472D21]/70 border-b-[#472D21]/40 border-l-[#472D21]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#472D21] text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-[#472D21] text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-2 rounded-full p-1"
            onClick={() => navigate('/business-dashboard')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Business Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Business Information */}
        <Card className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-[#472D21]">{businessData.name}</h2>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4">
              <Edit className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-gray-600">{businessData.type}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-gray-600">{businessData.address}</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-gray-600">{businessData.phone}</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-gray-600">{businessData.email}</p>
            </div>
          </div>
        </Card>

        {/* Your Impact */}
        <div>
          <h2 className="text-2xl font-bold text-[#472D21] mb-4">Your Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <div className="text-4xl font-bold text-[#472D21]">{businessData.impact.itemsRescued}</div>
              <p className="text-gray-600">Items Rescued</p>
            </Card>
            <Card className="p-6 text-center">
              <Award className="h-10 w-10 text-blue-500 mx-auto mb-2" />
              <div className="text-4xl font-bold text-[#472D21]">{businessData.impact.happyCustomers}</div>
              <p className="text-gray-600">Happy Customers</p>
            </Card>
          </div>
        </div>

        {/* Environmental Impact */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-[#472D21] mb-4">Environmental Impact</h3>
          <p className="text-gray-600 mb-4">Your contribution to sustainability</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">CO<sub>2</sub> Emissions Saved</span>
                <span className="font-bold">{businessData.impact.co2Saved} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#472D21] h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Food Waste Reduced</span>
                <span className="font-bold">{businessData.impact.wasteReduced} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#472D21] h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-[#472D21] mb-4">Account Settings</h3>
          
          <div>
            <Button variant="ghost" className="w-full justify-start py-6 border-b">
              <span className="text-left text-gray-700">Business Information</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start py-6 border-b">
              <span className="text-left text-gray-700">Payment Methods</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start py-6 border-b">
              <span className="text-left text-gray-700">Notifications</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start py-6 border-b text-red-500">
              <span className="text-left">Log Out</span>
            </Button>
          </div>
        </Card>
      </div>
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessProfile;
