import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { PlusCircle, ArrowRight, Package, Clock } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

interface BusinessDashboardProps {}

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [businessName, setBusinessName] = useState("Fresh Harvest Café");
  const [businessLocation, setBusinessLocation] = useState("Trivandrum");
  const [businessType, setBusinessType] = useState("Organic restaurant");

  // Mock dashboard metrics
  const dashboardMetrics = {
    todaySurplus: 8,
    pendingOrders: 5,
    revenueToday: 124.50,
    rescuedYesterday: 12
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
    
    // Get business name if available
    const storedBusinessName = localStorage.getItem("businessName");
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleAddSurplus = () => {
    navigate("/add-surplus");
  };

  const handleViewSurplus = () => {
    navigate("/manage-surplus");
  };

  const handleViewOrders = () => {
    navigate("/business-orders");
  };

  const handleViewProfile = () => {
    navigate("/business-profile");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#472D21] border-r-[#472D21]/70 border-b-[#472D21]/40 border-l-[#472D21]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#472D21] text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-[#472D21] text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">BerryBack Business</h1>
        <button 
          onClick={handleViewProfile}
          className="rounded-full p-1"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Business info card */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-[#472D21]">{businessName}</h2>
          <p className="text-gray-600">{businessType} • {businessLocation}</p>
        </Card>

        {/* Dashboard metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Today's Surplus</h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#472D21] mr-2">{dashboardMetrics.todaySurplus}</span>
              <Package className="h-6 w-6 text-[#472D21]" />
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Pending Orders</h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#472D21] mr-2">{dashboardMetrics.pendingOrders}</span>
              <Clock className="h-6 w-6 text-[#472D21]" />
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Revenue Today</h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#472D21] mr-2">${dashboardMetrics.revenueToday.toFixed(2)}</span>
              <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6L12 2M12 2L8 6M12 2V18M21 12L17 16M17 16L13 12M17 16H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Rescued Yesterday</h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#472D21] mr-2">{dashboardMetrics.rescuedYesterday}</span>
              <Package className="h-6 w-6 text-[#472D21]" />
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-xl font-bold text-[#472D21] mb-4">Quick Actions</h2>
          
          {/* Add new surplus */}
          <Card className="p-6 mb-4">
            <div className="mb-4">
              <h3 className="flex items-center text-lg font-semibold text-[#472D21]">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Surplus
              </h3>
              <p className="text-gray-500 mt-1">List items that will soon expire</p>
            </div>
            <Button 
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-5"
              onClick={handleAddSurplus}
            >
              Add Items
            </Button>
          </Card>
          
          {/* Manage current surplus */}
          <Card className="p-6 mb-4">
            <div className="mb-4">
              <h3 className="flex items-center text-lg font-semibold text-[#472D21]">
                <Package className="mr-2 h-5 w-5" />
                Manage Current Surplus
              </h3>
              <p className="text-gray-500 mt-1">Review and update your listed items</p>
            </div>
            <Button 
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-5"
              onClick={handleViewSurplus}
            >
              View All
            </Button>
          </Card>
          
          {/* Manage orders */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="flex items-center text-lg font-semibold text-[#472D21]">
                <Clock className="mr-2 h-5 w-5" />
                Current Orders
              </h3>
              <p className="text-gray-500 mt-1">View and manage pending orders</p>
            </div>
            <Button 
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-5"
              onClick={handleViewOrders}
            >
              View Orders
            </Button>
          </Card>
        </div>
      </div>
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessDashboard;
