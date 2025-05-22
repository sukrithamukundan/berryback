import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { useToast } from "@/hooks/use-toast";
import WelcomeMessage from "@/components/BusinessListings/WelcomeMessage";
import SurplusItemsList from "@/components/BusinessListings/SurplusItemsList";

interface SurplusItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiryDate: string;
  image: string;
  category: string;
  status: "active" | "sold" | "expired";
}

const BusinessListings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [surplusItems, setSurplusItems] = useState<SurplusItem[]>([]);
  const businessName = localStorage.getItem("businessName") || "Your Business";

  useEffect(() => {
    // Check if this is a new registration
    const isNewReg = sessionStorage.getItem("newRegistration") === "true";
    
    if (isNewReg) {
      setIsNewRegistration(true);
      sessionStorage.removeItem("newRegistration"); // Clear the flag
      
      // Show welcome toast
      toast({
        title: `Welcome to BerryBack, ${businessName}!`,
        description: "Your business is now registered. Start adding surplus food items to reduce waste and earn more.",
      });
    }
    
    // Load surplus items
    loadSurplusItems();
  }, [toast]);

  const loadSurplusItems = () => {
    setLoading(true);
    
    // Check for items specifically added by this business
    const businessId = localStorage.getItem("businessId") || "default-business";
    const allSurplusItems = JSON.parse(localStorage.getItem("allSurplusItems") || "{}");
    const businessItems = allSurplusItems[businessId] || [];
    
    if (businessItems.length > 0) {
      // If the business has added items, use those
      setSurplusItems(businessItems);
    } else {
      // Otherwise check if we have some items in localStorage from a previous session
      const storedItems = localStorage.getItem("surplusItems");
      
      if (storedItems) {
        setSurplusItems(JSON.parse(storedItems));
      } else {
        // Otherwise use default mock data
        setSurplusItems([
          {
            id: "1",
            name: "Vegetable Curry",
            description: "Freshly made vegetable curry with rice.",
            originalPrice: 12.99,
            discountedPrice: 6.50,
            quantity: 3,
            expiryDate: "2025-05-24",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=300&auto=format&fit=crop",
            category: "meal",
            status: "active"
          },
          {
            id: "2",
            name: "Chocolate Brownies",
            description: "Rich chocolate brownies, baked fresh this morning.",
            originalPrice: 3.99,
            discountedPrice: 1.99,
            quantity: 8,
            expiryDate: "2025-05-23",
            image: "https://images.unsplash.com/photo-1606313564200-e75d8e3ebe2e?q=80&w=300&auto=format&fit=crop",
            category: "dessert",
            status: "active"
          },
          {
            id: "3",
            name: "Fresh Baguette",
            description: "Artisan baked baguette from our bakery.",
            originalPrice: 4.50,
            discountedPrice: 2.25,
            quantity: 5,
            expiryDate: "2025-05-23",
            image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=300&auto=format&fit=crop",
            category: "bakery",
            status: "active"
          }
        ]);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-white" 
            onClick={() => navigate('/business-dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-xl font-bold">Your Listings</div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white" 
          onClick={() => navigate('/add-surplus')}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        {isNewRegistration && <WelcomeMessage businessName={businessName} />}
      
        <h2 className="text-xl font-semibold mb-4 text-[#472D21]">Active Listings</h2>
        
        <SurplusItemsList loading={loading} surplusItems={surplusItems} />
      </div>

      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessListings;
