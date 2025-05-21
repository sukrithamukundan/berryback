
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FoodListings = () => {
  const [view, setView] = useState<"list" | "map">("list");
  
  const mockListings = [
    {
      id: 1,
      name: "Fresh Bakery Bundle",
      business: "Morning Glory Bakery",
      originalPrice: 25,
      discountedPrice: 10,
      distance: "0.8 miles",
      timeLeft: "3 hours",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    },
    {
      id: 2,
      name: "Pasta & Sauce Meal Kit",
      business: "Luigi's Restaurant",
      originalPrice: 18,
      discountedPrice: 7,
      distance: "1.2 miles",
      timeLeft: "2 hours",
      image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    },
    {
      id: 3,
      name: "Mixed Vegetable Box",
      business: "Green Grocer",
      originalPrice: 15,
      discountedPrice: 6,
      distance: "0.5 miles",
      timeLeft: "5 hours",
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className={view === "list" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            List View
          </Button>
          <Button 
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
            className={view === "map" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Map View
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Available Surplus Food Near You</h1>

      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <div key={listing.id} className="border rounded-lg overflow-hidden shadow-sm">
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
              <div className="p-4">
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
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Reserve</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-6 h-96 flex items-center justify-center bg-gray-100">
          <p className="text-muted-foreground">Map view coming soon</p>
        </div>
      )}
    </div>
  );
};

export default FoodListings;
