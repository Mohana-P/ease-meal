
import { v4 as uuidv4 } from 'uuid';
import { snackItems } from './snackItems';
import { addOrder, OrderItem, cookingHistory, getFormattedLastCooked } from './orderHistory';

// Ingredient type
export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  price: number;  // Price in rupees
}

// Recipe type
export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  image: string;
  isFavorite: boolean;
  ingredients: Ingredient[];
  instructions: string[];
}

// Shopping cart item type
export interface CartItem {
  ingredient: Ingredient;
  recipeId: string;
  recipeName: string;
}

// Recipes data
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    category: ['Main Course', 'Non-Vegetarian', 'North Indian'],
    prepTime: 30,
    cookTime: 45,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Chicken breast', amount: '500g', price: 180 },
      { id: uuidv4(), name: 'Tomatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Cream', amount: '200ml', price: 60 },
      { id: uuidv4(), name: 'Butter', amount: '3 tbsp', price: 45 },
      { id: uuidv4(), name: 'Ginger-garlic paste', amount: '2 tbsp', price: 20 },
      { id: uuidv4(), name: 'Garam masala', amount: '1 tsp', price: 15 },
      { id: uuidv4(), name: 'Kasuri methi', amount: '1 tsp', price: 10 },
      { id: uuidv4(), name: 'Salt', amount: 'to taste', price: 5 }
    ],
    instructions: [
      'Marinate chicken with yogurt, lemon juice, and spices for at least 30 minutes.',
      'Cook the marinated chicken in a tandoor or oven until 80% done.',
      'In a pan, heat butter and sauté ginger-garlic paste until fragrant.',
      'Add tomato puree and cook until oil separates. Add spices and salt.',
      'Add cream, cooked chicken pieces, and simmer for 10 minutes.',
      'Garnish with kasuri methi and cream before serving.'
    ]
  },
  {
    id: '2',
    title: 'Chicken Biryani',
    description: 'Fragrant rice dish with spiced chicken and aromatic herbs',
    category: ['Main Course', 'Non-Vegetarian', 'Hyderabadi'],
    prepTime: 40,
    cookTime: 50,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop',
    isFavorite: true,
    ingredients: [
      { id: uuidv4(), name: 'Basmati rice', amount: '500g', price: 120 },
      { id: uuidv4(), name: 'Chicken', amount: '750g', price: 250 },
      { id: uuidv4(), name: 'Onions', amount: '3 large', price: 45 },
      { id: uuidv4(), name: 'Yogurt', amount: '1 cup', price: 40 },
      { id: uuidv4(), name: 'Biryani masala', amount: '3 tbsp', price: 30 },
      { id: uuidv4(), name: 'Saffron', amount: 'a few strands', price: 50 },
      { id: uuidv4(), name: 'Mint leaves', amount: '1/2 cup', price: 20 },
      { id: uuidv4(), name: 'Coriander leaves', amount: '1/2 cup', price: 20 },
      { id: uuidv4(), name: 'Ghee', amount: '3 tbsp', price: 45 }
    ],
    instructions: [
      'Wash and soak rice for 30 minutes. Drain and cook until 70% done.',
      'Marinate chicken with yogurt, biryani masala, and salt for 1 hour.',
      'In a heavy-bottomed pot, sauté sliced onions until golden brown.',
      'Add marinated chicken and cook until almost done.',
      'Layer the partially cooked rice over the chicken.',
      'Sprinkle saffron-soaked milk, mint, coriander, and ghee on top.',
      'Seal the pot with dough and cook on low heat for 20 minutes.',
      'Let it rest for 10 minutes before opening and serving.'
    ]
  },
  {
    id: '3',
    title: 'Palak Paneer',
    description: 'Cottage cheese cubes in a creamy spinach gravy',
    category: ['Main Course', 'Vegetarian', 'North Indian'],
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2017&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Spinach', amount: '500g', price: 60 },
      { id: uuidv4(), name: 'Paneer', amount: '250g', price: 120 },
      { id: uuidv4(), name: 'Onion', amount: '1 large', price: 15 },
      { id: uuidv4(), name: 'Tomato', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Ginger-garlic paste', amount: '1 tbsp', price: 10 },
      { id: uuidv4(), name: 'Green chilies', amount: '2-3', price: 5 },
      { id: uuidv4(), name: 'Garam masala', amount: '1 tsp', price: 15 },
      { id: uuidv4(), name: 'Cream', amount: '2 tbsp', price: 20 }
    ],
    instructions: [
      'Blanch spinach in hot water for 3 minutes, then transfer to ice water.',
      'Blend the blanched spinach into a smooth puree.',
      'Sauté onions, ginger-garlic paste, and green chilies until golden.',
      'Add tomatoes and cook until soft, then blend into a paste.',
      'Heat butter in a pan, add the onion-tomato paste, and cook for 5 minutes.',
      'Add spinach puree, spices, salt, and simmer for 10 minutes.',
      'Add paneer cubes and cream, cook for another 5 minutes.',
      'Serve hot with roti or naan.'
    ]
  },
  {
    id: '4',
    title: 'Masala Dosa',
    description: 'Crispy rice and lentil crepe filled with spiced potato filling',
    category: ['Breakfast', 'Vegetarian', 'South Indian'],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
    isFavorite: true,
    ingredients: [
      { id: uuidv4(), name: 'Dosa batter', amount: '3 cups', price: 80 },
      { id: uuidv4(), name: 'Potatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Onion', amount: '1 large', price: 15 },
      { id: uuidv4(), name: 'Mustard seeds', amount: '1 tsp', price: 5 },
      { id: uuidv4(), name: 'Curry leaves', amount: '1 sprig', price: 5 },
      { id: uuidv4(), name: 'Turmeric powder', amount: '1/2 tsp', price: 5 },
      { id: uuidv4(), name: 'Green chilies', amount: '2-3', price: 5 },
      { id: uuidv4(), name: 'Oil', amount: 'as needed', price: 20 }
    ],
    instructions: [
      'Boil potatoes until soft, peel and mash them.',
      'Heat oil in a pan, add mustard seeds and let them splutter.',
      'Add curry leaves, green chilies, and onions. Sauté until onions are translucent.',
      'Add turmeric powder, salt, and mashed potatoes. Mix well and cook for 5 minutes.',
      'Heat a dosa tawa, pour a ladleful of batter and spread into a thin circle.',
      'Add oil around the edges and cook until golden brown.',
      'Place a portion of potato masala in the center and fold the dosa.',
      'Serve hot with coconut chutney and sambar.'
    ]
  },
  // Add the snack items to the recipes array
  ...snackItems
];

