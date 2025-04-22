
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from './data';

export const snackItems: Recipe[] = [
  {
    id: '5',
    title: 'Pani Puri',
    description: 'Crispy hollow puris filled with spicy mint water and potato mixture',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Puri shells', amount: '24 pieces', price: 40 },
      { id: uuidv4(), name: 'Potatoes', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Mint leaves', amount: '1 cup', price: 15 },
      { id: uuidv4(), name: 'Tamarind', amount: '2 tbsp', price: 10 },
      { id: uuidv4(), name: 'Chaat masala', amount: '2 tsp', price: 5 }
    ],
    instructions: [
      'Boil and mash potatoes, mix with spices for filling',
      'Prepare mint water by blending mint leaves with spices',
      'Make tamarind chutney by soaking and straining tamarind',
      'Crack puris on top, fill with potato mixture',
      'Add spicy mint water and serve immediately'
    ]
  },
  {
    id: '6',
    title: 'Vada Pav',
    description: 'Spicy potato fritters in a bun with chutneys',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1643660195500-1ff20de40562?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Pav buns', amount: '8 pieces', price: 30 },
      { id: uuidv4(), name: 'Potatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Green chilies', amount: '4', price: 5 },
      { id: uuidv4(), name: 'Gram flour', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Garlic chutney', amount: '4 tbsp', price: 20 }
    ],
    instructions: [
      'Boil and mash potatoes, mix with spices',
      'Make small balls and coat with gram flour batter',
      'Deep fry until golden brown',
      'Slice pav buns and spread chutneys',
      'Place vada in between and serve hot'
    ]
  },
  {
    id: '7',
    title: 'Bhel Puri',
    description: 'Crunchy puffed rice mixed with vegetables and tangy chutneys',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1668717724211-994d5fef4cda?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Puffed rice', amount: '4 cups', price: 20 },
      { id: uuidv4(), name: 'Sev', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Onions', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Tomatoes', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Mint chutney', amount: '4 tbsp', price: 15 }
    ],
    instructions: [
      'Mix puffed rice with sev and crushed puris',
      'Add finely chopped onions and tomatoes',
      'Add both mint and tamarind chutneys',
      'Sprinkle chaat masala and mix well',
      'Serve immediately while crispy'
    ]
  },
  {
    id: '8',
    title: 'Samosa',
    description: 'Crispy pastry filled with spiced potato and pea mixture',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1632205611074-01503ba3bd9a?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Flour', amount: '2 cups', price: 20 },
      { id: uuidv4(), name: 'Potatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Green peas', amount: '1 cup', price: 15 },
      { id: uuidv4(), name: 'Spices', amount: '2 tbsp', price: 10 },
      { id: uuidv4(), name: 'Oil', amount: 'for deep frying', price: 20 }
    ],
    instructions: [
      'Prepare flour dough and let it rest',
      'Boil and mash potatoes, mix with peas and spices',
      'Roll out dough and cut into triangles',
      'Fill with potato mixture and seal edges',
      'Deep fry until golden brown and crispy'
    ]
  },
  {
    id: '9',
    title: 'Dahi Puri',
    description: 'Crispy puris topped with yogurt and chutneys',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1587033411391-0d2e07d5346a?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Puri shells', amount: '24 pieces', price: 40 },
      { id: uuidv4(), name: 'Yogurt', amount: '2 cups', price: 40 },
      { id: uuidv4(), name: 'Boiled potatoes', amount: '2', price: 20 },
      { id: uuidv4(), name: 'Sweet chutney', amount: '4 tbsp', price: 15 },
      { id: uuidv4(), name: 'Sev', amount: '1 cup', price: 25 }
    ],
    instructions: [
      'Crack puris on top and fill with potato mixture',
      'Top with whisked yogurt',
      'Add sweet and spicy chutneys',
      'Sprinkle sev and chaat masala',
      'Serve immediately'
    ]
  },
  {
    id: '10',
    title: 'Aloo Tikki',
    description: 'Crispy potato patties with spices',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1625938393846-e172c63d2d62?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Potatoes', amount: '4 large', price: 40 },
      { id: uuidv4(), name: 'Green peas', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Bread crumbs', amount: '1 cup', price: 20 },
      { id: uuidv4(), name: 'Ginger paste', amount: '1 tbsp', price: 10 },
      { id: uuidv4(), name: 'Oil', amount: '1/2 cup', price: 30 }
    ],
    instructions: [
      'Boil and mash potatoes with cooked peas',
      'Mix with spices and shape into patties',
      'Coat with bread crumbs',
      'Shallow fry until golden brown',
      'Serve hot with chutneys'
    ]
  },
  {
    id: '11',
    title: 'Dabeli',
    description: 'Sweet and spicy potato filling in a bun',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 20,
    cookTime: 10,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1600891964599-ee6299d7915a?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Pav buns', amount: '8', price: 30 },
      { id: uuidv4(), name: 'Potatoes', amount: '4 medium', price: 40 },
      { id: uuidv4(), name: 'Dabeli masala', amount: '2 tbsp', price: 20 },
      { id: uuidv4(), name: 'Pomegranate', amount: '1/2 cup', price: 30 },
      { id: uuidv4(), name: 'Peanuts', amount: '1/2 cup', price: 20 }
    ],
    instructions: [
      'Prepare spicy-sweet potato mixture',
      'Toast pav buns with butter',
      'Fill with potato mixture',
      'Top with peanuts and pomegranate',
      'Serve hot with chutney'
    ]
  },
  {
    id: '12',
    title: 'Papdi Chaat',
    description: 'Crispy crackers topped with potatoes, yogurt, and chutneys',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 20,
    cookTime: 0,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1547167652-2f8553c0aeee?q=80&w=2068&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Papdi', amount: '24 pieces', price: 30 },
      { id: uuidv4(), name: 'Potatoes', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Yogurt', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Green chutney', amount: '4 tbsp', price: 15 },
      { id: uuidv4(), name: 'Sev', amount: '1 cup', price: 25 }
    ],
    instructions: [
      'Boil and dice potatoes',
      'Whisk yogurt with spices',
      'Arrange papdi on plate',
      'Top with potatoes, yogurt, and chutneys',
      'Sprinkle sev and serve immediately'
    ]
  },
  {
    id: '13',
    title: 'Corn Pakora',
    description: 'Deep-fried corn fritters with spices',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1628294896516-ee7dcd117f40?q=80&w=2070&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Sweet corn', amount: '2 cups', price: 40 },
      { id: uuidv4(), name: 'Gram flour', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Green chilies', amount: '2', price: 5 },
      { id: uuidv4(), name: 'Coriander', amount: '1/2 cup', price: 10 },
      { id: uuidv4(), name: 'Oil', amount: '2 cups', price: 60 }
    ],
    instructions: [
      'Mix corn with gram flour batter',
      'Add chopped chilies and coriander',
      'Season with salt and spices',
      'Deep fry in hot oil until golden',
      'Serve hot with chutney'
    ]
  },
  {
    id: '14',
    title: 'Bread Pakora',
    description: 'Stuffed bread slices in spicy gram flour batter',
    category: ['Snack', 'Vegetarian', 'Street Food'],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025&auto=format&fit=crop',
    isFavorite: false,
    ingredients: [
      { id: uuidv4(), name: 'Bread slices', amount: '8', price: 30 },
      { id: uuidv4(), name: 'Potatoes', amount: '2 medium', price: 20 },
      { id: uuidv4(), name: 'Gram flour', amount: '1 cup', price: 30 },
      { id: uuidv4(), name: 'Green chutney', amount: '4 tbsp', price: 15 },
      { id: uuidv4(), name: 'Oil', amount: '2 cups', price: 60 }
    ],
    instructions: [
      'Prepare potato filling with spices',
      'Make sandwich with green chutney',
      'Prepare gram flour batter',
      'Dip sandwiches in batter and deep fry',
      'Serve hot with ketchup'
    ]
  }
];

