import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "@/components/BottomNavBar";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Remove logged in status
    localStorage.removeItem("isLoggedIn");
    // Navigate to home
    navigate('/');
    // Reload page to reflect changes
    window.location.reload();
  };
  
  // App Bar Component
  const AppBar = () => (
    <div className="bg-[#472D21] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="text-xl font-bold">BerryBack</div>
      <div className="flex items-center space-x-4">
        {/* Location and cart icons removed */}
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <AppBar />
      
      <h1 className="text-2xl font-bold mb-6 mt-4 text-[#472D21]">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-[#472D21] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            U
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#472D21]">User</h2>
            <p className="text-[#472D21]/70">user@example.com</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#472D21]">Account Settings</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="text-[#472D21]/80">Personal Information</li>
              <li className="text-[#472D21]/80">Payment Methods</li>
              <li className="text-[#472D21]/80">Notifications</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#472D21]">Support</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="text-[#472D21]/80">Help Center</li>
              <li className="text-[#472D21]/80">Contact Us</li>
              <li className="text-[#472D21]/80">Privacy Policy</li>
              <li className="text-[#472D21]/80">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default Profile;
