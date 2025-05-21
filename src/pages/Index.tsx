
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FoodListings from "@/components/FoodListings";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import PhonePreview from "@/components/PhonePreview";
import { Smartphone, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [role, setRole] = useState<"consumer" | "business" | null>(null);
  const [showPhonePreview, setShowPhonePreview] = useState(false);
  const navigate = useNavigate();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const togglePreviewMode = () => {
    setShowPhonePreview(!showPhonePreview);
  };

  // Content to be rendered inside either the normal view or the phone preview
  const content = (
    <>
      {!role ? (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <HeroSection />
          <div className="mt-12 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-[#472D21]">I am a...</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#472D21] hover:bg-[#5A392C] px-8 py-6 text-lg"
                onClick={() => setRole("consumer")}
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
      ) : role === "consumer" ? (
        <FoodListings />
      ) : (
        <div className="container mx-auto px-4 py-8">
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
      
      <Footer />
    </div>
  );
};

export default Index;
