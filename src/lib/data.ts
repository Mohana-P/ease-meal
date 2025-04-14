
import { toast } from "@/components/ui/sonner";

export type Ingredient = {
  id: string;
  name: string;
  amount: string;
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
    title: "Mediterranean Chickpea Salad",
    description: "A refreshing chickpea salad with cucumber, tomatoes, and feta cheese dressed in olive oil and lemon.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    calories: 320,
    category: ["salad", "mediterranean", "vegetarian", "quick"],
    ingredients: [
      { id: "101", name: "Chickpeas", amount: "2 cans (15 oz each)", category: "pantry" },
      { id: "102", name: "Cucumber", amount: "1 large", category: "produce" },
      { id: "103", name: "Cherry Tomatoes", amount: "1 cup", category: "produce" },
      { id: "104", name: "Red Onion", amount: "1/2", category: "produce" },
      { id: "105", name: "Feta Cheese", amount: "1/2 cup", category: "dairy" },
      { id: "106", name: "Olive Oil", amount: "1/4 cup", category: "pantry" },
      { id: "107", name: "Lemon Juice", amount: "2 tbsp", category: "produce" },
      { id: "108", name: "Fresh Parsley", amount: "1/4 cup", category: "produce" },
      { id: "109", name: "Salt", amount: "1/2 tsp", category: "spices" },
      { id: "110", name: "Black Pepper", amount: "1/4 tsp", category: "spices" },
    ],
    instructions: [
      "Drain and rinse the chickpeas.",
      "Dice the cucumber, halve the cherry tomatoes, and finely chop the red onion.",
      "Combine all vegetables in a large bowl.",
      "Crumble the feta cheese over the vegetables.",
      "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
      "Pour dressing over the salad and toss gently.",
      "Sprinkle with fresh parsley before serving."
    ],
    isFavorite: true
  },
  {
    id: "2",
    title: "Creamy Mushroom Pasta",
    description: "Rich and creamy pasta with sautéed mushrooms, garlic, and Parmesan cheese.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1292&q=80",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calories: 520,
    category: ["pasta", "italian", "vegetarian"],
    ingredients: [
      { id: "201", name: "Fettuccine", amount: "8 oz", category: "pantry" },
      { id: "202", name: "Mixed Mushrooms", amount: "8 oz", category: "produce" },
      { id: "203", name: "Garlic", amount: "3 cloves", category: "produce" },
      { id: "204", name: "Heavy Cream", amount: "1 cup", category: "dairy" },
      { id: "205", name: "Parmesan Cheese", amount: "1/2 cup, grated", category: "dairy" },
      { id: "206", name: "Butter", amount: "2 tbsp", category: "dairy" },
      { id: "207", name: "Olive Oil", amount: "1 tbsp", category: "pantry" },
      { id: "208", name: "Fresh Thyme", amount: "1 tsp", category: "produce" },
      { id: "209", name: "Salt", amount: "to taste", category: "spices" },
      { id: "210", name: "Black Pepper", amount: "to taste", category: "spices" },
    ],
    instructions: [
      "Cook pasta according to package instructions until al dente.",
      "In a large pan, heat butter and olive oil over medium heat.",
      "Add sliced mushrooms and cook until golden brown, about 5-7 minutes.",
      "Add minced garlic and thyme, cook for 1 minute until fragrant.",
      "Pour in heavy cream, bring to a simmer, and cook for 2-3 minutes until slightly thickened.",
      "Stir in grated Parmesan cheese until melted.",
      "Drain pasta and add to the sauce, tossing to coat.",
      "Season with salt and pepper to taste."
    ],
    isFavorite: false
  },
  {
    id: "3",
    title: "Honey Garlic Salmon",
    description: "Tender salmon fillets glazed with a sweet and savory honey garlic sauce.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    calories: 380,
    category: ["seafood", "dinner", "quick"],
    ingredients: [
      { id: "301", name: "Salmon Fillets", amount: "4 (6 oz each)", category: "meat" },
      { id: "302", name: "Honey", amount: "1/4 cup", category: "pantry" },
      { id: "303", name: "Soy Sauce", amount: "2 tbsp", category: "pantry" },
      { id: "304", name: "Garlic", amount: "4 cloves", category: "produce" },
      { id: "305", name: "Lemon Juice", amount: "1 tbsp", category: "produce" },
      { id: "306", name: "Butter", amount: "2 tbsp", category: "dairy" },
      { id: "307", name: "Olive Oil", amount: "1 tbsp", category: "pantry" },
      { id: "308", name: "Green Onions", amount: "2, sliced", category: "produce" },
      { id: "309", name: "Salt", amount: "1/2 tsp", category: "spices" },
      { id: "310", name: "Black Pepper", amount: "1/4 tsp", category: "spices" },
    ],
    instructions: [
      "Pat salmon fillets dry and season with salt and pepper.",
      "In a small bowl, whisk together honey, soy sauce, minced garlic, and lemon juice.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Add salmon fillets skin-side down and cook for 4 minutes until golden.",
      "Flip salmon and cook for another 2 minutes.",
      "Pour honey garlic sauce over salmon and cook for 1 minute.",
      "Add butter to the pan and spoon the sauce over the salmon as it cooks for another 1-2 minutes.",
      "Garnish with sliced green onions before serving."
    ],
    isFavorite: true
  },
  {
    id: "4",
    title: "Quinoa Veggie Bowl",
    description: "Nutrient-packed bowl with quinoa, roasted vegetables, and avocado.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    calories: 420,
    category: ["bowl", "healthy", "vegetarian", "vegan"],
    ingredients: [
      { id: "401", name: "Quinoa", amount: "1 cup, uncooked", category: "pantry" },
      { id: "402", name: "Sweet Potato", amount: "1 medium", category: "produce" },
      { id: "403", name: "Broccoli", amount: "1 cup, florets", category: "produce" },
      { id: "404", name: "Red Bell Pepper", amount: "1", category: "produce" },
      { id: "405", name: "Avocado", amount: "1", category: "produce" },
      { id: "406", name: "Chickpeas", amount: "1 can (15 oz)", category: "pantry" },
      { id: "407", name: "Olive Oil", amount: "2 tbsp", category: "pantry" },
      { id: "408", name: "Lemon", amount: "1", category: "produce" },
      { id: "409", name: "Cumin", amount: "1 tsp", category: "spices" },
      { id: "410", name: "Paprika", amount: "1/2 tsp", category: "spices" },
      { id: "411", name: "Salt", amount: "to taste", category: "spices" },
      { id: "412", name: "Black Pepper", amount: "to taste", category: "spices" },
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Cook quinoa according to package instructions.",
      "Dice sweet potato and red bell pepper, cut broccoli into florets.",
      "Toss vegetables with olive oil, cumin, paprika, salt, and pepper.",
      "Roast vegetables for 20-25 minutes until tender and slightly caramelized.",
      "Drain and rinse chickpeas, then season with salt and pepper.",
      "Assemble bowls with quinoa, roasted vegetables, and chickpeas.",
      "Slice avocado and add to bowls.",
      "Squeeze fresh lemon juice over everything before serving."
    ],
    isFavorite: false
  },
  {
    id: "5",
    title: "Classic Beef Burger",
    description: "Juicy beef patties with all the classic toppings on a toasted brioche bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    calories: 650,
    category: ["burger", "american", "dinner"],
    ingredients: [
      { id: "501", name: "Ground Beef", amount: "1.5 lbs (80/20)", category: "meat" },
      { id: "502", name: "Brioche Buns", amount: "4", category: "bakery" },
      { id: "503", name: "American Cheese", amount: "4 slices", category: "dairy" },
      { id: "504", name: "Lettuce", amount: "4 leaves", category: "produce" },
      { id: "505", name: "Tomato", amount: "1 large", category: "produce" },
      { id: "506", name: "Red Onion", amount: "1/2", category: "produce" },
      { id: "507", name: "Pickle Slices", amount: "8", category: "pantry" },
      { id: "508", name: "Ketchup", amount: "to taste", category: "pantry" },
      { id: "509", name: "Mustard", amount: "to taste", category: "pantry" },
      { id: "510", name: "Mayonnaise", amount: "to taste", category: "pantry" },
      { id: "511", name: "Salt", amount: "1 tsp", category: "spices" },
      { id: "512", name: "Black Pepper", amount: "1/2 tsp", category: "spices" },
    ],
    instructions: [
      "Divide ground beef into 4 equal portions and form into patties slightly larger than the buns.",
      "Press a slight dimple in the center of each patty to prevent bulging.",
      "Season patties generously with salt and pepper on both sides.",
      "Heat a grill or skillet to high heat.",
      "Cook patties for 3-4 minutes per side for medium doneness.",
      "Add cheese slices to patties during the last minute of cooking.",
      "Toast the buns lightly.",
      "Spread mayo, ketchup, and mustard on buns.",
      "Assemble burgers with lettuce, tomato, onion, and pickles."
    ],
    isFavorite: true
  },
  {
    id: "6",
    title: "Lemon Blueberry Pancakes",
    description: "Fluffy pancakes studded with fresh blueberries and brightened with lemon zest.",
    image: "https://images.unsplash.com/photo-1558401391-2c078c8e1568?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 380,
    category: ["breakfast", "sweet", "vegetarian"],
    ingredients: [
      { id: "601", name: "All-Purpose Flour", amount: "2 cups", category: "pantry" },
      { id: "602", name: "Baking Powder", amount: "2 tsp", category: "pantry" },
      { id: "603", name: "Baking Soda", amount: "1/2 tsp", category: "pantry" },
      { id: "604", name: "Salt", amount: "1/4 tsp", category: "spices" },
      { id: "605", name: "Sugar", amount: "3 tbsp", category: "pantry" },
      { id: "606", name: "Eggs", amount: "2", category: "dairy" },
      { id: "607", name: "Milk", amount: "1 3/4 cups", category: "dairy" },
      { id: "608", name: "Butter", amount: "3 tbsp, melted", category: "dairy" },
      { id: "609", name: "Vanilla Extract", amount: "1 tsp", category: "pantry" },
      { id: "610", name: "Lemon", amount: "1", category: "produce" },
      { id: "611", name: "Blueberries", amount: "1 cup", category: "produce" },
      { id: "612", name: "Maple Syrup", amount: "for serving", category: "pantry" },
    ],
    instructions: [
      "In a large bowl, whisk together flour, baking powder, baking soda, salt, and sugar.",
      "In another bowl, beat eggs, then add milk, melted butter, vanilla extract, and lemon zest.",
      "Pour wet ingredients into dry ingredients and stir just until combined.",
      "Gently fold in blueberries.",
      "Heat a griddle or non-stick pan over medium heat.",
      "Pour 1/4 cup batter for each pancake onto the griddle.",
      "Cook until bubbles form on the surface, then flip and cook until golden brown.",
      "Serve with butter and maple syrup."
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

// Add all ingredients from a recipe to cart
export const addRecipeToCart = (recipeId: string) => {
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    toast.error("Recipe not found");
    return false;
  }
  
  let allAdded = true;
  let addedCount = 0;
  
  recipe.ingredients.forEach(ingredient => {
    const added = addToCart(ingredient, recipe.id, recipe.title);
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
