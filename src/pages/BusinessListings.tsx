
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { Card, CardContent } from "@/components/ui/card";
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
  category: string;
  status: "active" | "sold" | "expired";
}

const BusinessListings = () => {
  const navigate = useNavigate();
  
  // Mock data for business listings
  const [surplusItems] = useState<SurplusItem[]>([
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
        <h2 className="text-xl font-semibold mb-4 text-[#472D21]">Active Listings</h2>
        
        {surplusItems.length > 0 ? (
          <div className="space-y-4">
            {surplusItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1/3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 w-2/3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-500 my-1 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                          <span className="text-lg font-bold text-[#472D21] ml-2">${item.discountedPrice.toFixed(2)}</span>
                        </div>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-500 p-1 h-auto" 
                          onClick={() => navigate(`/edit-surplus/${item.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">You don't have any active listings yet.</p>
            <Button 
              className="bg-[#472D21] hover:bg-[#5A392C]"
              onClick={() => navigate('/add-surplus')}
            >
              Add New Item
            </Button>
          </div>
        )}
      </div>

      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessListings;
