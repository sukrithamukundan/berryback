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

interface IndexProps {
  skipSplash?: boolean;
}

const Index = ({ skipSplash = false }: IndexProps) => {
  const [showSplash, setShowSplash] = useState(!skipSplash);
  const [role, setRole] = useState<"consumer" | "business" | null>(null);
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
      if (loggedIn) {
        setRole("consumer"); // Auto-set to consumer when logged in
      }
    };
    
    checkLoginStatus();
  }, []);

  if (showSplash && !skipSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Modified to navigate to auth page instead of auto-login
  const handleConsumerSelect = () => {
    navigate('/auth');
  };

  const handleBusinessSelect = () => {
    navigate('/auth');
    // Set the business tab as the default in Auth page
    localStorage.setItem("preselectedRole", "business");
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

  // Content to be rendered
  const content = (
    <>
      {!role && !isLoggedIn ? (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <HeroSection />
          <div className="mt-12 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-[#472D21]">I am a...</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#472D21] hover:bg-[#5A392C] px-8 py-6 text-lg"
                onClick={handleConsumerSelect}
              >
                Consumer Looking for Deals
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 px-8 py-6 text-lg"
                onClick={handleBusinessSelect}
              >
                Business with Surplus Food
              </Button>
            </div>
          </div>
          <HowItWorks />
        </div>
      ) : isLoggedIn && role === "consumer" ? (
        <div className="pb-20"> {/* Added padding at bottom for the nav bar */}
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
      ) : (
        <div className="pb-20"> {/* Added padding at bottom for the nav bar */}
          <AppBar />
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="outline" 
              onClick={() => setRole(null)} 
              className="mb-6 border-[#472D21] text-[#472D21]"
            >
              Back
            </Button>
            <h1 className="text-2xl font-bold mb-6 text-[#472D21]">Business Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#472D21]/20 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-[#472D21]">List New Surplus</h2>
                <p className="text-[#472D21]/70 mb-4">
                  Add details about food items you currently have in surplus.
                </p>
                <Button className="bg-[#472D21] hover:bg-[#5A392C]">
                  Add New Listing
                </Button>
              </div>
              <div className="border border-[#472D21]/20 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-[#472D21]">Surplus Insights</h2>
                <p className="text-[#472D21]/70 mb-4">
                  View patterns and analytics about your food waste.
                </p>
                <Button className="bg-[#472D21] hover:bg-[#5A392C]">
                  View Report
                </Button>
              </div>
            </div>
          </div>
          <BottomNavBar />
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {content}
      
      {!isLoggedIn && <Footer />}
    </div>
  );
};

export default Index;
