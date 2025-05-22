
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SurplusItemCard from "./SurplusItemCard";
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

interface SurplusItemsListProps {
  loading: boolean;
  surplusItems: SurplusItem[];
}

const SurplusItemsList = ({ loading, surplusItems }: SurplusItemsListProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 text-[#472D21] animate-spin" />
      </div>
    );
  }

  if (surplusItems.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500 mb-4">You don't have any active listings yet.</p>
        <Button 
          className="bg-[#472D21] hover:bg-[#5A392C]"
          onClick={() => navigate('/add-surplus')}
        >
          Add New Item
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {surplusItems.map((item) => (
        <SurplusItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SurplusItemsList;
