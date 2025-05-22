
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

interface SurplusItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiryDate: string;
  image: string;
}

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [surplusItems, setSurplusItems] = useState<SurplusItem[]>([]);
  const [businessName, setBusinessName] = useState("Your Business");
  const [isLoading, setIsLoading] = useState(true);

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
    
    // Get business name if available
    const storedBusinessName = localStorage.getItem("businessName");
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }
    
    // Load surplus items (mock data for now)
    const mockSurpluses: SurplusItem[] = [
      {
        id: "1",
        name: "Chocolate Croissants",
        description: "Freshly baked chocolate croissants, perfect for breakfast",
        originalPrice: 3.99,
        discountedPrice: 1.99,
        quantity: 8,
        expiryDate: "2025-05-23",
        image: "https://picsum.photos/seed/croissant/300/200"
      },
      {
        id: "2",
        name: "Vegetable Stir Fry",
        description: "Healthy vegetable stir fry with rice",
        originalPrice: 8.99,
        discountedPrice: 4.50,
        quantity: 3,
        expiryDate: "2025-05-22",
        image: "https://picsum.photos/seed/stirfry/300/200"
      },
      {
        id: "3",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        originalPrice: 4.99,
        discountedPrice: 2.50,
        quantity: 5,
        expiryDate: "2025-05-24",
        image: "https://picsum.photos/seed/orangejuice/300/200"
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      setSurplusItems(mockSurpluses);
      setIsLoading(false);
    }, 1000);
    
    console.log("Auth status:", loggedIn, "User type:", type);
  }, [navigate]);
  
  const handleAddSurplus = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add surplus items is under development.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#472D21] border-r-[#472D21]/70 border-b-[#472D21]/40 border-l-[#472D21]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#472D21] text-lg">Loading your business dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#472D21] text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Business Dashboard</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#472D21]">Welcome, {businessName}</h2>
          <p className="text-[#472D21]/70">Manage your surplus food items and reduce waste</p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#472D21]">Your Surplus Items</h3>
          <Button 
            onClick={handleAddSurplus}
            className="bg-[#472D21] hover:bg-[#5A392C]"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Surplus
          </Button>
        </div>
        
        {surplusItems.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-[#472D21]/30 rounded-lg">
            <p className="text-[#472D21]/70 mb-4">You haven't added any surplus items yet</p>
            <Button 
              onClick={handleAddSurplus}
              className="bg-[#472D21] hover:bg-[#5A392C]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Surplus
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surplusItems.map(item => (
              <div key={item.id} className="border border-[#472D21]/20 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#472D21]">{item.name}</h3>
                    <div>
                      <span className="text-sm line-through text-gray-500">${item.originalPrice.toFixed(2)}</span>
                      <span className="ml-2 font-bold text-[#472D21]">${item.discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#472D21]/70 mb-3">{item.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Qty: {item.quantity}</span>
                    <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
