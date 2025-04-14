
import { toast } from "@/components/ui/sonner";

export type Ingredient = {
  id: string;
  name: string;
  amount: string;
  price: number;
  category: "produce" | "dairy" | "meat" | "pantry" | "spices" | "bakery";
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  category: string[];
  ingredients: Ingredient[];
  instructions: string[];
  isFavorite: boolean;
};

export type CartItem = {
  ingredient: Ingredient;
  recipeId: string;
  recipeTitle: string;
};

// Mock recipes data
export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Butter Chicken",
    description: "Creamy, tomato-based curry with tender chicken pieces marinated in yogurt and spices.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1371&q=80",
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    calories: 550,
    category: ["curry", "chicken", "punjabi", "popular"],
    ingredients: [
      { id: "101", name: "Chicken Thighs", amount: "750g", price: 8.99, category: "meat" },
      { id: "102", name: "Yogurt", amount: "1/2 cup", price: 1.50, category: "dairy" },
      { id: "103", name: "Ginger-Garlic Paste", amount: "2 tbsp", price: 2.99, category: "produce" },
      { id: "104", name: "Garam Masala", amount: "2 tsp", price: 3.49, category: "spices" },
      { id: "105", name: "Butter", amount: "4 tbsp", price: 2.99, category: "dairy" },
      { id: "106", name: "Tomato Puree", amount: "400g", price: 1.75, category: "pantry" },
      { id: "107", name: "Heavy Cream", amount: "1/2 cup", price: 3.25, category: "dairy" },
      { id: "108", name: "Kashmiri Red Chili Powder", amount: "1 tsp", price: 2.49, category: "spices" },
      { id: "109", name: "Fenugreek Leaves (Kasuri Methi)", amount: "1 tbsp", price: 4.50, category: "spices" },
      { id: "110", name: "Fresh Coriander", amount: "2 tbsp, chopped", price: 1.25, category: "produce" }
    ],
    instructions: [
      "In a large bowl, mix chicken with yogurt, half of the ginger-garlic paste, and 1 tsp garam masala. Marinate for at least 30 minutes.",
      "Heat 2 tbsp butter in a large pan over medium-high heat. Add chicken pieces and cook until browned, about 4-5 minutes per side.",
      "Remove chicken and in the same pan, add remaining butter and ginger-garlic paste. Sauté until fragrant.",
      "Add tomato puree and Kashmiri red chili powder. Cook for 5 minutes until oil separates.",
      "Add 1/2 cup water, remaining garam masala, and salt. Simmer for 10 minutes.",
      "Return chicken to the pan and simmer for another 10 minutes until chicken is fully cooked.",
      "Stir in heavy cream and crushed fenugreek leaves. Simmer for 5 minutes.",
      "Garnish with fresh coriander before serving."
    ],
    isFavorite: true
  },
  {
    id: "2",
    title: "Vegetable Biryani",
    description: "Aromatic basmati rice cooked with mixed vegetables and warm spices in a traditional layered style.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    calories: 420,
    category: ["rice", "vegetarian", "hyderabadi", "one-pot"],
    ingredients: [
      { id: "201", name: "Basmati Rice", amount: "2 cups", price: 4.99, category: "pantry" },
      { id: "202", name: "Mixed Vegetables", amount: "2 cups (carrots, peas, beans)", price: 3.50, category: "produce" },
      { id: "203", name: "Onions", amount: "2 large", price: 1.49, category: "produce" },
      { id: "204", name: "Ginger-Garlic Paste", amount: "2 tbsp", price: 2.99, category: "produce" },
      { id: "205", name: "Biryani Masala", amount: "2 tbsp", price: 4.75, category: "spices" },
      { id: "206", name: "Green Chilies", amount: "3-4", price: 0.99, category: "produce" },
      { id: "207", name: "Fresh Mint", amount: "1/4 cup", price: 1.99, category: "produce" },
      { id: "208", name: "Fresh Coriander", amount: "1/4 cup", price: 1.25, category: "produce" },
      { id: "209", name: "Ghee", amount: "3 tbsp", price: 5.49, category: "dairy" },
      { id: "210", name: "Whole Spices (Cardamom, Cloves, Cinnamon)", amount: "1 tbsp", price: 3.99, category: "spices" },
      { id: "211", name: "Saffron Strands", amount: "a few", price: 7.99, category: "spices" },
      { id: "212", name: "Yogurt", amount: "1/2 cup", price: 1.50, category: "dairy" }
    ],
    instructions: [
      "Soak basmati rice in water for 30 minutes, then drain.",
      "Heat ghee in a large pot, add whole spices and let them crackle.",
      "Add sliced onions and sauté until golden brown.",
      "Add ginger-garlic paste and green chilies. Sauté for 2 minutes.",
      "Add mixed vegetables and biryani masala. Cook for 5 minutes.",
      "Add yogurt and cook for another 2 minutes.",
      "Add rice, 4 cups water, salt, half of mint, and coriander leaves.",
      "Bring to a boil, then reduce heat to low, cover and cook for 15-20 minutes.",
      "In a small bowl, soak saffron strands in 2 tbsp warm milk.",
      "Once rice is cooked, drizzle saffron milk and remaining mint leaves.",
      "Cover and let it rest for 10 minutes before serving."
    ],
    isFavorite: false
  },
  {
    id: "3",
    title: "Masala Dosa",
    description: "Crispy fermented rice and lentil crepes filled with spiced potato mixture, served with coconut chutney.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    calories: 380,
    category: ["south indian", "breakfast", "vegetarian", "fermented"],
    ingredients: [
      { id: "301", name: "Rice", amount: "2 cups", price: 3.99, category: "pantry" },
      { id: "302", name: "Urad Dal", amount: "1/2 cup", price: 2.75, category: "pantry" },
      { id: "303", name: "Fenugreek Seeds", amount: "1 tsp", price: 1.99, category: "spices" },
      { id: "304", name: "Potatoes", amount: "4 medium", price: 2.50, category: "produce" },
      { id: "305", name: "Onion", amount: "1 large", price: 0.79, category: "produce" },
      { id: "306", name: "Mustard Seeds", amount: "1 tsp", price: 1.49, category: "spices" },
      { id: "307", name: "Curry Leaves", amount: "1 sprig", price: 1.99, category: "produce" },
      { id: "308", name: "Green Chilies", amount: "2-3", price: 0.99, category: "produce" },
      { id: "309", name: "Turmeric Powder", amount: "1/2 tsp", price: 1.99, category: "spices" },
      { id: "310", name: "Fresh Coconut", amount: "1/2 cup, grated", price: 3.99, category: "produce" },
      { id: "311", name: "Oil", amount: "as needed", price: 2.50, category: "pantry" }
    ],
    instructions: [
      "Soak rice, urad dal, and fenugreek seeds separately for 4-6 hours.",
      "Grind them together into a smooth batter, adding water as needed.",
      "Let the batter ferment overnight or for 8-10 hours.",
      "For the filling, boil potatoes until soft, then peel and mash them.",
      "Heat oil in a pan, add mustard seeds, and let them splutter.",
      "Add curry leaves, chopped onions, and green chilies. Sauté until onions are translucent.",
      "Add turmeric powder, salt, and mashed potatoes. Mix well and cook for 5 minutes.",
      "Heat a flat griddle, pour a ladle of batter and spread into a thin circle.",
      "Drizzle oil around the edges and cook until golden and crisp.",
      "Place some potato filling in the center, fold the dosa over and serve hot.",
      "For coconut chutney, blend grated coconut with green chilies, ginger, and salt.",
      "Serve dosa with coconut chutney and sambar."
    ],
    isFavorite: true
  },
  {
    id: "4",
    title: "Palak Paneer",
    description: "Creamy spinach curry with soft cubes of cottage cheese, flavored with aromatic spices.",
    image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 3,
    calories: 420,
    category: ["curry", "vegetarian", "punjabi", "healthy"],
    ingredients: [
      { id: "401", name: "Paneer (Indian Cottage Cheese)", amount: "250g", price: 5.99, category: "dairy" },
      { id: "402", name: "Spinach Leaves", amount: "500g", price: 3.49, category: "produce" },
      { id: "403", name: "Onion", amount: "1 medium", price: 0.79, category: "produce" },
      { id: "404", name: "Tomatoes", amount: "2 medium", price: 1.25, category: "produce" },
      { id: "405", name: "Ginger-Garlic Paste", amount: "1 tbsp", price: 2.99, category: "produce" },
      { id: "406", name: "Green Chilies", amount: "2", price: 0.99, category: "produce" },
      { id: "407", name: "Cumin Seeds", amount: "1 tsp", price: 1.75, category: "spices" },
      { id: "408", name: "Garam Masala", amount: "1 tsp", price: 3.49, category: "spices" },
      { id: "409", name: "Heavy Cream", amount: "2 tbsp", price: 3.25, category: "dairy" },
      { id: "410", name: "Butter", amount: "2 tbsp", price: 2.99, category: "dairy" }
    ],
    instructions: [
      "Blanch spinach leaves in boiling water for 2-3 minutes, then drain and run under cold water.",
      "Blend blanched spinach with green chilies to make a smooth puree.",
      "Cut paneer into cubes and lightly fry until golden. Set aside.",
      "Heat butter in a pan, add cumin seeds and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes until raw smell disappears.",
      "Add chopped tomatoes and cook until soft and mushy.",
      "Add spinach puree, salt, and cook for 5-7 minutes.",
      "Add garam masala and paneer cubes. Simmer for 5 minutes.",
      "Finish with cream, stir well and serve hot."
    ],
    isFavorite: false
  },
  {
    id: "5",
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried, fluffy bread, a popular North Indian street food.",
    image: "https://images.unsplash.com/photo-1626500152050-76aa34f36819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
    prepTime: 40,
    cookTime: 30,
    servings: 4,
    calories: 650,
    category: ["street food", "punjabi", "breakfast", "festive"],
    ingredients: [
      { id: "501", name: "Chickpeas", amount: "2 cups, soaked overnight", price: 2.49, category: "pantry" },
      { id: "502", name: "Onions", amount: "2 large", price: 1.49, category: "produce" },
      { id: "503", name: "Tomatoes", amount: "3 medium", price: 1.85, category: "produce" },
      { id: "504", name: "Ginger-Garlic Paste", amount: "2 tbsp", price: 2.99, category: "produce" },
      { id: "505", name: "Chole Masala", amount: "2 tbsp", price: 4.49, category: "spices" },
      { id: "506", name: "Tea Bag", amount: "1", price: 0.25, category: "pantry" },
      { id: "507", name: "Bay Leaves", amount: "2", price: 1.99, category: "spices" },
      { id: "508", name: "All-Purpose Flour", amount: "2 cups", price: 2.75, category: "bakery" },
      { id: "509", name: "Yogurt", amount: "1/4 cup", price: 1.50, category: "dairy" },
      { id: "510", name: "Baking Powder", amount: "1 tsp", price: 1.25, category: "bakery" },
      { id: "511", name: "Oil", amount: "for deep frying", price: 4.99, category: "pantry" },
      { id: "512", name: "Fresh Coriander", amount: "2 tbsp", price: 1.25, category: "produce" }
    ],
    instructions: [
      "Pressure cook soaked chickpeas with bay leaves, tea bag, salt, and enough water for 15-20 minutes.",
      "Remove bay leaves and tea bag after cooking.",
      "In a separate pan, heat oil, add cumin seeds, and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chopped tomatoes and cook until oil separates.",
      "Add chole masala, red chili powder, and cook for 2 minutes.",
      "Add boiled chickpeas with some cooking liquid, and simmer for 10-15 minutes.",
      "For bhature, mix flour, yogurt, baking powder, salt, and knead into a soft dough.",
      "Cover and let it rest for 2-3 hours.",
      "Divide dough into small balls, roll each into an oval shape.",
      "Deep fry until puffed and golden brown.",
      "Garnish chole with fresh coriander and serve hot with bhature."
    ],
    isFavorite: true
  },
  {
    id: "6",
    title: "Gulab Jamun",
    description: "Soft, melt-in-your-mouth milk solids dumplings soaked in fragrant rose and cardamom syrup.",
    image: "https://images.unsplash.com/photo-1627564286423-a2b60a17fab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 20,
    cookTime: 30,
    servings: 12,
    calories: 280,
    category: ["dessert", "sweet", "festive", "popular"],
    ingredients: [
      { id: "601", name: "Milk Powder", amount: "1 cup", price: 4.99, category: "pantry" },
      { id: "602", name: "All-Purpose Flour", amount: "1/4 cup", price: 2.75, category: "bakery" },
      { id: "603", name: "Ghee", amount: "2 tbsp", price: 5.49, category: "dairy" },
      { id: "604", name: "Milk", amount: "2-3 tbsp", price: 1.99, category: "dairy" },
      { id: "605", name: "Baking Soda", amount: "1/4 tsp", price: 0.99, category: "bakery" },
      { id: "606", name: "Sugar", amount: "2 cups", price: 2.49, category: "pantry" },
      { id: "607", name: "Water", amount: "1 cup", price: 0.00, category: "pantry" },
      { id: "608", name: "Cardamom Powder", amount: "1/2 tsp", price: 3.49, category: "spices" },
      { id: "609", name: "Rose Water", amount: "1 tsp", price: 5.99, category: "pantry" },
      { id: "610", name: "Saffron Strands", amount: "a few", price: 7.99, category: "spices" },
      { id: "611", name: "Oil", amount: "for deep frying", price: 4.99, category: "pantry" }
    ],
    instructions: [
      "In a bowl, mix milk powder, flour, baking soda, and a pinch of cardamom powder.",
      "Add ghee and mix until the mixture resembles breadcrumbs.",
      "Add milk gradually and knead into a soft dough. Cover and rest for 10 minutes.",
      "Divide the dough into small portions and roll into smooth balls.",
      "For the sugar syrup, heat sugar and water in a pan until the sugar dissolves.",
      "Add cardamom powder, rose water, and saffron strands. Simmer for 5 minutes.",
      "Heat oil for deep frying on medium heat.",
      "Fry the dough balls on low-medium heat until golden brown.",
      "Immediately transfer hot gulab jamuns to the warm sugar syrup.",
      "Soak for at least 2 hours before serving.",
      "Serve warm or at room temperature."
    ],
    isFavorite: false
  }
];

