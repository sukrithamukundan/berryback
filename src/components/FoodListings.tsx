
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ } from "lucide-react";

const FoodListings = () => {
  const [view, setView] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState<"distance" | "price" | "discount">("distance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterDistance, setFilterDistance] = useState<[number]>([5]); // max distance in miles
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 25]); // price range
  const [filterTypes, setFilterTypes] = useState<{veg: boolean, nonVeg: boolean}>({ veg: true, nonVeg: true });
  const [showFilters, setShowFilters] = useState(false);
  
  const mockListings = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      name: "Mixed Vegetable Box",
      business: "Green Grocer",
      originalPrice: 15,
      discountedPrice: 6,
      distance: 0.5,
      timeLeft: "5 hours",
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      type: "veg"
    }
  ];

  // Apply filters and sorting
  const filteredAndSortedListings = [...mockListings]
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className={view === "list" ? "bg-[#472D21] hover:bg-[#5A392C]" : ""}
          >
            List View
          </Button>
          <Button 
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
            className={view === "map" ? "bg-[#472D21] hover:bg-[#5A392C]" : ""}
          >
            Map View
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#472D21]">Available Surplus Food Near You</h1>
        
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
                onValueChange={setFilterDistance}
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
                defaultValue={[0, 25]}
                min={0}
                max={50}
                step={1}
                value={filterPrice}
                onValueChange={setFilterPrice}
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

      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedListings.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No results match your filters</p>
              <Button className="mt-4" onClick={() => {
                setFilterDistance([5]);
                setFilterPrice([0, 25]);
                setFilterTypes({veg: true, nonVeg: true});
              }}>Reset Filters</Button>
            </div>
          ) : (
            filteredAndSortedListings.map((listing) => (
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
                  
                  {/* Add veg/non-veg indicator */}
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold text-white"
                       style={{backgroundColor: listing.type === 'veg' ? '#00A300' : '#D62828'}}>
                    {listing.type === 'veg' ? 'VEG' : 'NON-VEG'}
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
                      {listing.distance} miles • {listing.timeLeft} left
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-[#472D21] hover:bg-[#5A392C]">Reserve</Button>
                </div>
              </div>
            ))
          )}
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
