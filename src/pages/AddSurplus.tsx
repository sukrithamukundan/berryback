
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AddSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Surplus added!",
      description: "Your surplus item has been listed successfully.",
    });
    navigate('/manage-surplus');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* App Bar */}
      <div className="bg-[#472D21] text-white p-4 flex items-center shadow-md sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-white" 
          onClick={() => navigate('/business-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold">Add New Surplus</div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <Card className="p-4 mb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="e.g., Vegetable Curry" required />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your food item..." 
                  className="resize-none" 
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="meal">
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
                  <Select defaultValue="nonveg">
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
                    <Input id="originalPrice" type="number" min="0" step="0.01" placeholder="0.00" className="pl-9" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="discountedPrice" type="number" min="0" step="0.01" placeholder="0.00" className="pl-9" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry/Best Before</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="expiryDate" type="date" className="pl-9" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pickupTime">Available Until</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="pickupTime" type="time" className="pl-9" required />
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
            List Surplus Item
          </Button>
        </form>
      </div>
      <BusinessBottomNavBar />
    </div>
  );
};

export default AddSurplus;
