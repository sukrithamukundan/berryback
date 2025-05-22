
export interface FoodMenuItem {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  image: string;
  type: "veg" | "nonVeg";
  category: string;
}

