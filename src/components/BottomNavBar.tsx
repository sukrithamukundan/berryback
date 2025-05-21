
import { Home, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  quantity: number;
}

const BottomNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage and count them
    const cartJSON = localStorage.getItem('foodCart');
    if (cartJSON) {
      const cartItems: CartItem[] = JSON.parse(cartJSON);
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(itemCount);
    }
    
    // Add event listener to update cart count when storage changes
    const handleStorageChange = () => {
      const updatedCartJSON = localStorage.getItem('foodCart');
      if (updatedCartJSON) {
        const updatedCartItems: CartItem[] = JSON.parse(updatedCartJSON);
        const updatedItemCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(updatedItemCount);
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for when we update cart within the same window
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const isActive = (path: string) => {
    return currentPath === path ? "text-[#472D21]" : "text-gray-500";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-10">
      <Link to="/" className="flex flex-col items-center">
        <Home className={`w-6 h-6 ${isActive('/')}`} />
        <span className={`text-xs mt-1 ${isActive('/')}`}>Home</span>
      </Link>
      <Link to="/orders" className="flex flex-col items-center relative">
        <ShoppingBag className={`w-6 h-6 ${isActive('/orders')}`} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
        <span className={`text-xs mt-1 ${isActive('/orders')}`}>Orders</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center">
        <User className={`w-6 h-6 ${isActive('/profile')}`} />
        <span className={`text-xs mt-1 ${isActive('/profile')}`}>Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavBar;
