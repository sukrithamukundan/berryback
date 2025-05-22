
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, PlusCircle, Clock, TrendingUp, Package, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessStats] = useState({
    todaySurplus: 8,
    pendingOrders: 5,
    todayRevenue: 124.50,
    rescuedYesterday: 12
  });

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <div className="text-xl font-bold">BerryBack Business</div>
        <Button variant="ghost" size="icon" className="text-white" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Business Info */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h1 className="text-xl font-bold text-[#472D21]">Fresh Harvest Café</h1>
          <p className="text-gray-500">Organic restaurant • Trivandrum</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="p-3">
              <CardDescription>Today's Surplus</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                {businessStats.todaySurplus}
                <ShoppingBag className="h-5 w-5 ml-1 text-[#472D21]" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="p-3">
              <CardDescription>Pending Orders</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                {businessStats.pendingOrders}
                <Clock className="h-5 w-5 ml-1 text-[#472D21]" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="p-3">
              <CardDescription>Revenue Today</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                ${businessStats.todayRevenue.toFixed(2)}
                <TrendingUp className="h-5 w-5 ml-1 text-green-500" />
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="p-3">
              <CardDescription>Rescued Yesterday</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                {businessStats.rescuedYesterday}
                <Package className="h-5 w-5 ml-1 text-[#472D21]" />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Actions */}
        <h2 className="text-xl font-semibold mb-4 text-[#472D21]">Quick Actions</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Add New Surplus
              </CardTitle>
              <CardDescription>List items that will soon expire</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-[#472D21] hover:bg-[#5A392C]"
                onClick={() => navigate('/add-surplus')}
              >
                Add Items
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Manage Current Surplus
              </CardTitle>
              <CardDescription>Review and update your listed items</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-[#472D21] hover:bg-[#5A392C]"
                onClick={() => navigate('/manage-surplus')}
              >
                View All
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Current Orders
              </CardTitle>
              <CardDescription>View and update order status</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-[#472D21] hover:bg-[#5A392C]"
                onClick={() => navigate('/business-orders')}
              >
                View Orders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessDashboard;
