
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const ManageSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Mock data
  const [surplusItems, setSurplusItems] = useState<SurplusItem[]>([
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
      status: "sold"
    },
    {
      id: "4",
      name: "Garden Salad",
      description: "Fresh mixed greens with vegetables and dressing.",
      originalPrice: 9.99,
      discountedPrice: 4.99,
      quantity: 0,
      expiryDate: "2025-05-22",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=300&auto=format&fit=crop",
      category: "appetizer",
      status: "expired"
    }
  ]);

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setSurplusItems(items => items.filter(item => item.id !== itemToDelete));
      toast({
        title: "Item deleted",
        description: "The surplus item has been removed from your listings.",
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "sold":
        return <Badge className="bg-blue-500">Sold Out</Badge>;
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>;
      default:
        return null;
    }
  };

  const activeItems = surplusItems.filter(item => item.status === "active");
  const soldItems = surplusItems.filter(item => item.status === "sold");
  const expiredItems = surplusItems.filter(item => item.status === "expired");

  const renderSurplusItem = (item: SurplusItem) => (
    <Card key={item.id} className="mb-4">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-1/3">
            <img 
              src={item.image} 
              alt={item.name} 
              className="h-full w-full object-cover rounded-l-lg"
            />
          </div>
          <div className="p-3 w-2/3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">{item.name}</h3>
              {getStatusBadge(item.status)}
            </div>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                <span className="text-lg font-bold text-[#472D21] ml-2">${item.discountedPrice.toFixed(2)}</span>
              </div>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
              <div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 p-1 h-auto" 
                  onClick={() => navigate(`/edit-surplus/${item.id}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 p-1 h-auto" 
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
          <div className="text-xl font-bold">Manage Surplus</div>
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
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active">
              Active ({activeItems.length})
            </TabsTrigger>
            <TabsTrigger value="sold">
              Sold Out ({soldItems.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredItems.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeItems.length > 0 ? (
              activeItems.map(renderSurplusItem)
            ) : (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
                <p className="text-gray-500">No active surplus items</p>
                <Button 
                  className="mt-4 bg-[#472D21] hover:bg-[#5A392C]"
                  onClick={() => navigate('/add-surplus')}
                >
                  Add New Item
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sold">
            {soldItems.length > 0 ? (
              soldItems.map(renderSurplusItem)
            ) : (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
                <p className="text-gray-500">No sold out items</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired">
            {expiredItems.length > 0 ? (
              expiredItems.map(renderSurplusItem)
            ) : (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
                <p className="text-gray-500">No expired items</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this surplus item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BusinessBottomNavBar />
    </div>
  );
};

export default ManageSurplus;