// Initial empty shopping cart
export let shoppingCart: CartItem[] = [];

// Add item to cart
export const addToCart = (ingredient: Ingredient, recipeId: string, recipeTitle: string) => {
  const existingItem = shoppingCart.find(
    item => item.ingredient.id === ingredient.id && item.recipeId === recipeId
  );
  
  if (!existingItem) {
    shoppingCart = [
      ...shoppingCart,
      { ingredient, recipeId, recipeTitle }
    ];
    toast.success(`Added ${ingredient.name} to your shopping list`);
    return true;
  }
  
  toast.info(`${ingredient.name} is already in your shopping list`);
  return false;
};

// Add all ingredients from a recipe to cart with serving size adjustment
export const addRecipeToCart = (recipeId: string, servingRatio = 1) => {
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    toast.error("Recipe not found");
    return false;
  }
  
  let allAdded = true;
  let addedCount = 0;
  
  recipe.ingredients.forEach(ingredient => {
    // Adjust ingredient based on serving size
    const adjustedIngredient = {
      ...ingredient,
      price: ingredient.price * servingRatio,
      amount: adjustAmount(ingredient.amount, servingRatio)
    };
    
    const added = addToCart(adjustedIngredient, recipe.id, recipe.title);
    if (added) addedCount++;
    allAdded = allAdded && added;
  });
  
  if (addedCount > 0) {
    toast.success(`Added ${addedCount} ingredients from ${recipe.title} to your shopping list`);
  } else {
    toast.info("All ingredients already in your shopping list");
  }
  
  return allAdded;
};

