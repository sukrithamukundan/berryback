
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface SurplusItemCardProps {
  item: SurplusItem;
}

const SurplusItemCard = ({ item }: SurplusItemCardProps) => {
  const navigate = useNavigate();

  return (
    <Card key={item.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-1/3">
            <img 
              src={item.image} 
              alt={item.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-3 w-2/3">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{item.name}</h3>
              <Badge className="bg-green-500">Active</Badge>
            </div>
            <p className="text-sm text-gray-500 my-1 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                <span className="text-lg font-bold text-[#472D21] ml-2">${item.discountedPrice.toFixed(2)}</span>
              </div>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-500 p-1 h-auto" 
                onClick={() => navigate(`/edit-surplus/${item.id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurplusItemCard;
