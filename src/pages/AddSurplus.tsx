
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Upload } from "lucide-react";
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
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFromMenu, setIsFromMenu] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !description || !originalPrice || !discountedPrice || !quantity || !expiryDate || (!image && !imagePreview)) {
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
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleMenuItemSelect = (item: FoodMenuItem) => {
    setName(item.name);
    setDescription(item.description);
    setOriginalPrice(item.originalPrice.toString());
    // Set discounted price to 60% of original price as default
    setDiscountedPrice((item.originalPrice * 0.6).toFixed(2));
    setImagePreview(item.image);
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
            <div className="grid grid-cols-1 gap-4">
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
                id="expiry-date"
                type="date"
                placeholder="Expiry Date*"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            
            <div>
              {imagePreview && (
                <div className="mb-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded border border-gray-200"
                  />
                </div>
              )}
              
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">Upload Photo*</p>
                </div>
              </label>
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
