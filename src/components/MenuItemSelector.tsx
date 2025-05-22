
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { foodMenuItems } from "@/data/foodMenuData";
import { FoodMenuItem } from "@/models/FoodMenuItem";
import { useToast } from "@/hooks/use-toast";

interface MenuItemSelectorProps {
  onSelect: (item: FoodMenuItem) => void;
}

const MenuItemSelector: React.FC<MenuItemSelectorProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Get unique categories
  const categories = Array.from(new Set(foodMenuItems.map(item => item.category)));
  
  const handleSelect = (item: FoodMenuItem) => {
    onSelect(item);
    setOpen(false);
    toast({
      title: "Item selected",
      description: `${item.name} has been selected from your menu.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full mb-4">
          Select Item from Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Item from Menu</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foodMenuItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <Card 
                        key={item.id} 
                        className="p-4 cursor-pointer hover:border-[#472D21] transition-colors"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-200">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-[#472D21]">{item.name}</h4>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                            <div className="mt-1 flex items-center">
                              <span className="font-bold">₹{item.originalPrice}</span>
                              <div 
                                className="ml-2 w-4 h-4 rounded-full border"
                                style={{ 
                                  backgroundColor: item.type === "veg" ? "#00A300" : "#D62828",
                                  borderColor: item.type === "veg" ? "#00A300" : "#D62828",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemSelector;