// Get all unique categories from recipes
export const getCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  recipes.forEach(recipe => {
    recipe.category.forEach(category => {
      categoriesSet.add(category.toLowerCase());
    });
  });
  
  return Array.from(categoriesSet);
};

// Shopping cart
export let shoppingCart: CartItem[] = [];

// Toggle favorite status
export const toggleFavorite = (recipeId: string) => {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
  }
};

// Add ingredient to cart
export const addToCart = (ingredient: Ingredient, recipeId: string, recipeName: string) => {
  // Check if ingredient is already in cart from the same recipe
  const existingIndex = shoppingCart.findIndex(
    (item) => item.ingredient.id === ingredient.id && item.recipeId === recipeId
  );

  if (existingIndex !== -1) {
    // If found, remove it (toggle behavior)
    shoppingCart.splice(existingIndex, 1);
  } else {
    // Otherwise, add it
    shoppingCart.push({
      ingredient,
      recipeId,
      recipeName,
    });
  }
};

// Add all ingredients from a recipe to cart
export const addRecipeToCart = (recipeId: string, servingRatio = 1) => {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) return;

  // Remove any existing ingredients from this recipe
  shoppingCart = shoppingCart.filter((item) => item.recipeId !== recipeId);

  // Add all ingredients with adjusted quantities based on serving size
  recipe.ingredients.forEach((ingredient) => {
    // Create a new ingredient with adjusted price
    const adjustedIngredient = {
      ...ingredient,
      price: ingredient.price * servingRatio,
    };
    
    // Add to cart
    shoppingCart.push({
      ingredient: adjustedIngredient,
      recipeId,
      recipeName: recipe.title,
    });
  });
};

// Filter recipes by category
export const filterRecipesByCategory = (category: string) => {
  if (category === "all") {
    return recipes;
  }
  return recipes.filter((recipe) =>
    recipe.category.some((cat) => cat.toLowerCase() === category.toLowerCase())
  );
};

// Calculate total cart price
export const calculateCartTotal = () => {
  return shoppingCart.reduce((total, item) => total + item.ingredient.price, 0);
};

// Place order
export const placeOrder = () => {
  if (shoppingCart.length === 0) return null;
  
  // Group items by recipe
  const orderItems: OrderItem[] = [];
  const recipeMap = new Map<string, { name: string, price: number, count: number }>();
  
  shoppingCart.forEach(item => {
    if (!recipeMap.has(item.recipeId)) {
      recipeMap.set(item.recipeId, {
        name: item.recipeName,
        price: item.ingredient.price,
        count: 1
      });
    } else {
      const recipeItem = recipeMap.get(item.recipeId)!;
      recipeItem.price += item.ingredient.price;
      recipeItem.count += 1;
    }
  });
  
  recipeMap.forEach((value, key) => {
    orderItems.push({
      recipeId: key,
      recipeName: value.name,
      quantity: 1, // Assuming each recipe is counted as 1 item
      price: value.price
    });
  });
  
  const totalAmount = calculateCartTotal();
  const order = addOrder(orderItems, totalAmount);
  
  // Clear shopping cart
  shoppingCart = [];
  
  return order;
};

// Get cooking history for a recipe
export const getCookingHistory = (recipeId: string) => {
  return cookingHistory.find(item => item.recipeId === recipeId);
};
