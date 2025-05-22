import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { PlusCircle, ArrowRight, Package, Clock, X, ChartBarIcon, PieChart, LineChart } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import RevenueChart from "@/components/RevenueChart";
import SurplusOverTimeChart from "@/components/SurplusOverTimeChart";
import IngredientWasteChart from "@/components/IngredientWasteChart";
import EmissionsReductionChart from "@/components/EmissionsReductionChart";
import IngredientRecommendation from "@/components/IngredientRecommendation";

interface BusinessData {
  businessName?: string;
  businessType?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  location?: string;
}

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: "Fresh Harvest Café",
    businessType: "Organic restaurant",
    location: "Trivandrum"
  });
  
  // State for revenue chart modal
  const [showRevenueChart, setShowRevenueChart] = useState(false);
  
  // State for surplus chart time frame
  const [surplusTimeFrame, setSurplusTimeFrame] = useState<"week" | "month" | "year">("week");
  
  // State for ingredient waste chart time frame
  const [ingredientTimeFrame, setIngredientTimeFrame] = useState<"week" | "month" | "year">("week");

  // State for emissions chart time frame
  const [emissionsTimeFrame, setEmissionsTimeFrame] = useState<"week" | "month" | "year">("month");

  // Mock dashboard metrics
  const dashboardMetrics = {
    todaySurplus: 8,
    pendingOrders: 5,
    revenueToday: 124.50,
    rescuedYesterday: 12
  };
  
  // Mock hourly revenue data for the chart
  const hourlyRevenueData = [
    { time: "8 AM", amount: 12.50 },
    { time: "9 AM", amount: 18.25 },
    { time: "10 AM", amount: 15.75 },
    { time: "11 AM", amount: 22.00 },
    { time: "12 PM", amount: 28.75 },
    { time: "1 PM", amount: 15.25 },
    { time: "2 PM", amount: 8.50 },
    { time: "3 PM", amount: 3.50 },
  ];

  // Mock surplus over time data for different time frames
  const surplusWeekData = [
    { date: "Apr 1", amount: 2.3 },
    { date: "Apr 2", amount: 3.1 },
    { date: "Apr 3", amount: 2.5 },
    { date: "Apr 4", amount: 3.8 },
    { date: "Apr 5", amount: 2.7 },
    { date: "Apr 6", amount: 5.9 },
    { date: "Apr 7", amount: 4.8 },
  ];

  const surplusMonthData = [
    ...surplusWeekData,
    { date: "Apr 8", amount: 3.5 },
    { date: "Apr 9", amount: 3.2 },
    { date: "Apr 10", amount: 3.7 },
    { date: "Apr 11", amount: 4.1 },
    { date: "Apr 12", amount: 5.0 },
    { date: "Apr 13", amount: 4.2 },
    { date: "Apr 14", amount: 3.6 },
    { date: "Apr 15", amount: 5.1 },
    { date: "Apr 16", amount: 6.2 },
    { date: "Apr 17", amount: 4.3 },
    { date: "Apr 18", amount: 3.9 },
    { date: "Apr 19", amount: 3.2 },
    { date: "Apr 20", amount: 2.7 },
    { date: "Apr 21", amount: 4.5 },
    { date: "Apr 22", amount: 5.1 },
    { date: "Apr 23", amount: 3.7 },
    { date: "Apr 24", amount: 2.8 },
    { date: "Apr 25", amount: 3.3 },
    { date: "Apr 26", amount: 4.1 },
    { date: "Apr 27", amount: 3.6 },
    { date: "Apr 28", amount: 2.9 },
    { date: "Apr 29", amount: 3.4 },
    { date: "Apr 30", amount: 4.8 },
  ];
  
  const surplusYearData = [
    { date: "Jan 2024", amount: 48.5 },
    { date: "Feb 2024", amount: 42.3 },
    { date: "Mar 2024", amount: 56.7 },
    { date: "Apr 2024", amount: 68.3 },
    { date: "May 2024", amount: 51.6 },
    { date: "Jun 2024", amount: 45.2 },
    { date: "Jul 2024", amount: 50.1 },
    { date: "Aug 2024", amount: 63.4 },
    { date: "Sep 2024", amount: 59.8 },
    { date: "Oct 2024", amount: 48.7 },
    { date: "Nov 2024", amount: 52.3 },
    { date: "Dec 2024", amount: 67.9 },
  ];

  // Mock ingredient waste data for different time frames
  const ingredientWasteWeekData = [
    { name: "Bread", value: 40 },
    { name: "Vegetables", value: 25 },
    { name: "Fruits", value: 20 },
    { name: "Dairy", value: 15 },
  ];
  
  const ingredientWasteMonthData = [
    { name: "Bread", value: 35 },
    { name: "Vegetables", value: 30 },
    { name: "Fruits", value: 15 },
    { name: "Dairy", value: 20 },
  ];
  
  const ingredientWasteYearData = [
    { name: "Bread", value: 30 },
    { name: "Vegetables", value: 25 },
    { name: "Fruits", value: 25 },
    { name: "Dairy", value: 20 },
  ];

  // Mock emissions reduction data for different time frames
  const emissionsWeekData = [
    { date: "Apr 1", amount: 43.2 },
    { date: "Apr 2", amount: 44.1 },
    { date: "Apr 3", amount: 42.5 },
    { date: "Apr 4", amount: 40.8 },
    { date: "Apr 5", amount: 38.7 },
    { date: "Apr 6", amount: 39.2 },
    { date: "Apr 7", amount: 37.8 },
  ];

  const emissionsMonthData = [
    ...emissionsWeekData,
    { date: "Apr 8", amount: 42.1 },
    { date: "Apr 9", amount: 40.5 },
    { date: "Apr 10", amount: 38.2 },
    { date: "Apr 11", amount: 39.1 },
    { date: "Apr 12", amount: 40.0 },
    { date: "Apr 13", amount: 38.4 },
    { date: "Apr 14", amount: 37.6 },
    { date: "Apr 15", amount: 36.1 },
    { date: "Apr 16", amount: 37.2 },
    { date: "Apr 17", amount: 38.3 },
    { date: "Apr 18", amount: 36.9 },
    { date: "Apr 19", amount: 35.2 },
    { date: "Apr 20", amount: 34.7 },
    { date: "Apr 21", amount: 35.5 },
    { date: "Apr 22", amount: 36.1 },
    { date: "Apr 23", amount: 35.7 },
    { date: "Apr 24", amount: 34.8 },
    { date: "Apr 25", amount: 33.3 },
    { date: "Apr 26", amount: 36.1 },
    { date: "Apr 27", amount: 35.6 },
    { date: "Apr 28", amount: 34.9 },
    { date: "Apr 29", amount: 33.4 },
    { date: "Apr 30", amount: 32.8 },
  ];
  
  const emissionsYearData = [
    { date: "Jan", amount: 48.5 },
    { date: "Feb", amount: 46.3 },
    { date: "Mar", amount: 45.2 },
    { date: "Apr", amount: 38.3 },
    { date: "May", amount: 37.6 },
    { date: "Jun", amount: 34.2 },
    { date: "Jul", amount: 35.1 },
    { date: "Aug", amount: 35.4 },
    { date: "Sep", amount: 33.8 },
    { date: "Oct", amount: 32.7 },
    { date: "Nov", amount: 31.3 },
    { date: "Dec", amount: 29.9 },
  ];
  
  // Get the appropriate surplus data based on selected time frame
  const getSurplusDataByTimeFrame = () => {
    switch (surplusTimeFrame) {
      case "week":
        return surplusWeekData;
      case "month":
        return surplusMonthData;
      case "year":
        return surplusYearData;
      default:
        return surplusWeekData;
    }
  };

  // Get the appropriate ingredient waste data based on selected time frame
  const getIngredientWasteDataByTimeFrame = () => {
    switch (ingredientTimeFrame) {
      case "week":
        return ingredientWasteWeekData;
      case "month":
        return ingredientWasteMonthData;
      case "year":
        return ingredientWasteYearData;
      default:
        return ingredientWasteWeekData;
    }
  };

  // Get the appropriate emissions data based on selected time frame
  const getEmissionsDataByTimeFrame = () => {
    switch (emissionsTimeFrame) {
      case "week":
        return emissionsWeekData;
      case "month":
        return emissionsMonthData;
      case "year":
        return emissionsYearData;
      default:
        return emissionsMonthData;
    }
  };

  // Mock ingredient waste data
  const ingredientWasteData = [
    { name: "Bread", value: 40 },
    { name: "Vegetables", value: 25 },
    { name: "Fruits", value: 20 },
    { name: "Dairy", value: 15 },
  ];

  // Mock data for ingredient recommendations
  const ingredientRecommendations = [
    {
      name: "Bread",
      currentUsage: 42,
      projectedUsage: 52,
      trend: "increase" as const,
      priority: "high" as const,
      recommendation: "Increase order quantity"
    },
    {
      name: "Vegetables",
      currentUsage: 37,
      projectedUsage: 35,
      trend: "decrease" as const,
      priority: "medium" as const,
      recommendation: "Slightly reduce order quantity"
    },
    {
      name: "Fruits",
      currentUsage: 28,
      projectedUsage: 28,
      trend: "stable" as const,
      priority: "low" as const,
      recommendation: "Maintain current order quantities"
    },
    {
      name: "Dairy",
      currentUsage: 15,
      projectedUsage: 22,
      trend: "increase" as const,
      priority: "high" as const,
      recommendation: "Increase order quantity"
    }
  ];

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
    
    // Get business data from localStorage if it exists
    const storedBusinessData = localStorage.getItem("businessData");
    if (storedBusinessData) {
      try {
        const parsedData = JSON.parse(storedBusinessData);
        setBusinessData({
          businessName: parsedData.businessName || businessData.businessName,
          businessType: parsedData.businessType || businessData.businessType,
          location: parsedData.address ? parsedData.address.split(',').pop()?.trim() : businessData.location
        });
      } catch (error) {
        console.error("Error parsing business data:", error);
      }
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
  
  const toggleRevenueChart = () => {
    setShowRevenueChart(prev => !prev);
  };

  const handleSurplusTimeFrameChange = (timeFrame: "week" | "month" | "year") => {
    setSurplusTimeFrame(timeFrame);
  };
  
  const handleIngredientTimeFrameChange = (timeFrame: "week" | "month" | "year") => {
    setIngredientTimeFrame(timeFrame);
  };

  const handleEmissionsTimeFrameChange = (timeFrame: "week" | "month" | "year") => {
    setEmissionsTimeFrame(timeFrame);
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
          <h2 className="text-2xl font-bold text-[#472D21]">{businessData.businessName}</h2>
          <p className="text-gray-600">{businessData.businessType} • {businessData.location}</p>
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
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-all" 
            onClick={toggleRevenueChart}
          >
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

        {/* Statistics Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#472D21]">Food Waste Analytics</h2>
          
          {/* Surplus over time chart */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-[#472D21] mb-2">Surplus Food Quantity Over Time</h3>
            <div className="h-[300px]">
              <SurplusOverTimeChart 
                data={getSurplusDataByTimeFrame()} 
                timeFrame={surplusTimeFrame}
                onTimeFrameChange={handleSurplusTimeFrameChange}
              />
            </div>
          </Card>
          
          {/* Ingredient waste chart - now with time frame selector */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-[#472D21] mb-2">Ingredient Waste Breakdown</h3>
            <div className="h-[300px]">
              <IngredientWasteChart 
                data={getIngredientWasteDataByTimeFrame()} 
                variant="donut"
                timeFrame={ingredientTimeFrame}
                onTimeFrameChange={handleIngredientTimeFrameChange}
              />
            </div>
          </Card>
          
          {/* Ingredient Purchase Recommendations */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-[#472D21] mb-2">Ingredient Purchase Recommendations</h3>
            <div>
              <IngredientRecommendation recommendations={ingredientRecommendations} />
            </div>
          </Card>
          
          {/* Emissions Reduction Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-[#472D21] mb-2">Emissions Reduction Over Time</h3>
            <div className="h-[300px]">
              <EmissionsReductionChart 
                dailyData={getEmissionsDataByTimeFrame()}
                timeFrame={emissionsTimeFrame}
                onTimeFrameChange={handleEmissionsTimeFrameChange}
              />
            </div>
          </Card>
        </div>
      </div>
      
      {/* Revenue Chart Modal */}
      {showRevenueChart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md md:max-w-lg shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#472D21] flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Revenue Today: ${dashboardMetrics.revenueToday.toFixed(2)}
              </h2>
              <button 
                onClick={toggleRevenueChart}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <RevenueChart data={hourlyRevenueData} />
              <p className="text-sm text-gray-500 mt-4">
                Hourly revenue distribution for today. Total: ${dashboardMetrics.revenueToday.toFixed(2)}
              </p>
            </div>
            <div className="border-t p-4">
              <Button 
                className="w-full bg-[#472D21] hover:bg-[#5A392C]"
                onClick={toggleRevenueChart}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessDashboard;
