
import { Home, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path ? "text-[#472D21]" : "text-gray-500";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-10">
      <Link to="/" className="flex flex-col items-center">
        <Home className={`w-6 h-6 ${isActive('/')}`} />
        <span className={`text-xs mt-1 ${isActive('/')}`}>Home</span>
      </Link>
      <Link to="/orders" className="flex flex-col items-center">
        <ShoppingBag className={`w-6 h-6 ${isActive('/orders')}`} />
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
