import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, ChevronLeft, Edit, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

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

const ManageSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [surplusItems, setSurplusItems] = useState<SurplusItem[]>([]);

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
    
    // Load surplus items (mock data)
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
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      setSurplusItems(mockSurpluses);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  const handleEditItem = (itemId: string) => {
    toast({
      title: "Edit Feature Coming Soon",
      description: "The ability to edit surplus items is under development.",
    });
  };
  
  const handleDeleteItem = (itemId: string) => {
    setSurplusItems(surplusItems.filter(item => item.id !== itemId));
    toast({
      title: "Item Deleted",
      description: "The surplus item has been removed.",
    });
  };

  const handleAddNewItem = () => {
    navigate("/add-surplus");
  };

  // Group items by status
  const activeItems = surplusItems.filter(item => item.status === "Active");
  const soldOutItems = surplusItems.filter(item => item.status === "Sold Out");
  const expiredItems = surplusItems.filter(item => item.status === "Expired");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#472D21] border-r-[#472D21]/70 border-b-[#472D21]/40 border-l-[#472D21]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#472D21] text-lg">Loading surplus items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-[#472D21] text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-2 rounded-full p-1"
            onClick={() => navigate('/business-dashboard')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Manage Surplus</h1>
        </div>
        <button 
          className="rounded-full p-1"
          onClick={handleAddNewItem}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="active">
              Active ({activeItems.length})
            </TabsTrigger>
            <TabsTrigger value="soldout">
              Sold Out ({soldOutItems.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredItems.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeItems.length > 0 ? (
              activeItems.map((item) => (
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
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditItem(item.id)}
                            className="text-blue-500 p-1"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No active items</p>
                <Button 
                  onClick={handleAddNewItem}
                  className="mt-4 bg-[#472D21] hover:bg-[#5A392C]"
                >
                  Add New Item
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="soldout" className="space-y-4">
            {soldOutItems.length > 0 ? (
              soldOutItems.map((item) => (
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
                        <Badge className="bg-red-500">Sold Out</Badge>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
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
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No sold out items</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4">
            {expiredItems.length > 0 ? (
              expiredItems.map((item) => (
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
                        <Badge className="bg-orange-500">Expired</Badge>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
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
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No expired items</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default ManageSurplus;
