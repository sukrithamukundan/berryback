
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const Orders = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const cartJSON = localStorage.getItem('foodCart');
    if (cartJSON) {
      setCartItems(JSON.parse(cartJSON));
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
    toast({
      title: "Order placed!",
      description: "Your order has been successfully placed.",
    });
    // Clear cart after checkout
    updateCartAndNotify([]);
    localStorage.removeItem('foodCart');
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);

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
        <h1 className="text-2xl font-bold text-[#472D21]">Your Cart</h1>
      </div>

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
      
      <BottomNavBar />
    </div>
  );
};

export default Orders;
