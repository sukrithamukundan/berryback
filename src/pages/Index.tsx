
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import FoodListings from "@/components/FoodListings";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { MapPin, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryView from "@/components/CategoryView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavBar from "@/components/BottomNavBar";
import PhonePreview from "@/components/PhonePreview";

interface IndexProps {
  skipSplash?: boolean;
}

const Index = ({ skipSplash = false }: IndexProps) => {
  const [showSplash, setShowSplash] = useState(!skipSplash);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();

  // Simulate checking login status
  useEffect(() => {
    // For demo purposes, simulate logged in status
    // In a real app, this would check a token or session
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    
    checkLoginStatus();
  }, []);

  if (showSplash && !skipSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const handleLogin = () => {
    // For demo purposes - in a real app this would be handled properly
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const navigateToOrders = () => {
    navigate('/orders');
  };

  // App Bar Component
  const AppBar = () => (
    <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="text-xl font-bold">BerryBack</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center cursor-pointer">
          <MapPin className="w-5 h-5 mr-1" />
          <span>Trivandrum</span>
        </div>
        <div className="relative cursor-pointer" onClick={navigateToOrders}>
          <ShoppingCart className="w-6 h-6" />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Content to be rendered - We've removed the role selection screen and directly show consumer view
  const content = (
    <>
      {!isLoggedIn ? (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <HeroSection />
          <HowItWorks />
        </div>
      ) : (
        <div className="pb-20">
          <AppBar />
          <div className="container mx-auto px-4 py-4">
            <div className="mb-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 w-full flex justify-between overflow-x-auto">
                  <TabsTrigger value="all">All Offers</TabsTrigger>
                  <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                  <TabsTrigger value="retailers">Retailers</TabsTrigger>
                  <TabsTrigger value="catering">Catering</TabsTrigger>
                  <TabsTrigger value="confectionery">Confectionery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <FoodListings />
                </TabsContent>
                
                <TabsContent value="restaurants">
                  <CategoryView category="restaurant" />
                </TabsContent>
                
                <TabsContent value="retailers">
                  <CategoryView category="retailer" />
                </TabsContent>
                
                <TabsContent value="catering">
                  <CategoryView category="catering" />
                </TabsContent>
                
                <TabsContent value="confectionery">
                  <CategoryView category="confectionery" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <BottomNavBar />
        </div>
      )}
    </>
  );

  // Determine if we should use the mobile container or not
  const isMobileView = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="min-h-screen bg-background">
      {isMobileView ? (
        content
      ) : (
        <div className="flex justify-center items-start py-4">
          <PhonePreview>{content}</PhonePreview>
        </div>
      )}
      
      {!isLoggedIn && <Footer />}
    </div>
  );
};

export default Index;
