
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import FoodListings from "@/components/FoodListings";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import PhonePreview from "@/components/PhonePreview";
import { Smartphone, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryView from "@/components/CategoryView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavBar from "@/components/BottomNavBar";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [role, setRole] = useState<"consumer" | "business" | null>(null);
  const [showPhonePreview, setShowPhonePreview] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const togglePreviewMode = () => {
    setShowPhonePreview(!showPhonePreview);
  };

  const handleLogin = () => {
    // For demo only - in a real app this would be handled properly
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setRole("consumer");
  };

  // Content to be rendered inside either the normal view or the phone preview
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
                onClick={() => {
                  setRole("consumer");
                  handleLogin(); // Auto-login for demo
                }}
              >
                Consumer Looking for Deals
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 px-8 py-6 text-lg"
                onClick={() => setRole("business")}
              >
                Business with Surplus Food
              </Button>
            </div>
          </div>
          <HowItWorks />
        </div>
      ) : isLoggedIn && role === "consumer" ? (
        <div className="container mx-auto px-4 py-8 pb-20"> {/* Added padding at bottom for the nav bar */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4 text-[#472D21]">Browse Surplus Food</h1>
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
          <BottomNavBar />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 pb-20"> {/* Added padding at bottom for the nav bar */}
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
          <BottomNavBar />
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Preview mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-10 h-10 p-0 border-[#472D21] text-[#472D21]"
          onClick={togglePreviewMode}
        >
          {showPhonePreview ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
        </Button>
      </div>

      {showPhonePreview ? (
        <div className="container mx-auto py-8 flex justify-center">
          <PhonePreview>
            {content}
          </PhonePreview>
        </div>
      ) : (
        content
      )}
      
      {!isLoggedIn && <Footer />}
    </div>
  );
};

export default Index;
