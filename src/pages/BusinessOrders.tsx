
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Clock, X } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BusinessOrder {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  totalPrice: number;
  status: "pending" | "ready" | "completed" | "cancelled";
  orderedAt: string;
  pickupTime: string;
}

const BusinessOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data
  const [orders, setOrders] = useState<BusinessOrder[]>([
    {
      id: "ORD-001",
      customerName: "Alex Smith",
      items: [
        { name: "Vegetable Curry", quantity: 1 },
        { name: "Chocolate Brownies", quantity: 2 }
      ],
      totalPrice: 10.48,
      status: "pending",
      orderedAt: "2025-05-22T14:30:00",
      pickupTime: "2025-05-22T18:30:00"
    },
    {
      id: "ORD-002",
      customerName: "Jamie Lee",
      items: [
        { name: "Fresh Baguette", quantity: 2 }
      ],
      totalPrice: 4.50,
      status: "ready",
      orderedAt: "2025-05-22T13:45:00",
      pickupTime: "2025-05-22T17:00:00"
    },
    {
      id: "ORD-003",
      customerName: "Taylor Wong",
      items: [
        { name: "Vegetable Curry", quantity: 2 }
      ],
      totalPrice: 13.00,
      status: "completed",
      orderedAt: "2025-05-22T11:20:00",
      pickupTime: "2025-05-22T15:00:00"
    },
    {
      id: "ORD-004",
      customerName: "Jordan Patel",
      items: [
        { name: "Garden Salad", quantity: 1 }
      ],
      totalPrice: 4.99,
      status: "cancelled",
      orderedAt: "2025-05-22T10:15:00",
      pickupTime: "2025-05-22T14:00:00"
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: BusinessOrder["status"]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    const statusMessages = {
      ready: "Order marked as ready for pickup",
      completed: "Order marked as completed",
      cancelled: "Order has been cancelled"
    };
    
    toast({
      title: "Order updated",
      description: statusMessages[newStatus as keyof typeof statusMessages],
    });
  };

  const getStatusBadge = (status: BusinessOrder["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "ready":
        return <Badge className="bg-green-500">Ready</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const pendingOrders = orders.filter(order => order.status === "pending");
  const readyOrders = orders.filter(order => order.status === "ready");
  const pastOrders = orders.filter(order => ["completed", "cancelled"].includes(order.status));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex items-center shadow-md sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-white" 
          onClick={() => navigate('/business-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold">Orders</div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="pending">
              New ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="ready">
              Ready ({readyOrders.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastOrders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingOrders.map(order => (
              <Card key={order.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <p className="text-xs text-gray-500">Order #{order.id}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span>Total: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span></span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Pickup at {new Date(order.pickupTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-[#472D21] hover:bg-[#5A392C]"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Ready
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingOrders.length === 0 && (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
                <p className="text-gray-500">No pending orders</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ready">
            {readyOrders.map(order => (
              <Card key={order.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <p className="text-xs text-gray-500">Order #{order.id}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span>Total: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span></span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Pickup at {new Date(order.pickupTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => updateOrderStatus(order.id, "completed")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Complete Order
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {readyOrders.length === 0 && (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
                <p className="text-gray-500">No orders ready for pickup</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastOrders.map(order => (
              <Card key={order.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <p className="text-xs text-gray-500">Order #{order.id}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Total: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span></span>
                    <div className="text-xs text-gray-500">
                      {new Date(order.orderedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pastOrders.length === 0 && (
              <div className="text-center p-6 bg-white rounded-lg shadow mt-4">
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
