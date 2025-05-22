
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Calendar, Clock, Image, DollarSign, Plus, Minus } from "lucide-react";
import BusinessBottomNavBar from "@/components/BusinessBottomNavBar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SurplusItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiryDate: string;
  image: string;
  category: string;
  status: "active" | "sold" | "expired";
}

const AddSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "meal",
    dietType: "nonveg",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    pickupTime: "",
  });
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // If we're editing, load the existing data
    if (isEditing) {
      // Get existing items from localStorage
      const storedItems = localStorage.getItem("surplusItems");
      if (storedItems) {
        const items = JSON.parse(storedItems) as SurplusItem[];
        const itemToEdit = items.find(item => item.id === id);
        
        if (itemToEdit) {
          setFormData({
            itemName: itemToEdit.name,
            description: itemToEdit.description,
            category: itemToEdit.category,
            dietType: "nonveg", // Default as this wasn't stored before
            originalPrice: itemToEdit.originalPrice.toString(),
            discountedPrice: itemToEdit.discountedPrice.toString(),
            expiryDate: itemToEdit.expiryDate,
            pickupTime: "18:00", // Default as this wasn't stored before
          });
          setQuantity(itemToEdit.quantity);
        }
      }
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random image if none provided (for demo purposes)
    const foodImages = [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606313564200-e75d8e3ebe2e?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop"
    ];
    
    const newItem: SurplusItem = {
      id: isEditing ? id! : Date.now().toString(),
      name: formData.itemName,
      description: formData.description,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: parseFloat(formData.discountedPrice),
      quantity: quantity,
      expiryDate: formData.expiryDate,
      image: foodImages[Math.floor(Math.random() * foodImages.length)],
      category: formData.category,
      status: "active"
    };
    
    // Get existing items or initialize empty array
    const existingItemsStr = localStorage.getItem("surplusItems");
    let items: SurplusItem[] = [];
    
    if (existingItemsStr) {
      items = JSON.parse(existingItemsStr);
    }
    
    if (isEditing) {
      // Update existing item
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = newItem;
      }
      
      toast({
        title: "Item updated!",
        description: "Your surplus item has been updated successfully.",
      });
    } else {
      // Add new item
      items.push(newItem);
      
      toast({
        title: "Item added!",
        description: "Your surplus item has been listed successfully.",
      });
    }
    
    // Save to localStorage
    localStorage.setItem("surplusItems", JSON.stringify(items));
    
    navigate('/business-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex items-center shadow-md sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-white" 
          onClick={() => navigate('/business-listings')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold">{isEditing ? "Edit Surplus Item" : "Add New Surplus"}</div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <Card className="p-4 mb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input 
                  id="itemName" 
                  placeholder="e.g., Vegetable Curry" 
                  required 
                  value={formData.itemName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your food item..." 
                  className="resize-none" 
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meal">Complete Meal</SelectItem>
                      <SelectItem value="appetizer">Appetizer</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="grocery">Grocery Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dietType">Diet Type</Label>
                  <Select 
                    value={formData.dietType} 
                    onValueChange={(value) => handleSelectChange("dietType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="originalPrice" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      placeholder="0.00" 
                      className="pl-9" 
                      required 
                      value={formData.originalPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="discountedPrice" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      placeholder="0.00" 
                      className="pl-9" 
                      required 
                      value={formData.discountedPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry/Best Before</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="expiryDate" 
                      type="date" 
                      className="pl-9" 
                      required 
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pickupTime">Available Until</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="pickupTime" 
                      type="time" 
                      className="pl-9" 
                      required 
                      value={formData.pickupTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity Available</Label>
                <div className="flex items-center mt-1">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 border rounded-md mx-2 min-w-[50px] text-center">{quantity}</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Upload Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 mt-1 flex flex-col items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image of your food item</p>
                  <Input id="image" type="file" accept="image/*" className="hidden" />
                  <Button type="button" variant="secondary" className="mt-2">Select Image</Button>
                </div>
              </div>
            </div>
          </Card>

          <Button 
            type="submit" 
            className="w-full bg-[#472D21] hover:bg-[#5A392C] text-white py-6"
          >
            {isEditing ? "Update Surplus Item" : "List Surplus Item"}
          </Button>
        </form>
      </div>
      <BusinessBottomNavBar />
    </div>
  );
};

export default AddSurplus;
