
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

// Define the food item type
interface FoodItem {
  id: number;
  name: string;
  business: string;
  originalPrice: number;
  discountedPrice: number;
  distance: number;
  timeLeft: string;
  image: string;
  type: "veg" | "nonVeg";
  description?: string;
}

const FoodItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockItems = [
      {
        id: 1,
        name: "Fresh Bakery Bundle",
        business: "Morning Glory Bakery",
        originalPrice: 25,
        discountedPrice: 10,
        distance: 0.8,
        timeLeft: "3 hours",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        type: "veg" as const,
        description: "A delightful assortment of freshly baked goods including artisan bread, croissants, and sweet pastries. Perfect for breakfast or an afternoon treat."
      },
      {
        id: 2,
        name: "Pasta & Sauce Meal Kit",
        business: "Luigi's Restaurant",
        originalPrice: 18,
        discountedPrice: 7,
        distance: 1.2,
        timeLeft: "2 hours",
        image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        type: "nonVeg" as const,
        description: "Fresh pasta with our signature sauce and garnishes. This kit includes everything you need to prepare a restaurant-quality Italian dinner in minutes."
      },
      {
        id: 3,
        name: "Mixed Vegetable Box",
        business: "Green Grocer",
        originalPrice: 15,
        discountedPrice: 6,
        distance: 0.5,
        timeLeft: "5 hours",
        image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        type: "veg" as const,
        description: "A seasonal selection of fresh locally-grown vegetables. May include carrots, broccoli, bell peppers, onions, potatoes, and more depending on availability."
      },
      {
        id: 4,
        name: "Dairy Bundle",
        business: "City Market",
        originalPrice: 12,
        discountedPrice: 5,
        distance: 1.5,
        timeLeft: "4 hours",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "veg" as const,
        description: "Fresh dairy products including milk, cheese, yogurt, and butter from local farms. Perfect for your weekly dairy needs at a fraction of the regular price."
      },
      {
        id: 5,
        name: "Party Platter Leftovers",
        business: "Events Catering Co.",
        originalPrice: 35,
        discountedPrice: 15,
        distance: 2.1,
        timeLeft: "1 hour",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "nonVeg" as const,
        description: "Assorted finger foods and appetizers from a catered event. Includes a variety of sandwiches, wraps, and savory bites perfect for a quick meal or gathering."
      },
      {
        id: 6,
        name: "Asian Fusion Bowl",
        business: "Wok & Roll",
        originalPrice: 16,
        discountedPrice: 8,
        distance: 0.7,
        timeLeft: "3 hours",
        image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "nonVeg" as const,
        description: "A flavorful mix of rice, fresh vegetables, and your choice of protein with our signature Asian-inspired sauce. A complete meal in one bowl."
      },
      {
        id: 7,
        name: "Assorted Pastries",
        business: "Sweet Treats",
        originalPrice: 20,
        discountedPrice: 8,
        distance: 1.0,
        timeLeft: "2 hours",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "veg" as const,
        description: "A delightful selection of sweet pastries including Danish, muffins, and cookies. These treats are perfect for dessert or with your morning coffee."
      },
    ];

    const foundItem = mockItems.find(item => item.id === Number(id));
    setItem(foundItem || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 flex justify-center">Loading...</div>;
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-[#472D21]">Item not found</h2>
          <p className="text-muted-foreground mt-2">The food item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[300px] md:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {Math.round(((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100)}% OFF
          </div>
          
          {/* Veg/non-veg indicator */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-bold text-white"
               style={{backgroundColor: item.type === 'veg' ? '#00A300' : '#D62828'}}>
            {item.type === 'veg' ? 'VEG' : 'NON-VEG'}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-[#472D21]">{item.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{item.business}</p>
          
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl text-green-600 font-bold">${item.discountedPrice}</span>
            <span className="text-lg text-muted-foreground line-through">${item.originalPrice}</span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              Save ${(item.originalPrice - item.discountedPrice).toFixed(2)}
            </span>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">Distance:</span> {item.distance} miles
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">Available for:</span> {item.timeLeft}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-lg text-[#472D21]">Description</h3>
            <p className="mt-2 text-muted-foreground">{item.description || "No description available."}</p>
          </div>
          
          <Button className="w-full mt-8 py-6 text-lg bg-[#472D21] hover:bg-[#5A392C]">
            Reserve This Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemDetails;
