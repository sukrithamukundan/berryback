
import { FoodMenuItem } from "../models/FoodMenuItem";

export const foodMenuItems: FoodMenuItem[] = [
  {
    id: 101,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    originalPrice: 12.99,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "veg",
    category: "Pizza"
  },
  {
    id: 102,
    name: "Vegetable Curry",
    description: "Mixed vegetables in a flavorful curry sauce",
    originalPrice: 10.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "veg",
    category: "Mains"
  },
  {
    id: 103,
    name: "Chicken Biryani",
    description: "Fragrant rice dish with chicken and aromatic spices",
    originalPrice: 14.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "nonVeg",
    category: "Mains"
  },
  {
    id: 104,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with nuts",
    originalPrice: 5.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "veg",
    category: "Desserts"
  },
  {
    id: 105,
    name: "Greek Salad",
    description: "Fresh vegetables, olives, and feta cheese",
    originalPrice: 8.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "veg",
    category: "Salads"
  },
  {
    id: 106,
    name: "Butter Chicken",
    description: "Tender chicken in a rich buttery tomato sauce",
    originalPrice: 13.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "nonVeg",
    category: "Mains"
  }
];

