import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Upload } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";

const AddSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [image, setImage] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !description || !originalPrice || !discountedPrice || !quantity || !expiryDate || !pickupTime || !image) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically handle the form submission,
    // such as sending the data to an API endpoint.
    
    toast({
      title: "Success",
      description: "Surplus item added successfully!",
    });
    
    // Redirect to business dashboard or manage surplus page
    navigate("/business-dashboard");
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
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
      
      {/* Content/Form will go here */}
      <div className="container mx-auto px-4 py-4">
        {/* Form will go here - this is just a placeholder */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 text-[#472D21]">Add a new surplus food item</h2>
          <p className="text-gray-500 mb-6">Fill in the details for the food item you want to list</p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name*
              </label>
              <Input
                id="name"
                placeholder="e.g. Vegetable Curry"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <Textarea
                id="description"
                placeholder="Describe the food item"
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="original-price" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (₹)*
                </label>
                <Input
                  id="original-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="discounted-price" className="block text-sm font-medium text-gray-700 mb-1">
                  Discounted Price (₹)*
                </label>
                <Input
                  id="discounted-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Available*
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date*
                </label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="pickup-time" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time*
              </label>
              <Input
                id="pickup-time"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Photo*
              </label>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </label>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#472D21] hover:bg-[#5A392C] py-6 text-white text-lg"
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
