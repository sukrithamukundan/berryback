
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import MenuItemSelector from "@/components/MenuItemSelector";
import { FoodMenuItem } from "@/models/FoodMenuItem";

const AddSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [pickupWithin, setPickupWithin] = useState("");
  const [isFromMenu, setIsFromMenu] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !description || !originalPrice || !discountedPrice || !quantity || !expiryDate || !expiryTime || !pickupWithin) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Surplus item added successfully!",
    });
    
    // Redirect to business dashboard or manage surplus page
    navigate("/business-dashboard");
  };
  
  const handleMenuItemSelect = (item: FoodMenuItem) => {
    setName(item.name);
    setDescription(item.description);
    setOriginalPrice(item.originalPrice.toString());
    // Set discounted price to 60% of original price as default
    setDiscountedPrice((item.originalPrice * 0.6).toFixed(2));
    setIsFromMenu(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#472D21] text-white p-4 flex items-center">
        <button 
          className="mr-2 rounded-full p-1"
          onClick={() => navigate('/business-dashboard')}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Add Surplus Item</h1>
      </div>
      
      <div className="container mx-auto px-4 py-4 pb-24">
        <Card className="p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#472D21]">Select from your menu</h2>
          <MenuItemSelector onSelect={handleMenuItemSelect} />
          
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div>
              <Input
                id="name"
                placeholder="Item Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <Textarea
                id="description"
                placeholder="Description*"
                className="min-h-[80px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="original-price"
                type="number"
                placeholder="Original Price (₹)*"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
              
              <Input
                id="discounted-price"
                type="number"
                placeholder="Discounted Price (₹)*"
                step="0.01"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="quantity"
                type="number"
                placeholder="Quantity Available*"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              
              <Input
                id="pickup-within"
                type="text"
                placeholder="Pickup Within (e.g., 2 hours)*"
                value={pickupWithin}
                onChange={(e) => setPickupWithin(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="expiry-date"
                type="date"
                placeholder="Expiry Date*"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              
              <Input
                id="expiry-time"
                type="time"
                placeholder="Expiry Time*"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-5 text-white"
            >
              Add Item
            </Button>
          </form>
        </Card>
      </div>
      
      <BusinessBottomNavBar />
    </div>
  );
};

export default AddSurplus;
