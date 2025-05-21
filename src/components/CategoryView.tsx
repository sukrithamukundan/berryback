
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Store, ChefHat, Cake, ShoppingBag, Filter, Search, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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
      distance: 1.2,
      timeLeft: "2 hours",
      image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      type: "nonVeg"
    },
    {
      id: 2,
      name: "Asian Fusion Bowl",
      business: "Wok & Roll",
      originalPrice: 16,
      discountedPrice: 8,
      distance: 0.7,
      timeLeft: "3 hours",
      image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      type: "nonVeg"
    }
  ],
  retailer: [
    {
      id: 3,
      name: "Mixed Vegetable Box",
      business: "Green Grocer",
      originalPrice: 15,
      discountedPrice: 6,
      distance: 0.5,
      timeLeft: "5 hours",
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      type: "veg"
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
      type: "veg"
    }
  ],
  catering: [
    {
      id: 5,
      name: "Party Platter Leftovers",
      business: "Events Catering Co.",
      originalPrice: 35,
      discountedPrice: 15,
      distance: 2.1,
      timeLeft: "1 hour",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      type: "nonVeg"
    }
  ],
  confectionery: [
    {
      id: 6,
      name: "Fresh Bakery Bundle",
      business: "Morning Glory Bakery",
      originalPrice: 25,
      discountedPrice: 10,
      distance: 0.8,
      timeLeft: "3 hours",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      type: "veg"
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
      type: "veg"
    }
  ]
};

const CategoryView = ({ category }: CategoryViewProps) => {
  const [sortBy, setSortBy] = useState<"distance" | "price" | "discount">("distance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterDistance, setFilterDistance] = useState<number[]>([5]); // max distance in miles
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 50]); // price range
  const [filterTypes, setFilterTypes] = useState<{veg: boolean, nonVeg: boolean}>({ veg: true, nonVeg: true });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const listings = mockListingsByCategory[category] || [];
  
  const categoryTitles = {
    restaurant: "Restaurant Offers",
    retailer: "Retailer Offers",
    catering: "Catering Leftovers",
    confectionery: "Bakery & Confectionery"
  };

  // Apply filters, search and sorting
  const filteredAndSortedListings = [...listings]
    // Apply search filter
    .filter(listing => {
      if (searchQuery.trim() === "") return true;
      const query = searchQuery.toLowerCase();
      return listing.name.toLowerCase().includes(query) || 
            listing.business.toLowerCase().includes(query);
    })
    // Apply filters
    .filter(listing => {
      // Distance filter
      if (listing.distance > filterDistance[0]) return false;
      
      // Price filter
      if (listing.discountedPrice < filterPrice[0] || listing.discountedPrice > filterPrice[1]) return false;
      
      // Food type filter
      if (listing.type === "veg" && !filterTypes.veg) return false;
      if (listing.type === "nonVeg" && !filterTypes.nonVeg) return false;
      
      return true;
    })
    // Apply sorting
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "distance") {
        comparison = a.distance - b.distance;
      } else if (sortBy === "price") {
        comparison = a.discountedPrice - b.discountedPrice;
      } else if (sortBy === "discount") {
        const discountA = (a.originalPrice - a.discountedPrice) / a.originalPrice;
        const discountB = (b.originalPrice - b.discountedPrice) / b.originalPrice;
        comparison = discountB - discountA; // Higher discount first
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {getCategoryIcon(category)}
        <h2 className="text-xl font-semibold text-[#472D21]">{categoryTitles[category]}</h2>
      </div>
      
      <div className="flex flex-wrap justify-end items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="discount">Discount %</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Sort Order Toggle */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSortOrder}
            className="border-[#472D21] text-[#472D21]"
          >
            {sortOrder === "asc" ? <ArrowUpAZ /> : <ArrowDownAZ />}
          </Button>
          
          {/* Filter Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleFilter}
            className={`border-[#472D21] text-[#472D21] ${showFilters ? 'bg-[#472D21]/10' : ''}`}
          >
            <Filter />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-[#472D21] bg-white">
          <Search className="ml-3 h-5 w-5 text-[#472D21]" />
          <Input
            type="text"
            placeholder="Search for food items or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:outline-none"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mr-1 h-7 w-7 rounded-full p-0"
            >
              <span className="sr-only">Clear</span>
              <span className="h-4 w-4 text-[#472D21]">×</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="mb-8 p-4 border rounded-md bg-white shadow-sm">
          <h2 className="font-semibold mb-4 text-lg text-[#472D21]">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Distance Filter */}
            <div>
              <label className="block text-sm font-medium text-[#472D21] mb-2">
                Max Distance: {filterDistance[0]} miles
              </label>
              <Slider
                defaultValue={[5]}
                max={10}
                step={0.5}
                value={filterDistance}
                onValueChange={(value) => setFilterDistance(value)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 miles</span>
                <span>10 miles</span>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-[#472D21] mb-2">
                Price Range: ${filterPrice[0]} - ${filterPrice[1]}
              </label>
              <Slider
                defaultValue={[0, 50]}
                min={0}
                max={50}
                step={1}
                value={filterPrice}
                onValueChange={(value) => setFilterPrice(value)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$50</span>
              </div>
            </div>
            
            {/* Food Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[#472D21] mb-2">Food Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterTypes.veg}
                    onChange={() => setFilterTypes({...filterTypes, veg: !filterTypes.veg})}
                    className="mr-2 rounded text-[#472D21]"
                  />
                  Vegetarian
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterTypes.nonVeg}
                    onChange={() => setFilterTypes({...filterTypes, nonVeg: !filterTypes.nonVeg})}
                    className="mr-2 rounded text-[#472D21]"
                  />
                  Non-Vegetarian
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {filteredAndSortedListings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">
            {searchQuery ? `No results found for "${searchQuery}"` : "No offers available in this category"}
          </p>
          <Button className="mt-4" onClick={() => {
            setFilterDistance([5]);
            setFilterPrice([0, 50]);
            setFilterTypes({veg: true, nonVeg: true});
            setSearchQuery("");
          }}>Reset All</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedListings.map((listing) => (
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
                
                {/* Add veg/non-veg indicator */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold text-white"
                    style={{backgroundColor: listing.type === 'veg' ? '#00A300' : '#D62828'}}>
                  {listing.type === 'veg' ? 'VEG' : 'NON-VEG'}
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
                    {listing.distance} miles • {listing.timeLeft} left
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
