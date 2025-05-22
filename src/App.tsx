
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import FoodItemDetails from "./pages/FoodItemDetails";
import BusinessDashboard from "./pages/BusinessDashboard";
import AddSurplus from "./pages/AddSurplus";
import ManageSurplus from "./pages/ManageSurplus";
import BusinessOrders from "./pages/BusinessOrders";
import BusinessProfile from "./pages/BusinessProfile";

const queryClient = new QueryClient();

const App = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"consumer" | "business" | null>(null);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const type = localStorage.getItem("userType") as "consumer" | "business" | null;
      setUserType(type || "consumer");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              isLoggedIn && userType === "business" ? 
                <Navigate to="/business-dashboard" /> : 
                <Index skipSplash={true} />
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/food/:id" element={<FoodItemDetails />} />
            
            {/* Business Routes */}
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/add-surplus" element={<AddSurplus />} />
            <Route path="/manage-surplus" element={<ManageSurplus />} />
            <Route path="/edit-surplus/:id" element={<AddSurplus />} />
            <Route path="/business-orders" element={<BusinessOrders />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
