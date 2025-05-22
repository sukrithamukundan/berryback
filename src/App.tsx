
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
import BusinessProfile from "./pages/BusinessProfile";
import BusinessOrders from "./pages/BusinessOrders";
import ManageSurplus from "./pages/ManageSurplus";

const queryClient = new QueryClient();

// Standard mobile viewport width
const MOBILE_WIDTH = 390;

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  // In development on larger screens, we'll constrain the width to mobile size
  // In production or on actual mobile devices, we'll use the full screen width
  const isProd = import.meta.env.PROD;
  const isMobileDevice = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches;
  
  if (isProd || isMobileDevice) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div 
        className="w-full max-w-[390px] bg-white shadow-lg"
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        {children}
      </div>
    </div>
  );
};

const App = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const type = localStorage.getItem("userType");
    setIsLoggedIn(loggedIn);
    setUserType(type);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MobileContainer>
            <Routes>
              <Route path="/" element={<Index skipSplash={true} />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/food/:id" element={<FoodItemDetails />} />
              <Route path="/business-dashboard" element={<BusinessDashboard />} />
              <Route path="/add-surplus" element={<AddSurplus />} />
              <Route path="/business-profile" element={<BusinessProfile />} />
              <Route path="/business-orders" element={<BusinessOrders />} />
              <Route path="/manage-surplus" element={<ManageSurplus />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileContainer>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
