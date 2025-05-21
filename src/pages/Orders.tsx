
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle, History, PackageOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CartItem {
  id: number;
  name: string;
  business: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  quantity: number;
  addedAt: string;
}

interface OrderHistoryItem {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

const Orders = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("cart");
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const cartJSON = localStorage.getItem('foodCart');
    if (cartJSON) {
      setCartItems(JSON.parse(cartJSON));
    }
    
    // Load order history from localStorage
    const historyJSON = localStorage.getItem('orderHistory');
    if (historyJSON) {
      setOrderHistory(JSON.parse(historyJSON));
    }
  }, []);

  const updateCartAndNotify = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('foodCart', JSON.stringify(updatedCart));
    // Dispatch custom event to notify other components about cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCartAndNotify(updatedCart);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    updateCartAndNotify(updatedCart);
  };

  const checkout = () => {
    // Show confirmation modal instead of immediate toast
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    // Create a new order history item
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const newOrder: OrderHistoryItem = {
      id: `order-${Date.now()}`,
      items: [...cartItems],
      total: totalPrice,
      date: new Date().toISOString(),
    };
    
    // Update order history
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
    
    // Clear cart after checkout
    updateCartAndNotify([]);
    localStorage.removeItem('foodCart');
    
    // Close the confirmation dialog and switch to history tab
    setShowConfirmation(false);
    setActiveTab("history");
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-[#472D21]">Your Orders</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" /> 
            <span>Current Cart</span>
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" /> 
            <span>Order History</span>
            {orderHistory.length > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {orderHistory.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cart">
          {cartItems.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-[#472D21]/70 mb-4">Your cart is empty.</p>
              <p className="text-[#472D21]/70">When you reserve surplus food, your items will appear here.</p>
              <Button 
                className="mt-6 bg-[#472D21] hover:bg-[#5A392C]"
                onClick={() => navigate('/')}
              >
                Browse Food Items
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex border rounded-lg overflow-hidden shadow-sm">
                    <div className="w-24 h-24 bg-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h2 className="font-medium text-[#472D21]">{item.name}</h2>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.business}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">${item.discountedPrice.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full py-6 text-lg bg-[#472D21] hover:bg-[#5A392C]"
                onClick={checkout}
              >
                Checkout (${totalPrice.toFixed(2)})
              </Button>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          {orderHistory.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-[#472D21]/70 mb-4">You haven't placed any orders yet.</p>
              <p className="text-[#472D21]/70">Your order history will appear here after you checkout.</p>
              <Button 
                className="mt-6 bg-[#472D21] hover:bg-[#5A392C]"
                onClick={() => setActiveTab("cart")}
              >
                Go to Cart
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-[#472D21]/10 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <PackageOpen className="h-5 w-5 text-[#472D21] mr-2" />
                        <h3 className="font-medium">Order #{order.id.split('-')[1].slice(-4)}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={`${order.id}-${item.id}`} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-md mr-3">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-[#472D21]">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.business}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-green-600">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Order Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <AlertDialogTitle className="text-2xl">Order Placed!</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-center">
              <p className="mb-2">Your order has been successfully placed.</p> 
              <p className="mb-4">Check your email for pickup details.</p>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium">Remember to pick up your food on time to reduce food waste!</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col">
            <AlertDialogAction 
              className="w-full bg-[#472D21] hover:bg-[#5A392C]" 
              onClick={confirmOrder}
            >
              Continue Shopping
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <BottomNavBar />
    </div>
  );
};

export default Orders;
