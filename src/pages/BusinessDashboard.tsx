
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, ChevronLeft, Edit, Check, X, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface SurplusItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiryDate: string;
  image: string;
  status: "Active" | "Sold Out" | "Expired";
}

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [surplusItems, setSurplusItems] = useState<SurplusItem[]>([]);
  const [businessName, setBusinessName] = useState("Your Business");
  const [isLoading, setIsLoading] = useState(true);
  const [isNewBusiness, setIsNewBusiness] = useState(false);

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
    
    // Check if this is a new business (no items yet)
    const hasItems = localStorage.getItem("hasSurplusItems") === "true";
    setIsNewBusiness(!hasItems);
    
    // Load surplus items (mock data for now)
    const mockSurpluses: SurplusItem[] = [
      {
        id: "1",
        name: "Vegetable Curry",
        description: "Freshly made vegetable curry with rice.",
        originalPrice: 12.99,
        discountedPrice: 6.50,
        quantity: 3,
        expiryDate: "2025-05-24",
        image: "https://picsum.photos/seed/vegetablecurry/300/300",
        status: "Active"
      },
      {
        id: "2",
        name: "Chocolate Brownies",
        description: "Rich chocolate brownies, baked fresh this morning.",
        originalPrice: 3.99,
        discountedPrice: 1.99,
        quantity: 8,
        expiryDate: "2025-05-23",
        image: "https://picsum.photos/seed/brownies/300/300",
        status: "Active"
      },
      {
        id: "3",
        name: "Fresh Baguette",
        description: "Artisan baked baguette from our bakery.",
        originalPrice: 4.50,
        discountedPrice: 2.25,
        quantity: 0,
        expiryDate: "2025-05-23",
        image: "https://picsum.photos/seed/baguette/300/300",
        status: "Sold Out"
      },
      {
        id: "4",
        name: "Green Salad",
        description: "Fresh green salad with house dressing.",
        originalPrice: 7.99,
        discountedPrice: 3.99,
        quantity: 0,
        expiryDate: "2025-05-22",
        image: "https://picsum.photos/seed/greensalad/300/300",
        status: "Expired"
      },
      {
        id: "5",
        name: "Fruit Platter",
        description: "Seasonal fresh fruits selection.",
        originalPrice: 15.99,
        discountedPrice: 7.99,
        quantity: 0,
        expiryDate: "2025-05-21",
        image: "https://picsum.photos/seed/fruitplatter/300/300",
        status: "Expired"
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
    // For demo purposes, mark as having items
    localStorage.setItem("hasSurplusItems", "true");
    setIsNewBusiness(false);
  };

  const handleEditItem = (itemId: string) => {
    toast({
      title: "Edit Feature Coming Soon",
      description: "The ability to edit surplus items is under development.",
    });
  };

  // Group items by status
  const activeItems = surplusItems.filter(item => item.status === "Active");
  const soldOutItems = surplusItems.filter(item => item.status === "Sold Out");
  const expiredItems = surplusItems.filter(item => item.status === "Expired");
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Active":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Sold Out":
        return <X className="h-4 w-4 text-red-500" />;
      case "Expired":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active":
        return "bg-green-500";
      case "Sold Out":
        return "bg-red-500";
      case "Expired":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
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

  const renderItemsList = (items: SurplusItem[], title: string) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#472D21] mb-4 flex items-center">
          {title}
          <Badge className="ml-2" variant="outline">
            {items.length}
          </Badge>
        </h2>
        <div className="space-y-4">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-32 h-32 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg text-[#472D21]">{item.name}</h3>
                    <span className={`px-3 py-1 ${getStatusColor(item.status)} text-white text-sm rounded-full flex items-center gap-1`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-baseline mb-1">
                    <span className="text-sm line-through text-gray-500 mr-2">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-[#472D21]">
                      ${item.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditItem(item.id)}
                      className="text-blue-500"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#472D21] text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-2 rounded-full p-1"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Your Listings</h1>
        </div>
        <button 
          className="rounded-full p-1"
          onClick={handleAddSurplus}
        >
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        {/* Welcome message for new businesses */}
        {isNewBusiness && (
          <div className="mb-6 bg-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#472D21] mb-2">Welcome to BerryBack!</h2>
            <p className="text-gray-700 mb-4">
              Your business is now registered. Start adding surplus food items to reduce waste and earn more.
            </p>
            <Button 
              onClick={handleAddSurplus}
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-5 text-lg"
            >
              Add Your First Item
            </Button>
          </div>
        )}
        
        {/* Listings grouped by status */}
        {!isNewBusiness && (
          <>
            {renderItemsList(activeItems, "Active Listings")}
            {renderItemsList(soldOutItems, "Sold Out")}
            {renderItemsList(expiredItems, "Expired")}
            
            {surplusItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No listings found.</p>
                <Button 
                  onClick={handleAddSurplus}
                  className="mt-4 bg-[#472D21] hover:bg-[#5A392C]"
                >
                  Add New Item
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
