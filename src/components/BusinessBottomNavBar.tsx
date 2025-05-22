
import { Home, PlusCircle, Package, Clock, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const BusinessBottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around">
      <NavLink 
        to="/business-dashboard" 
        className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#472D21]' : 'text-gray-500'}`}
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      <NavLink 
        to="/add-surplus"
        className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <PlusCircle size={24} />
        <span className="text-xs mt-1">Add</span>
      </NavLink>
      <NavLink 
        to="/manage-surplus"
        className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <Package size={24} />
        <span className="text-xs mt-1">Surplus</span>
      </NavLink>
      <NavLink 
        to="/business-orders"
        className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <Clock size={24} />
        <span className="text-xs mt-1">Orders</span>
      </NavLink>
      <NavLink 
        to="/business-profile"
        className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#472D21]' : 'text-gray-500'}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
};

export default BusinessBottomNavBar;
