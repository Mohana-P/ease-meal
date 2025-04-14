
import { v4 as uuidv4 } from 'uuid';

export interface OrderItem {
  recipeId: string;
  recipeName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
  status: 'delivered' | 'in-transit' | 'preparing';
}

// Mock order history data
const mockOrders: Order[] = [
  {
    id: uuidv4(),
    items: [
      { recipeId: '1', recipeName: 'Butter Chicken', quantity: 2, price: 450 },
      { recipeId: '3', recipeName: 'Palak Paneer', quantity: 1, price: 320 }
    ],
    totalAmount: 1220,
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'delivered'
  },
  {
    id: uuidv4(),
    items: [
      { recipeId: '2', recipeName: 'Chicken Biryani', quantity: 3, price: 650 },
    ],
    totalAmount: 650,
    orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: 'delivered'
  },
  {
    id: uuidv4(),
    items: [
      { recipeId: '5', recipeName: 'Samosa', quantity: 6, price: 120 },
      { recipeId: '6', recipeName: 'Gulab Jamun', quantity: 4, price: 160 }
    ],
    totalAmount: 280,
    orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: 'in-transit'
  }
];

export let orderHistory: Order[] = [...mockOrders];

export const addOrder = (items: OrderItem[], totalAmount: number): Order => {
  const newOrder: Order = {
    id: uuidv4(),
    items,
    totalAmount,
    orderDate: new Date(),
    status: 'preparing'
  };
  orderHistory = [newOrder, ...orderHistory];
  
  // Also update cooking history when an order is placed
  items.forEach(item => {
    updateCookingHistory(item.recipeId);
  });
  
  return newOrder;
};

// Cooking history tracking
export interface CookingHistoryItem {
  recipeId: string;
  lastCooked: Date;
  timesCooked: number;
}

export let cookingHistory: CookingHistoryItem[] = [
  { recipeId: '1', lastCooked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), timesCooked: 3 },
  { recipeId: '2', lastCooked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), timesCooked: 1 },
  { recipeId: '3', lastCooked: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), timesCooked: 2 },
];

export const updateCookingHistory = (recipeId: string): void => {
  const existing = cookingHistory.find(item => item.recipeId === recipeId);
  
  if (existing) {
    existing.lastCooked = new Date();
    existing.timesCooked += 1;
  } else {
    cookingHistory.push({
      recipeId,
      lastCooked: new Date(),
      timesCooked: 1
    });
  }
};

export const getFormattedLastCooked = (recipeId: string): string | null => {
  const historyItem = cookingHistory.find(item => item.recipeId === recipeId);
  
  if (!historyItem) return null;
  
  const daysDiff = Math.floor((Date.now() - historyItem.lastCooked.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) return 'Cooked today';
  if (daysDiff === 1) return 'Cooked yesterday';
  if (daysDiff < 7) return `Cooked ${daysDiff} days ago`;
  if (daysDiff < 30) return `Cooked ${Math.floor(daysDiff / 7)} weeks ago`;
  return `Cooked ${Math.floor(daysDiff / 30)} months ago`;
};
