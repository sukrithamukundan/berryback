
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
import PhonePreview from "./components/PhonePreview";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  // In a production environment or when published, we always want to show the mobile view
  // without the phone frame
  const isProd = import.meta.env.PROD;
  
  // If we're in production or on a mobile device, render without the phone frame
  if (isProd || window.matchMedia("(max-width: 768px)").matches) {
    return <>{children}</>;
  }
  
  // Only show the phone preview in development on larger screens
  return (
    <div className="flex justify-center items-start py-4">
      <PhonePreview>{children}</PhonePreview>
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
