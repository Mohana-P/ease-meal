import { Recipe } from './data';
import { v4 as uuidv4 } from 'uuid';

// Snack items recipes
export const snackItems: Recipe[] = [
  {
    id: '5',
    title: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 30,
    cookTime: 20,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'All-purpose flour', amount: '2 cups', price: 30 },
      { id: uuidv4(), name: 'Potatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Green peas', amount: '1/2 cup', price: 20 },
      { id: uuidv4(), name: 'Cumin seeds', amount: '1 tsp', price: 5 },
      { id: uuidv4(), name: 'Garam masala', amount: '1 tsp', price: 5 },
      { id: uuidv4(), name: 'Oil for frying', amount: '2 cups', price: 60 }
    ],
    instructions: [
      'Make the dough by mixing flour, salt, and oil. Add water gradually to form a stiff dough.',
      'Boil, peel, and mash the potatoes. Mix with peas, spices, and salt.',
      'Roll the dough into circles and cut in half. Form cones, fill with potato mixture.',
      'Seal the edges with water and deep fry until golden brown.',
      'Serve hot with mint chutney and tamarind sauce.'
    ]
  },
  {
    id: '6',
    title: 'Gulab Jamun',
    description: 'Soft milk solids balls soaked in rose-flavored sugar syrup',
    category: ['Dessert', 'Sweet', 'Vegetarian'],
    prepTime: 20,
    cookTime: 25,
    servings: 12,
    image: 'https://images.unsplash.com/photo-1589285671176-644521b77d89?q=80&w=3433&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Milk powder', amount: '1 cup', price: 60 },
      { id: uuidv4(), name: 'All-purpose flour', amount: '1/4 cup', price: 10 },
      { id: uuidv4(), name: 'Ghee', amount: '2 tbsp', price: 30 },
      { id: uuidv4(), name: 'Sugar', amount: '1.5 cups', price: 30 },
      { id: uuidv4(), name: 'Cardamom powder', amount: '1/4 tsp', price: 5 },
      { id: uuidv4(), name: 'Rose water', amount: '1 tsp', price: 10 }
    ],
    instructions: [
      'Mix milk powder, flour, and baking soda. Add ghee and knead into a soft dough using milk.',
      'Shape the dough into small balls, ensuring there are no cracks.',
      'Heat oil in a pan and fry the balls on low heat until golden brown.',
      'Prepare sugar syrup by boiling sugar and water with cardamom and rose water.',
      'Soak the fried balls in warm sugar syrup for at least 30 minutes before serving.'
    ]
  },
  {
    id: '7',
    title: 'Pakora',
    description: 'Crispy vegetable fritters in chickpea batter',
    category: ['Snack', 'Vegetarian', 'Monsoon Food'],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?q=80&w=3328&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Chickpea flour', amount: '1 cup', price: 40 },
      { id: uuidv4(), name: 'Onions', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Potatoes', amount: '1 medium', price: 10 },
      { id: uuidv4(), name: 'Spinach leaves', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Green chilies', amount: '2', price: 5 },
      { id: uuidv4(), name: 'Oil for frying', amount: '2 cups', price: 60 }
    ],
    instructions: [
      'Mix chickpea flour with salt, red chili powder, and turmeric in a bowl.',
      'Add water gradually to make a thick batter. Add cumin seeds and chopped green chilies.',
      'Slice vegetables like onions, potatoes, and spinach.',
      'Dip vegetable pieces in the batter and deep fry until golden brown.',
      'Serve hot with mint chutney and tamarind sauce.'
    ]
  }
];
