
import { Home, PlusCircle, ShoppingBag, Clock, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BusinessBottomNavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center z-10 h-16">
      <Link 
        to="/business-dashboard" 
        className={`flex flex-col items-center justify-center flex-1 h-full p-2 ${isActive('/business-dashboard') ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link 
        to="/add-surplus" 
        className={`flex flex-col items-center justify-center flex-1 h-full p-2 ${isActive('/add-surplus') ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <PlusCircle className="h-5 w-5" />
        <span className="text-xs mt-1">Add</span>
      </Link>
      
      <Link 
        to="/manage-surplus" 
        className={`flex flex-col items-center justify-center flex-1 h-full p-2 ${isActive('/manage-surplus') ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="text-xs mt-1">Surplus</span>
      </Link>
      
      <Link 
        to="/business-orders" 
        className={`flex flex-col items-center justify-center flex-1 h-full p-2 ${isActive('/business-orders') ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <Clock className="h-5 w-5" />
        <span className="text-xs mt-1">Orders</span>
      </Link>
      
      <Link 
        to="/business-profile" 
        className={`flex flex-col items-center justify-center flex-1 h-full p-2 ${isActive('/business-profile') ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BusinessBottomNavBar;