// Helper function to adjust amount based on serving ratio
const adjustAmount = (amount: string, ratio: number) => {
  // Extract numeric part from amount string
  const numericMatch = amount.match(/[\d.]+/);
  if (!numericMatch) return amount;
  
  const numericValue = parseFloat(numericMatch[0]);
  const adjustedValue = (numericValue * ratio).toFixed(1);
  // Replace numeric part with adjusted value
  return amount.replace(/[\d.]+/, adjustedValue);
};

// Remove item from cart
export const removeFromCart = (ingredientId: string, recipeId: string) => {
  const initialLength = shoppingCart.length;
  
  shoppingCart = shoppingCart.filter(
    item => !(item.ingredient.id === ingredientId && item.recipeId === recipeId)
  );
  
  const removed = shoppingCart.length < initialLength;
  
  if (removed) {
    toast.success("Item removed from shopping list");
  }
  
  return removed;
};

// Clear cart
export const clearCart = () => {
  shoppingCart = [];
  toast.success("Shopping list cleared");
  return true;
};

// Toggle recipe favorite status
export const toggleFavorite = (recipeId: string) => {
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    if (recipe.isFavorite) {
      toast.success(`Added ${recipe.title} to favorites`);
    } else {
      toast.success(`Removed ${recipe.title} from favorites`);
    }
    return true;
  }
  
  return false;
};

// Get unique categories from all recipes
export const getCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  recipes.forEach(recipe => {
    recipe.category.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Filter recipes by category
export const filterRecipesByCategory = (category: string): Recipe[] => {
  if (!category || category === "all") {
    return recipes;
  }
  
  return recipes.filter(recipe => recipe.category.includes(category));
};

// Get grocery categories for grouping shopping list
export const getGroceryCategories = () => {
  return [
    { id: "produce", name: "Produce", icon: "leaf" },
    { id: "dairy", name: "Dairy & Eggs", icon: "milk" },
    { id: "meat", name: "Meat & Seafood", icon: "beef" },
    { id: "pantry", name: "Pantry", icon: "package" },
    { id: "bakery", name: "Bakery", icon: "bread" },
    { id: "spices", name: "Spices & Condiments", icon: "pepper" }
  ];
};
