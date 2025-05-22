import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, ChevronLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  status: "Pending" | "Ready" | "Completed" | "Cancelled";
  total: number;
  pickupTime: string;
}

const BusinessOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

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
    
    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: "1",
        orderNumber: "ORD-001",
        customerName: "Alex Smith",
        items: [
          { name: "Vegetable Curry", quantity: 1 },
          { name: "Chocolate Brownies", quantity: 2 }
        ],
        status: "Pending",
        total: 10.48,
        pickupTime: "18:30"
      },
      {
        id: "2",
        orderNumber: "ORD-002",
        customerName: "Maria Johnson",
        items: [
          { name: "Fresh Baguette", quantity: 1 },
          { name: "Green Salad", quantity: 1 }
        ],
        status: "Ready",
        total: 6.24,
        pickupTime: "19:00"
      },
      {
        id: "3",
        orderNumber: "ORD-003",
        customerName: "David Wilson",
        items: [
          { name: "Fruit Platter", quantity: 1 }
        ],
        status: "Completed",
        total: 7.99,
        pickupTime: "17:00"
      },
      {
        id: "4",
        orderNumber: "ORD-004",
        customerName: "Sarah Brown",
        items: [
          { name: "Vegetable Curry", quantity: 2 }
        ],
        status: "Completed",
        total: 13.00,
        pickupTime: "16:45"
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
    
  }, [navigate]);

  const handleMarkAsReady = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? {...order, status: "Ready"} 
        : order
    ));

    toast({
      title: "Order marked as ready",
      description: "Customer has been notified.",
    });
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? {...order, status: "Cancelled"} 
        : order
    ));

    toast({
      title: "Order cancelled",
      description: "Customer has been notified of cancellation.",
    });
  };

  const newOrders = orders.filter(order => order.status === "Pending");
  const readyOrders = orders.filter(order => order.status === "Ready");
  const pastOrders = orders.filter(order => ["Completed", "Cancelled"].includes(order.status));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#472D21] border-r-[#472D21]/70 border-b-[#472D21]/40 border-l-[#472D21]/20 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#472D21] text-lg">Loading orders...</p>
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
          <h1 className="text-xl font-bold">Orders</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="new">
              New ({newOrders.length})
            </TabsTrigger>
            <TabsTrigger value="ready">
              Ready ({readyOrders.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastOrders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4">
            {newOrders.length > 0 ? (
              newOrders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{order.customerName}</h3>
                      <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                    </div>
                    <Badge className="bg-amber-400 text-white">Pending</Badge>
                  </div>
                  
                  <div className="my-3">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-gray-700">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <p className="text-gray-500">Pickup at {order.pickupTime}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="bg-[#472D21] hover:bg-[#5A392C]"
                      onClick={() => handleMarkAsReady(order.id)}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Mark as Ready
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <X className="h-5 w-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No new orders</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ready" className="space-y-4">
            {readyOrders.length > 0 ? (
              readyOrders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{order.customerName}</h3>
                      <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">Ready</Badge>
                  </div>
                  
                  <div className="my-3">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-gray-700">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <p className="text-gray-500">Pickup at {order.pickupTime}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No orders ready for pickup</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{order.customerName}</h3>
                      <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                    </div>
                    <Badge className={order.status === "Completed" ? "bg-gray-500" : "bg-red-500"}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="my-3">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-gray-700">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <p className="text-gray-500">Pickup at {order.pickupTime}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No past orders</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default BusinessOrders;
