
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Store, ChefHat, Cake, ShoppingBag } from "lucide-react";

interface CategoryViewProps {
  category: "restaurant" | "retailer" | "catering" | "confectionery";
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "restaurant":
      return <UtensilsCrossed className="w-5 h-5" />;
    case "retailer":
      return <Store className="w-5 h-5" />;
    case "catering":
      return <ChefHat className="w-5 h-5" />;
    case "confectionery":
      return <Cake className="w-5 h-5" />;
    default:
      return <ShoppingBag className="w-5 h-5" />;
  }
};

const mockListingsByCategory = {
  restaurant: [
    {
      id: 1,
      name: "Pasta & Sauce Meal Kit",
      business: "Luigi's Restaurant",
      originalPrice: 18,
      discountedPrice: 7,
      distance: "1.2 miles",
      timeLeft: "2 hours",
      image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    },
    {
      id: 2,
      name: "Asian Fusion Bowl",
      business: "Wok & Roll",
      originalPrice: 16,
      discountedPrice: 8,
      distance: "0.7 miles",
      timeLeft: "3 hours",
      image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ],
  retailer: [
    {
      id: 3,
      name: "Mixed Vegetable Box",
      business: "Green Grocer",
      originalPrice: 15,
      discountedPrice: 6,
      distance: "0.5 miles",
      timeLeft: "5 hours",
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    },
    {
      id: 4,
      name: "Dairy Bundle",
      business: "City Market",
      originalPrice: 12,
      discountedPrice: 5,
      distance: "1.5 miles",
      timeLeft: "4 hours",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ],
  catering: [
    {
      id: 5,
      name: "Party Platter Leftovers",
      business: "Events Catering Co.",
      originalPrice: 35,
      discountedPrice: 15,
      distance: "2.1 miles",
      timeLeft: "1 hour",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ],
  confectionery: [
    {
      id: 6,
      name: "Fresh Bakery Bundle",
      business: "Morning Glory Bakery",
      originalPrice: 25,
      discountedPrice: 10,
      distance: "0.8 miles",
      timeLeft: "3 hours",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    },
    {
      id: 7,
      name: "Assorted Pastries",
      business: "Sweet Treats",
      originalPrice: 20,
      discountedPrice: 8,
      distance: "1.0 miles",
      timeLeft: "2 hours",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ]
};

const CategoryView = ({ category }: CategoryViewProps) => {
  const listings = mockListingsByCategory[category] || [];
  
  const categoryTitles = {
    restaurant: "Restaurant Offers",
    retailer: "Retailer Offers",
    catering: "Catering Leftovers",
    confectionery: "Bakery & Confectionery"
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {getCategoryIcon(category)}
        <h2 className="text-xl font-semibold text-[#472D21]">{categoryTitles[category]}</h2>
      </div>
      
      {listings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">No offers available in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={listing.image} 
                  alt={listing.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                  {Math.round(((listing.originalPrice - listing.discountedPrice) / listing.originalPrice) * 100)}% OFF
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">{listing.name}</h3>
                <p className="text-muted-foreground text-sm">{listing.business}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-green-600 font-bold">${listing.discountedPrice}</span>
                    <span className="text-muted-foreground text-sm line-through">${listing.originalPrice}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {listing.distance} • {listing.timeLeft} left
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-[#472D21] hover:bg-[#5A392C]">Reserve</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryView;
